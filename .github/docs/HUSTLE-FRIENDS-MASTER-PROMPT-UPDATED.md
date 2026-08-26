# 🚀 HUSTLE FRIENDS — MASTER DEVELOPMENT PROMPT

## 1. PROJECT OVERVIEW

**Project:** Hustle Friends
**Type:** Enterprise-Grade Unified Web Ecosystem & Automated Transaction Management System
**Purpose:** Academic Capstone / Portfolio Prototype
**Important:** No public e-commerce storefront. Academic prototype only.

### Core Features

* Online appointment booking + priority scheduling
* In-shop walk-in POS
* Services + physical products
* Inventory management
* Barber/staff scheduling & assignment
* Real-time notifications
* Multi-role management
* Financial reports & exports
* Audit/activity logging

---

## 2. USER ROLES

### CLIENT

* Book service + barber + timeslot
* View/cancel/reschedule bookings
* Booking & transaction history
* Notifications
* Profile/settings

### STAFF

* Dashboard & analytics
* Manage bookings/status
* Assign barber
* Walk-in POS + thermal receipt
* Inventory viewing + low-stock alerts
* Payment logs + exports
* Barber schedules/breaks
* Notifications
* Inquiry messages
* Settings

### OWNER

* Executive dashboard
* Sales/charts/top products & services
* Inventory CRUD
* Services/add-ons/pricing CRUD
* Staff management
* Master booking/payment logs
* Financial reports/exports
* Audit logs
* Notifications/settings

---

## 3. MANDATORY BUSINESS RULES

* Services and physical Products are separate entities.
* Staff can process POS transactions.
* Owner manages inventory, services, staff and system-wide data.
* Barber assignment must prevent double-booking.
* Working hours and break times must affect availability.
* Booking cancellation/rescheduling must follow timeframe rules.
* Low-stock levels must be detected automatically.
* POS checkout must safely update stock.
* Sensitive actions must create immutable AuditLogs.
* Never trust user-supplied `userId` for ownership checks.
* Use database transactions for critical operations.
* Protect against stock race conditions and booking race conditions.

---

## 4. TECH STACK

### Frontend

* React
* Vite
* TypeScript
* React Router
* TanStack Query
* shadcn/ui
* Dark Mode

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL/ MYSQL NA USING MYSQL WORKBENCH

### Supporting Technologies

* Socket.io — real-time notifications
* JWT — authentication
* Nodemailer — OTP/email
* bcryptjs — password hashing
* Zod — validation
* Helmet — security headers
* CORS
* express-rate-limit
* ExcelJS / XLSX — CSV/Excel exports
* PDFMake / React-PDF — receipts/reports

---

## 5. AUTHENTICATION & SECURITY

### Registration

`Register → Generate 6-digit OTP → Email → Verify OTP → isVerified`

* OTP expires in 3–5 minutes.
* OTP is single-use.

### Login

* Verify email/password.
* Passwords use bcrypt.
* Issue JWT through **httpOnly + Secure + SameSite=Strict cookie**.
* Never store JWT in localStorage.

### RBAC

Every protected endpoint must use:

```text
authMiddleware
→ roleMiddleware(...)
→ controller
```

Roles:

```text
CLIENT
STAFF
OWNER
```

### Security Requirements

* Zod validation on incoming data.
* Prisma parameterized queries.
* Rate limiting for login/OTP.
* Helmet.
* Restricted CORS.
* Ownership/IDOR protection.
* Never trust client-provided role/userId.
* Audit sensitive operations.

---

## 6. CORE DATABASE MODELS

Prisma schema must include at minimum:

```text
User
Service
Product
BarberSchedule
Booking
Transaction
PaymentLog
AuditLog
Notification
Message
```

### Important Relationships

* User → Bookings
* User → Transactions
* User → AuditLogs
* User → Notifications
* Booking → Service
* Booking → Barber/User
* Product → Inventory/transactions
* Transaction → Products/Services
* BarberSchedule → Barber/User

