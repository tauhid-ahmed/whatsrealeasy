import { cn } from "@/lib/utils";
import Link from "next/link";
import Pagination from "@/features/table/Pagination";
import SearchField from "@/features/table/SearchField";
// import { FilterField } from "@/features/table/Filter";
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
    callStatus: "Answer",
    recording: true,
    transcription: true,
    meetingTime: "12:00 AM",
  },
  {
    id: 2,
    name: "Riadul",
    number: "(702) 555-8427",
    area: "Uttara",
    company: "Riadul Group",
    service: "Web Development",
    callStatus: "Answer",
    recording: true,
    transcription: true,
    meetingTime: "11:00 AM",
  },
  {
    id: 3,
    name: "---",
    number: "(303) 555-4826",
    area: "---",
    company: "---",
    service: "---",
    callStatus: "Waiting",
    recording: false,
    transcription: false,
    meetingTime: "---",
  },
  {
    id: 4,
    name: "Imtiaj",
    number: "(813) 555-9635",
    area: "Dhaka",
    company: "Imtiaj Group",
    service: "Contraction",
    callStatus: "Answer",
    recording: true,
    transcription: true,
    meetingTime: "09:00 AM",
  },
  {
    id: 5,
    name: "Tauhid",
    number: "(202) 555-0173",
    area: "Dhaka",
    company: "Tauhid Group",
    service: "App Development",
    callStatus: "Answer",
    recording: true,
    transcription: true,
    meetingTime: "12:00 PM",
  },
  {
    id: 6,
    name: "---",
    number: "(303) 555-4826",
    area: "---",
    company: "---",
    service: "---",
    callStatus: "---",
    recording: false,
    transcription: false,
    meetingTime: "---",
  },
  {
    id: 7,
    name: "---",
    number: "(202) 555-0173",
    area: "---",
    company: "---",
    service: "---",
    callStatus: "No Answer",
    recording: false,
    transcription: false,
    meetingTime: "---",
  },
  {
    id: 8,
    name: "Tauhid",
    number: "(202) 555-0173",
    area: "Dhaka",
    company: "Tauhid Group",
    service: "App Development",
    callStatus: "Answer",
    recording: true,
    transcription: true,
    meetingTime: "12:00",
  },
  {
    id: 9,
    name: "---",
    number: "(202) 555-0173",
    area: "---",
    company: "---",
    service: "---",
    callStatus: "Reject",
    recording: false,
    transcription: false,
    meetingTime: "---",
  },
  {
    id: 10,
    name: "Tauhid",
    number: "(202) 555-0173",
    area: "Dhaka",
    company: "Tauhid Group",
    service: "App Development",
    callStatus: "Answer",
    recording: true,
    transcription: true,
    meetingTime: "12:00",
  },
  {
    id: 11,
    name: "Imtiaj",
    number: "(813) 555-9635",
    area: "Dhaka",
    company: "Imtiaj Group",
    service: "Contraction",
    callStatus: "Answer",
    recording: true,
    transcription: true,
    meetingTime: "09:00 AM",
  },
  {
    id: 12,
    name: "Tauhid",
    number: "(202) 555-0173",
    area: "Dhaka",
    company: "Tauhid Group",
    service: "App Development",
    callStatus: "Answer",
    recording: true,
    transcription: true,
    meetingTime: "12:00",
  },
  {
    id: 13,
    name: "Sarah",
    number: "(415) 555-2847",
    area: "California",
    company: "Tech Solutions",
    service: "Software Development",
    callStatus: "Answer",
    recording: true,
    transcription: true,
    meetingTime: "10:30 AM",
  },
  {
    id: 14,
    name: "Ahmed",
    number: "(212) 555-6789",
    area: "New York",
    company: "Digital Agency",
    service: "Marketing",
    callStatus: "No Answer",
    recording: false,
    transcription: false,
    meetingTime: "---",
  },
  {
    id: 15,
    name: "Lisa",
    number: "(305) 555-3421",
    area: "Miami",
    company: "Creative Studio",
    service: "Design",
    callStatus: "Answer",
    recording: true,
    transcription: true,
    meetingTime: "02:15 PM",
  },
  {
    id: 16,
    name: "---",
    number: "(555) 555-0000",
    area: "---",
    company: "---",
    service: "---",
    callStatus: "Waiting",
    recording: false,
    transcription: false,
    meetingTime: "---",
  },
  {
    id: 17,
    name: "Rahman",
    number: "(713) 555-9876",
    area: "Chittagong",
    company: "Rahman Industries",
    service: "Manufacturing",
    callStatus: "Answer",
    recording: true,
    transcription: true,
    meetingTime: "03:45 PM",
  },
  {
    id: 18,
    name: "Jennifer",
    number: "(404) 555-1234",
    area: "Atlanta",
    company: "Consulting Group",
    service: "Business Consulting",
    callStatus: "Reject",
    recording: false,
    transcription: false,
    meetingTime: "---",
  },
  {
    id: 19,
    name: "Karim",
    number: "(571) 555-7890",
    area: "Sylhet",
    company: "Karim Enterprises",
    service: "Trading",
    callStatus: "Answer",
    recording: true,
    transcription: true,
    meetingTime: "11:20 AM",
  },
  {
    id: 20,
    name: "Michael",
    number: "(602) 555-4567",
    area: "Phoenix",
    company: "Phoenix Corp",
    service: "Real Estate",
    callStatus: "Answer",
    recording: true,
    transcription: true,
    meetingTime: "04:00 PM",
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

// ---------- FILTER CONFIGURATION ----------
// const filterFields: FilterField[] = [
//   {
//     key: "status",
//     label: "Status",
//     type: "multi-select",
//     options: [
//       { label: "Active", value: "active" },
//       { label: "Inactive", value: "inactive" },
//     ],
//   },
//   {
//     key: "role",
//     label: "Role",
//     type: "multi-select",
//     options: [
//       { label: "User", value: "user" },
//       { label: "Admin", value: "admin" },
//     ],
//   },
//   // {
//   //   key: "earning_range",
//   //   label: "Earning Range",
//   //   type: "select",
//   //   options: [
//   //     { label: "Under $3,000", value: "under_3000" },
//   //     { label: "$3,000 - $5,000", value: "3000_5000" },
//   //     { label: "Above $5,000", value: "above_5000" },
//   //   ],
//   // },
// ];

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

function filterData<T extends Record<string, unknown>>(
  data: T[],
  query: string
) {
  if (!query) return data;
  const q = query.toLowerCase();
  return data.filter((item) =>
    Object.values(item).some((v) => String(v).toLowerCase().includes(q))
  );
}

function applyFilters<T extends Record<string, unknown>>(
  data: T[],
  filters: Record<string, string | string[]>
): T[] {
  return data.filter((item) => {
    // Status filter
    if (filters.status) {
      const statusValues = Array.isArray(filters.status)
        ? filters.status
        : [filters.status];
      if (
        statusValues.length > 0 &&
        !statusValues.includes(String(item.status))
      ) {
        return false;
      }
    }

    // Role filter
    if (filters.role) {
      const roleValues = Array.isArray(filters.role)
        ? filters.role
        : [filters.role];
      if (roleValues.length > 0 && !roleValues.includes(String(item.role))) {
        return false;
      }
    }

    // Earning range filter
    if (filters.earning_range && typeof item.earning === "number") {
      const earning = item.earning;
      switch (filters.earning_range) {
        case "under_3000":
          if (earning >= 3000) return false;
          break;
        case "3000_5000":
          if (earning < 3000 || earning > 5000) return false;
          break;
        case "above_5000":
          if (earning <= 5000) return false;
          break;
      }
    }

    return true;
  });
}

// Parse URL filters
function parseFilters(
  searchParams: TableSearchParams
): Record<string, string | string[]> {
  const filters: Record<string, string | string[]> = {};

  // Handle comma-separated multi-values
  Object.entries(searchParams).forEach(([key, value]) => {
    if (key === "page" || key === "limit" || key === "sort" || key === "query")
      return;

    if (typeof value === "string" && value.includes(",")) {
      filters[key] = value.split(",");
    } else if (value) {
      if (typeof value === "number") {
        filters[key] = value.toString();
      } else {
        filters[key] = value;
      }
    }
  });

  return filters;
}

// ---------- TABLE PAGE ----------
export default async function CallManagementPage({ searchParams }: TableProps) {
  const queryParams = await searchParams;
  const page = Number(queryParams.page) || DEFAULT_PAGE;
  const limit = Number(queryParams.limit) || DEFAULT_LIMIT;
  const [sortField, sortDirection = ""] = (
    queryParams.sort || DEFAULT_SORT
  ).split(":");
  const searchQuery = queryParams.query || "";

  // Parse filters from URL
  const currentFilters = parseFilters(queryParams);

  // Apply filtering (but not sorting or pagination yet)
  let filteredData = [...tableData];

  // Apply search filter
  filteredData = filterData(filteredData, searchQuery);

  // Apply field filters
  filteredData = applyFilters(filteredData, currentFilters);

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
    <>
      <div className="flex justify-between mb-4">
        <SearchField defaultQuery={searchQuery} />
      </div>

      {/* Filter Component */}
      {/* <Filter
        filterFields={filterFields}
        currentFilters={currentFilters}
        searchQuery={searchQuery}
        currentPage={page}
        limit={limit}
        sortField={sortField}
        sortDirection={sortDirection}
      /> */}

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
                currentFilters={currentFilters}
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
              <td className="border-b border-gray-500 px-4 py-2">
                <span>{item.callStatus}</span>
              </td>
              <td className="border-b border-gray-500 px-4 py-2 text-center">
                {item.recording ? (
                  <div className="flex justify-center">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 5a3 3 0 016 0v6a3 3 0 11-6 0V5zM4 9a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zM15 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400">---</span>
                )}
              </td>
              <td className="border-b border-gray-500 px-4 py-2 text-center">
                {item.transcription ? (
                  <div className="flex justify-center">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400">---</span>
                )}
              </td>
              <td className="border-b border-gray-500 px-4 py-2">
                {item.meetingTime}
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
        />
      </div>
    </>
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
  currentFilters: Record<string, string | string[]>;
}

function TableHeaderItem({
  field,
  currentSort,
  sortDirection,
  currentPage,
  limit,
  searchQuery,
  currentFilters,
}: TableHeaderItemProps) {
  const isActive = currentSort === field;
  const nextDirection =
    !isActive || !sortDirection ? "asc" : sortDirection === "asc" ? "desc" : "";

  const urlParams = new URLSearchParams();
  urlParams.set("page", currentPage.toString());
  urlParams.set("limit", limit.toString());
  if (searchQuery) urlParams.set("query", searchQuery);
  if (nextDirection) urlParams.set("sort", `${field}:${nextDirection}`);

  // Preserve current filters
  Object.entries(currentFilters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      urlParams.set(key, value.join(","));
    } else if (typeof value === "string" && value) {
      urlParams.set(key, value);
    }
  });

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
        href={`/dashboard/admin/call-management?${urlParams.toString()}`}
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
