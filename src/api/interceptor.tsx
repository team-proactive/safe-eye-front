import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { Storage } from "./storage";

export const userUrl = "/accounts/users/";

// 커스텀 훅 생성
const useAuthRedirect = () => {
  const router = useRouter();

  const redirectToLogin = () => {
    router.push("/login");
  };

  return { redirectToLogin };
};

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
    Storage.set({ key: "accessToken", persist: true, value: access });
    return access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

const useResponseErrorInterceptor = async (error: AxiosError | Error) => {
  const { redirectToLogin } = useAuthRedirect();

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
      const accessToken = Storage.get({ key: "accessToken", persist: true });
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

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const accessToken = Storage.get({ key: "accessToken", persist: true });
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  console.log(config.headers);
  return config;
};

export { requestInterceptor, useResponseErrorInterceptor };
