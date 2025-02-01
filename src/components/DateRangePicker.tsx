"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useDashboard } from "@/context/DashboardContext";
import { formatDate } from "@/utils/formatters";

export const DateRangePicker = () => {
  const { state, dispatch } = useDashboard();
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (key: "start" | "end", value: string) => {
    dispatch({
      type: "SET_DATE_RANGE",
      payload: {
        ...state.dateRange,
        [key]: new Date(value),
      },
    });
  };

  return (
    <motion.div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white hover:border-[#eb5757] transition-colors flex items-center gap-2"
      >
        <span>{formatDate(state.dateRange.start)}</span>
        <span>→</span>
        <span>{formatDate(state.dateRange.end)}</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 bg-black/90 border border-gray-700 rounded-lg p-4 z-50"
        >
          <div className="flex gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={state.dateRange.start.toISOString().split("T")[0]}
                onChange={(e) => handleDateChange("start", e.target.value)}
                className="bg-black/50 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={state.dateRange.end.toISOString().split("T")[0]}
                onChange={(e) => handleDateChange("end", e.target.value)}
                className="bg-black/50 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm"
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
