"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { KeyMetrics } from "./KeyMetrics";
import { UserGrowthChart } from "./charts/UserGrowthChart";
import { RevenueChart } from "./charts/RevenueChart";
import { AnalyticsDemo } from "./AnalyticsDemo";
import { DashboardStars } from "./DashboardStars";
import { DataTable } from "./DataTable";
import { DateRangePicker } from "./DateRangePicker";
import { AdvancedFilters } from "./AdvancedFilters";
import { ExportButton } from "./ExportButton";
import { TopSongsChart } from "./charts/TopSongsChart";
import { generateMockStreams } from "@/utils/mockData";

export const DashboardLayout = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);
  const scale = useTransform(scrollY, [0, 200], [0.95, 1]);
  const streams = useMemo(() => generateMockStreams(100), []);

  // Add gradient transition based on scroll
  const gradientOpacity = useTransform(scrollY, [0, 300], [0, 1]);
  const backgroundStyle = {
    opacity: gradientOpacity,
    background: "linear-gradient(180deg, #eb5757 0%, rgba(0,0,0,1) 15%)",
  };

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Gradient Overlay */}
      <motion.div
        style={backgroundStyle}
        className="absolute inset-0 pointer-events-none"
      />

      <DashboardStars />
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 w-full py-16"
      >
        <div className="container mx-auto px-4">
          {/* Header with Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <motion.h1
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 inline-block cursor-default"
            >
              Music Analytics Dashboard
            </motion.h1>

            <div className="flex items-center gap-4">
              <DateRangePicker />
              <AdvancedFilters />
              <ExportButton data={streams} filename="music-analytics" />
            </div>
          </div>

          {/* Key Metrics */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <KeyMetrics />
          </motion.div>

          {/* Charts Grid */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8"
          >
            <UserGrowthChart />
            <RevenueChart />
          </motion.div>

          {/* Top Songs Chart */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-8"
          >
            <TopSongsChart />
          </motion.div>

          {/* Data Table */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-8"
          >
            <DataTable />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
