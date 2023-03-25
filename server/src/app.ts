import express from "express";
import { router as paymentRouter } from "./routes/paymentRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/payment", paymentRouter);
export { app };
