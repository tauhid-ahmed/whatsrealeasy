"use client";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorPage({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}: ErrorPageProps) {
  return (
    <div className="h-screen flex items-center justify-center bg-dark3 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <AlertTriangle className="h-14 w-14 text-red-500" />
        <h1 className="text-white text-2xl font-semibold">{title}</h1>
        <p className="text-gray-400 max-w-md">{message}</p>

        {onRetry && (
          <Button
            variant="secondary"
            onClick={onRetry}
            className="mt-4 rounded-2xl"
          >
            Retry
          </Button>
        )}
      </motion.div>
    </div>
  );
}
