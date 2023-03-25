import pureAxios from "axios";
import localStorage from "./localStorage";
import { sleep } from ".";

const token = localStorage.getItem("token");

const axioss = pureAxios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    common: {
      "x-auth": token,
    },
  },
});

export const getAxios = () => {
  const sleepTime = 1000;
  if (import.meta.env.DEV) {
    return {
      get: async (...rest) => {
        await sleep(sleepTime);
        return axioss.get(...rest);
      },
      post: async (...rest) => {
        await sleep(sleepTime);
        return axioss.post(...rest);
      },
      delete: async (...rest) => {
        await sleep(sleepTime);
        return axioss.delete(...rest);
      },
      patch: async (...rest) => {
        await sleep(sleepTime);
        return axioss.patch(...rest);
      },
      put: async (...rest) => {
        await sleep(sleepTime);
        return axioss.put(...rest);
      },
    };
  } else {
    return axioss;
  }
};

export const axios = getAxios();
