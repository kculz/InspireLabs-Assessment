import axios from "axios";
import axiosRetry from "axios-retry";

const baseUrl = "http://127.0.0.1:8000/api";

export const Axios = axios.create({
    withCredentials: true,
    baseURL: baseUrl
});

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });