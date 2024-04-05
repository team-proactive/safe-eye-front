// notice/[id]/notice.server.tsx
import { getNoticeById } from "@/api/queries/NOTICE_QUERIES";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import NoticeDetail from "./page";

export default async function NoticeDetailPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notice", id],
    queryFn: () => getNoticeById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoticeDetail params={{ id }} />
    </HydrationBoundary>
  );
}
