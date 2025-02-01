export interface Stream {
  id: string;
  songName: string;
  artist: string;
  streamedAt: Date;
  streams: number;
  userId: string;
  revenue: number;
  revenueSource: string;
}

export interface KeyMetric {
  totalUsers: number;
  activeUsers: number;
  totalStreams: number;
  revenue: number;
  topArtist: string;
}

export interface TopSong {
  songName: string;
  artist: string;
  streams: number;
  revenue: number;
}

export interface RevenueSource {
  source: string;
  amount: number;
}
