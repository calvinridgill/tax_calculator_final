import { Request, Response, NextFunction } from "express"
import { Product } from "../models/product"
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find()
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    })
  } catch (error) {
    next(error)
  }
}
