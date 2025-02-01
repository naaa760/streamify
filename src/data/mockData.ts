import { faker } from "@faker-js/faker";
import { User, Stream, Song } from "../types/dashboard";

export const generateMockData = () => {
  // Generate Users
  const users: User[] = Array.from({ length: 500 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    lastActive: faker.date.recent(),
  }));

  // Generate Songs
  const songs: Song[] = Array.from({ length: 100 }, () => ({
    id: faker.string.uuid(),
    name: faker.music.songName(),
    artist: faker.person.fullName(),
    streams: faker.number.int({ min: 1000, max: 1000000 }),
    revenue: faker.number.float({ min: 100, max: 50000, fractionDigits: 2 }),
  }));

  // Generate Streams
  const streams: Stream[] = Array.from({ length: 1000 }, () => ({
    id: faker.string.uuid(),
    songId: faker.helpers.arrayElement(songs).id,
    userId: faker.helpers.arrayElement(users).id,
    timestamp: faker.date.recent(),
  }));

  return {
    users,
    songs,
    streams,
  };
};

export const mockData = generateMockData();
