import { MyStripe } from "../services/MyStripe";
import Stripe from "stripe";
import { User } from "../models/user";
import { Order } from "../models/order";
import { generatePassword } from "../utils";
import { Email } from "../utils/email";
import { GoogleSheet } from "../services/GoogleSheet";
import { currentEnvConfig } from "../models/config";

export async function createCheckoutSession(req, res, next) {
  console.log("🔹 [createCheckoutSession] Function triggered");
  try {
    const { productId, quantity = 1 } = req.body;
    console.log("🛒 Product ID:", productId, " | Quantity:", quantity);

    const myStripe = new MyStripe();
    const session = await myStripe.createCheckoutSession(productId, quantity);
    console.log("✅ Stripe Checkout Session Created:", session.url);

    res.status(200).send({ status: "success", data: { checkoutURL: session.url } });

    // Calling fulfillOrder function (This may not have complete details)
    console.log("⏳ Calling fulfillOrder immediately (May not have full data yet)");
    console.log("checking session", session)
    fulfillOrder(session);
  } catch (error) {
    console.error("❌ Error in createCheckoutSession:", error);
    next(error);
  }
}

export async function handleStripeCheckOutFulfillment(req, res, next) {
  console.log("🔹 [handleStripeCheckOutFulfillment] Function triggered");
  try {
    const myStripe = new MyStripe();
    const payload = req.body;
    const endpointSecret = currentEnvConfig.STRIPE_END_POINT_SECRET;
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = myStripe._stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      console.log("✅ Stripe Webhook Event Received:", event.type);

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("📦 Checkout Session Data:", session);

        const sessionWithLineItems = await myStripe._stripe.checkout.sessions.retrieve(session.id, {
          expand: ["line_items", "customer"],
        });

        console.log("📋 Expanded Session Data:", sessionWithLineItems);

        await fulfillOrder(sessionWithLineItems);
      }
    } catch (err) {
      console.error("❌ Error in handling Stripe checkout fulfillment:", err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    res.status(200).send({ status: "success" });
  } catch (error) {
    console.error("❌ Error in handleStripeCheckOutFulfillment:", error);
    next(error);
  }
}

async function fulfillOrder(session: Stripe.Response<Stripe.Checkout.Session>) {
  try {
    console.log("🔹 [fulfillOrder] Function triggered");

    // Log full session details
    console.log("📦 Full Session Data:", session);

    // Check if customer details exist
    if (!session.customer_details) {
      console.error("❌ Error: session.customer_details is missing");
      throw new Error("Customer details are missing in Stripe session");
    }

    // const { email, name, phone } = session.customer_details;
    // console.log("👤 Customer Details:", { email, name, phone });

    let email: 'suresh.linuxbean@gmail.com',
let name: 'Suresh Sharma',
let phone: '+919174373248',

    // Check if user exists in the database
    let user = await User.findOne({ email });
    if (user) {
      console.log("✅ Existing user found:", user);
    } else {
      console.log("➕ Creating a new user...");
      const password = generatePassword(10);

      user = new User({
        firstName: name,
        email,
        password,
        phone,
        generatedPassword: password,
      });

      await user.save();
      console.log("✅ New user saved:", user);

      const loginUrl = `${currentEnvConfig.CLIENT_APP_URL}/signin?email=${user.email}&password=${password}`;
      console.log("🔗 Login URL:", loginUrl);

      await new Email(user.email).sendAccountCreated({
        firstname: user.firstName,
        lastname: user.lastname,
        email,
        password,
        loginUrl,
      });

      console.log("📧 Account creation email sent successfully.");
    }

    // Check if product metadata is available
    console.log("🛍️ Session Metadata:", session.metadata);
    if (!session.metadata || !session.metadata.productId) {
      console.error("❌ Error: Product ID is missing in session metadata");
      throw new Error("Product ID is missing in session metadata");
    }

    const productId = session.metadata.productId;
    const product = session.line_items?.data[0];
    if (!product) {
      console.error("❌ Error: No line items found in session");
      throw new Error("No product information found in Stripe session");
    }

    console.log("🛒 Product in order:", {
      productId,
      quantity: product.quantity,
    });

    // Create Google Sheet entry
    console.log("📊 Copying Google Sheet content for:", user.email);
    // const googleSheet = await GoogleSheet.createInstance();
    // const spreadSheetUrl = await googleSheet.copyTaxCalculatorContent(user.email);
    // console.log("✅ Google Sheet URL:", spreadSheetUrl);

    // Create new order
    console.log("📝 Creating new order...");
    const newOrder = new Order({
      total: session.amount_total,
      products: [
        {
          product: productId,
          quantity: product.quantity,
        },
      ],
      status: "completed",
      user: user._id,
      // spreadSheetUrl,
    });

    await newOrder.save();
    console.log("✅ Order saved successfully:", newOrder);
  } catch (error) {
    console.error("❌ Error in fulfilling order:", error);
    throw error;
  }
}
