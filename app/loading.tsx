"use client";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dark3 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <Loader2 className="h-12 w-12 animate-spin text-white" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-lg font-medium"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}
