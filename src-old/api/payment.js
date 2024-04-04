import { axios } from "../utils/axios";

export async function makePayment(productId) {
  const { data } = (
    await axios.post("/payment/create_checkout_session", {
      productId,
    })
  ).data;
  return data.checkoutURL;
}
