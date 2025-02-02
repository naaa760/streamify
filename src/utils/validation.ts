import { z } from "zod";

export const streamSchema = z.object({
  id: z.string(),
  songName: z.string().min(1),
  artist: z.string().min(1),
  streams: z.number().positive(),
  revenue: z.number().min(0),
  streamedAt: z.string().datetime(),
});

export const validateStream = (data: unknown) => {
  try {
    return streamSchema.parse(data);
  } catch (error) {
    console.error("Stream validation error:", error);
    return null;
  }
};

export const validateStreamArray = (data: unknown) => {
  try {
    return z.array(streamSchema).parse(data);
  } catch (error) {
    console.error("Stream array validation error:", error);
    return [];
  }
};
