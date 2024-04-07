// app/tag/page.tsx
import { getTag, tagQueryKeys } from "@/api/queries/TAG_QUERIES";
import { Tag } from "@/types/api/tag";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Tags from "./page";

export default async function TagPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: tagQueryKeys.tags({ page: 1 }),
    queryFn: () => getTag({ page: 1 }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Tags />
    </HydrationBoundary>
  );
}

export async function generateStaticParams() {
  const tags = await getTag({ page: 1, page_size: 10 });
  const data = tags ? tags.results : [];
  return data.map((tag: Tag) => ({
    id: tag.id.toString(),
  }));
}
