"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ActiveLinkProps = {
  exact?: boolean;
} & React.ComponentProps<"a">;

export default function DashboardActiveLink({
  href = "",
  className,
  children,
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "block w-full text-gray-300 hover:text-white hover:bg-blue rounded",
        isActive && "is-active-link bg-blue text-white",
        className
      )}
    >
      {children}
    </Link>
  );
}
