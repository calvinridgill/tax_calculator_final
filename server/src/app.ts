import express, { Request, Response, NextFunction } from "express";
import { router as paymentRouter } from "./routes/paymentRoutes";
import { AppError } from "./utils/AppError";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/payment", paymentRouter);

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
