"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { faker } from "@faker-js/faker";
import { motion } from "framer-motion";

interface DataPoint {
  date: string;
  users: number;
  activeUsers: number;
}

export const UserGrowthChart = () => {
  const data = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months.map(
      (month): DataPoint => ({
        date: month,
        users: faker.number.int({ min: 100000, max: 1000000 }),
        activeUsers: faker.number.int({ min: 50000, max: 200000 }),
      })
    );
  }, []);

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
          User Growth
        </h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#eb5757"
                strokeWidth={2}
                dot={{ fill: "#eb5757" }}
                name="Total Users"
              />
              <Line
                type="monotone"
                dataKey="activeUsers"
                stroke="#70a1ff"
                strokeWidth={2}
                dot={{ fill: "#70a1ff" }}
                name="Active Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};
