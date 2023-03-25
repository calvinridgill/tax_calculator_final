import express from "express";
import { createCheckoutSession } from "../controllers/paymentController";

export const router = express.Router();

router.post("/create_checkout_session", createCheckoutSession);