Use:

* Primary keys
* Foreign keys
* Proper indexes
* Unique constraints
* Enums for roles/statuses
* Timestamps
* Referential integrity

---

## 7. REST API STRUCTURE

### AUTH

```text
POST /api/auth/register
POST /api/auth/verify-otp
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### CLIENT

```text
GET    /api/client/services
GET    /api/client/barbers/availability
POST   /api/client/bookings
GET    /api/client/bookings/history
PATCH  /api/client/bookings/:id/cancel
PATCH  /api/client/bookings/:id/reschedule
GET    /api/client/transactions
```

### STAFF

```text
GET    /api/staff/dashboard/analytics
GET    /api/staff/bookings
PATCH  /api/staff/bookings/:id/status
POST   /api/staff/pos/checkout
GET    /api/staff/inventory
GET    /api/staff/payment-logs
GET    /api/staff/payment-logs/export/csv
GET    /api/staff/payment-logs/export/word
GET    /api/staff/messages
```

### OWNER

```text
GET    /api/owner/analytics/executive
POST   /api/owner/inventory
PUT    /api/owner/inventory/:id
DELETE /api/owner/inventory/:id

POST   /api/owner/services
PUT    /api/owner/services/:id
DELETE /api/owner/services/:id

GET    /api/owner/staff
POST   /api/owner/staff
GET    /api/owner/audit-logs
```

All endpoints must have proper authentication, authorization, validation and error handling.

---

## 8. MASTER PROJECT FOLDER STRUCTURE

This is the **canonical / master folder architecture** for Hustle Friends.

> **RULE:** Do not create random folders or place business logic wherever convenient. New files must follow this structure unless there is a clear architectural reason to change it.

```text
hustlefriends/
│
├── .github/
│   ├── agents/                 # AI coding-agent instructions
│   └── docs/                   # Master prompts, architecture docs, project docs
│
├── backend/
│   ├── src/
│   │   ├── config/             # Environment, database, app configuration
│   │   ├── controllers/        # HTTP request/response handling
│   │   ├── middleware/         # Auth, RBAC, validation, errors, rate limits
│   │   ├── routes/             # API route definitions only
│   │   ├── services/            # Business logic
│   │   ├── validators/          # Zod request schemas
│   │   ├── sockets/             # Socket.io events/handlers
│   │   ├── utils/               # Reusable backend helpers
│   │   ├── types/               # Backend TypeScript types
│   │   ├── app.ts               # Express app configuration
│   │   └── server.ts            # Server entry point
│   │
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── seed.ts              # Development/initial seed data
│   │
│   ├── tests/                   # Backend tests
│   ├── .env                     # Local secrets - NEVER commit
│   ├── .env.example             # Safe environment variable template
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/                  # Static public assets
│   │
│   ├── src/
│   │   ├── auth/                # Login, registration, OTP/auth UI
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   │
│   │   ├── landing/             # Public landing page sections
│   │   │   ├── components/
│   │   │   └── LandingPage.tsx
│   │   │
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ui/              # Generic UI components
│   │   │   ├── common/           # Shared business-independent components
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   ├── layouts/             # Client, Staff and Owner layouts
│   │   │   ├── ClientLayout.tsx
│   │   │   ├── StaffLayout.tsx
│   │   │   └── OwnerLayout.tsx
│   │   │
│   │   ├── pages/               # Route-level screens
│   │   │   ├── client/
│   │   │   │   ├── Booking.tsx
│   │   │   │   ├── BookingHistory.tsx
│   │   │   │   ├── Transactions.tsx
│   │   │   │   ├── Notifications.tsx
│   │   │   │   └── Profile.tsx
│   │   │   │
│   │   │   ├── staff/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Bookings.tsx
│   │   │   │   ├── POS.tsx
│   │   │   │   ├── Inventory.tsx
│   │   │   │   ├── PaymentLogs.tsx
│   │   │   │   └── Messages.tsx
│   │   │   │
│   │   │   └── owner/
│   │   │       ├── ExecutiveDashboard.tsx
│   │   │       ├── Inventory.tsx
│   │   │       ├── Services.tsx
│   │   │       ├── Staff.tsx
│   │   │       ├── Reports.tsx
│   │   │       └── AuditLogs.tsx
│   │   │
│   │   ├── services/             # API calls / server communication
│   │   │   ├── api.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── booking.service.ts
│   │   │   ├── transaction.service.ts
│   │   │   └── inventory.service.ts
│   │   │
│   │   ├── hooks/                # Reusable React hooks
│   │   ├── types/                # Shared frontend TypeScript types
│   │   ├── utils/                # Frontend helpers/formatters
│   │   ├── routes/               # React Router configuration
│   │   ├── lib/                  # Third-party library configuration
│   │   ├── assets/               # Images, icons and local assets
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── tests/                    # Frontend tests
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── index.html
│
├── .gitignore
├── README.md
└── docker-compose.yml            # Add when Docker setup is implemented
```

### Folder Responsibility Rules

```text
FRONTEND
    UI / user interaction / routing / API consumption
                    ↓
              HTTP / Socket.io
                    ↓
