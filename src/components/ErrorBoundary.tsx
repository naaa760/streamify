"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

interface Props {
  error: Error;
  reset: () => void;
}

export const ErrorBoundary = ({ error, reset }: Props) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[400px] flex items-center justify-center"
    >
      <div className="text-center p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-400 mb-6">{error.message}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="bg-[#eb5757] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Try again
        </motion.button>
      </div>
    </motion.div>
  );
};
