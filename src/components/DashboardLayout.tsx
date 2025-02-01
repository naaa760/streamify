"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { KeyMetrics } from "./KeyMetrics";
import { UserGrowthChart } from "./charts/UserGrowthChart";
import { RevenueChart } from "./charts/RevenueChart";
import { AnalyticsDemo } from "./AnalyticsDemo";
import { DashboardStars } from "./DashboardStars";

export const DashboardLayout = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);
  const scale = useTransform(scrollY, [0, 200], [0.95, 1]);

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
          <motion.h1
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            className="text-3xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300 inline-block cursor-default"
          >
            Music Analytics Dashboard
          </motion.h1>

          {/* Stagger children animations */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
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

            {/* Analytics Demo */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="mt-8"
            >
              <AnalyticsDemo />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
