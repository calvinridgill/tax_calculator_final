import mongoose, { Schema } from "mongoose"

interface IProduct {
  name: string
  price: number
  description: string
  images: string[]
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: String,
    images: [String],
  },
  { timestamps: true },
)

export const Product = mongoose.model<IProduct>("Product", productSchema)
