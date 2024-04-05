// notice/[id]/page.tsx
"use client";

import { useNoticeById } from "@/api/hooks/useNotices";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function NoticeDetail({
  params: { id },
}: {
  params: { id: number };
}) {
  const { data: notice, isLoading, isError } = useNoticeById(id);

  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  if (isError) {
    return <Layout>Error occurred while fetching the notice.</Layout>;
  }

  return (
    <Layout>
      <article>
        <h1>{notice?.title}</h1>
        <p>{notice?.content}</p>
        <p>Created At: {notice?.created_at}</p>
        <p>Updated At: {notice?.updated_at}</p>
        <Link href="/notice">Go Back</Link>
      </article>
    </Layout>
  );
}
