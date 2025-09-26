import Pagination from "./components/Pagination";
import Table from "./components/Table";
import { TableProps } from "./types/table.type";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export default async function CallLogs({ searchParams }: TableProps) {
  const queryParams = await searchParams;
  const page = Number(queryParams.page) || DEFAULT_PAGE;
  const limit = Number(queryParams.limit) || DEFAULT_LIMIT;
  const [sortField, sortDirection = ""] = (queryParams.sort || "").split(":");

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_start=${page}&_limit=${limit}`,
    {
      cache: "no-cache",
    }
  );
  const tableData = await response.json();

  const tableHeader = Object.keys(tableData[0]);

  const totalItems = tableData.length;
  const totalPages = Math.ceil(totalItems / limit);
  return (
    <div>
      <Table tableBody={tableData} tableHeader={tableHeader} />
      <Pagination totalPages={totalPages} currentPage={page} pageSize={limit} />
    </div>
  );
}
