// tag/[id]/tag.server.tsx
import { getTagById } from "@/api/queries/TAG_QUERIES";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import TagDetail from "./page";

export default async function TagDetailPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tag", id],
    queryFn: () => getTagById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TagDetail params={{ id }} />
    </HydrationBoundary>
  );
}
