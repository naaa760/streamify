"use client";

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { generateMockRevenue } from "@/utils/mockData";
import { useDashboard } from "@/context/DashboardContext";
import { motion } from "framer-motion";

const COLORS = ["#eb5757", "#70a1ff", "#7bed9f", "#ffa502", "#ff4757"];

export const RevenueChart = () => {
  const { dispatch } = useDashboard();
  const data = useMemo(() => generateMockRevenue(), []);

  const handleClick = (entry: any) => {
    dispatch({
      type: "SET_FILTERS",
      payload: entry.name,
    });
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        rotateY: -5,
        transition: { duration: 0.3 },
      }}
      className="w-full bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800 transform perspective-1000"
    >
      <motion.div whileHover={{ rotateX: 5 }} transition={{ duration: 0.2 }}>
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 mb-4">
          Revenue Distribution
        </h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="amount"
                nameKey="source"
                onClick={handleClick}
                cursor="pointer"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "Revenue",
                ]}
                itemStyle={{ color: "#fff" }}
                cursor={{ fill: "rgba(255,255,255,0.1)" }}
              />
              <Legend
                formatter={(value, entry) => (
                  <span style={{ color: "#fff" }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};
