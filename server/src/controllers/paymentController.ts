import { MyStripe } from "../services/MyStripe";
import Stripe from "stripe";
import { User } from "../models/user";
import { Order } from "../models/order";
import { generatePassword } from "../utils";
import { Email } from "../utils/email";
import { GoogleSheet } from "../services/GoogleSheet";
import { currentEnvConfig } from "../models/config";

export async function createCheckoutSession(req, res, next) {
  try {
    const { productId, quantity = 1 } = req.body;
    const myStripe = new MyStripe();
    const session = await myStripe.createCheckoutSession(productId, quantity);

    res.status(200).send({ status: "success", data: { checkoutURL: session.url } });

    console.log("Checkout session created successfully:", session);
    fulfillOrder(session);
  } catch (error) {
    console.error("Error in createCheckoutSession:", error);
    next(error);
  }
}

export async function handleStripeCheckOutFulfillment(req, res, next) {
  try {
    const myStripe = new MyStripe();
    const payload = req.body;
    const endpointSecret = currentEnvConfig.STRIPE_END_POINT_SECRET;
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = myStripe._stripe.webhooks.constructEvent(payload, sig, endpointSecret);

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const sessionWithLineItems = await myStripe._stripe.checkout.sessions.retrieve(session.id, {
          expand: ["line_items", "customer"],
        });

        console.log("Stripe checkout session completed:", sessionWithLineItems);
        await fulfillOrder(sessionWithLineItems);
      }
    } catch (err) {
      console.error("Error in handling Stripe checkout fulfillment:", err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    res.status(200).send({ status: "success" });
  } catch (error) {
    console.error("Error in handleStripeCheckOutFulfillment:", error);
    next(error);
  }
}

async function fulfillOrder(session) {
  try {
    if (!session.customer_details) {
      console.error("Missing customer details in session:", JSON.stringify(session, null, 2));
      return;
    }

    const { email, name, phone } = session.customer_details || {};
    if (!email) {
      console.error("Email is missing from customer details:", session.customer_details);
      return;
    }

    console.log("Processing order for:", email);

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

      const loginUrl = `${currentEnvConfig.CLIENT_APP_URL}/signin?email=${user.email}&password=${password}`;
      console.log("User created successfully, login URL:", loginUrl);

      await new Email(user.email).sendAccountCreated({
        firstname: user.firstName,
        lastname: user.lastname || "",
        email,
        password,
        loginUrl,
      });
    }

    console.log("User verified/created:", user._id);

    if (!session.metadata || !session.metadata.productId) {
      console.error("Missing productId in session metadata:", session.metadata);
      return;
    }

    const productId = session.metadata.productId;
    const product = session.line_items?.data?.[0];

    if (!product) {
      console.error("No line items found in session:", session.line_items);
      return;
    }

    console.log("Product details:", product);

    const googleSheet = await GoogleSheet.createInstance();
    const spreadSheetUrl = await googleSheet.copyTaxCalculatorContent(user.email);

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
