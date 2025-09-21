"use client";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center gap-1">
      <Loader2 className="size-6 animate-spin text-white" />
      <p className="text-white text-xs font-medium">Loading...</p>
    </div>
  );
}
