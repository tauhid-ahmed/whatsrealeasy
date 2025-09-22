"use client";

import { useEffect } from "react";
import { ErrorView } from "@/components/Error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logError(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center size-full flex-1">
      <ErrorView message={error.message} onRetry={reset} />
    </div>
  );
}
