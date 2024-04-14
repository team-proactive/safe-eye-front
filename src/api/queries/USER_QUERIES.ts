import {
  LoginResponse,
  RegisterRequest,
  User,
  UserRequest,
} from "@/types/api/user";
import {
  USERS_LIST_URL,
  USER_DELETE_CUSTOM_URL,
  USER_DELETE_URL,
  USER_GENERATE_TOKEN_URL,
  USER_LOGIN_URL,
  USER_LOGOUT_URL,
  USER_REGISTER_URL,
  USER_UPDATE_URL,
  USER_URL,
  userURLWithId,
} from "../constants/urls/user";
import axiosInstance from "../instance";

export const userQueryKeys = {
  allUsers: () => ["users"],
  user: (id?: number) => ["user", id],
};

export const getUser = async (): Promise<User> => {
  const response = await axiosInstance.get<User>(USER_URL);
  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>(USERS_LIST_URL);
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  if (isNaN(id) || id <= 0) {
    throw new Error("Invalid user ID");
  }
  const response = await axiosInstance.get<User>(userURLWithId(id));
  return response.data;
};

export const registerUser = async (
  userData: RegisterRequest
): Promise<User> => {
  const response = await axiosInstance.post<User>(USER_REGISTER_URL, userData);
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    USER_LOGIN_URL,
    credentials
  );
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  try {
    await axiosInstance.post(USER_LOGOUT_URL, null, {});
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const updateUser = async (
  id: number,
  updatedUser: Partial<User>
): Promise<User> => {
  const response = await axiosInstance.put<User>(
    USER_UPDATE_URL(id),
    updatedUser
  );
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(USER_DELETE_URL(id));
};

export const registerNormalUser = async (
  userData: UserRequest
): Promise<{ user: User; message: string }> => {
  const response = await axiosInstance.post<{ user: User; message: string }>(
    USER_REGISTER_URL,
    userData
  );
  return response.data;
};

export const generateTokenForUser = async (
  id: number
): Promise<{ token: string }> => {
  const response = await axiosInstance.post<{ token: string }>(
    USER_GENERATE_TOKEN_URL(id)
  );
  return response.data;
};

export const deleteCustomUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(USER_DELETE_CUSTOM_URL(id));
};
