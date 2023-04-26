import { MyStripe } from "../services/MyStripe"
import Stripe from "stripe"
import { User } from "../models/user"
import { Order } from "../models/order"

export async function createCheckoutSession(req, res, next) {
  try {
    const { productId, quantity = 1 } = req.body
    const myStripe = new MyStripe()
    const session = await myStripe.createCheckoutSession(productId, quantity)
    res
      .status(200)
      .send({ status: "success", data: { checkoutURL: session.url } })
  } catch (error) {
    next(error)
  }
}

export async function handleStripeCheckOutFulfillment(req, res, next) {
  try {
    const myStripe = new MyStripe()
    const payload = req.body
    // Verify events came from Stripe
    const endpointSecret = process.env.STRIPE_END_POINT_SECRET
    const sig = req.headers["stripe-signature"]
    let event

    try {
      event = myStripe._stripe.webhooks.constructEvent(
        payload,
        sig,
        endpointSecret,
      )
      // Handle the checkout.session.completed event
      if (event.type === "checkout.session.completed") {
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        const session = event.data.object as Stripe.Checkout.Session
        const sessionWithLineItems =
          await myStripe._stripe.checkout.sessions.retrieve(session.id, {
            expand: ["line_items"],
          })
        // Fulfill the purchase...
        await fulfillOrder(sessionWithLineItems)
      }
    } catch (err) {
      console.log("error in handling stripe checkout fulfilment ", err)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }
    res.status(200).send({ status: "success" })
  } catch (error) {
    next(error)
  }
}

async function fulfillOrder(session: Stripe.Response<Stripe.Checkout.Session>) {
  // - get the user information
  const { email, name } = session.customer_details
  // - check if the user exists in the database
  let user = await User.findOne({ email })
  if (!user) {
    // - create a new user in the database
    user = new User({ firstName: name, email })
    await user.save()
  }

  // - get the product information
  const productId = session.metadata.productId
  const product = session.line_items.data[0]
  // - create a new order in the database
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
  })
  await newOrder.save()
  // - TODO: send an email to the user Or
  // you can configure stripe to send an email to the user after the payment is successful
  // - TODO: send an email to the admin
  // I will do this
}
