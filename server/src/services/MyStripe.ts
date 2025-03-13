import Stripe from "stripe"
import { Product } from "../models/product"
import { currentEnvConfig } from "../models/config"
import { Types } from "mongoose"

export class MyStripe {
  private stripe: Stripe
  private successURL = `${currentEnvConfig.CLIENT_APP_URL}/checkout?success=true`
  private cancelURL = `${currentEnvConfig.CLIENT_APP_URL}/checkout?success=false`
// 2022-11-15
  constructor(apiKey?: string, successURL?: string, cancelURL?: string) {
    if (!apiKey)
      apiKey = currentEnvConfig.STRIPE_API_KEY
    console.log(apiKey)
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
            unit_amount: product.income * 100,
            product_data: {
              name: product.name,
              description: product.description,
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
