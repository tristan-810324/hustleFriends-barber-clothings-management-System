import { z } from 'zod';

const email = z.string().trim().toLowerCase().email().max(254);
const password = z.string().min(8).max(128);
const otp = z.string().regex(/^\d{6}$/, 'OTP must be a 6-digit code');

export const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email,
  password
}).strict();

export const verifyOtpSchema = z.object({ email, otp }).strict();
export const emailSchema = z.object({ email }).strict();
export const loginSchema = z.object({ email, password }).strict();
export const forgotPasswordSchema = z.object({ email }).strict();
export const resetPasswordSchema = z.object({ email, token: z.string().min(32).max(128), password }).strict();
export const createStaffSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email,
  password
}).strict();
export const resetStaffPasswordSchema = z.object({ newPassword: password }).strict();
