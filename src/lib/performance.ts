import { analytics } from "./analytics";

type EventType =
  | "page_view"
  | "interaction"
  | "error"
  | "export"
  | "filter"
  | "performance";

interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private marks: Map<string, number> = new Map();
  private metrics: PerformanceMetric[] = [];

  private constructor() {
    // Initialize performance monitoring
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => this.flush());
    }
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMark(name: string): void {
    this.marks.set(name, performance.now());
  }

  endMark(name: string): void {
    const startTime = this.marks.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.marks.delete(name);

      const metric: PerformanceMetric = {
        name,
        duration,
        timestamp: Date.now(),
      };

      this.metrics.push(metric);
      this.trackMetric(metric);
    }
  }

  private trackMetric(metric: PerformanceMetric): void {
    analytics.track({
      type: "performance",
      name: "performance_metric",
      properties: metric,
    });
  }

  private async flush(): Promise<void> {
    if (this.metrics.length > 0) {
      try {
        await fetch("/api/performance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ metrics: this.metrics }),
        });
        this.metrics = [];
      } catch (error) {
        console.error("Failed to flush performance metrics:", error);
      }
    }
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
