"use client";

import { cn } from "@/lib/utils";
import { LucideChevronDown } from "lucide-react";
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

function TableHeaderItem({ prop, currentSort, sortDirection }: any) {
  const isActive = currentSort === prop;

  return (
    <th
      className={cn(
        "text-left cursor-pointer p-2 bg-gray-800 group",
        isActive ? "bg-gray-800" : "hover:bg-gray-800"
      )}
    >
      <span className="inline-flex gap-1 items-center font-semibold relative">
        {prop}
        <span
          className={cn("opacity-0 group-hover:opacity-100", {
            "opacity-100": currentSort === prop,
          })}
        >
          <LucideChevronDown size={16} />
        </span>
      </span>
    </th>
  );
}
