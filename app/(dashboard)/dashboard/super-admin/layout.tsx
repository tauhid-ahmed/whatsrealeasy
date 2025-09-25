"use client";

import { useAuth } from "@/context/AuthContext";
import { loginPath } from "@/paths";
import { redirect } from "next/navigation";

export default function AdminDashboardLayout({
  children,
}: React.PropsWithChildren) {
  const me = useAuth();
  if (!me || !me?.role.includes("super_admin")) return redirect(loginPath());
  return children;
}
