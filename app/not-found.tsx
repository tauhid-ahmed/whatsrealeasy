"use client";

import { SearchX } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center bg-dark3 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-6 text-center max-w-lg"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="rounded-full bg-dark2 p-6 shadow-lg"
        >
          <SearchX className="h-14 w-14 text-gray-400" />
        </motion.div>

        {/* Title */}
        <h1 className="text-white text-3xl font-bold tracking-tight">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed">
          The page you’re looking for doesn’t exist, has been moved, or is
          temporarily unavailable. Please check the URL or return home.
        </p>

        {/* CTA */}
        <Link href="/" className="mt-2">
          <Button
            variant="secondary"
            className="rounded-2xl px-6 py-2 shadow-md hover:shadow-lg transition"
          >
            Go Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
