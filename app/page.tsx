"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { logInfo } from "@/lib/logger";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Login", href: "/auth/login" },
    { name: "Signup", href: "/auth/signup" },
    { name: "Forgot Password", href: "/auth/forgot-password" },
    { name: "New Password", href: "/auth/new-password" },
    { name: "Dashboard", href: "/dashboard/super-admin/outbound/analytics" },
  ];

  return (
    <nav className="w-full bg-dark2 text-white border-b border-border shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-primary">
        WhatsRealEasy
      </Link>

      {/* Links */}
      <div className="flex items-center gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium",
              pathname === link.href
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-primary hover:bg-muted/10"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
