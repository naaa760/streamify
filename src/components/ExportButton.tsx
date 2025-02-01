"use client";

import { motion } from "framer-motion";
import { exportToCSV } from "@/utils/exportUtils";
import { Stream } from "@/types";
import { useState } from "react";

interface Props {
  data: Stream[];
  filename?: string;
}

export const ExportButton = ({ data, filename = "stream-data" }: Props) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await exportToCSV(data, filename);
    } catch (error) {
      console.error("Export failed:", error);
      // You might want to show a toast notification here
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleExport}
      disabled={isExporting}
      className="bg-[#eb5757] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2 disabled:opacity-50"
    >
      {isExporting ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {isExporting ? "Exporting..." : "Export CSV"}
    </motion.button>
  );
};
