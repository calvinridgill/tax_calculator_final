import { MyStripe } from "../services/MyStripe";
import Stripe from "stripe";
import { User } from "../models/user";
import { Order } from "../models/order";
import { generatePassword } from "../utils";
import { Email } from "../utils/email";
import { GoogleSheet } from "../services/GoogleSheet";
import { currentEnvConfig } from "../models/config";

// Create a Stripe checkout session
export async function createCheckoutSession(req, res, next) {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).send({ status: "error", message: "Product ID is required" });
    }

    const myStripe = new MyStripe();
    const session = await myStripe.createCheckoutSession(productId, quantity);

    console.log("Checkout session created successfully:", session);
    return res.status(200).json({ status: "success", data: { checkoutURL: session.url } });

  } catch (error) {
    console.error("Error in createCheckoutSession:", error);
    next(error);
  }
}

// Handle Stripe webhook events (Order fulfillment)
export async function handleStripeCheckOutFulfillment(req, res, next) {
  try {
    const myStripe = new MyStripe();
    const payload = req.body;
    const endpointSecret = currentEnvConfig.STRIPE_END_POINT_SECRET;
    const sig = req.headers["stripe-signature"];

    if (!sig) {
      console.error("Missing Stripe signature");
      return res.status(400).send({ status: "error", message: "Invalid webhook request" });
    }

    let event;
    try {
      event = myStripe._stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("Received Stripe webhook event:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Retrieve full session details
      const sessionWithLineItems = await myStripe._stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items", "customer"],
      });

      console.log("Checkout session completed. Processing fulfillment...");
      await fulfillOrder(sessionWithLineItems);
    }

    return res.status(200).json({ status: "success" });

  } catch (error) {
    console.error("Error in handleStripeCheckOutFulfillment:", error);
    next(error);
  }
}

// Function to create an order after Stripe checkout is successful
async function fulfillOrder(session) {
  try {
    if (!session.customer_details) {
      console.error("Missing customer details in session:", JSON.stringify(session, null, 2));
      return;
    }

    const { email, name, phone } = session.customer_details;
    if (!email) {
      console.error("Email is missing from customer details:", session.customer_details);
      return;
    }

    console.log("Processing order for:", email);

    // 1. Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      const password = generatePassword(10);
      user = new User({
        firstName: name || "Guest",
        email,
        password,
        phone: phone || "",
        generatedPassword: password,
      });

      await user.save();
      console.log("User created:", user._id);

      const loginUrl = `${currentEnvConfig.CLIENT_APP_URL}/signin?email=${user.email}&password=${password}`;

      try {
        await new Email(user.email).sendAccountCreated({
          firstname: user.firstName,
          lastname: user.lastname || "",
          email,
          password,
          loginUrl,
        });
        console.log("Welcome email sent to:", email);
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
      }

    } else {
      console.log("Existing user found:", user._id);
    }

    // 2. Ensure metadata exists
    if (!session.metadata?.productId) {
      console.error("Missing productId in session metadata:", session.metadata);
      return;
    }

    const productId = session.metadata.productId;

    // 3. Get the product details from session
    const product = session.line_items?.data?.[0];
    if (!product) {
      console.error("No line items found in session:", session.line_items);
      return;
    }

    console.log("Product details:", product);

    // 4. Generate Google Sheet for the user
    let spreadSheetUrl = null;
    try {
      const googleSheet = await GoogleSheet.createInstance();
      spreadSheetUrl = await googleSheet.copyTaxCalculatorContent(user.email);
    } catch (sheetError) {
      console.error("Failed to generate Google Sheet:", sheetError);
    }

    // 5. Create and Save the Order in DB
    const newOrder = new Order({
      total: session.amount_total || 0, 
      products: [
        {
          product: productId,
          quantity: product.quantity || 1,
        },
      ],
      status: "completed",
      user: user._id,
      spreadSheetUrl,
    });

    await newOrder.save();
    console.log("Order successfully created:", newOrder);

  } catch (error) {
    console.error("Error in fulfilling order:", error);
  }
}
