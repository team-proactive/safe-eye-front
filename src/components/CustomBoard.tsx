import { Pagination } from "@/types/api/common";
import {
  AccessorKeyColumnDefBase,
  IdIdentifier,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import tw, { styled } from "twin.macro";

const TableContainer = styled.div`
  ${tw`overflow-x-auto`}
`;

const Table = styled.table`
  ${tw`w-full text-sm text-left text-gray-500 dark:text-gray-400`}
`;

const TableHead = styled.thead`
  ${tw`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}
`;

const TableRow = styled.tr`
  ${tw`bg-white border-b dark:bg-gray-800 dark:border-gray-700`}
`;

const TableHeader = styled.th`
  ${tw`px-6 py-3`}
`;

const TableBody = styled.tbody``;

const TableData = styled.td`
  ${tw`px-6 py-4`}
`;

const TableFooter = styled.tfoot``;

const DownloadButton = styled.button`
  ${tw`mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700`}
`;

const PaginationContainer = styled.div`
  ${tw`flex justify-center mt-4`}
`;

const PaginationButton = styled.button<{ disabled?: boolean }>`
  ${tw`mx-1 px-3 py-1 rounded-md`}
  ${({ disabled }) =>
    disabled
      ? tw`bg-gray-300 cursor-not-allowed`
      : tw`bg-blue-500 hover:bg-blue-700 text-white`}
`;

interface CustomBoardProps<T> {
  data: T[];
  columns: (
    | (AccessorKeyColumnDefBase<T, number> & Partial<IdIdentifier<T, number>>)
    | (AccessorKeyColumnDefBase<T, string> & Partial<IdIdentifier<T, string>>)
  )[];
  pagination?: Omit<Pagination<T>, "results">;
  onPageChange?: (page: number) => void;
}

export default function CustomBoard<T>({
  data,
  columns,
  pagination,
  onPageChange,
}: CustomBoardProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDownloadCSV = () => {
    const csvContent = table
      .getRowModel()
      .rows.map((row) =>
        row
          .getVisibleCells()
          .map((cell) => cell.renderValue())
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "table_data.csv");
    link.click();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const renderPagination = () => {
    if (!pagination) return null;

    const { count } = pagination;
    const totalPages = Math.ceil(count / pageSize);

    const pages = [];
    for (let i = 1; i <= Math.min(totalPages, 10); i++) {
      pages.push(
        <PaginationButton
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
        >
          {i}
        </PaginationButton>
      );
    }

    return (
      <PaginationContainer>
        <PaginationButton
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </PaginationButton>
        {pages}
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </PaginationButton>
      </PaginationContainer>
    );
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeader key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableData key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableData>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <TableHeader key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
      <DownloadButton onClick={handleDownloadCSV}>Download CSV</DownloadButton>
      {renderPagination()}
    </TableContainer>
  );
}
