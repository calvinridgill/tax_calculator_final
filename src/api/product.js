import { axios } from "../utils/axios";

export async function getAllProducts() {
  const res = (await axios.get("/product")).data;
  return res.data.products;
}
