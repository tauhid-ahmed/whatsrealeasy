"use client";

import Button from "./Button";
import { loginPath } from "@/paths";
import { cn } from "@/lib/utils";

export default function LogoutButton({
  className,
  children,
}: { className?: string } & React.PropsWithChildren) {
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = loginPath();
  }

  return (
    <Button
      size="sm"
      className={cn(
        " text-red-500 bg-transparent focus-within:border-red-500 active:border-red-500 outline-red-500",
        className
      )}
      onClick={handleLogout}
    >
      {children}
    </Button>
  );
}
