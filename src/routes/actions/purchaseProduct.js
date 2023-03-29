import { sleep } from "../../utils/index";
import { makePayment } from "../../api/payment";
export const action = async ({ params }) => {
  try {
    await sleep(1000);
    const { priceId } = params;
    console.log("priceId", priceId);
    const redirectURL = await makePayment(); //TODO: pass priceId to makePayment once you start getting the right priceId
    window.location.href = redirectURL;
    return null;
  } catch (error) {
    return error;
  }
};
