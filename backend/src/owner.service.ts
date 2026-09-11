import { Role } from '@prisma/client';
import { prisma } from './database.js';
import { hashSecret } from './security.js';
import { issueVerificationOtp } from './auth.service.js';

const staffFields = {
  id: true,
  fullName: true,
  email: true,
  role: true,
  isActive: true,
  createdAt: true
} as const;

export async function listStaff() {
  return prisma.user.findMany({
    where: { role: Role.STAFF },
    select: staffFields,
    orderBy: { createdAt: 'desc' }
  });
}

export async function createStaff(input: { fullName: string; email: string; password: string }) {
  const staff = await prisma.user.create({
    data: {
      fullName: input.fullName,
      email: input.email,
      passwordHash: await hashSecret(input.password),
      role: Role.STAFF,
      isVerified: false
    },
    select: staffFields
  });
  await issueVerificationOtp(staff.id, staff.email);
  return staff;
}

export async function resetStaffPassword(staffId: string, newPassword: string) {
  const staff = await prisma.user.findFirst({ where: { id: staffId, role: Role.STAFF } });
  if (!staff) return false;
  await prisma.user.update({
    where: { id: staffId },
    data: { passwordHash: await hashSecret(newPassword) }
  });
  return true;
}