import { faker } from "@faker-js/faker";

export interface Stream {
  id: string;
  songName: string;
  artist: string;
  userId: string;
  streamedAt: Date;
  duration: number;
}

export interface Revenue {
  source: string;
  amount: number;
  percentage: number;
}

export function generateMockStreams(count: number): Stream[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    songName: faker.music.songName(),
    artist: faker.person.fullName(),
    userId: faker.string.uuid(),
    streamedAt: faker.date.recent({ days: 30 }),
    duration: faker.number.int({ min: 120, max: 300 }),
  }));
}

export function generateMockRevenue(): Revenue[] {
  const sources = [
    "Premium Subscriptions",
    "Ads",
    "Downloads",
    "Merchandise",
    "Live Events",
  ];
  let total = 0;
  const revenues = sources.map((source) => ({
    source,
    amount: faker.number.int({ min: 10000, max: 100000 }),
    percentage: 0,
  }));

  total = revenues.reduce((acc, curr) => acc + curr.amount, 0);
  return revenues.map((rev) => ({
    ...rev,
    percentage: Number(((rev.amount / total) * 100).toFixed(2)),
  }));
}

export function generateKeyMetrics() {
  return {
    totalUsers: faker.number.int({ min: 100000, max: 1000000 }),
    activeUsers: faker.number.int({ min: 50000, max: 200000 }),
    totalStreams: faker.number.int({ min: 1000000, max: 5000000 }),
    revenue: faker.number.int({ min: 500000, max: 2000000 }),
    topArtist: faker.person.fullName(),
  };
}
