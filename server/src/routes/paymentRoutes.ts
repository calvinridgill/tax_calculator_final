import express from "express"
import { createCheckoutSession } from "../controllers/paymentController"

export const paymentRouter = express.Router()

paymentRouter.post("/create_checkout_session", createCheckoutSession)
