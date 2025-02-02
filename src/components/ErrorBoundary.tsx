"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";

interface Props {
  error: Error;
  reset: () => void;
  section?: string;
}

export const ErrorBoundary = ({
  error,
  reset,
  section = "component",
}: Props) => {
  const { trackError } = useAnalytics();

  useEffect(() => {
    trackError(error, `Error in ${section}`);
  }, [error, section, trackError]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg"
    >
      <p className="text-red-400 mb-4">
        Error loading {section}: {error.message}
      </p>
      <button
        onClick={reset}
        className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
      >
        Try Again
      </button>
    </motion.div>
  );
};
