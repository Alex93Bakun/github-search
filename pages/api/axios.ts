import axios, { AxiosInstance } from "axios";

import { BASE_URL } from "../../Constants/Constants";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
  headers: {
    authorization: "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",
  },
});

export default axiosInstance;
