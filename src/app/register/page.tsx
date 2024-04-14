// pages/signup.tsx
"use client";
import { useRegisterUser } from "@/api/hooks/useUser";
import { RegisterRequest } from "@/types/api/user";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
    nickname: string;
    role: "superuser";
  }>();

  const router = useRouter();

  const { mutate: signup, isPending } = useRegisterUser();

  const onSubmit = (data: RegisterRequest) => {
    signup(data, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            id="nickname"
            {...register("nickname", { required: "Nickname is required" })}
          />
          {errors.nickname && <span>{errors.nickname.message}</span>}
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}
