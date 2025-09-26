"use client";

import { cn } from "@/lib/utils";
import { LucideChevronDown } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type TableProps = {
  tableData: [];
};

export default function Table({ tableBody, tableHeader }: TableProps) {
  const searchParams = new URLSearchParams(useSearchParams());
  const [sort, sortDirection] = (searchParams.get("sort") || "").split(":");

  return (
    <>
      <table className="table-auto border-collapse border border-gray-500 w-full text-gray-300">
        <thead>
          <tr className="border-b border-gray-500">
            {tableHeader.map((prop) => (
              <TableHeaderItem
                key={prop}
                prop={prop}
                currentSort={sort}
                sortDirection={sortDirection}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBody.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-500 hover:bg-gray-800"
            >
              <td className="px-2 py-2">{item.userId}</td>
              <td className="px-2 py-2">{item.id}</td>
              <td className="px-2 py-2">{item.title}</td>
              <td className="px-2 py-2">{item.completed.toString()}</td>
              {/* {tableHeader.map((field) => (
                <td className="px-2 py-2">{item[field].toString()}</td>
              ))} */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

type TableHeaderItemProps = {
  prop: string;
  currentSort: string;
  sortDirection: "asc" | "desc";
};

export function TableHeaderItem({ prop, currentSort, sortDirection }: any) {
  const searchParams = new URLSearchParams(useSearchParams());
  const isActive = currentSort === prop;

  let nextSort: string | null = "asc";
  if (isActive) {
    if (sortDirection === "asc") nextSort = "desc";
    else if (sortDirection === "desc") nextSort = null;
  }

  const handleSort = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextSort) {
      params.set("sort", `${prop}:${nextSort}`);
    } else {
      params.delete("sort");
    }

    return params.toString();
  };

  return (
    <th
      className={cn(
        "text-left cursor-pointer p-2 bg-gray-800 group",
        isActive ? "bg-gray-800" : "hover:bg-gray-800"
      )}
    >
      <Link
        href={`?${handleSort()}`}
        className="inline-flex gap-1 items-center font-semibold relative"
      >
        {prop}
        <span
          className={cn(
            "ml-1 text-gray-100 transition opacity-0 transition-200 group-hover:opacity-100",
            {
              "opacity-100 group-hover:opacity-100 bg-slate-900/70": isActive,
            }
          )}
        >
          <LucideChevronDown
            size={16}
            className={cn(
              "transition-transform",
              sortDirection === "desc" ? "rotate-180" : ""
            )}
          />
        </span>
      </Link>
    </th>
  );
}
