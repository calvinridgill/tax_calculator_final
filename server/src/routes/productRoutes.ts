import express from "express"
import { getAllProducts } from "../controllers/productController"

export const productRouter = express.Router()

productRouter.get("/", getAllProducts)
