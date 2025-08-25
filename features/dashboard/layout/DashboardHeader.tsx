"use client";
import urlSegmentName from "@/lib/urlSegmentName";
import { usePathname } from "next/navigation";

export default function DashboardHeader() {
  const pathname = usePathname();
  const pageName = urlSegmentName(
    pathname.split("/")[pathname.split("/").length - 1]
  );

  return (
    <div className="px-[var(--_sidebar-spacing)] flex items-center gap-[var(--_sidebar-spacing)] h-[var(--_sidebar-header-height)] bg-dark3">
      <div className="flex items-center gap-1 justify-between">
        <div className="text-white text-2xl">{pageName}</div>
      </div>
    </div>
  );
}
