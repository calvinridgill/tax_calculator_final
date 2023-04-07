import { MyStripe } from "../services/MyStripe";
import Stripe from "stripe";

export async function createCheckoutSession(req, res, next) {
  const { productId } = req.body;
  // check if the price id is a valid one, use mystripe module to do that, if not valid throw an error
  try {
    const myStripe = new MyStripe();
    const session = await myStripe.createCheckoutSession(productId);
    res
      .status(200)
      .send({ status: "success", data: { checkoutURL: session.url } });
  } catch (error) {
    next(error);
  }
}

export async function handleStripeCheckOutFulfillment(req, res, next) {
  try {
    const myStripe = new MyStripe();
    const payload = req.body;
    // Verify events came from Stripe
    const endpointSecret = process.env.STRIPE_END_POINT_SECRET;
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = myStripe._stripe.webhooks.constructEvent(
        payload,
        sig,
        endpointSecret
      );
      // Handle the checkout.session.completed event
      if (event.type === "checkout.session.completed") {
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        const session = event.data.object as Stripe.Checkout.Session;
        const sessionWithLineItems =
          await myStripe._stripe.checkout.sessions.retrieve(session.id, {
            expand: ["line_items"],
          });
        // Fulfill the purchase...
        fulfillOrder(sessionWithLineItems);
      }
    } catch (err) {
      console.log("error in handling stripe checkout fulfilment ", err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    res.status(200).send({ status: "success" });
  } catch (error) {
    next(error);
  }
}

function fulfillOrder(session: Stripe.Response<Stripe.Checkout.Session>) {
  console.log("session ------->", session);
  // console.log("customer detail ------->", session.customer_details);
  // console.log("product detail -------> ", session.line_items);
  // console.log("product detail -------> ", session.line_items.data[0].price);

  // What should be done when after the user pays for the order
  // - get the product information
  // - get the user information
  // - create a new order in the database
  // - send an email to the user
  // - send an email to the admin
  // - create a user account if the user is new

  //TODO: before all that
  // - create a user account model
  // - create a product model
  // - create an order model
}
