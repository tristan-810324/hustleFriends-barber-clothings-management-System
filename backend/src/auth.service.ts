import { OtpPurpose, Prisma } from '@prisma/client';
import { prisma } from './database.js';
import { isProduction } from './config.js';
import { sendCodeEmail } from './mail.js';
import { compareSecret, createOtp, createToken, hashSecret, hashToken, signAuthToken } from './security.js';

type AuthErrorCode = 'INVALID_CREDENTIALS' | 'ACCOUNT_EXISTS' | 'UNVERIFIED' | 'INACTIVE' | 'INVALID_OTP' | 'OTP_EXPIRED' | 'OTP_ATTEMPTS' | 'RESET_EXPIRED' | 'RESET_ACCOUNT_NOT_FOUND';
export class AuthError extends Error {
  constructor(public readonly code: AuthErrorCode) { super(code); }
}

const safeUser = (user: { id: string; email: string; fullName: string; role: 'CLIENT' | 'STAFF' | 'OWNER' }) => ({
  id: user.id,
  email: user.email,
  fullName: user.fullName,
  role: user.role
});

async function issueOtp(userId: string, email: string, purpose: OtpPurpose) {
  const code = createOtp();
  const codeHash = await hashSecret(code);
  await prisma.$transaction([
    prisma.otp.updateMany({ where: { userId, purpose, isUsed: false }, data: { isUsed: true } }),
    prisma.otp.create({ data: { userId, codeHash, purpose, expiresAt: new Date(Date.now() + 10 * 60 * 1000) } })
  ]);
  await sendCodeEmail(email, code, purpose === OtpPurpose.REGISTRATION ? 'verification' : 'reset');
}

export async function resendVerificationOtp(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.isVerified) return;
  await issueOtp(user.id, user.email, OtpPurpose.REGISTRATION);
}

export async function register(input: { fullName: string; email: string; password: string }) {
  const passwordHash = await hashSecret(input.password);
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing?.isVerified) throw new AuthError('ACCOUNT_EXISTS');

  const user = await prisma.$transaction(async (tx) => {
    const saved = existing
      ? await tx.user.update({ where: { id: existing.id }, data: { fullName: input.fullName, passwordHash, isActive: true } })
      : await tx.user.create({ data: { fullName: input.fullName, email: input.email, passwordHash } });
    await tx.otp.updateMany({ where: { userId: saved.id, purpose: OtpPurpose.REGISTRATION, isUsed: false }, data: { isUsed: true } });
    return saved;
  });
  await issueOtp(user.id, user.email, OtpPurpose.REGISTRATION);
  return { email: user.email };
}

export async function verifyOtp(email: string, code: string, purpose: OtpPurpose) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AuthError('INVALID_OTP');
  const pending = await prisma.otp.findFirst({ where: { userId: user.id, purpose, isUsed: false }, orderBy: { createdAt: 'desc' } });
  if (!pending) throw new AuthError('INVALID_OTP');
  if (pending.expiresAt <= new Date()) throw new AuthError('OTP_EXPIRED');
  if (pending.attempts >= 5) throw new AuthError('OTP_ATTEMPTS');
  const matches = await compareSecret(code, pending.codeHash);
  if (!matches) {
    await prisma.otp.update({ where: { id: pending.id }, data: { attempts: { increment: 1 } } });
    throw new AuthError('INVALID_OTP');
  }

  await prisma.$transaction([
    prisma.otp.update({ where: { id: pending.id }, data: { isUsed: true } }),
    ...(purpose === OtpPurpose.REGISTRATION
      ? [prisma.user.update({ where: { id: user.id }, data: { isVerified: true } })]
      : [])
  ] as [Prisma.PrismaPromise<unknown>, ...Prisma.PrismaPromise<unknown>[]]);
  return safeUser(user);
}

export async function login(input: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user || !(await compareSecret(input.password, user.passwordHash))) throw new AuthError('INVALID_CREDENTIALS');
  if (!user.isActive) throw new AuthError('INACTIVE');
  if (!user.isVerified) throw new AuthError('UNVERIFIED');
  return { user: safeUser(user), token: signAuthToken({ userId: user.id, role: user.role }) };
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.isActive) throw new AuthError('INVALID_CREDENTIALS');
  return safeUser(user);
}

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive) {
    if (!isProduction) throw new AuthError('RESET_ACCOUNT_NOT_FOUND');
    return;
  }
  const code = createOtp();
  await prisma.$transaction([
    prisma.passwordReset.updateMany({ where: { userId: user.id, isUsed: false }, data: { isUsed: true } }),
    prisma.passwordReset.create({ data: { userId: user.id, tokenHash: await hashSecret(code), expiresAt: new Date(Date.now() + 10 * 60 * 1000) } })
  ]);
  await sendCodeEmail(user.email, code, 'reset');
}

export async function verifyResetOtp(email: string, code: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  const reset = user ? await prisma.passwordReset.findFirst({ where: { userId: user.id, isUsed: false }, orderBy: { createdAt: 'desc' } }) : null;
  if (!user || !reset || reset.expiresAt <= new Date() || !(await compareSecret(code, reset.tokenHash))) {
    throw new AuthError('RESET_EXPIRED');
  }
  const token = createToken();
  await prisma.passwordReset.update({ where: { id: reset.id }, data: { tokenHash: hashToken(token) } });
  return token;
}

export async function resetPassword(input: { email: string; token: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  const reset = user ? await prisma.passwordReset.findFirst({ where: { userId: user.id, tokenHash: hashToken(input.token), isUsed: false } }) : null;
  if (!user || !reset || reset.expiresAt <= new Date()) throw new AuthError('RESET_EXPIRED');
  const passwordHash = await hashSecret(input.password);
  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
    prisma.passwordReset.update({ where: { id: reset.id }, data: { isUsed: true } })
  ]);
}
