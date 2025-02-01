"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const demoData = [
  { name: "Jan", streams: 4000 },
  { name: "Feb", streams: 3000 },
  { name: "Mar", streams: 5000 },
  { name: "Apr", streams: 4500 },
  { name: "May", streams: 6000 },
  { name: "Jun", streams: 5500 },
];

export const AnalyticsDemo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        rotateX: 2,
        transition: { duration: 0.3 },
      }}
      className="w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800 transform perspective-1000 hover-shadow"
    >
      <motion.div whileHover={{ rotateY: 2 }} transition={{ duration: 0.2 }}>
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 mb-6">
          Live Analytics Demo
        </h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={demoData}>
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="streams"
                stroke="#eb5757"
                strokeWidth={2}
                dot={{ fill: "#eb5757" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};
