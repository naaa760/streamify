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

const COLORS = ["#eb5757", "#70a1ff", "#7bed9f", "#ffa502", "#ff4757"];

export const RevenueChart = () => {
  const { dispatch } = useDashboard();
  const data = useMemo(() => generateMockRevenue(), []);

  const handleClick = (entry: any) => {
    dispatch({
      type: "SET_REVENUE_SECTOR",
      payload: entry.name,
    });
  };

  return (
    <div className="w-full bg-black/30 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">
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
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                "Revenue",
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
