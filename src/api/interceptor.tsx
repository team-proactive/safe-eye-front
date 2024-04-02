// interceptors.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { Storage } from "./storage";

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = Storage.get({ key: "refreshToken", persist: true });
  try {
    const response = await axios.post("/auth/refresh", { refreshToken });
    const { accessToken } = response.data;
    Storage.set({ key: "token", persist: true, value: accessToken });
    return accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

const responseErrorInterceptor = async (error: AxiosError | Error) => {
  if (axios.isAxiosError(error)) {
    const { config, response } = error;
    const originalRequest = config as InternalAxiosRequestConfig;

    originalRequest.headers = originalRequest.headers ?? {};

    const retryCount = originalRequest.headers["x-retry-count"] ?? 0;
    if (retryCount >= 2) {
      return Promise.reject(error);
    }

    if (
      response &&
      response.status === 401 &&
      response.data?.error === "invalid_token"
    ) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers["x-retry-count"] = retryCount + 1;
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }

    return Promise.reject(error);
  } else {
    // 일반 에러 처리 로직
    console.error("Stock Error:", error);
    return Promise.reject(error);
  }
};

export default responseErrorInterceptor;
