// notice/[id]/notice.server.tsx
import { fetchNoticeById, getNotice } from "@/api/querys/NOTICE_QUERY";
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
    queryFn: () => fetchNoticeById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoticeDetail params={{ id }} />
    </HydrationBoundary>
  );
}

export async function generateStaticParams() {
  const notices = await getNotice();
  return notices.map((notice) => ({
    id: notice.id.toString(),
  }));
}
