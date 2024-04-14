// instance.ts
import axios from "axios";
import { requestInterceptor, useResponseErrorInterceptor } from "./interceptor";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(
  (response) => response,
  useResponseErrorInterceptor
);

export default axiosInstance;
