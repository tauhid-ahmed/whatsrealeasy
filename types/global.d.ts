export {};

declare global {
  var logError: (...args: unknown[]) => void;
  var logInfo: (...args: unknown[]) => void;
}