BACKEND
    routes
      ↓
    middleware
      ↓
    controllers
      ↓
    services
      ↓
    Prisma
      ↓
POSTGRESQL DATABASE
```

### Backend Rules

- `routes/` defines endpoints only.
- `middleware/` handles authentication, RBAC, validation and request protection.
- `controllers/` handles HTTP input/output.
- `services/` contains business logic.
- `validators/` contains Zod schemas.
- `prisma/` contains database schema and seed logic.
- Critical operations use `prisma.$transaction()`.
- Routes must **not** contain complex business logic.

### Frontend Rules

- `pages/` contains route-level screens.
- `components/` contains reusable components.
- `layouts/` contains role-based application shells.
- `services/` handles API communication.
- `hooks/` contains reusable React logic.
- `types/` contains TypeScript types.
- `utils/` contains pure helper functions.
- `auth/` contains authentication-related screens/components.
- `landing/` contains the public landing page only.
- Keep API calls out of large UI components when a service module is appropriate.

### Role Separation

```text
CLIENT
└── pages/client/

STAFF
└── pages/staff/

OWNER
└── pages/owner/
```

Never rely on frontend hiding alone for authorization. The backend must enforce the same RBAC rules.

### Current Project Migration Rule

The existing frontend may currently contain:

```text
src/
├── auth/
├── components/
├── landing/
├── App.tsx
├── index.css
└── main.tsx
```

This is acceptable during development. As features are implemented, organize new route-level screens and modules according to the **master structure above**. Do not perform a large destructive restructure unless it is necessary.

### Build Order Based on the Master Structure

```text
1. Root project architecture
2. Backend configuration + Prisma
3. Database schema + migrations + seed
4. Authentication + OTP
5. JWT cookie authentication
6. RBAC middleware
7. Frontend routing + protected routes
8. Owner Services
9. Owner Inventory
10. Barber schedules
11. Client booking + availability
12. Staff booking management
13. Staff POS + payments
14. Inventory/stock transaction safety
15. Socket.io notifications
16. Dashboards + analytics
17. Reports + exports
18. Audit logs
19. Testing + security hardening
20. UI/UX polish
```

---

## 9. FRONTEND ARCHITECTURE

### Login Redirect

```text
CLIENT → /client/booking
STAFF  → /staff/dashboard
OWNER  → /owner/executive-dashboard
```

---

---

## 10. BACKEND ARCHITECTURE

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── utils/
│   ├── sockets/
│   ├── types/
│   ├── app.ts
│   └── server.ts
├── prisma/
│   └── schema.prisma
└── .env
```

Use separation of concerns:

```text
Route → Middleware → Controller → Service → Prisma → Database
```

Business logic must not be placed directly inside routes.

---

## 11. CRITICAL TRANSACTION LOGIC

### POS Checkout

