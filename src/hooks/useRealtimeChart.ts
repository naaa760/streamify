import { useState, useEffect, useCallback } from "react";
import { useRealtimeData } from "./useRealtimeData";
import { performanceMonitor } from "@/lib/performance";

interface ChartDataPoint {
  timestamp: number;
  value: number;
}

export const useRealtimeChart = (maxPoints: number = 50) => {
  const [dataPoints, setDataPoints] = useState<ChartDataPoint[]>([]);
  useRealtimeData(); // Enable real-time updates

  const addDataPoint = useCallback(
    (value: number) => {
      performanceMonitor.startMark("chart_update");

      setDataPoints((prev) => {
        const newPoints = [...prev, { timestamp: Date.now(), value }];
        if (newPoints.length > maxPoints) {
          return newPoints.slice(-maxPoints);
        }
        return newPoints;
      });

      performanceMonitor.endMark("chart_update");
    },
    [maxPoints]
  );

  const clearData = useCallback(() => {
    setDataPoints([]);
  }, []);

  const getChartData = useCallback(() => {
    return {
      labels: dataPoints.map((p) => new Date(p.timestamp).toLocaleTimeString()),
      datasets: [
        {
          data: dataPoints.map((p) => p.value),
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  }, [dataPoints]);

  return {
    dataPoints,
    addDataPoint,
    clearData,
    getChartData,
  };
};
