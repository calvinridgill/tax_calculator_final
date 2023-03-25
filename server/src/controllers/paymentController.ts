import { MyStripe } from "../services/MyStripe";

export async function createCheckoutSession(req, res, next) {
  const { priceId } = req.body;
  // check if the price id is a valid one, use mystripe module to do that, if not valid throw an error
  try {
    const success_url = `${process.env.CLIENT_APP_URL}/checkout?success=true`;
    const cancel_url = `${process.env.CLIENT_APP_URL}/checkout?success=false`;
    const stripe = new MyStripe();
    const session = await stripe.createCheckoutSession(
      [{ price: priceId, quantity: 1 }],
      success_url,
      cancel_url
    );
    res
      .status(200)
      .send({ status: "success", data: { checkoutURL: session.url } });
  } catch (error) {
    next(error);
  }
}
