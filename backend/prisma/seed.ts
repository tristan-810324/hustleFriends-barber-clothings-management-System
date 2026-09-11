import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const ownerPassword = await bcrypt.hash(process.env.SEED_OWNER_PASSWORD ?? 'Admin123!', 12);
  const staffPassword = await bcrypt.hash(process.env.SEED_STAFF_PASSWORD ?? 'Admin123!', 12);

  const owner = await prisma.user.upsert({
    where: { email: 'owner@hustlefriends.com' },
    update: { role: Role.OWNER, isVerified: true, isActive: true },
    create: { email: 'owner@hustlefriends.com', fullName: 'Master Owner', passwordHash: ownerPassword, role: Role.OWNER, isVerified: true }
  });
  const staff = await prisma.user.upsert({
    where: { email: 'staff@hustlefriends.com' },
    update: { role: Role.STAFF, isVerified: true, isActive: true },
    create: { email: 'staff@hustlefriends.com', fullName: 'Senior Barber', passwordHash: staffPassword, role: Role.STAFF, isVerified: true }
  });

  console.log(`Seeded owner: ${owner.email}`);
  console.log(`Seeded staff: ${staff.email}`);
}

main()
  .catch((error) => { console.error('Seeding failed:', error); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());