Must atomically:

```text
Validate cart
→ Validate stock
→ Calculate totals
→ Create transaction
→ Create payment
→ Deduct stock
→ Create audit log
→ Commit
```

Use:

```text
prisma.$transaction()
```

### Booking

Must verify:

```text
Service exists
+ Barber exists
+ Working hours
+ Break schedule
+ Timeslot availability
+ No conflicting booking
```

Then create booking using a safe database transaction/constraint strategy.

---

## 12. REAL-TIME FEATURES

Use **Socket.io** for:

* New booking notifications
* Booking status changes
* Payment notifications
* Low-stock alerts
* System notifications

---

## 13. AUDIT TRAIL

`AuditLog` must be treated as immutable.

Record sensitive actions such as:

```text
LOGIN
PAYMENT_CREATED
PAYMENT_VOIDED
STOCK_UPDATED
PRODUCT_CREATED
PRICE_CHANGED
BOOKING_CANCELLED
BOOKING_UPDATED
STAFF_CREATED
STAFF_UPDATED
```

Include:

```text
userId
action
timestamp
IP
details
```

---

## 14. DEVELOPMENT ORDER

Build in this order:

```text
1. Project + folder architecture
2. PostgreSQL + Prisma schema
3. Migrations + seed data
4. Authentication + OTP
5. JWT cookie authentication
6. RBAC middleware
7. Owner Services CRUD
8. Owner Inventory CRUD
9. Barber schedules
10. Client booking + availability
11. Staff booking management
12. POS + payment + stock transactions
13. Notifications + Socket.io
14. Dashboards + analytics
15. Reports + CSV/Excel/PDF exports
16. Audit logs
17. Validation + error handling
18. Security hardening
19. Testing race conditions
20. UI/UX polish
```

---

## 15. DEVELOPMENT STANDARD

Every implementation must prioritize:

* Clean Architecture
* TypeScript type safety
* Reusable components
* Separation of concerns
* Secure authentication
* RBAC
* Input validation
* Database integrity
* Proper error handling
* Transaction safety
* Responsive UI
* Maintainable code
* Professional GitHub structure

**Do not over-engineer. Build the simplest production-style solution that satisfies the requirements.**

---

## 16. ENVIRONMENT VARIABLES

