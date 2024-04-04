import { getNotice, noticeQueryKeys } from "@/api/queries/NOTICE_QUERIES";
import { Notice } from "@/types/api/notice";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Notices from "./page";

export default async function NoticePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: noticeQueryKeys.notices(),
    queryFn: () => getNotice(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notices />
    </HydrationBoundary>
  );
}

export async function generateStaticParams() {
  const notices = await getNotice({ page: 1, page_size: 10 });
  const data = notices ? notices.results : [];
  return data.map((notice: Notice) => ({
    id: notice.id.toString(),
  }));
}
