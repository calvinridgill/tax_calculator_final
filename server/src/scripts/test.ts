/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MyStripe } from "../services/MyStripe";
import { config } from "dotenv";
config({ path: "../../.env" });

(async () => {
  const stripe = new MyStripe();
  const res = await stripe.getProductList();
  console.log("products ------>", res);
})();
