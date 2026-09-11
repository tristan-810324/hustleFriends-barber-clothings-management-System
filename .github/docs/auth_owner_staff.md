Markdown
# 🛡️ Admin, Owner & Staff Authentication Architecture

Document Version: 1.1.0  
Last Updated: September 2026  
Project: Hustle & Friends Barbershop Management System  

---

## 📌 Executive Summary
Di tulad ng pampublikong Client Registration (na dumadaan sa 6-digit OTP verification), ang **OWNER** at **STAFF** accounts ay itinuturing na *elevated access roles*. 

Upang mapanatili ang mataas na antas ng seguridad at integridad sa negosyo, ang mga accounts na ito ay binubuo at pinamamahalaan gamit ang **Enterprise Onboarding Strategy**:
1. **Initial Bootstrap via Database Seeding (`seed.ts`)**: Para sa paunang Master Owner account at default test staff.
2. **Owner-Initiated Staff Provisioning**: Ang paglikha ng mga bagong Barber o Cashier account ay eksklusibong ginagawa ng Owner mula sa Management Console (`#owner`); ang backend API nito ay `/api/owner/staff`.
3. **Owner Admin Password Reset Override**: Diretso at mabilis na mapapalitan ng Owner ang password ng sinumang Staff mula mismo sa Owner Dashboard.

---

## 🏗️ Account Lifecycles Comparison

| Feature / Attribute | Client Account | Staff Account | Owner Account |
| :--- | :--- | :--- | :--- |
| **Account Creation Source** | Public Registration (`/register`) | Owner Panel (`POST /api/owner/staff`) | Prisma Database Seed / System Setup |
| **Email OTP Verification** | Required bago makapag-login | Seeded Staff is pre-verified; Owner-created Staff starts unverified and requires OTP | Pre-verified (`isVerified: true`) |
| **Default Password** | User-defined | Owner-assigned Temporary Password | System/Seed-defined Password |
| **Password Management** | Self-service via OTP | Owner Override Dashboard / Self-service OTP | Self-service via OTP |
| **Allowed Dashboard Access** | Client Portal (`#client`) | Staff POS & Schedules (`#staff`) | Full Owner Management Console (`#owner`) |

---

## 🛠️ Step-by-Step Implementation Guide

### 1. Database Seeding (`prisma/seed.ts`)
Gamitin ang script na ito para sa kauna-unahang pag-populate ng Master Owner at Initial Staff sa database.

Likhain o i-update ang `backend/prisma/seed.ts`:

```typescript
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash secure default passwords
  const ownerPassword = await bcrypt.hash('OwnerSecure123!', 10);
  const staffPassword = await bcrypt.hash('StaffSecure123!', 10);

  // 1. Seed Master Owner Account
  const owner = await prisma.user.upsert({
    where: { email: 'owner@hustlefriends.com' },
    update: {},
    create: {
      email: 'owner@hustlefriends.com',
      fullName: 'Master Owner',
      passwordHash: ownerPassword,
      role: Role.OWNER,
      isVerified: true,
    },
  });

  // 2. Seed Initial Staff Account
  const staff = await prisma.user.upsert({
    where: { email: 'staff@hustlefriends.com' },
    update: {},
    create: {
      email: 'staff@hustlefriends.com',
      fullName: 'Senior Barber',
      passwordHash: staffPassword,
      role: Role.STAFF,
      isVerified: false,
    },
  });

  console.log('✅ Real-world Seed Completed Successfully:');
  console.log(`  Owner Account: ${owner.email}`);
  console.log(`  Staff Account: ${staff.email}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
2. Configure package.json for Seeding
Idagdag ang sumusunod sa backend/package.json para iregister ang seed runner sa Prisma CLI:

JSON
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
3. Running the Seeder Command
I-run ang command na ito mula sa backend/ folder:

Bash
npx prisma db seed
🔑 Staff Management & Provisioning Flow (Owner Console)
Kapag online na ang system, ang Owner lang ang may karapatang magdagdag at mag-manage ng Staff accounts.

A. Staff Account Creation
Workflow:

Request: Magsusumite ang Owner ng form sa /owner/staff na naglalaman ng fullName, email, at password.

Authorization: Haharangin ng authMiddleware at roleMiddleware(['OWNER']) ang sinumang hindi Owner.

Creation: Isasave ang bagong Owner-created Staff record sa database na may role: 'STAFF' at isVerified: false. Magpapadala ng OTP para sa unang login; magiging verified lang pagkatapos ng tamang OTP. Ang default seeded Staff account ay trusted bootstrap data at isVerified: true.

Endpoint Specs:

URL: POST /api/owner/staff

Headers: Cookie: token=<jwt_token>

Request Body:

JSON
{
  "fullName": "Juan Dela Cruz",
  "email": "barber.juan@hustlefriends.com",
  "password": "TemporaryPassword123!"
}
Response Structure (201 Created):

JSON
{
  "status": "success",
  "message": "Staff account created successfully",
  "data": {
    "id": "cm123456789...",
    "fullName": "Juan Dela Cruz",
    "email": "barber.juan@hustlefriends.com",
    "role": "STAFF"
  }
}
B. Owner Staff Password Override (Option B Implementation)
Workflow:

Action: Pindutin ng Owner ang "Reset Password" button katabi ng pangalan ng Staff sa Owner Dashboard.

Validation: Ipa-validate ang bagong password gamit ang Zod schema.

Hash & Update: Awtomatikong i-ha-hash ng backend ang bagong password gamit ang bcryptjs at iu-update ang Staff record.

Endpoint Specs:

URL: PATCH /api/owner/staff/:id/reset-password

Headers: Cookie: token=<jwt_token>

Request Body:

JSON
{
  "newPassword": "NewStaffPassword2026!"
}
Response Structure (200 OK):

JSON
{
  "status": "success",
  "message": "Staff password updated successfully by Owner"
}
🔒 Security Best Practices Implemented
No Public Owner/Staff Registration: Walang pampublikong signup form para sa Owner o Staff roles para maiwasan ang privilege escalation attacks.

HttpOnly Cookies: Lahat ng authentication tokens ay ipinapadala sa secure, HttpOnly, at SameSite cookies.

Role-Based Access Control (RBAC): Bawat protected route ay nag-ve-verify kung sakop ng User Role ang hinihinging resource o action.

Owner Direct Management: Ang Owner lamang ang may access sa endpoint na pwedeng mag-override ng passwords ng mga Staff.