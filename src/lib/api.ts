import { Stream, KeyMetric, TopSong } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

interface ApiResponse<T> {
  data: T;
  error?: string;
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      data: {} as T,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export const api = {
  streams: {
    getAll: () => fetchApi<Stream[]>("/streams"),
    getById: (id: string) => fetchApi<Stream>(`/streams/${id}`),
  },
  metrics: {
    get: () => fetchApi<KeyMetric>("/metrics"),
  },
  topSongs: {
    get: () => fetchApi<TopSong[]>("/top-songs"),
  },
};
