// utils/logger.ts
import { env } from "@/env";

export const logError = (error: unknown): void => {
  if (env.NODE_ENV !== "development") return; // only log in development

  if (error instanceof Error) {
    console.error("[ERROR]:", error.message, "\nStack:", error.stack);
  } else {
    console.error("[ERROR]:", error);
  }
};
