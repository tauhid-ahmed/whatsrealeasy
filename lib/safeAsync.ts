import "@/lib/logger";
import { logError } from "@/lib/logger";
import { toast } from "sonner";

export type SafeResult<T> = {
  data: T | null;
  error: Error | null;
};

function handleError(error: unknown, userMessage?: string) {
  logError(error);

  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : "Unexpected error";

  logError(message, userMessage);
}

export async function safeAsync<T>(
  fn: () => Promise<T>,
  options?: { client: boolean; fallback?: T; message?: string }
): Promise<SafeResult<T>> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (error) {
    handleError(error, options?.message);
    if (options?.client) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
    return {
      data: options?.fallback ?? null,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

export function safeSync<T>(
  fn: () => T,
  options?: { fallback?: T; message?: string }
): SafeResult<T> {
  try {
    const data = fn();
    return { data, error: null };
  } catch (error) {
    handleError(error, options?.message);
    return {
      data: options?.fallback ?? null,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
