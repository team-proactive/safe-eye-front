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

interface UserRequest extends Partial<User> {
  email: string;
  password: string;
}

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

interface UserResponse {
  users: User[];
}

export type {
  LoginRequest,
  LoginResponse,
  User,
  UserRequest,
  UserResponse,
  UserWithToken,
};
