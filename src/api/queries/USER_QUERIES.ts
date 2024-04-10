// queries/userQueries.ts
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  UserRequest,
  UserResponse,
} from "@/types/api/user";
import { notFound } from "next/navigation";
import axiosInstance from "../instance";
import { Storage } from "../storage";

export const userUrl = "/accounts/users/";

export const userQueryKeys = {
  user: (id: number) => ["user", id],
  users: (query?: Partial<UserRequest>) => ["users", query],
};

export const getUserById = async (id: number) => {
  if (isNaN(id) || id <= 0) {
    notFound();
  }

  const response = await axiosInstance.get<User>(`${userUrl}${id}`);
  return response.data;
};

export const getUsers = async (query?: UserRequest): Promise<UserResponse> => {
  const response = await axiosInstance.get<UserResponse>(userUrl, {
    params: query,
  });
  return response.data;
};

export const registerUser = async (userData: UserRequest) => {
  const response = await axiosInstance.post<RegisterRequest>(userUrl, userData);
  return response.data;
};

export const loginUser = async (userData: LoginRequest) => {
  const response = await axiosInstance.post<LoginResponse>(
    `${userUrl}login/`,
    userData
  );
  const { refresh, access, user } = response.data;
  Storage.set({ key: "refreshToken", persist: true, value: refresh });
  Storage.set({ key: "accessToken", persist: true, value: access });
  return response.data;
};

export const updateUser = async (id: number, updatedUser: Partial<User>) => {
  const response = await axiosInstance.put<User>(
    `${userUrl}${id}`,
    updatedUser
  );
  return response.data;
};

export const deleteUser = async (id: number) => {
  await axiosInstance.delete(`${userUrl}${id}`);
};
