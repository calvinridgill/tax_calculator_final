import express from "express"
import authController from "../controllers/userController/authController"
import messageController from "../controllers/messageController"

export const messageRouter = express.Router()

messageRouter.use(authController.protect)
messageRouter.use(authController.restrictTo("admin"))

messageRouter.get("/", messageController.getAllMessages)

messageRouter.get("/:id", messageController.getAMessage)

messageRouter.post("/", messageController.createMessage)

messageRouter.patch("/:id", messageController.updateMessage)

messageRouter.delete("/:id", messageController.deleteMessage)
