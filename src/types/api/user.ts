type Role = "admin" | "user" | "superuser";

interface UserLoginStatus {
  id: number;
  available: boolean;
}

interface User {
  id: number;
  email: string;
  nickname: string;
  role: Role;
}

interface Token {
  refresh: string;
  access: string;
}

interface UserWithToken extends User {
  token: string;
}

interface UserRequest extends Omit<User, "id"> {}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse extends Token {
  user: {
    email: string;
    nickname: string;
    role: Role;
  };
}

interface LoginCheckResponse {
  status: UserLoginStatus;
  content: User;
}

interface RegisterRequest extends Omit<UserRequest, "role"> {
  password: string;
  role: Role;
}

interface UserResponse {
  users: User[];
}

export type {
  LoginCheckResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  Role,
  User,
  UserLoginStatus,
  UserRequest,
  UserResponse,
  UserWithToken,
};
