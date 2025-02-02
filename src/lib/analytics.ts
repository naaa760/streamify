type EventType =
  | "page_view"
  | "interaction"
  | "error"
  | "export"
  | "filter"
  | "performance";

interface AnalyticsEvent {
  type: EventType;
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

class Analytics {
  private static instance: Analytics;
  private queue: AnalyticsEvent[] = [];
  private isProcessing = false;

  private constructor() {
    // Initialize analytics
    window.addEventListener("beforeunload", () => this.flush());
  }

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  track(event: Omit<AnalyticsEvent, "timestamp">) {
    this.queue.push({
      ...event,
      timestamp: Date.now(),
    });
    this.processQueue();
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    const events = [...this.queue];
    this.queue = [];

    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events }),
      });
    } catch (error) {
      console.error("Failed to send analytics:", error);
      // Re-queue failed events
      this.queue = [...events, ...this.queue];
    } finally {
      this.isProcessing = false;
      if (this.queue.length > 0) {
        this.processQueue();
      }
    }
  }

  private async flush() {
    if (this.queue.length > 0) {
      await this.processQueue();
    }
  }
}

export const analytics = Analytics.getInstance();
