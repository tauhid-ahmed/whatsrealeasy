"use client";

import Button from "./Button";
import { loginPath } from "@/paths";
import { cn } from "@/lib/utils";

export default function LogoutButton({ className }: { className?: string }) {
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = loginPath();
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
