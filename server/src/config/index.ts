import { z } from 'zod';
import { config } from 'dotenv';
config();

const envSchema = z.object({
  PORT: z.string().trim().min(1),
  CORS_ORIGIN: z.string().trim().min(1),
});

export const env = envSchema.parse(process.env);
