"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { generateTopSongs } from "@/utils/mockData";
import { formatNumber } from "@/utils/formatters";

export const TopSongsChart = () => {
  const data = useMemo(() => generateTopSongs(), []);

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        rotateY: 5,
        transition: { duration: 0.3 },
      }}
      className="w-full bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800 transform perspective-1000"
    >
      <motion.div whileHover={{ rotateX: 5 }} transition={{ duration: 0.2 }}>
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 mb-4">
          Top Songs
        </h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <XAxis type="number" stroke="#666" />
              <YAxis
                dataKey="songName"
                type="category"
                stroke="#666"
                width={150}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value: number) => [formatNumber(value), "Streams"]}
              />
              <Bar
                dataKey="streams"
                fill="#eb5757"
                radius={[0, 4, 4, 0]}
                label={{
                  position: "right",
                  fill: "#fff",
                  formatter: (value: number) => formatNumber(value),
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};
