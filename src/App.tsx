import React from "react";
import { DashboardProvider } from "./context/DashboardContext";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Dashboard />
      </div>
    </DashboardProvider>
  );
}

export default App;
