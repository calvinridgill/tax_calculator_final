import express from "express"
import {
  getAllOrders,
  getOrdersByUser,
  getOrder,
} from "../controllers/orderController"
import authController from "../controllers/userController/authController"

export const orderRouter = express.Router()

orderRouter.use(authController.protect)

orderRouter.get("/", getAllOrders)
orderRouter.get("/:id", getOrder)
orderRouter.get("/user/:id", getOrdersByUser)
