import Pagination from "@/features/table/components/Pagination";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderItem,
  TableRow,
  TableBodyItem,
} from "@/features/table/components/Table";
import TableFallback from "@/features/table/components/TableFallback";
import fetchTableData from "@/features/table/lib/fetchTableData";
import sortTableData from "@/features/table/lib/sortTableData";
import { SortDirection } from "@/features/table/types/table.type";
import {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_PAGE,
} from "@/features/table/utils/constant";

type TableData = {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
};

type InboundCallLogsProps = {
  searchParams: Promise<{ page: string; limit: string; sort: string }>;
};

export default async function InboundCallLogs({
  searchParams,
}: InboundCallLogsProps) {
  const queryParams = await searchParams;

  const page = Number(queryParams.page) || DEFAULT_PAGE;
  const limit = Number(queryParams.limit) || DEFAULT_ITEMS_PER_PAGE;
  const [sortField, sortDirection = ""] = (queryParams.sort || "").split(":");

  const tableData: TableData[] = await fetchTableData(
    `https://jsonplaceholder.typicode.com/todos?_start=${
      (page - 1) * limit
    }&_limit=${limit}`
  );

  if (!tableData || !tableData.length) return <TableFallback />;

  const tableHeader = Object.keys(tableData[0]);
  const sorted = sortTableData(
    tableData,
    sortField as keyof TableData,
    sortDirection as SortDirection
  );
  const totalItems = 200; // static from API docs
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeader.map((prop) => (
              <TableHeaderItem
                key={prop}
                prop={prop}
                currentSort={sortField}
                sortDirection={sortDirection as SortDirection}
              />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {tableHeader.map((prop) => (
                <TableBodyItem key={prop}>
                  {String(item[prop as keyof TableData])}
                </TableBodyItem>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination totalPages={totalPages} currentPage={page} pageSize={limit} />
    </div>
  );
}
