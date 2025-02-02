export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private marks: Map<string, number> = new Map();

  private constructor() {
    // Initialize performance monitoring
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMark(name: string) {
    this.marks.set(name, performance.now());
  }

  endMark(name: string) {
    const startTime = this.marks.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.marks.delete(name);

      // Send to analytics
      analytics.track({
        type: "performance",
        name: "performance_metric",
        properties: {
          metric: name,
          duration,
        },
      });
    }
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
