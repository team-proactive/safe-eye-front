"use client";
import { getNotice } from "@/api/queries/NOTICE_QUERIES";
import CustomBoard from "@/components/CustomBoard";
import Layout from "@/components/Layout";
import { usePaginationStore } from "@/store/pageStore"; // store 가져오기
import { Notice } from "@/types/api/notice";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";

export default function Notices() {
  const { currentPage, setCurrentPage } = usePaginationStore(); // store 사용

  const { data } = useQuery({
    queryKey: ["notice", { page: currentPage, pageParam: 10 }],
    queryFn: () => getNotice({ page: currentPage, page_size: 10 }),
  });

  const columnHelper = createColumnHelper<Notice>();

  const noticeData = useMemo(() => data?.results || [], [data]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        cell: (info) => <p>{info.getValue()}</p>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("title", {
        cell: (info) => (
          <Link href={`notice/${info.row.getValue("id")}`}>
            {info.getValue()}
          </Link>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("created_at", {
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Created at</span>,
        footer: (info) => info.column.id,
      }),
    ],
    [columnHelper]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div>
        <CustomBoard
          data={noticeData}
          columns={columns}
          pagination={{
            next: data?.next ?? null,
            previous: data?.previous ?? null,
            count: data?.count ?? 1,
          }}
          onPageChange={handlePageChange} // 페이지 변경 핸들러 전달
        />
      </div>
    </Layout>
  );
}
