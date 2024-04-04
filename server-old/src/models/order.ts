import mongoose, { Schema, Types } from "mongoose"

interface IOrder {
  user: Types.ObjectId
  products: {
    product: string
    quantity: number
  }[]
  status: string
  total: number
  spreadSheetUrl: string
}

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    total: {
      type: Number,
      required: true,
    },
    spreadSheetUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const Order = mongoose.model<IOrder>("Order", OrderSchema)
