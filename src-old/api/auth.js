import { axios } from "../utils/axios";

export const signin = async (email, password) => {
  const res = (await axios.post("/user/login", { email, password })).data;
  return res;
};

export const logout = async () => {
  const res = (await axios.get("/user/logout")).data;
  return res;
};

export const getMe = async () => {
  const res = (await axios.get("/user/me")).data;
  return res;
};

export const createAccount = async (data) => {
  const res = (await axios.post("/user/signup", data)).data;
  return res;
};
