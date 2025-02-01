export interface User {
  id: string;
  name: string;
  email: string;
  lastActive: Date;
}

export interface Stream {
  id: string;
  songId: string;
  userId: string;
  timestamp: Date;
}

export interface Song {
  id: string;
  name: string;
  artist: string;
  streams: number;
  revenue: number;
}

export interface KeyMetric {
  label: string;
  value: number | string;
  change: number;
  icon: React.ReactNode;
}

export interface DashboardState {
  sortColumn: string;
  sortDirection: "asc" | "desc";
  filters: {
    artist: string;
    songName: string;
    dateRange: [Date | null, Date | null];
  };
  selectedRevenueSource: string | null;
}
