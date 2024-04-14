// hooks/useUser.ts
import {
  deleteCustomUser,
  deleteUser,
  generateTokenForUser,
  getUserById,
  getUsers,
  loginUser,
  logoutUser,
  registerNormalUser,
  registerUser,
  updateUser,
  userQueryKeys,
} from "@/api/queries/USER_QUERIES";
import { Storage } from "@/api/storage";
import { useUserStore } from "@/store/userStore";
import {
  LoginResponse,
  RegisterRequest,
  User,
  UserRequest,
} from "@/types/api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUserById = (id: number) => {
  return useQuery<User, Error>({
    queryKey: userQueryKeys.user(id),
    queryFn: () => getUserById(id),
  });
};

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: userQueryKeys.allUsers(),
    queryFn: getUsers,
  });
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, RegisterRequest>({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.allUsers() });
    },
  });
};

export const useLoginUser = () => {
  const setAccessToken = useUserStore((state) => state.setAccessToken);

  return useMutation<LoginResponse, Error, { email: string; password: string }>(
    {
      mutationFn: loginUser,
      onSuccess: ({ refresh, access }) => {
        Storage.set({ key: "refreshToken", value: refresh, persist: true });
        setAccessToken(access);
      },
    }
  );
};

export const useLogoutUser = () => {
  return useMutation<void, Error, void>({
    mutationFn: logoutUser,
    onSuccess: () => {
      Storage.set({ key: "refreshToken", value: "", persist: true });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, { id: number; updatedUser: Partial<User> }>({
    mutationFn: ({ id, updatedUser }) => updateUser(id, updatedUser),
    onSuccess: (updatedUser, { id }) => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.user(id) });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.allUsers() });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.allUsers() });
    },
  });
};

export const useRegisterNormalUser = () => {
  const queryClient = useQueryClient();

  return useMutation<{ user: User; message: string }, Error, UserRequest>({
    mutationFn: registerNormalUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.allUsers() });
    },
  });
};

export const useGenerateTokenForUser = () => {
  return useMutation<{ token: string }, Error, number>({
    mutationFn: generateTokenForUser,
  });
};

export const useDeleteCustomUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteCustomUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.allUsers() });
    },
  });
};
