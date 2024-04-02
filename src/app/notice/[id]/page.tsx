// notice/[id]/page.tsx
"use client";

import { useNoticeById } from "@/api/hooks/useNotices";
import Layout from "@/components/Layout";

export default function NoticeDetail({
  params: { id },
}: {
  params: { id: number };
}) {
  const { data: notice, isLoading, isError } = useNoticeById(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching the notice.</div>;
  }

  return (
    <Layout>
      <article>
        <h1>{notice?.title}</h1>
        <p>{notice?.content}</p>
        <p>Created At: {notice?.created_at}</p>
        <p>Updated At: {notice?.updated_at}</p>
        <a href="/notice">Go Back</a>
      </article>
    </Layout>
  );
}
