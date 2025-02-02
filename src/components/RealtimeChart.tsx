"use client";

import { useRealtimeChart } from "@/hooks/useRealtimeChart";
import { useChartAnimation } from "@/hooks/useChartAnimation";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";

export const RealtimeChart = () => {
  const { getChartData } = useRealtimeChart();
  const { getAnimationProps } = useChartAnimation("line");

  return (
    <motion.div className="p-4 bg-card rounded-lg" {...getAnimationProps()}>
      <h3 className="text-lg font-semibold mb-4">Real-time Activity</h3>
      <div className="h-64">
        <Line
          data={getChartData()}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 0, // Disable animations for better performance
            },
            scales: {
              x: {
                display: false,
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </motion.div>
  );
};
