interface User {
  id: number;
  email: string;
  nickname: string;
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
  };
}

interface RegisterRequest extends UserRequest {
  nickname: string;
}

interface UserResponse {
  users: User[];
}

export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  UserRequest,
  UserResponse,
  UserWithToken,
};
