"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { generateKeyMetrics } from "@/utils/mockData";
import { formatNumber } from "@/utils/formatters";

export const KeyMetrics = () => {
  const metrics = useMemo(() => generateKeyMetrics(), []);

  const cards = [
    {
      title: "Total Users",
      value: formatNumber(metrics.totalUsers),
      color: "bg-blue-500",
    },
    {
      title: "Active Users",
      value: formatNumber(metrics.activeUsers),
      color: "bg-green-500",
    },
    {
      title: "Total Streams",
      value: formatNumber(metrics.totalStreams),
      color: "bg-purple-500",
    },
    {
      title: "Revenue",
      value: `$${formatNumber(metrics.revenue)}`,
      color: "bg-yellow-500",
    },
    { title: "Top Artist", value: metrics.topArtist, color: "bg-pink-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${card.color} rounded-lg p-4 text-white shadow-lg`}
        >
          <h3 className="text-sm font-medium opacity-80">{card.title}</h3>
          <p className="text-2xl font-bold mt-2">{card.value}</p>
        </motion.div>
      ))}
    </div>
  );
};
