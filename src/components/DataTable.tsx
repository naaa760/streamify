"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useDashboard } from "@/context/DashboardContext";
import { generateMockStreams } from "@/utils/mockData";
import { formatDate, formatNumber } from "@/utils/formatters";

export const DataTable = () => {
  const { state, dispatch } = useDashboard();
  const streams = useMemo(() => generateMockStreams(), []);

  const filteredData = useMemo(() => {
    return streams.filter((stream) => {
      const matchesArtist = stream.artist
        .toLowerCase()
        .includes(state.filters.artist.toLowerCase());
      const matchesSong = stream.songName
        .toLowerCase()
        .includes(state.filters.songName.toLowerCase());
      return matchesArtist && matchesSong;
    });
  }, [streams, state.filters]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aValue = a[state.sortBy.column as keyof typeof a];
      const bValue = b[state.sortBy.column as keyof typeof b];
      const modifier = state.sortBy.direction === "asc" ? 1 : -1;
      return aValue > bValue ? modifier : -modifier;
    });
  }, [filteredData, state.sortBy]);

  const handleSort = (column: string) => {
    dispatch({
      type: "SET_SORT",
      payload: {
        column,
        direction:
          state.sortBy.column === column && state.sortBy.direction === "asc"
            ? "desc"
            : "asc",
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
    >
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Filter by artist..."
          className="bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#eb5757]"
          onChange={(e) =>
            dispatch({
              type: "SET_FILTERS",
              payload: { artist: e.target.value },
            })
          }
        />
        <input
          type="text"
          placeholder="Filter by song..."
          className="bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#eb5757]"
          onChange={(e) =>
            dispatch({
              type: "SET_FILTERS",
              payload: { songName: e.target.value },
            })
          }
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-gray-700">
              <th
                className="px-4 py-2 text-left cursor-pointer hover:text-[#eb5757]"
                onClick={() => handleSort("songName")}
              >
                Song Name
              </th>
              <th
                className="px-4 py-2 text-left cursor-pointer hover:text-[#eb5757]"
                onClick={() => handleSort("artist")}
              >
                Artist
              </th>
              <th
                className="px-4 py-2 text-left cursor-pointer hover:text-[#eb5757]"
                onClick={() => handleSort("streamedAt")}
              >
                Date Streamed
              </th>
              <th
                className="px-4 py-2 text-left cursor-pointer hover:text-[#eb5757]"
                onClick={() => handleSort("streams")}
              >
                Streams
              </th>
              <th
                className="px-4 py-2 text-left cursor-pointer hover:text-[#eb5757]"
                onClick={() => handleSort("userId")}
              >
                User ID
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((stream, index) => (
              <motion.tr
                key={stream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-800 hover:bg-white/5"
              >
                <td className="px-4 py-2">{stream.songName}</td>
                <td className="px-4 py-2">{stream.artist}</td>
                <td className="px-4 py-2">{formatDate(stream.streamedAt)}</td>
                <td className="px-4 py-2">{formatNumber(stream.streams)}</td>
                <td className="px-4 py-2">{stream.userId}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
