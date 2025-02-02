import { useCallback } from "react";
import { Stream } from "@/types";
import { validateStreamArray } from "@/utils/validation";

const CACHE_KEY = "stream_data_cache";
const CACHE_EXPIRY = 1000 * 60 * 30; // 30 minutes

export const useDataCache = () => {
  const saveToCache = useCallback((data: Stream[]) => {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  }, []);

  const loadFromCache = useCallback(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      const validatedData = validateStreamArray(data);
      return validatedData.length > 0 ? validatedData : null;
    } catch (error) {
      console.error("Cache load error:", error);
      return null;
    }
  }, []);

  const clearCache = useCallback(() => {
    localStorage.removeItem(CACHE_KEY);
  }, []);

  return {
    saveToCache,
    loadFromCache,
    clearCache,
  };
};
