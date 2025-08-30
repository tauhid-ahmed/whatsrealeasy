import { cn } from "@/lib/utils";
import Link from "next/link";
import Pagination from "@/features/table/Pagination";

import {
  LucideArrowUpDown,
  LucideArrowUpNarrowWide,
  LucideArrowDownNarrowWide,
} from "lucide-react";

// Dummy table data
export const tableData = [
  {
    id: 1,
    name: "Tauhid",
    number: "(202) 555-0173",
    area: "Dhaka",
    company: "Tauhid Group",
    service: "App Development",
  },
  {
    id: 2,
    name: "Riadul",
    number: "(702) 555-8427",
    area: "Uttara",
    company: "Riadul Group",
    service: "Web Development",
  },
  {
    id: 3,
    name: "---",
    number: "(303) 555-4826",
    area: "---",
    company: "---",
    service: "---",
  },
  {
    id: 4,
    name: "Imtiaj",
    number: "(813) 555-9635",
    area: "Dhaka",
    company: "Imtiaj Group",
    service: "Contraction",
  },
  {
    id: 5,
    name: "Tauhid",
    number: "(202) 555-0173",
    area: "Dhaka",
    company: "Tauhid Group",
    service: "App Development",
  },
];
const tableHeader = Object.keys(tableData[0]).slice(1);

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
const DEFAULT_SORT = "";

// ---------- HELPERS ----------
function sortData<T extends Record<string, unknown>>(
  data: T[],
  field: string,
  direction: string
): T[] {
  if (!field || !direction) return data;
  return [...data].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return direction === "asc" ? -1 : 1;
    if (bVal == null) return direction === "asc" ? 1 : -1;
    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }
    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();
    return direction === "asc"
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });
}

function paginateData<T>(data: T[], page: number, limit: number): T[] {
  const startIndex = (page - 1) * limit;
  return data.slice(startIndex, startIndex + limit);
}

// ---------- TABLE PAGE ----------
export default async function DashboardTable({ searchParams }: TableProps) {
  const queryParams = await searchParams;
  const page = Number(queryParams.page) || DEFAULT_PAGE;
  const limit = Number(queryParams.limit) || DEFAULT_LIMIT;
  const [sortField, sortDirection = ""] = (
    queryParams.sort || DEFAULT_SORT
  ).split(":");
  const searchQuery = queryParams.query || "";

  const filteredData = [...tableData];

  // Calculate pagination info based on filtered data
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  // Now paginate the filtered data
  const paginatedData = paginateData(filteredData, page, limit);

  // Finally, sort ONLY the paginated data
  const sortedPaginatedData = sortData(paginatedData, sortField, sortDirection);

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
                currentPage={page}
                limit={limit}
                searchQuery={searchQuery}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedPaginatedData.map((item) => (
            <tr key={item.id} className="text-gray-300">
              <td className="border-b border-gray-500 px-4 py-2">
                {item.name}
              </td>
              <td className="border-b border-gray-500 px-4 py-2">
                {item.number}
              </td>
              <td className="border-b border-gray-500 px-4 py-2">
                {item.area}
              </td>
              <td className="border-b border-gray-500 px-4 py-2">
                {item.company}
              </td>
              <td className="border-b border-gray-500 px-4 py-2">
                {item.service}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center gap-4 mt-8 items-center">
        <div className="text-sm text-gray-400">
          Showing {sortedPaginatedData.length} of {totalItems} results
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          limit={limit}
          sortField={sortField}
          sortDirection={sortDirection}
          basePath="/dashboard/admin/analytics"
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
  currentPage: number;
  limit: number;
  searchQuery: string;
}

function TableHeaderItem({
  field,
  currentSort,
  sortDirection,
  currentPage,
  limit,
  searchQuery,
}: TableHeaderItemProps) {
  const isActive = currentSort === field;
  const nextDirection =
    !isActive || !sortDirection ? "asc" : sortDirection === "asc" ? "desc" : "";

  const urlParams = new URLSearchParams();
  urlParams.set("page", currentPage.toString());
  urlParams.set("limit", limit.toString());
  if (searchQuery) urlParams.set("query", searchQuery);
  if (nextDirection) urlParams.set("sort", `${field}:${nextDirection}`);

  const getIcon = () => {
    if (!isActive || !sortDirection) return <LucideArrowUpDown size={12} />;
    if (sortDirection === "asc") return <LucideArrowUpNarrowWide size={12} />;
    return <LucideArrowDownNarrowWide size={12} />;
  };

  return (
    <th
      className={cn(
        "text-left cursor-pointer px-2",
        isActive ? "bg-gray-800" : "hover:bg-gray-800"
      )}
    >
      <Link
        href={`/dashboard/admin/analytics?${urlParams.toString()}`}
        className={cn("flex items-center p-2 rounded")}
      >
        <span className="inline-flex gap-1 items-center font-semibold relative">
          {field}
          <span className="absolute right-0 translate-x-full">{getIcon()}</span>
        </span>
      </Link>
    </th>
  );
}
