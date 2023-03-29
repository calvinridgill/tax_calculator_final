import { axios } from "../utils/axios";

export async function makePayment(priceId = "price_1MmONVHMi9UyUCTABc8yY54k") {
  const { data } = (
    await axios.post("/payment/create_checkout_session", {
      priceId,
    })
  ).data;
  return data.checkoutURL;
}
