import React from "react";
import KeyMetrics from "./KeyMetrics";
import DataVisualization from "./DataVisualization";
import DataTable from "./DataTable";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Streamify Analytics Dashboard
      </h1>
      <div className="space-y-8">
        <KeyMetrics />
        <DataVisualization />
        <DataTable />
      </div>
    </div>
  );
};

export default Dashboard;
