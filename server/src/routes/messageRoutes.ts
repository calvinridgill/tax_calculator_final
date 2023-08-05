import express from "express"
import authController from "../controllers/userController/authController"
import handleFactory from "../controllers/handleFactory"
import { Message } from "../models/message"

export const messageRouter = express.Router()

messageRouter.use(authController.protect)
messageRouter.use(authController.restrictTo("admin"))

messageRouter.get("/", handleFactory.getAll(Message))

messageRouter.get("/:id", handleFactory.getOne(Message))

messageRouter.post("/", handleFactory.createOne(Message))

messageRouter.patch("/:id", handleFactory.updateOne(Message))

messageRouter.delete("/:id", handleFactory.deleteOne(Message))
