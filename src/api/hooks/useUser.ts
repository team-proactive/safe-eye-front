// hooks/useUser.ts
import {
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
  userQueryKeys,
} from "@/api/queries/USER_QUERIES";
import { Storage } from "@/api/storage";
import {
  LoginResponse,
  RegisterRequest,
  User,
  UserRequest,
  UserResponse,
} from "@/types/api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUserById = (id: number) => {
  return useQuery<User, Error>({
    queryKey: userQueryKeys.user(id),
    queryFn: () => getUserById(id),
  });
};

export const useUsers = () => {
  return useQuery<UserResponse, Error>({
    queryKey: userQueryKeys.users(),
    queryFn: () => getUsers(),
  });
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation<RegisterRequest, Error, RegisterRequest>({
    mutationFn: async (userData: UserRequest) => {
      const user = await registerUser(userData);
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.users() });
    },
  });
};

export const useLoginUser = () => {
  return useMutation<LoginResponse, Error, { email: string; password: string }>(
    {
      mutationFn: async (userData) => {
        const response = await loginUser(userData);
        const { refresh, access, user } = response;
        Storage.set({ key: "refreshToken", persist: true, value: refresh });
        Storage.set({ key: "accessToken", persist: true, value: access });
        return response;
      },
    }
  );
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, { id: number; updatedUser: Partial<User> }>({
    mutationFn: async ({ id, updatedUser }) => {
      const user = await updateUser(id, updatedUser);
      return user;
    },
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.user(updatedUser.id),
      });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.users() });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await deleteUser(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.users() });
    },
  });
};