```env
PORT=5000
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

Keep the same variable structure for local development and production.

---

## 17. MASTER RULE FOR AI CODING ASSISTANTS

Before writing code:

1. Understand the existing architecture.
2. Do not break existing functionality.
3. Follow the defined roles and permissions.
4. Follow the database relationships.
5. Validate all user input.
6. Protect every private route.
7. Use transactions for critical operations.
8. Never trust client-controlled identity/role data.
9. Keep frontend and backend responsibilities separate.
10. Write clean, modular, production-style TypeScript.
11. Explain what files are changed and why.
12. Do not introduce unnecessary libraries or architecture.
13. If a requirement conflicts with this master prompt, prioritize **security, data integrity, RBAC, and existing architecture**.
14. Treat this document as the **single source of truth** for Hustle Friends development.

### FINAL GOAL

Build **Hustle Friends** as a realistic enterprise-style barber shop management ecosystem combining:

**Booking + Scheduling + POS + Inventory + Payments + Notifications + Staff Management + Analytics + Audit Trail**

while maintaining **secure authentication, RBAC, database integrity, race-condition protection, clean architecture, and maintainable code.**






# SYSTEM NAME: Hustle Friends Co.
# ROLE: Enterprise-Grade Barbershop Operations, Booking & POS Platform
# TECH STACK: React + Vite (TypeScript), Node.js + Express (TypeScript), PostgreSQL, Prisma ORM

## 1. PROJECT OVERVIEW & GOAL
Hustle Friends Co. is an internal shop management system and client appointment platform. The system eliminates public e-commerce storefronts to focus entirely on two core operational hubs:
1. Online Client Appointment Booking (Haircut Services & Barber Selection)
2. In-Shop Staff Point-of-Sale (POS) Terminal for Walk-In Customers (Services & Physical Products)

## 2. SYSTEM ARCHITECTURE & ROLES

### A. CLIENT ROLE
- **Authentication:** Registration with Nodemailer OTP email verification (using 6-digit expiring code), Login via HttpOnly JWT cookie.
- **Service & Barber Selection:** Browse haircut services, add-ons, pricing, and choose specific barbers with real-time slot availability.
- **Appointment Booking:** Schedule appointments with real-time double-booking protection.
- **Booking History:** View status (PENDING, CONFIRMED, COMPLETED, CANCELLED) with cancellation/reschedule actions subject to time limits.
- **Transaction History:** Real-time visibility into digital payment receipts and service transactions.
- **Notifications & Settings:** Account profile management and system status updates.

### B. STAFF ROLE
- **Operational Dashboard:** Live counters for Today's Revenue, Transaction Count, and Active/Pending Appointments.
- **Manage Bookings:** Interface to view, assign/re-assign barbers, and transition appointment statuses (`PENDING` -> `IN_PROGRESS` -> `COMPLETED`).
- **Walk-In POS Console:** High-speed checkout terminal for walk-ins (supports services and physical product inventory) with staff/barber tagging.
- **Inventory Monitor:** Read-only access to physical stock levels with visual low-stock badges.
- **Payment Logs & Export:** Transaction history console with dynamic export capabilities (Excel/CSV via `exceljs` and PDF/Word reporting).
- **Inquiry Inbox & Real-Time Notifications:** Live messaging interface for landing page customer inquiries via `Socket.io`.

### C. OWNER ROLE
- **Executive Analytics Panel:** High-level metrics for overall shop performance, top-performing services, barber revenue generation, and financial trends.
- **Inventory CRUD Console:** Add, update, and manage stock quantities and physical products displayed on the Staff POS.
- **Services CRUD Console:** Dynamic management of haircut menu, add-ons, pricing, and duration settings.
- **Staff & Barber Management:** Account provisioning, credential management, shift schedule declaration, and Role-Based Access Control (RBAC).
- **Audit Logs:** Immutable multi-level logging tracking sensitive actions (voids, stock updates, price changes, status overrides).

## 3. TECHNICAL & SECURITY SPECIFICATIONS

### A. DATABASE SCHEMA (Prisma ORM + PostgreSQL)
- **User Models:** Multi-role user tables (`CLIENT`, `STAFF`, `OWNER`) with hashed passwords (`bcryptjs`).
- **Booking & Schedule Models:** Slot protection, status tracking, and foreign keys linking `Client`, `Barber`, and `Service`.
- **Inventory & POS Models:** Product variants, stock tracking, transaction logs, and line items.
- **Concurrency & Data Protection:** Enforce Prisma Transactions (`prisma.$transaction`) during POS checkout and appointment creation to guarantee stock locking and prevent race conditions / double bookings.

### B. SECURITY IMPLEMENTATION
- **Auth Storage:** JWT tokens issued upon authentication MUST be stored inside `httpOnly`, `SameSite=Strict`, `Secure` cookies. NO storage in LocalStorage.
- **API Defense:** Enforce `cors` strictly for the React frontend domain, `helmet` for secure HTTP headers, and `express-rate-limit` on sensitive auth routes (`/login`, `/verify-otp`).
- **Input Validation:** Use `zod` schema validation on all incoming request bodies before processing database controllers.
- **Role Control:** Protected Express endpoints enforced via `authMiddleware` and `roleMiddleware(['ROLE'])`.

## 4. UI/UX DESIGN SYSTEM
- **Theme:** Dark-mode primary design system using Clean, Modern UI components (`shadcn/ui` or `Tailwind CSS`).
- **Responsiveness:** Highly visual, desktop-optimized layouts for Staff POS & Owner Panels; mobile-friendly responsive views for Client Booking screens. \

## 5. deployement docker mo muna tas render para libre deployement
                                 