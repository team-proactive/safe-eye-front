import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  UserRequest,
  UserResponse,
} from "@/types/api/user";
import { notFound } from "next/navigation";
import {
  USER_BASE_URL,
  USER_LOGIN_URL,
  USER_REGISTER_URL,
} from "../constants/urls";
import axiosInstance from "../instance";
import { Storage } from "../storage";

export const userQueryKeys = {
  user: (id: number) => ["user", id],
  users: (query?: Partial<UserRequest>) => ["users", query],
};

export const getUserById = async (id: number) => {
  if (isNaN(id) || id <= 0) {
    notFound();
  }

  const response = await axiosInstance.get<User>(`${USER_BASE_URL}${id}`);
  return response.data;
};

export const getUsers = async (query?: UserRequest): Promise<UserResponse> => {
  const response = await axiosInstance.get<UserResponse>(USER_BASE_URL, {
    params: query,
  });
  return response.data;
};

export const registerUser = async (userData: UserRequest) => {
  const response = await axiosInstance.post<RegisterRequest>(
    USER_LOGIN_URL,
    userData
  );
  return response.data;
};

export const loginUser = async (userData: LoginRequest) => {
  const response = await axiosInstance.post<LoginResponse>(
    USER_REGISTER_URL,
    userData
  );
  const { refresh, access, user } = response.data;
  Storage.set({ key: "refreshToken", persist: true, value: refresh });
  Storage.set({ key: "accessToken", persist: true, value: access });
  return response.data;
};

export const updateUser = async (id: number, updatedUser: Partial<User>) => {
  const response = await axiosInstance.put<User>(
    `${USER_BASE_URL}${id}`,
    updatedUser
  );
  return response.data;
};

export const deleteUser = async (id: number) => {
  await axiosInstance.delete(`${USER_BASE_URL}${id}`);
};
