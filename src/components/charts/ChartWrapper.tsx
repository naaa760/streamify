"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { LoadingSpinner } from "../LoadingSpinner";

// Lazy load chart components with proper type assertions
const UserGrowthChart = lazy(() =>
  import("./UserGrowthChart").then((module) => ({
    default: module.UserGrowthChart,
  }))
);
const RevenueChart = lazy(() =>
  import("./RevenueChart").then((module) => ({ default: module.RevenueChart }))
);
const TopSongsChart = lazy(() =>
  import("./TopSongsChart").then((module) => ({
    default: module.TopSongsChart,
  }))
);

interface Props {
  type: "growth" | "revenue" | "songs";
  className?: string;
}

export const ChartWrapper = ({ type, className = "" }: Props) => {
  const getChart = () => {
    switch (type) {
      case "growth":
        return <UserGrowthChart />;
      case "revenue":
        return <RevenueChart />;
      case "songs":
        return <TopSongsChart />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className={`bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800 ${className}`}
    >
      <Suspense fallback={<LoadingSpinner />}>{getChart()}</Suspense>
    </motion.div>
  );
};
