import axios from "axios";
import useAuthStore from "../store/Auth";

const client = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  async (config) => {
    const { tokens } = useAuthStore.getState().getAuth();

    if (tokens?.token) {
      config.headers.Authorization = `Bearer ${tokens?.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 666) {
      const logOut = useAuthStore.getState().resetAuth;
      logOut();
    }
    return Promise.reject(error);
  }
);

export default client;
