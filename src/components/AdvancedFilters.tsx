"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboard } from "@/context/DashboardContext";

export const AdvancedFilters = () => {
  const { state, dispatch } = useDashboard();
  const [isOpen, setIsOpen] = useState(false);

  const revenueSourceOptions = [
    "All",
    "Subscriptions",
    "Ads",
    "Downloads",
    "Licensing",
    "Merchandise",
  ];

  const handleRevenueSourceChange = (source: string) => {
    dispatch({
      type: "SET_FILTERS",
      payload: {
        revenueSource: source === "All" ? "" : source,
      },
    });
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white hover:border-[#eb5757] transition-colors flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clipRule="evenodd"
          />
        </svg>
        Filters
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 right-0 bg-black/90 border border-gray-700 rounded-lg p-4 z-50 min-w-[200px]"
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Revenue Source
                </h3>
                <div className="space-y-2">
                  {revenueSourceOptions.map((source) => (
                    <label
                      key={source}
                      className="flex items-center gap-2 text-white cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="revenueSource"
                        checked={
                          source === "All"
                            ? !state.filters.revenueSource
                            : state.filters.revenueSource === source
                        }
                        onChange={() => handleRevenueSourceChange(source)}
                        className="text-[#eb5757] focus:ring-[#eb5757]"
                      />
                      {source}
                    </label>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: "RESET_FILTERS" })}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Reset Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
