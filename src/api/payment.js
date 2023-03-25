import { axios } from "../utils/axios";

export async function makePayment() {
  const { data } = (
    await axios.post("/payment/create_checkout_session", {
      priceId: "price_1MmONVHMi9UyUCTABc8yY54k",
    })
  ).data;
  return data.checkoutURL;
}
