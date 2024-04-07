// tag/[id]/page.tsx
"use client";

import { useTagById } from "@/api/hooks/useTags";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function TagDetail({
  params: { id },
}: {
  params: { id: number };
}) {
  const { data: tag, isLoading, isError } = useTagById(id);

  if (isLoading || !tag) {
    return <Layout>Loading...</Layout>;
  }

  if (isError) {
    return <Layout>Error occurred while fetching the tag.</Layout>;
  }

  return (
    <Layout>
      <article>
        <h1>{tag?.tag_type}</h1>
        <p>{tag?.tag_content}</p>
        <Link href="/tag">Go Back</Link>
      </article>
    </Layout>
  );
}
