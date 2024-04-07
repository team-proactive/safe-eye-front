"use client";
import { getTag } from "@/api/queries/TAG_QUERIES";
import CustomBoard from "@/components/CustomBoard";
import Layout from "@/components/Layout";
import { usePaginationStore } from "@/store/pageStore";
import { Tag } from "@/types/api/tag";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";

export default function Tags() {
  const { currentPage, setCurrentPage } = usePaginationStore();

  const { data } = useQuery({
    queryKey: ["tags", { page: currentPage, pageParam: 10 }],
    queryFn: () => getTag({ page: currentPage, page_size: 10 }),
  });

  const columnHelper = createColumnHelper<Tag>();

  const tagData = useMemo(() => data?.results || [], [data]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("tag_id", {
        cell: (info) => <p>{info.getValue()}</p>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("tag_content", {
        cell: (info) => (
          <Link href={`/tag/${info.row.getValue("tag_id")}`}>
            {info.getValue()}
          </Link>
        ),
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
          data={tagData}
          columns={columns}
          pagination={{
            next: data?.next ?? null,
            previous: data?.previous ?? null,
            count: data?.count ?? 1,
          }}
          onPageChange={handlePageChange}
        />
      </div>
    </Layout>
  );
}
