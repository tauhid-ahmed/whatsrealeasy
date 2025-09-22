import { env } from "@/env";

// Define and assign global error logger
globalThis.logError = (...args: unknown[]): void => {
  if (env.NEXT_PUBLIC_NODE_ENV !== "development") return;

  console.error("[ERROR]:", ...args);
};

// Define and assign global info logger
globalThis.logInfo = (...args: unknown[]): void => {
  if (env.NEXT_PUBLIC_NODE_ENV !== "development") return;

  console.info("[INFO]:", ...args);
};
