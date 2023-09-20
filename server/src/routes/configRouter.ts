import express from "express"
import authController from "../controllers/userController/authController"
import handleFactory from "../controllers/handleFactory"
import { Config } from "../models/config"

export const configRouter = express.Router()

configRouter.use(authController.protect)
configRouter.use(authController.restrictTo("admin"))

configRouter.get("/", handleFactory.getAll(Config))

configRouter.get("/:id", handleFactory.getOne(Config))

configRouter.post("/", handleFactory.createOne(Config))

configRouter.patch("/:id", handleFactory.updateOne(Config))

configRouter.delete("/:id", handleFactory.deleteOne(Config))
