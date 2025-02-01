"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useDashboard } from "@/context/DashboardContext";
import { useDebounce } from "@/hooks/useDebounce";

export const SearchBar = () => {
  const { dispatch } = useDashboard();
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce((term: string) => {
    dispatch({
      type: "SET_FILTERS",
      payload: {
        songName: term,
      },
    });
  }, 300);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      debouncedSearch(term);
    },
    [debouncedSearch]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search songs, artists..."
          className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 pl-10 text-white focus:outline-none focus:border-[#eb5757]"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </motion.div>
  );
};
