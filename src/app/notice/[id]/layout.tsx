// notice/[id]/layout.tsx
import { getNoticeById } from "@/api/queries/NOTICE_QUERIES";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const notice = await getNoticeById(Number(params.id));
  return {
    title: notice?.title,
    description: "Notice",
    openGraph: {
      title: notice?.title,
      description: "Notice",
      type: "website",
    },
  };
}

export default function NoticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
