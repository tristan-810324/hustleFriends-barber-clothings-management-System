# Hustle Friends Auth Setup

> Single reference for the implemented authentication system, local setup, terminal commands, troubleshooting, and verification history.

## Table of Contents

- [Architecture](#architecture)
- [Implemented Auth Flows](#implemented-auth-flows)
- [Files Added or Updated](#files-added-or-updated)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Run Commands](#run-commands)
- [User-Facing Notifications](#user-facing-notifications)
- [Troubleshooting](#troubleshooting)
- [Validation History](#validation-history)
- [Security Notes](#security-notes)
- [Remaining Work](#remaining-work)

## Architecture

- Frontend: React + TypeScript + Vite in `frontend/`.
- Backend: Node.js + Express + TypeScript in `backend/`.
- Database: PostgreSQL through Prisma ORM.
- Email: Nodemailer with Gmail SMTP for OTP delivery.
- Authentication: JWT in an `httpOnly` cookie; JWT is never stored in localStorage or sessionStorage.
- Local frontend API calls use the Vite proxy: `/api` -> `http://localhost:4000`.

## Implemented Auth Flows

### Registration and Verification

1. User submits full name, email, password, and confirmation password.
2. Backend normalizes and validates the input with Zod.
3. Existing verified emails receive an `ACCOUNT_EXISTS` response.
4. A new account is created as `CLIENT` with `isVerified=false`.
5. A six-digit OTP is generated, hashed, stored for 10 minutes, and sent by email.
6. The user submits the OTP. A valid code marks the account verified and invalidates the OTP.
7. If the user closes the site before verification, a later login with the correct password automatically sends a fresh OTP and opens the OTP field.
8. The registration and login resend buttons send a fresh OTP through the backend.

### Login and Client Redirect

1. The backend checks the email, password, active status, and verification status.
2. Unverified accounts cannot receive a JWT; they receive a new OTP instead.
3. Verified accounts receive a JWT in a secure `httpOnly` cookie.
4. `CLIENT` users are redirected to `#client`, where the proof dashboard shows the email and `AUTHENTICATED` status.
5. Logout clears the auth cookie.

### Forgot Password

1. The local development flow checks that an active Hustle Friends account exists.
2. Unknown emails receive a clear error and no OTP in local development.
3. Registered emails receive a six-digit reset OTP.
4. A valid reset OTP is replaced with a single-use reset token in a short-lived `httpOnly` cookie.
5. The new password is hashed and the reset record is invalidated.
6. Reset OTP resend calls the backend instead of displaying a placeholder message.

Google account existence is not queried. The check is against the Hustle Friends PostgreSQL `User` table.

## Files Added or Updated

### Backend

- `backend/package.json`: scripts and auth dependencies.
- `backend/tsconfig.json`: strict TypeScript build configuration.
- `backend/.env.example`: safe environment template without secrets.
- `backend/src/config.ts`: environment validation and cookie policies.
- `backend/src/database.ts`: shared Prisma Client.
- `backend/src/security.ts`: bcrypt, OTP, token, and JWT utilities.
- `backend/src/validators.ts`: strict Zod request schemas.
- `backend/src/mail.ts`: Gmail SMTP delivery and local OTP fallback.
- `backend/src/auth.service.ts`: registration, OTP, login, and reset business logic.
- `backend/src/auth.middleware.ts`: JWT cookie authentication and role middleware.
- `backend/src/auth.routes.ts`: auth API endpoints.
- `backend/src/server.ts`: Express, Helmet, CORS, rate limiting, and error handling.
- `backend/prisma/schema.prisma`: `User`, `Otp`, `PasswordReset`, and role/purpose enums.
- `backend/prisma/migrations/20260906074215_auth_foundation/migration.sql`: applied auth migration.

### Frontend

- `frontend/src/auth/api.ts`: credentialed API client using the Vite proxy.
- `frontend/src/auth/authMessages.ts`: shared friendly notification mapper.
- `frontend/src/auth/Login.tsx`: login, automatic unverified OTP, and redirect.
- `frontend/src/auth/Register.tsx`: registration, OTP, and resend flow.
- `frontend/src/auth/ForgotPassword.tsx`: reset request and account check.
- `frontend/src/auth/ResetOtp.tsx`: reset OTP verification and resend.
- `frontend/src/auth/ResetPassword.tsx`: password update form.
- `frontend/src/client/ClientDashboard.tsx`: authenticated client proof screen.
- `frontend/src/App.tsx`: hash view routing including `#client`.
- `frontend/vite.config.ts`: local API proxy and host configuration.

## Environment Setup

## What Was Implemented

The authentication foundation now follows the existing React + Vite frontend and a new local Node.js + Express backend.

### Backend

- Added a TypeScript backend in `backend/`.
- Added Prisma Client and PostgreSQL configuration.
- Added `User`, `Otp`, and `PasswordReset` auth models.
- Added `CLIENT`, `STAFF`, and `OWNER` roles.
- Passwords, OTPs, and reset tokens are stored as hashes only.
- Added Zod validation with unknown fields rejected.
- Added bcrypt password hashing and comparison.
- Added JWT authentication in an `httpOnly` cookie.
- Added `SameSite=Strict`, `Secure` in production, and local cookie settings.
- Added registration, email OTP verification, login, logout, forgot-password, reset OTP, and reset-password routes.
- Added Helmet, restricted CORS, JSON size limits, and auth rate limiting.
- Added trusted server-side role checks in auth middleware.
- Added `.env.example` and local environment values.

### Frontend

- Replaced mock auth responses with requests to the local API.
- Sends cookies with `credentials: include`.
- Removed reset token storage from `sessionStorage`.
- Keeps the reset token in a short-lived backend `httpOnly` cookie until the password is changed.
- Keeps the existing hash-based screens and UI.
- Added a client dashboard proof screen at `#client`.
- Successful `CLIENT` login redirects automatically to the client dashboard.
- The dashboard shows the authenticated email, an `AUTHENTICATED` status, and a logout action.
- Forgot-password now checks for an active Hustle Friends account before sending a reset OTP in local development.
- If a user registers but closes the site before OTP verification, the account remains unverified. A later login with the correct email and password opens the OTP prompt again.
- That unverified login attempt automatically sends a fresh verification OTP; the user does not need to press Resend first.
- A valid login OTP now verifies the account and signs the user in automatically.
- Login and registration resend buttons send a fresh OTP and show a clear status message.
- Auth errors are translated by `frontend/src/auth/authMessages.ts` into clear messages such as “The email or password is incorrect” and “That verification code has expired.”
- Registering with an email that already belongs to a verified account shows a clear sign-in message instead of `INVALID_CREDENTIALS`.

## Local Requirements

- Node.js and npm
- PostgreSQL running locally
- Database named `hustlefriends_db`
- SMTP credentials if registration or password reset emails should be delivered

The current project uses PostgreSQL because that is the existing Prisma schema and local `DATABASE_URL`. The master prompt mentions MySQL Workbench; switching databases requires an intentional Prisma/provider migration and is not done silently here.

For local development without SMTP settings, the backend logs the six-digit OTP in the backend terminal and allows the request to continue. This fallback is disabled in production; production requires working SMTP credentials.

## Environment

`backend/.env` contains local values and is ignored by Git. Copy the template when setting up another machine:

```powershell
Copy-Item backend/.env.example backend/.env
```

Then set `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`, and the SMTP values. Use a long random `JWT_SECRET`; the sample local value must not be used in production.

### DATABASE_URL Placement

Do not replace this line in `backend/prisma/schema.prisma`:

```prisma
url = env("DATABASE_URL")
```

That line tells Prisma to read the connection string from the environment. Put the actual local PostgreSQL connection string in `backend/.env`:

```dotenv
DATABASE_URL="postgresql://postgres:<your-postgres-password>@localhost:5432/hustlefriends_db?schema=public"
```

For the current local database, `<your-postgres-password>` is the password of the `postgres` user. Do not commit the real password to this README or any tracked file. The database name must be `hustlefriends_db`, PostgreSQL must be running on port `5432`, and the `postgres` user must be allowed to connect.

Current local connection settings:

| Setting | Value |
| --- | --- |
| Provider | PostgreSQL |
| Username | `postgres` |
| Host | `localhost` |
| Port | `5432` |
| Database | `hustlefriends_db` |
| Password | The local PostgreSQL password stored only in `backend/.env` |

The Prisma datasource must remain:

```prisma
datasource db {
	provider = "postgresql"
	url      = env("DATABASE_URL")
}
```

This is not an error by itself. If the editor underlines `env("DATABASE_URL")`, validate from the backend folder instead of replacing the line with a hardcoded password:

```powershell
cd backend
npm run prisma:validate
```

To verify the setup, run these commands from `backend/`:

```powershell
npm run prisma:validate
npm run prisma:migrate -- --name auth-foundation
```

If Prisma says `Environment variable not found: DATABASE_URL`, run the command from `backend/` and confirm that the file is exactly `backend/.env`, not only a root-level `.env` file.

## Run Locally

Install backend dependencies once:

```powershell
cd backend
npm install
npm run prisma:generate
```

Create/apply the local database migration after PostgreSQL is running:

```powershell
npm run prisma:migrate -- --name auth-foundation
```

Start the API:

```powershell
npm run dev
```

Keep this backend terminal open while using the registration screen. If it is stopped, the frontend will show `Failed to fetch` because nothing is listening on `http://localhost:4000`.

If Vite reports that port `5173` is busy and starts on `5174` or another port from `5173` to `5179`, the local backend accepts those development ports on both `localhost` and `127.0.0.1`.

In a second terminal, start the frontend:

```powershell
cd frontend
npm install
npm run dev
```

During local Vite development, `/api` is proxied to the backend at `http://localhost:4000`, so the browser uses the same frontend origin and avoids CORS fetch failures. To use a separate API origin, create `frontend/.env.local`:

```text
VITE_API_URL=http://localhost:4000
```

Forgot-password checks the Hustle Friends database, not Google's Gmail directory. In local development, an email with no registered Hustle Friends account receives a clear error and no OTP. Production keeps a generic response to reduce account-enumeration risk.

## User-Facing Notifications

The frontend maps backend error codes through `frontend/src/auth/authMessages.ts`:

| Backend value | Message shown to the user |
| --- | --- |
| `INVALID_CREDENTIALS` | The email or password is incorrect. |
| `ACCOUNT_EXISTS` | An account with this email already exists. Please sign in instead. |
| `UNVERIFIED` | Your email is not verified yet. We sent a new verification code to your inbox. |
| `INVALID_OTP` | That verification code is incorrect. Please check your email and try again. |
| `OTP_EXPIRED` | That verification code has expired. Please request a new code. |
| `OTP_ATTEMPTS` | Too many incorrect attempts. Please request a new verification code. |
| `RESET_EXPIRED` | Your password reset session has expired. Please request a new code. |
| `Failed to fetch` | We could not connect to the server. Please make sure the backend is running and try again. |

The UI never intentionally displays raw technical error codes.

## Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/verify-otp`
- `POST /api/auth/resend-otp`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/verify-reset-otp`
- `POST /api/auth/reset-password`
- `GET /api/auth/me`
- `GET /health`

## Validation Performed

The following checks passed during implementation:

```powershell
cd backend
npm run prisma:validate
npm run prisma:generate
npm run build

cd ../frontend
npm run build
npm run lint
```

Additional runtime checks passed during implementation:

```text
GET /health -> 200 {"status":"ok"}
Registration through the Vite proxy -> 201
Unverified login -> 403 with a new OTP message
Resend registration OTP -> 200
Forgot password for an unknown email -> 404 in local development
Forgot password for a registered email -> 200
Gmail SMTP verify -> SMTP_VERIFY_OK
Gmail test message -> accepted by Gmail
```

## Troubleshooting History

### `nmp run dev` or `npx run dev`

The correct command is `npm run dev`. Use `npx` only for commands such as `npx prisma studio`.

### `Failed to fetch`

Start both services in separate terminals:

```powershell
cd backend
npm run dev
```

```powershell
cd frontend
npm run dev
```

The frontend uses the Vite proxy configured in `frontend/vite.config.ts`, forwarding `/api` to port `4000`. If Vite moves from port `5173` to `5174`, use the URL printed by Vite and refresh with `Ctrl+Shift+R`.

### OTP not arriving

- Check the backend terminal for the local OTP fallback when SMTP is not configured.
- With Gmail SMTP configured, look in Inbox, Spam, Promotions, and All Mail.
- Confirm the registration email is the same recipient used in the form.
- Restart the backend after editing `backend/.env`.
- The test subject `Hustle Friends SMTP test` is not the real OTP. A registration OTP uses `Verify your Hustle Friends account`.

### `DATABASE_URL` editor warning

Keep this in `backend/prisma/schema.prisma`:

```prisma
url = env("DATABASE_URL")
```

The actual connection string belongs in `backend/.env`. Validate it from `backend/` with `npm run prisma:validate`.

## Security Notes

- Never commit `backend/.env`.
- Keep real Gmail App Passwords, database passwords, JWT secrets, OTPs, and tokens out of documentation.
- Revoke any App Password that was exposed and create a replacement.
- Passwords, OTPs, and reset tokens are hashed before database storage.
- JWT and reset tokens use `httpOnly` cookies.
- Never store JWTs in localStorage or sessionStorage.
- The local OTP fallback logs codes only during development; production requires SMTP.
- The local unknown-email response is useful for testing but production uses a generic reset response to reduce account enumeration.

## Remaining Work

This change implements the authentication foundation only. The larger master prompt still requires booking, POS, inventory, staff scheduling, notifications, audit logs, full RBAC route coverage, and automated auth tests. Those features need their own Prisma models, services, routes, and tests before the complete enterprise platform is considered done.
