import { axios } from "../utils/axios";

export async function getMessage(messageId) {
  const data = (await axios.get(`/message/${messageId}`)).data;
  return data;
}

export async function getAllMessage() {
  const data = (await axios.get(`/message`)).data;
  return data;
}

export async function createMessage(message) {
  const data = (await axios.post(`/message`, message)).data;
  return data;
}

export async function updateMessage(message) {
  const data = (await axios.put(`/message`, message)).data;
  return data;
}

export async function deleteMessage(messageId) {
  const data = (await axios.delete(`/message/${messageId}`)).data;
  return data;
}
