import express, { Request, Response, NextFunction } from "express"
import { paymentRouter } from "./routes/paymentRoutes"
import { AppError } from "./utils/AppError"
import cors from "cors"
import bodyParser from "body-parser"
import { handleStripeCheckOutFulfillment } from "./controllers/paymentController"
import { productRouter } from "./routes/productRoutes"
import { userRouter } from "./routes/userRoutes"
import { orderRouter } from "./routes/orderRoutes"
import morgan from "morgan"
import { messageRouter } from "./routes/messageRoutes"
import { configRouter } from "./routes/configRouter"

const app = express()
app.use(morgan("tiny"))
// TODO: handle cors properly
app.use(cors())

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send("Hello World!")
})
// this handler must use its own body parser
app.post(
  "/api/v1/payment/handle_checkout_session",
  bodyParser.raw({ type: "application/json" }),
  handleStripeCheckOutFulfillment,
)

const appRoutes = express.Router()

appRoutes.use("/payment", paymentRouter)
appRoutes.use("/product", productRouter)
appRoutes.use("/user", userRouter)
appRoutes.use("/order", orderRouter)
appRoutes.use("/message", messageRouter)
appRoutes.use("/config", configRouter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1", appRoutes)

// this handler must be at the end of all express middleware
// global error handler
app.use(
  (
    error: AppError,
    req: Request,
    res: Response,
    // eslint-disable-next-line no-unused-vars
    next: NextFunction,
  ) => {
    if (error.statusCode)
      res
        .status(error.statusCode)
        .send({ status: "failed", message: error.message })
    else
      res.status(500).send({
        error: error ? error.message : null,
        request: req ? req.url : null,
        message: "Something went wrong",
      })
  },
)
export { app }
