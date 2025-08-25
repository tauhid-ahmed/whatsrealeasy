"use client";

import { SearchX } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center bg-dark3 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <SearchX className="h-14 w-14 text-gray-400" />
        <h1 className="text-white text-2xl font-semibold">Page Not Found</h1>
        <p className="text-gray-400 max-w-md">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <Link href="/" className="mt-4">
          <Button variant="secondary" className="rounded-2xl">
            Go Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
