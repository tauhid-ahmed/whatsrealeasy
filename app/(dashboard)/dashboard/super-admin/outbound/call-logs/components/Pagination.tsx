"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useTransition } from "react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

export default function Pagination({
  totalPages,
  currentPage,
  pageSize,
}: PaginationProps) {
  const searchParams = new URLSearchParams(useSearchParams());
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Use the actual totalPages, but cap it at 20 if needed
  const maxPages = Math.max(totalPages, 20); // change to min

  const navigateToPage = (page: number) => {
    page = Math.max(1, Math.min(page, maxPages));
    const params = new URLSearchParams(searchParams.toString());
    page === 1 ? params.delete("page") : params.set("page", page.toString());
    params.set("limit", pageSize.toString());
    const url = `?${params.toString()}`;
    startTransition(() => {
      router.push(url);
    });
  };

  // Always show 5 pages, but don't exceed maxPages
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(startPage + 4, maxPages);

  // Adjust startPage if we're near the end
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <>
      {currentPage}
      <nav className="flex justify-center gap-2 mt-4 flex-wrap">
        <Button
          disabled={currentPage === 1 || isPending}
          onClick={() => navigateToPage(currentPage - 1)}
        >
          Prev
        </Button>

        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => navigateToPage(page)}
            disabled={isPending}
            className={`px-3 py-1 rounded-md transition ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {page}
          </Button>
        ))}

        <Button
          disabled={currentPage >= maxPages || isPending}
          onClick={() => navigateToPage(currentPage + 1)}
        >
          Next
        </Button>
      </nav>
    </>
  );
}
