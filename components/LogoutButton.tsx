"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import { loginPath } from "@/paths";
import { cn } from "@/lib/utils";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(loginPath());
  }

  return (
    <Button
      size="sm"
      className={cn("w-full", className)}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
