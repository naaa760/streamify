import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAnalytics } from "./useAnalytics";

export const useStreamData = () => {
  const { trackError } = useAnalytics();

  return useQuery({
    queryKey: ["streams"],
    queryFn: async () => {
      try {
        const response = await api.streams.getAll();
        return response.data;
      } catch (error) {
        trackError(error as Error, "Fetching stream data");
        throw error;
      }
    },
  });
};

export const useMetrics = () => {
  const { trackError } = useAnalytics();

  return useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      try {
        const response = await api.metrics.get();
        return response.data;
      } catch (error) {
        trackError(error as Error, "Fetching metrics");
        throw error;
      }
    },
  });
};
