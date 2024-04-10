import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import LoginPage from "./page";

export default async function LoginServerComponent() {
  const queryClient = new QueryClient();

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <LoginPage />
    </HydrationBoundary>
  );
}
