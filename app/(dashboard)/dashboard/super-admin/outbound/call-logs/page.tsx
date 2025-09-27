import Pagination from "./components/Pagination";
import Table from "./components/Table";
import { TableProps } from "./types/table.type";
import fetchTableData from "./lib/fetchTableData";
import TableLoader from "./components/TableLoader";
import sortTableData from "./lib/sortTableData";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

type R = {
  success?: boolean;
  message?: string;
  data: {}[];
};

export default async function CallLogs({ searchParams }: TableProps) {
  const queryParams = await searchParams;
  const page = Number(queryParams.page) || DEFAULT_PAGE;
  const limit = Number(queryParams.limit) || DEFAULT_LIMIT;
  const [sortField, sortDirection = ""] = (queryParams.sort || "").split(":");

  const tableData = await fetchTableData<R>(
    `https://jsonplaceholder.typicode.com/todos?_start=${[
      page,
    ]}&_limit=${limit}`
  );

  if (!tableData || !tableData.length) return <TableLoader />;

  const tableHeader = Object.keys(tableData[0]);

  const totalItems = tableData.length;
  const totalPages = Math.ceil(200 / limit);

  const sorted = sortTableData(tableData, sortField, sortDirection);

  return (
    <div>
      <Table tableBody={sorted} tableHeader={tableHeader} />
      <Pagination totalPages={totalPages} currentPage={page} pageSize={limit} />
    </div>
  );
}
