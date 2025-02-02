import { useCallback } from "react";
import { analytics } from "@/lib/analytics";

export const useAnalytics = () => {
  const trackEvent = useCallback(
    (name: string, properties?: Record<string, any>) => {
      analytics.track({
        type: "interaction",
        name,
        properties,
      });
    },
    []
  );

  const trackPageView = useCallback((page: string) => {
    analytics.track({
      type: "page_view",
      name: page,
    });
  }, []);

  const trackError = useCallback((error: Error, context?: string) => {
    analytics.track({
      type: "error",
      name: error.name,
      properties: {
        message: error.message,
        context,
        stack: error.stack,
      },
    });
  }, []);

  return {
    trackEvent,
    trackPageView,
    trackError,
  };
};
