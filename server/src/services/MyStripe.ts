import Stripe from "stripe";

export class MyStripe {
  private stripe: Stripe;
  constructor(apiKey?: string) {
    if (!apiKey) apiKey = process.env.STRIPE_API_KEY;
    this.stripe = new Stripe(apiKey, { apiVersion: "2022-11-15" });
  }

  public async createCheckoutSession(
    line_items: Stripe.Checkout.SessionCreateParams.LineItem[],
    success_url: string,
    cancel_url: string
  ) {
    const session = await this.stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url,
      cancel_url,
    });
    return session;
  }

  public async getProductList() {
    const productList = await this.stripe.products.list();
    return productList;
  }
}
