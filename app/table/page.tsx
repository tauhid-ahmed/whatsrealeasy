import { cn } from "@/lib/utils";
import Link from "next/link";
import Pagination from "@/features/table/Pagination";
// import { FilterField } from "@/features/table/Filter";
import { LucideChevronDown } from "lucide-react";

interface TableSearchParams {
  page?: number;
  limit?: number;
  sort?: string;
  query?: string;
  status?: string | string[];
  role?: string | string[];
  earning_range?: string;
  [key: string]: string | string[] | undefined | number;
}

interface TableProps {
  searchParams: Promise<TableSearchParams>;
}

// ---------- DEFAULTS ----------
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 5;

// ---------- TABLE PAGE ----------
export default async function CallManagementPage({ searchParams }: TableProps) {
  const queryParams = await searchParams;
  const page = Number(queryParams.page) || DEFAULT_PAGE;
  const limit = Number(queryParams.limit) || DEFAULT_LIMIT;
  const [sortField, sortDirection = ""] = (queryParams.sort || "").split(":");
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?page=" + page
  );
  const todos = await response.json();

  const tableHeader = Object.keys(todos[0]);

  // Parse filters from URL

  // Calculate pagination info based on filtered data
  const totalItems = todos.length;
  const totalPages = Math.ceil(totalItems / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return (
    <div className="p-4">
      <table className="table-auto border-collapse border border-gray-500 w-full text-gray-300">
        <thead>
          <tr className="border-b border-gray-500">
            {tableHeader.map((field) => (
              <TableHeaderItem
                key={field}
                field={field}
                currentSort={sortField}
                sortDirection={sortDirection}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.slice((page - 1) * limit, page * limit).map((item: any) => (
              <tr key={item.id} className="text-gray-300">
                {tableHeader.map((field) => (
                  <td key={field} className="border border-gray-500 p-2">
                    {(item[field] || "").toString()}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeader.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center gap-4 mt-8 items-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          limit={limit}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      </div>
    </div>
  );
}

// ---------- TABLE HEADER ITEM ----------
interface TableHeaderItemProps {
  field: string;
  currentSort: string;
  sortDirection: string;
}

function TableHeaderItem({
  field,
  currentSort,
  sortDirection,
}: TableHeaderItemProps) {
  const isActive = currentSort === field;

  return (
    <th
      className={cn(
        "text-left cursor-pointer px-2",
        isActive ? "bg-gray-800" : "hover:bg-gray-800"
      )}
    >
      <span className="inline-flex gap-1 items-center font-semibold relative">
        {field}
        <span className="absolute right-0 translate-x-full">{}</span>
      </span>
    </th>
  );
}
