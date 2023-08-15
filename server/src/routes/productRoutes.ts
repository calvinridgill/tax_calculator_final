import express from "express"
import {
  getAllProducts,
  createProduct,
  uploadPhoto,
  resizePhoto,
  updateProduct,
  deleteProduct,
} from "../controllers/productController"
import authController from "../controllers/userController/authController"

export const productRouter = express.Router()

productRouter.get("/", getAllProducts)

productRouter.use(authController.protect)
productRouter.use(authController.restrictTo("admin"))

productRouter.post("/", uploadPhoto, resizePhoto, createProduct)
productRouter.patch("/:id", uploadPhoto, resizePhoto, updateProduct)
productRouter.delete("/:id", deleteProduct)
