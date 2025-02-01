import { faker } from "@faker-js/faker";
import { Stream, KeyMetric, TopSong, RevenueSource } from "@/types";

export const generateMockStreams = (count = 100): Stream[] => {
  // Create a date range for the last 30 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30);

  return Array.from({ length: count }, () => {
    const streamedAt = faker.date.between({ from: startDate, to: endDate });

    return {
      id: faker.string.uuid(),
      songName: faker.music.songName(),
      artist: faker.person.fullName(),
      streamedAt, // Use the generated date
      streams: faker.number.int({ min: 1000, max: 1000000 }),
      userId: faker.string.uuid(),
      revenue: faker.number.float({ min: 0.1, max: 10, fractionDigits: 2 }),
      revenueSource: faker.helpers.arrayElement([
        "Subscriptions",
        "Ads",
        "Downloads",
        "Licensing",
        "Merchandise",
      ]),
    };
  });
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
