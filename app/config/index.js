import axios from "axios";
import axiosRetry from "axios-retry";
import { userData } from "../src/helper";

const baseUrl = "http://127.0.0.1:8000/api";

export const Axios = axios.create({
    withCredentials: true,
    baseURL: baseUrl
});

Axios.interceptors.request.use((config) => {
    const {token} = userData();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
  
      return config;
},
(error) => {
  return Promise.reject(error);
})

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });