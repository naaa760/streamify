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
      transition={{ delay: 0.8 }}
      className="w-full max-w-4xl mx-auto mt-16 bg-black/30 backdrop-blur-sm rounded-xl p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        Live Analytics Demo
      </h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={demoData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "none",
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
  );
};
