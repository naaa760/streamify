import { faker } from "@faker-js/faker";
import { Stream, KeyMetric, TopSong, RevenueSource } from "@/types";

export const generateMockStreams = (count = 100): Stream[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    songName: faker.music.songName(),
    artist: faker.person.fullName(),
    streamedAt: faker.date.recent({ days: 30 }),
    streams: faker.number.int({ min: 1000, max: 1000000 }),
    userId: faker.string.uuid(),
    revenue: faker.number.float({ min: 0.1, max: 10, precision: 0.01 }),
    revenueSource: faker.helpers.arrayElement([
      "Subscriptions",
      "Ads",
      "Downloads",
      "Licensing",
      "Merchandise",
    ]),
  }));
};

export const generateKeyMetrics = (): KeyMetric => ({
  totalUsers: faker.number.int({ min: 100000, max: 1000000 }),
  activeUsers: faker.number.int({ min: 50000, max: 200000 }),
  totalStreams: faker.number.int({ min: 1000000, max: 10000000 }),
  revenue: faker.number.int({ min: 500000, max: 2000000 }),
  topArtist: faker.person.fullName(),
});

export const generateTopSongs = (count = 5): TopSong[] => {
  return Array.from({ length: count }, () => ({
    songName: faker.music.songName(),
    artist: faker.person.fullName(),
    streams: faker.number.int({ min: 100000, max: 1000000 }),
    revenue: faker.number.float({ min: 1000, max: 10000, fractionDigits: 2 }),
  }));
};

export const generateMockRevenue = (): RevenueSource[] => {
  const sources = [
    "Subscriptions",
    "Ads",
    "Downloads",
    "Licensing",
    "Merchandise",
  ];
  return sources.map((source) => ({
    source,
    amount: faker.number.int({ min: 50000, max: 500000 }),
  }));
};
