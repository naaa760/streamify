"use client";

import { KeyMetrics } from "./KeyMetrics";
import { UserGrowthChart } from "./charts/UserGrowthChart";
import { RevenueChart } from "./charts/RevenueChart";
import { AnalyticsDemo } from "./AnalyticsDemo";

export const DashboardLayout = () => {
  return (
    <div className="w-full py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">
          Music Analytics Dashboard
        </h1>

        {/* Key Metrics */}
        <KeyMetrics />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <UserGrowthChart />
          <RevenueChart />
        </div>

        {/* Analytics Demo */}
        <div className="mt-8">
          <AnalyticsDemo />
        </div>
      </div>
    </div>
  );
};
