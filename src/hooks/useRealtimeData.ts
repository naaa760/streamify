import { useEffect } from "react";
import { wsClient } from "@/lib/websocket";
import { useQueryClient } from "@tanstack/react-query";

export const useRealtimeData = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleStreamUpdate = (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["streams"] });
    };

    const handleMetricsUpdate = (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["metrics"] });
    };

    wsClient.subscribe("stream_update", handleStreamUpdate);
    wsClient.subscribe("metrics_update", handleMetricsUpdate);

    return () => {
      wsClient.unsubscribe("stream_update", handleStreamUpdate);
      wsClient.unsubscribe("metrics_update", handleMetricsUpdate);
    };
  }, [queryClient]);
};
