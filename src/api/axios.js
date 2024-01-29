import axios from "axios";
import useAuthStore from "../store/Auth";

const client = axios.create({
  // baseURL: "http://192.168.4.16:8080",
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  async (config) => {
    const { tokens } = useAuthStore.getState().getAuth();

    if (tokens?.token) {
      // config.headers.Authorization = `Bearer ${tokens?.token}`;
      config.headers.Authorization = "Bearer ";
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
