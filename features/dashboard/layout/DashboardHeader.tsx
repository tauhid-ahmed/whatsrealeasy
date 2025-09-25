"use client";
import urlSegmentName from "@/lib/urlSegmentName";
import { usePathname } from "next/navigation";

export default function DashboardHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/");

  const pageMode = urlSegmentName(segments[segments.length - 2] || "");
  const pageName = urlSegmentName(segments[segments.length - 1] || "");

  return (
    <header className="h-[var(--_sidebar-header-height)] bg-dark3 border-b border-dark2 flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold text-white tracking-wide">
          {pageName}
        </h1>
        <p className="text-sm text-white/80">
          {pageMode} / {pageName}
        </p>
      </div>
    </header>
  );
}
