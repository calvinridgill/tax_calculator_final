import { Request, Response, NextFunction } from "express"
import { Order } from "../models/order"

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("getAllOrders")
    const orders = await Order.find({})
    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order = await Order.findById(req.params.id)
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getOrdersByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await Order.find({ user: req.params.id })
    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    })
  } catch (error) {
    next(error)
  }
}
