import { makePayment } from "../../api/payment";
export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const productId = formData.get("productId");
    const redirectURL = await makePayment(productId);
    window.location.href = redirectURL;
    return null;
  } catch (error) {
    return error;
  }
};
