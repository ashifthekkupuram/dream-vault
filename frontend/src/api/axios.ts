import axios from "axios";

import { authClient } from "../lib/auth-client";

const baseURL = import.meta.env.VITE_BACKEND_API_URL;

export const UseAuthenticatedAxios = () => {
  const { data } = authClient.useSession();

  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      if (data?.session) {
        config.headers.Authorization = data.session.token;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  return instance;
};
