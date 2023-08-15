import { axios } from "../utils/axios";
export async function getAllProducts() {
  const res = (await axios.get("/product")).data;
  return res.data.products;
}

export async function createProduct(data) {
  const res = (
    await axios.post("/product", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
  return res.data.product;
}

export async function editProduct(productId, data) {
  const res = (
    await axios.patch(`/product/${productId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
  return res.data.product;
}

export async function deleteProduct(productId) {
  console.log(productId);
  const res = (await axios.delete(`product/${productId}`)).data;
  return res.data.product;
}
