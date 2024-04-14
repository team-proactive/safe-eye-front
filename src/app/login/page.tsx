"use client";
import { useLoginUser } from "@/api/hooks/useUser";
import Input from "@/common/Input";
import Layout from "@/components/Layout";
import { RegisterFormRequest } from "@/types/form/user";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { mutate: login, isPending } = useLoginUser();

  const onSubmit: SubmitHandler<RegisterFormRequest> = (data) =>
    login(data, {
      onSuccess: (response) => {
        router.push("/");
      },
    });

  return (
    <Layout>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <Input
                {...field}
                control={control}
                type="email"
                placeholder="Email"
                error={errors.email?.message}
              />
            )}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <Input
                {...field}
                control={control}
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                error={errors.password?.message}
              />
            )}
          />
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </Layout>
  );
}
