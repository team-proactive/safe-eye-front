"use client";
import { getNotice } from "@/api/querys/NOTICE_QUERY";
import CustomBoard from "@/components/CustomBoard";
import Layout from "@/components/Layout";
import { usePaginationStore } from "@/store/pageStore"; // store 가져오기
import { Notice } from "@/types/api/notice";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

export default function Notices() {
  const { currentPage, setCurrentPage } = usePaginationStore(); // store 사용

  const { data } = useQuery({
    queryKey: ["notice", currentPage], // 현재 페이지도 queryKey에 포함
    queryFn: () => getNotice({ page: currentPage, page_size: 10 }), // 현재 페이지를 파라미터로 전달
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
        cell: (info) => info.getValue(),
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
