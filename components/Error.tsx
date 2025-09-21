"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RotateCw } from "lucide-react";

type ErrorViewProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-4 bg-background text-center p-6 rounded shadow-2xl border border-double"
    >
      {/* Animated icon */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <AlertTriangle
          className="size-12 text-destructive drop-shadow-sm"
          strokeWidth={2}
          aria-hidden="true"
        />
      </motion.div>

      {/* Headline */}
      <motion.h2
        className="text-lg font-semibold text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Oops! Something went wrong
      </motion.h2>

      {/* Error message */}
      <p className="max-w-sm text-sm text-muted-foreground">
        {message ?? "An unexpected error occurred. Please try again."}
      </p>

      {/* Retry button */}
      {onRetry && (
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <RotateCw className="size-4" aria-hidden="true" />
          Retry
        </motion.button>
      )}
    </div>
  );
}
