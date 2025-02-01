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
    <div className="w-full bg-black/30 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">User Growth</h2>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "none",
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
    </div>
  );
};
