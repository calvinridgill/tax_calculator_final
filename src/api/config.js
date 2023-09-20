import { axios } from "../utils/axios";

export async function getConfig() {
  const res = (await axios.get("/config")).data;
  const config = res.data.data;
  return config;
}

export async function createConfig(data) {
  const res = await axios.post("/config", data);
  return res;
}

export async function updateConfig(data, id) {
  await axios.patch(`/config/${id}`, data);
}
