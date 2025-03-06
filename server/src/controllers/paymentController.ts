import { MyStripe } from "../services/MyStripe"
import Stripe from "stripe"
import { User } from "../models/user"
import { Order } from "../models/order"
import { generatePassword } from "../utils"
import { Email } from "../utils/email"
import { GoogleSheet } from "../services/GoogleSheet"
import { currentEnvConfig } from "../models/config"

export async function createCheckoutSession(req, res, next) {
  try {
    const { productId, quantity = 1 } = req.body
    const myStripe = new MyStripe()
    const session = await myStripe.createCheckoutSession(productId, quantity)
    res
      .status(200)
      .send({ status: "success", data: { checkoutURL: session.url } })
    fulfillOrder(session)
  } catch (error) {
    next(error)
  }
}

// export async function handleStripeCheckOutFulfillment(req, res, next) {
//   console.log("inside handleStripeCheckOutFulfillment")
//   try {
//     const myStripe = new MyStripe()
//     const payload = req.body
//     // Verify events came from Stripe
//     const endpointSecret = currentEnvConfig.STRIPE_END_POINT_SECRET
//     const sig = req.headers["stripe-signature"]
//     let event

//     try {
//       event = myStripe._stripe.webhooks.constructEvent(
//         payload,
//         sig,
//         endpointSecret,
//       )
//       // Handle the checkout.session.completed event
      
//       if (event.type === "checkout.session.completed") {
//          console.log("heckout session completed")
//         // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
//         const session = event.data.object as Stripe.Checkout.Session
//         const sessionWithLineItems =
//           await myStripe._stripe.checkout.sessions.retrieve(session.id, {
//             expand: ["line_items"],
//           })
//         // Fulfill the purchase...
//         await fulfillOrder(sessionWithLineItems)
//       }
//     } catch (err) {
//       console.log("error in handling stripe checkout fulfilment ", err)
//       return res.status(400).send(`Webhook Error: ${err.message}`)
//     }
//     res.status(200).send({ status: "success" })
//   } catch (error) {
//     next(error)
//   }
// }


export async function handleStripeCheckOutFulfillment(req, res, next) {
  console.log("🚀 Inside handleStripeCheckOutFulfillment");
  try {
    const myStripe = new MyStripe();
    const payload = req.body;
    const sig = req.headers["stripe-signature"];
    const endpointSecret = currentEnvConfig.STRIPE_END_POINT_SECRET;

    if (!sig) {
      console.error("❌ Missing Stripe signature");
      return res.status(400).send("Missing Stripe signature");
    }

    let event;
    try {
      // Verify the Stripe webhook signature
      event = myStripe._stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.error("❌ Error verifying Stripe signature:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      console.log("✅ Checkout session completed");

      const session = event.data.object;

      try {
        // Retrieve session with expanded line items
        const sessionWithLineItems = await myStripe._stripe.checkout.sessions.retrieve(session.id, {
          expand: ["line_items"],
        });

        console.log("📦 Session with line items retrieved:", sessionWithLineItems);

        // Fulfill the order
        await fulfillOrder(sessionWithLineItems);
      } catch (err) {
        console.error("❌ Error retrieving session or fulfilling order:", err);
        return res.status(500).send("Internal server error during fulfillment");
      }
    } else {
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    res.status(200).send({ status: "success" });
  } catch (error) {
    console.error("❌ Unexpected error in Stripe fulfillment:", error);
    next(error);
  }
}

async function fulfillOrder(session: Stripe.Response<Stripe.Checkout.Session>) {
   console.log("session", session)
  try {
    // - get the user information
    const { email, name, phone } = session.customer_details
    // - check if the user exists in the database
    let user = await User.findOne({ email })

    if (!user) {
      // - create a new user in the database
      const password = generatePassword(10)
      user = new User({
        firstName: name,
        email,
        password,
        phone,
        generatedPassword: password,
      })
      await user.save()
      const loginUrl = `${currentEnvConfig.CLIENT_APP_URL}/signin?email=${user.email}&password=${password}`
      console.log("loginUrl", loginUrl)
      await new Email(user.email).sendAccountCreated({
        firstname: user.firstName,
        lastname: user.lastname,
        email,
        password,
        loginUrl,
      })
    }
    // - get the product information
    const productId = session.metadata.productId
    const product = session.line_items.data[0]
    // - create a new order in the database
    console.log("product and productId", productId, product)

    const googleSheet = await GoogleSheet.createInstance()
    const spreadSheetUrl = await googleSheet.copyTaxCalculatorContent(
      user.email,
    )
 
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
      spreadSheetUrl,
    })
    console.log("newOrder", newOrder)
    await newOrder.save()
  } catch (error) {
    console.log("error in fulfilling order..", error)
  }
}
