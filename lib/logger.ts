import { env } from "@/env";

export const logError = (...args: unknown[]): void => {
  if (env.NEXT_PUBLIC_NODE_ENV !== "development") return;
  console.error("[ERROR]:", ...args);
};

export const logInfo = (...args: unknown[]): void => {
  if (env.NEXT_PUBLIC_NODE_ENV !== "development") return;
  console.info("[INFO]:", ...args);
};
