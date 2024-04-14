import { Storage } from "@/api/storage";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

export const useRedirect = () => {
  const router = useRouter();
  const redirectToLogin = () => {
    router.push("/login");
  };
  return { redirectToLogin };
};

export const useLogoutUser = () => {
  const { redirectToLogin } = useRedirect();

  const logout = async () => {
    useUserStore.getState().setAccessToken("");
    Storage.set({ key: "refreshToken", value: "", persist: true });

    try {
      redirectToLogin();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return { logout };
};
