"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreferences } from "@/stores/usePreferences";
import { useTheme } from "@/providers/ThemeProvider";

export const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { chartStyle, tableRows, setChartStyle, setTableRows } =
    usePreferences();

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/50 border border-gray-700 rounded-lg p-2 text-white hover:border-[#eb5757] transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-64 bg-black/90 border border-gray-700 rounded-lg p-4 z-50"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Theme
                </label>
                <button
                  onClick={toggleTheme}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-left"
                >
                  {theme === "dark" ? "Dark Theme" : "Light Theme"}
                </button>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Chart Style
                </label>
                <select
                  value={chartStyle}
                  onChange={(e) =>
                    setChartStyle(e.target.value as "modern" | "classic")
                  }
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-white"
                >
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Rows per Page
                </label>
                <select
                  value={tableRows}
                  onChange={(e) => setTableRows(Number(e.target.value))}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-white"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
