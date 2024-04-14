import { useRedirect } from "@/hooks/useLocations";
import { useUserStore } from "@/store/userStore";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { Storage } from "./storage";

const verifyAccessToken = async (accessToken: string): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}token/verify/`,
      { token: accessToken }
    );
    return response.status === 200;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
};
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = Storage.get({ key: "refreshToken", persist: true });
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}token/refresh/`,
      { refresh: refreshToken }
    );
    const { access } = response.data;
    useUserStore.getState().setAccessToken(access);
    return access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // 리프레시 토큰이 만료되었을 때 로그아웃 처리
      useUserStore.getState().setAccessToken(null);
      Storage.set({ key: "refreshToken", value: "", persist: true });
    }
    return null;
  }
};
const useResponseErrorInterceptor = async (error: AxiosError | Error) => {
  const { redirectToLogin } = useRedirect();
  if (axios.isAxiosError(error)) {
    const { config, response } = error;
    const originalRequest = config as InternalAxiosRequestConfig;
    originalRequest.headers = originalRequest.headers ?? {};
    const retryCount = originalRequest.headers["x-retry-count"] ?? 0;

    if (retryCount >= 2) {
      redirectToLogin(); // /login 페이지로 리디렉션
      return Promise.reject(error);
    }

    if (
      response &&
      response.status === 401 &&
      response.data?.code === "token_not_valid"
    ) {
      const accessToken = useUserStore.getState().accessToken;
      const isTokenValid = await verifyAccessToken(accessToken ?? "");

      if (!isTokenValid) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers["x-retry-count"] = retryCount + 1;
          return axios(originalRequest);
        } else {
          redirectToLogin(); // /login 페이지로 리디렉션
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  } else {
    console.error("Stock Error:", error);
    return Promise.reject(error);
  }
};

const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  let accessToken = useUserStore.getState().accessToken;
  if (!accessToken) {
    accessToken = await refreshAccessToken();
    if (!accessToken) {
      // 리프레시 토큰도 만료되었을 때 로그아웃 처리
      useUserStore.getState().setAccessToken(null);
      Storage.set({ key: "refreshToken", value: "", persist: true });
      return config;
    }
  }
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

export { requestInterceptor, useResponseErrorInterceptor };
