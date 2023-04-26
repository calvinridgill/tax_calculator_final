import mongoose, { Schema } from "mongoose"

const ProductSchema = new Schema(
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

export const Product = mongoose.model("Product", ProductSchema)
