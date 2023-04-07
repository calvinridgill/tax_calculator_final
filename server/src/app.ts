import express, { Request, Response, NextFunction } from "express";
import { router as paymentRouter } from "./routes/paymentRoutes";
import { AppError } from "./utils/AppError";
import cors from "cors";
import bodyParser from "body-parser";
import { handleStripeCheckOutFulfillment } from "./controllers/paymentController";

const app = express();
//TODO: handle cors properly
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// this handler must use its own body parser
app.post(
  "/api/v1/payment/handle_checkout_session",
  bodyParser.raw({ type: "application/json" }),
  handleStripeCheckOutFulfillment
);

const appRoutes = express.Router();
appRoutes.use("/api/v1/payment", paymentRouter);

app.use(express.json(), appRoutes);

// this handler must be at the end of all express middleware
// global error handler
app.use(
  (
    error: AppError,
    req: Request,
    res: Response,
    // eslint-disable-next-line no-unused-vars
    next: NextFunction
  ) => {
    if (error.statusCode)
      res
        .status(error.statusCode)
        .send({ status: "failed", message: error.message });
    else
      res.status(500).send({
        error: error ? error.message : null,
        request: req ? req.url : null,
        message: "Something went wrong",
      });
  }
);
export { app };
