import { Router } from 'express';
import { OtpPurpose } from '@prisma/client';
import { ZodError } from 'zod';
import { cookieOptions, resetCookieOptions } from './config.js';
import * as authService from './auth.service.js';
import { authMiddleware } from './auth.middleware.js';
import { emailSchema, forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema, verifyOtpSchema } from './validators.js';

export const authRouter = Router();
const parse = <T>(schema: { parse: (value: unknown) => T }, value: unknown) => schema.parse(value);

function handleError(error: unknown, response: import('express').Response) {
  if (error instanceof ZodError) return response.status(400).json({ error: 'Invalid request' });
  if (error instanceof authService.AuthError) {
    if (error.code === 'RESET_ACCOUNT_NOT_FOUND') {
      return response.status(404).json({ error: 'No Hustle Friends account is registered with that email.' });
    }
    const status = error.code === 'INACTIVE' ? 403 : 400;
    return response.status(status).json({ error: error.code });
  }
  if (error instanceof Error && error.message === 'Email delivery is not configured') {
    return response.status(503).json({ error: 'Email delivery is not configured' });
  }
  return response.status(500).json({ error: 'Internal server error' });
}

authRouter.post('/register', async (request, response) => {
  try { return response.status(201).json(await authService.register(parse(registerSchema, request.body))); }
  catch (error) { return handleError(error, response); }
});

authRouter.post('/verify-otp', async (request, response) => {
  try {
    const input = parse(verifyOtpSchema, request.body);
    return response.json({ user: await authService.verifyOtp(input.email, input.otp, OtpPurpose.REGISTRATION) });
  } catch (error) { return handleError(error, response); }
});

authRouter.post('/resend-otp', async (request, response) => {
  try {
    const input = parse(emailSchema, request.body);
    await authService.resendVerificationOtp(input.email);
    return response.json({ message: 'If verification is pending, a new code has been sent.' });
  } catch (error) { return handleError(error, response); }
});

authRouter.post('/login', async (request, response) => {
  try {
    const result = await authService.login(parse(loginSchema, request.body));
    response.cookie('auth', result.token, cookieOptions);
    return response.json({ user: result.user });
  } catch (error) {
    if (error instanceof authService.AuthError && error.code === 'UNVERIFIED') {
      const input = parse(loginSchema, request.body);
      await authService.resendVerificationOtp(input.email);
      return response.status(403).json({ error: 'Email verification required', message: 'A new verification code has been sent to your email.' });
    }
    return handleError(error, response);
  }
});

authRouter.post('/logout', (_request, response) => response.clearCookie('auth', cookieOptions).status(204).send());

authRouter.get('/me', authMiddleware, async (request, response) => {
  if (!request.auth) return response.status(401).json({ error: 'Unauthorized' });
  const user = await authService.getCurrentUser(request.auth.userId);
  return response.json({ user });
});

authRouter.post('/forgot-password', async (request, response) => {
  try {
    const input = parse(forgotPasswordSchema, request.body);
    await authService.requestPasswordReset(input.email);
    return response.json({ message: 'If an account exists for that email, reset instructions have been sent.' });
  } catch (error) { return handleError(error, response); }
});

authRouter.post('/verify-reset-otp', async (request, response) => {
  try {
    const input = parse(verifyOtpSchema, request.body);
    const token = await authService.verifyResetOtp(input.email, input.otp);
    response.cookie('password_reset', token, resetCookieOptions);
    return response.json({ message: 'OTP verified.' });
  } catch (error) { return handleError(error, response); }
});

authRouter.post('/reset-password', async (request, response) => {
  try {
    const input = parse(resetPasswordSchema.omit({ token: true }), request.body);
    const token = request.cookies?.password_reset;
    if (!token) return response.status(400).json({ error: 'Reset session expired. Please request a new code.' });
    await authService.resetPassword({ ...input, token });
    return response.clearCookie('password_reset', resetCookieOptions).json({ message: 'Password updated.' });
  } catch (error) { return handleError(error, response); }
});
