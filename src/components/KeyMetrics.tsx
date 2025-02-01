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
      color:
        "bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30",
    },
    {
      title: "Active Users",
      value: formatNumber(metrics.activeUsers),
      color:
        "bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30",
    },
    {
      title: "Total Streams",
      value: formatNumber(metrics.totalStreams),
      color:
        "bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30",
    },
    {
      title: "Revenue",
      value: `$${formatNumber(metrics.revenue)}`,
      color:
        "bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/30",
    },
    {
      title: "Top Artist",
      value: metrics.topArtist,
      color:
        "bg-gradient-to-br from-pink-500/20 to-pink-600/20 border-pink-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.05,
            rotateY: 10,
            transition: { duration: 0.3 },
          }}
          transition={{ delay: index * 0.1 }}
          className={`${card.color} rounded-lg p-4 text-white shadow-lg backdrop-blur-sm border transform perspective-1000`}
        >
          <motion.div
            whileHover={{ rotateX: 10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-sm font-medium opacity-80">{card.title}</h3>
            <p className="text-2xl font-bold mt-2">{card.value}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
