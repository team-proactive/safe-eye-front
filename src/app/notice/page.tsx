"use client";
import { getNotice } from "@/api/querys/NOTICE_QUERY";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";

export default function Notices() {
  const { data } = useQuery({ queryKey: ["posts"], queryFn: getNotice });

  return (
    <Layout>
      <div>
        {data?.map((notice) => (
          <div key={notice?.id}>
            <a href={`notice/${notice.id}`}>{notice?.title}</a>
          </div>
        ))}
      </div>
    </Layout>
  );
}
