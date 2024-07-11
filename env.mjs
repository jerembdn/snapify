import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    YOUTUBE_API_KEY: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().min(1).optional(),
  },
  runtimeEnv: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || "",
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
  },
  skipValidation: !!process.env.CI,
  emptyStringAsUndefined: true,
});
