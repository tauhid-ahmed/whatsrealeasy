import { env } from "@/env";

export const logError = (error: unknown): void => {
  if (env.NODE_ENV !== "development") return;

  if (error instanceof Error) {
    console.error("[ERROR]:", error.message, "\nStack:", error.stack);
  } else {
    console.error("[ERROR]:", error);
  }
};

export const logInfo = (message: string): void => {
  if (env.NODE_ENV !== "development") return;
  console.info("[INFO]:", message);
};
