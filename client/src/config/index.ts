import { z } from 'zod';

const envSchema = z.object({
  VITE_HTTP_SERVER_URL: z.string().trim().min(1),
  VITE_WS_SERVER_URL: z.string().trim().min(1),
});

export const env = envSchema.parse(import.meta.env);
