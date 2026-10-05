import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  FRONTEND_URL: z.string().url(),
  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  COOKIE_SECURE: z.enum(['true', 'false']).default('false')
});

export const config = envSchema.parse(process.env);
export const isProduction = process.env.NODE_ENV === 'production';
export const cookieOptions = {
  httpOnly: true,
  secure: config.COOKIE_SECURE === 'true' || isProduction,
  sameSite: 'strict' as const,
  path: '/',
  maxAge: 1000 * 60 * 60 * 24
};

export const resetCookieOptions = {
  ...cookieOptions,
  maxAge: 1000 * 60 * 10
};
