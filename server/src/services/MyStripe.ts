import Stripe from "stripe"
import { Product } from "../models/product"
import { Types } from "mongoose"

export class MyStripe {
  private stripe: Stripe
  private successURL = `${process.env.CLIENT_APP_URL}/checkout?success=true`
  private cancelURL = `${process.env.CLIENT_APP_URL}/checkout?success=false`

  constructor(apiKey?: string, successURL?: string, cancelURL?: string) {
    if (!apiKey) apiKey = process.env.STRIPE_API_KEY
    this.stripe = new Stripe(apiKey, { apiVersion: "2022-11-15" })
    if (successURL) this.successURL = successURL
    if (cancelURL) this.cancelURL = cancelURL
  }

  public async createCheckoutSession(productId: string, quantity = 1) {
    if (!Types.ObjectId.isValid(productId)) {
      throw { statusCode: 400, message: "Invalid product id" }
    }
    const product = await Product.findById(productId)
    if (!product) {
      throw { statusCode: 400, message: "Invalid product id" }
    }

    const session = await this.stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity,
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
      phone_number_collection: {
        enabled: true,
      },
      success_url: this.successURL,
      cancel_url: this.cancelURL,
      currency: "usd",
      metadata: {
        productId,
      },
    })
    return session
  }

  public async getProductList() {
    const productList = await this.stripe.products.list()
    return productList
  }

  get _stripe() {
    return this.stripe
  }

  setSuccessURL(url: string) {
    this.successURL = url
  }
  setCancelURL(url: string) {
    this.cancelURL = url
  }
}
