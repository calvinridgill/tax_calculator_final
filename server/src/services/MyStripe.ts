import Stripe from "stripe";

const products = new Map<
  string,
  { name: string; description?: string; images?: string[] }
>([
  [
    "productOneId",
    {
      name: "Product ONE Name",
      description: "This is the description of product ONE",
      images: [
        "https://picsum.photos/300/400",
        "https://picsum.photos/300/400",
      ],
    },
  ],
  ["two", { name: "TWO", description: "Two two" }],
  ["three", { name: "THREE" }],
]);

export class MyStripe {
  private stripe: Stripe;
  private successURL = `${process.env.CLIENT_APP_URL}/checkout?success=true`;
  private cancelURL = `${process.env.CLIENT_APP_URL}/checkout?success=false`;

  constructor(apiKey?: string, successURL?: string, cancelURL?: string) {
    if (!apiKey) apiKey = process.env.STRIPE_API_KEY;
    this.stripe = new Stripe(apiKey, { apiVersion: "2022-11-15" });
    if (successURL) this.successURL = successURL;
    if (cancelURL) this.cancelURL = cancelURL;
  }

  public async createCheckoutSession(productId: string) {
    const product = products.get(productId);

    const session = await this.stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 3,
          price_data: {
            currency: "usd",
            unit_amount: 2000,
            product_data: {
              name: product.name,
              description: product.description,
              images: product.images,
            },
          },
        },
      ],
      success_url: this.successURL,
      cancel_url: this.cancelURL,
      currency: "usd",
      metadata: {
        productId,
      },
    });
    return session;
  }

  public async getProductList() {
    const productList = await this.stripe.products.list();
    return productList;
  }

  get _stripe() {
    return this.stripe;
  }

  setSuccessURL(url: string) {
    this.successURL = url;
  }
  setCancelURL(url: string) {
    this.cancelURL = url;
  }
}
