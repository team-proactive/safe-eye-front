import { create } from "zustand";

interface UserStore {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
}));
