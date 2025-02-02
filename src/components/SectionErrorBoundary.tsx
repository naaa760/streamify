"use client";

import { ErrorBoundary } from "react-error-boundary";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  section: string;
}

export const SectionErrorBoundary = ({ children, section }: Props) => {
  return (
    <ErrorBoundary
      fallback={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg"
        >
          <p className="text-red-400">
            Error loading {section}. Please try refreshing the page.
          </p>
        </motion.div>
      }
      onError={(error) => {
        console.error(`Error in ${section}:`, error);
        // You might want to send this to an error reporting service
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
