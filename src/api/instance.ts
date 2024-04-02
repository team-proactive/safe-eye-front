// axiosConfig.ts
import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // API의 Base URL 설정
  withCredentials: true, // CORS 시, 인증 정보를 함께 보내기 위한 설정
});

export default axiosInstance;
