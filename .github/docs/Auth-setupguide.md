# Hustle Friends Authentication Setup Guide

## Layunin

Ang guide na ito ay step-by-step na proseso para buuin ang authentication system ng Hustle Friends ayon sa master prompt. Guide lamang ito: wala munang actual code implementation dito.

Sakop nito ang:

- Registration at email OTP verification
- Secure login gamit ang `httpOnly` JWT cookie
- Logout, forgot password, at reset password
- Role-based access control para sa `CLIENT`, `STAFF`, at `OWNER`
- Prisma database design at migrations
- Protected backend routes
- Frontend auth state at redirects
- Testing at deployment preparation para sa Render

Hindi muna kasama ang Docker. Ise-set up muna ang local PostgreSQL at normal Render deployment; Docker ay gagawin sa hiwalay na task kapag handa na.

## Target Auth Flow

### Registration

1. Tatanggap ng name, email, password, at optional profile details.
2. Iva-validate ang input gamit ang Zod.
3. Iche-check kung existing na ang email.
4. Iha-hash ang password gamit ang bcryptjs.
5. Gagawa ng user na may `isVerified = false` at default role na `CLIENT`.
6. Gagawa ng single-use, expiring six-digit OTP.
7. Ise-save ang hashed OTP at expiration time sa database.
8. Ipapadala ang plain OTP sa email gamit ang Nodemailer.
9. Hindi papayagang mag-login ang user hangga't hindi verified.

### OTP Verification

1. Tatanggap ng email at OTP.
2. Hahanapin ang pending verification record.
3. Iva-validate ang expiration, attempt limit, at single-use status.
4. Iko-compare ang submitted OTP sa hashed OTP.
5. Ise-set ang user bilang verified.
6. I-delete o i-invalidate ang OTP pagkatapos gamitin.
7. Magre-return ng success response; huwag agad maglagay ng JWT kung hiwalay ang login flow.

### Login

1. Tatanggap ng email at password.
2. Iva-validate ang request body at i-normalize ang email.
3. Hahanapin ang user nang hindi nagtitiwala sa role na galing sa client.
4. Iche-check ang password gamit ang bcryptjs.
5. Iche-check kung verified at active ang account.
6. Gagawa ng JWT na may server-controlled user identity at role.
7. Ise-set ang JWT sa `httpOnly`, `Secure`, `SameSite=Strict` cookie.
8. Hindi ilalagay ang JWT sa localStorage, sessionStorage, response body, o URL.
9. Magre-return lamang ng safe user data at role.

### Logout at Password Reset

- Logout: i-clear ang auth cookie gamit ang parehong cookie options na ginamit sa login.
- Forgot password: magbigay ng generic response para hindi ma-enumerate kung registered ang email.
- Reset password: gumamit ng single-use, expiring, hashed reset token; i-hash ang bagong password; i-invalidate ang lahat ng lumang reset tokens at sessions kung mayroon.
- Huwag mag-log ng passwords, OTPs, JWTs, reset tokens, o SMTP credentials.

## Phase 1: I-confirm ang Existing Architecture

Bago mag-code, i-check muna ang mga ito:

- Backend entry point, Express app, server, routes, controllers, at services.
- Existing Prisma schema at database provider.
- Existing TypeScript path aliases at error-handling pattern.
- Existing frontend router, auth pages, API client, at environment variables.
- Existing CORS configuration at frontend origin.
- Napiling PostgreSQL database para sa local development.

Decision checkpoint: huwag gumawa ng duplicate auth service, duplicate Prisma client, o panibagong response format kung mayroon nang local convention.

## Phase 2: Ihanda ang Environment

1. Siguraduhing may local PostgreSQL database at working database connection.
2. I-configure ang backend environment variables:
	- `PORT`
	- `DATABASE_URL`
	- `JWT_SECRET`
	- `FRONTEND_URL`
	- `SMTP_HOST`
	- `SMTP_PORT`
	- `SMTP_USER`
	- `SMTP_PASS`
3. Gumamit ng `.env.example` na may variable names lamang at walang secrets.
4. Siguraduhing naka-ignore ang `.env` sa Git.
5. Gumamit ng mahaba at random na JWT secret sa local at production.
6. I-define ang cookie policy para sa local at production. Sa production, kailangan ang `Secure`; kung magkaibang site ang frontend at backend, kailangang i-review ang `SameSite` policy bago i-deploy.

Validation checkpoint: dapat makakonekta ang backend sa PostgreSQL gamit ang environment variables bago magpatuloy sa auth logic.

## Phase 3: I-design ang Prisma Auth Models

I-review o idagdag ang mga sumusunod sa Prisma schema, gamit ang existing naming convention ng project:

### User

- Primary key at timestamps.
- Unique, normalized email.
- Hashed password lamang; walang plain password.
- Role enum: `CLIENT`, `STAFF`, `OWNER`.
- Verification/activation fields gaya ng `isVerified` at optional `isActive`.
- Optional profile fields na kailangan ng existing app.
- Relations papunta sa bookings, transactions, notifications, messages, at audit logs.

### Verification/OTP Record

- User relation.
- Hashed OTP.
- Purpose, gaya ng registration verification.
- Expiration timestamp.
- Used/invalidation state.
- Attempt counter at created timestamp kung kailangan ng rate-limit tracking.

### Password Reset Record

- User relation.
- Hashed, single-use token.
- Expiration timestamp.
- Used/invalidation state.

### Optional Session/Refresh Record

Gamitin lamang kung kailangan ng revocation o multi-device session management. Kung short-lived JWT-only muna ang design, huwag magdagdag ng session model nang walang malinaw na requirement.

Database rules:

- Lagyan ng unique constraint ang email.
- Lagyan ng indexes ang email, user foreign keys, expiration fields, at status fields na ginagamit sa queries.
- Gumamit ng enums para sa roles at token purposes/statuses.
- Itakda ang referential actions nang sinasadya; huwag umasa sa default.
- Huwag i-store ang plain OTP o reset token.

## Phase 4: Prisma Migration at Seed Strategy

1. I-review ang final model relationships bago gumawa ng migration.
2. Gumawa ng development migration.
3. I-apply ito sa local PostgreSQL.
4. I-generate ang Prisma client.
5. Gumawa ng seed data para sa development lamang:
	- Isang verified `OWNER`.
	- Isang verified `STAFF`.
	- Isang verified `CLIENT`.
6. Gumamit ng known development credentials na hindi ginagamit sa production.
7. I-test ang migration sa fresh database.
8. Huwag gumawa ng seed na naglalagay ng real passwords o secrets sa repository.

Validation checkpoint: dapat gumana ang migration mula sa empty database at walang broken foreign-key relation.

## Phase 5: Ayusin ang Backend Auth Layers

Sundin ang flow na ito:

`Route -> validation middleware -> auth/role middleware -> controller -> service -> Prisma`

### Config at Utilities

- Centralized environment validation sa startup.
- Isang shared Prisma client.
- Password hashing/comparison utility gamit ang bcryptjs.
- JWT sign/verify utility.
- Cookie options utility.
- OTP/token generation, hashing, expiration, at comparison utility.
- Safe error response format.

### Validation

Gumawa ng Zod validation para sa:

- Registration.
- OTP verification.
- Login.
- Forgot password.
- Reset password.
- Profile update kung kasama sa auth scope.

Mag-reject ng unknown fields kung naaayon sa existing API convention. Huwag ipasa ang raw request body diretso sa Prisma.

### Auth Service

Ang service ang may business logic para sa registration, verification, login, logout support, forgot password, at reset password. Gumamit ng Prisma transaction kapag maraming related records ang kailangang sabay na magawa o ma-update.

### Auth Middleware

1. Basahin ang JWT mula sa cookie lamang.
2. I-verify ang signature at expiration.
3. I-load ang user mula sa database kung kailangan para sa current status/role.
4. Ilagay ang trusted identity sa typed request context.
5. Magbalik ng generic `401` kapag invalid o expired ang session.

### Role Middleware

- Tanggapin lamang ang allowed server-side roles.
- I-check ang role mula sa verified auth context, hindi mula sa body, query, o URL.
- Gumamit ng `403` para sa authenticated user na walang permission.
- Panatilihin ang order: `authMiddleware` bago `roleMiddleware` bago controller.

## Phase 6: I-implement ang Auth Endpoints

I-prepare ang mga route na ito:

- `POST /api/auth/register`
- `POST /api/auth/verify-otp`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- Optional: `GET /api/auth/me` para malaman ng frontend ang current session.

Para sa bawat endpoint, isulat muna ang request shape, success response, error statuses, validation rules, rate limit, at audit requirement bago ang implementation.

Expected behavior:

- `register`: hindi maglalabas ng password o OTP sa response.
- `verify-otp`: expired, wrong, used, at too-many-attempts ay magkakaroon ng controlled error.
- `login`: generic ang invalid credential error at may rate limit.
- `logout`: idempotent; kahit expired na ang cookie ay dapat ma-clear ang client cookie.
- `forgot-password`: pareho ang response para existing at non-existing email.
- `reset-password`: one-time use at may expiration.
- `me`: safe user fields lamang, walang password hash o token data.

## Phase 7: Security Hardening

- I-enable ang Helmet.
- I-restrict ang CORS sa `FRONTEND_URL`; huwag gumamit ng unrestricted wildcard kapag credentials ang gamit.
- I-enable ang credentials sa frontend API client at backend CORS configuration.
- Maglagay ng rate limit sa login, registration, OTP verification, resend OTP, at password reset requests.
- Gumamit ng generic messages laban sa email/account enumeration.
- Maglagay ng request size limits at centralized error handler.
- Mag-log ng security events nang walang secrets.
- Gumamit ng HTTPS sa production.
- I-review ang cookie domain, path, `Secure`, `HttpOnly`, at `SameSite` settings.
- Huwag kailanman tumanggap ng client-provided role o user ID bilang authority.
- Gumawa ng `AuditLog` para sa login success/failure policy, password changes, staff creation/update, at iba pang sensitive actions ayon sa master prompt.

## Phase 8: Frontend Integration

1. Gumawa ng shared API client na nagpapadala ng cookies gamit ang credentials configuration.
2. I-connect ang Register page sa register endpoint.
3. I-connect ang OTP screen sa verify endpoint at magdagdag ng resend flow na may cooldown.
4. I-connect ang Login page sa login endpoint.
5. Pagkatapos ng login, gamitin ang trusted role mula sa server response/session query para sa redirect:
	- `CLIENT` -> `/client/booking`
	- `STAFF` -> `/staff/dashboard`
	- `OWNER` -> `/owner/executive-dashboard`
6. Gumawa ng auth provider o equivalent shared state para sa current user, loading state, at logout.
7. Gumawa ng `ProtectedRoute` na nagha-handle ng loading, unauthenticated, at unauthorized states.
8. Huwag mag-store ng JWT sa browser storage.
9. Huwag umasa sa frontend route guard bilang kapalit ng backend authorization.

## Phase 9: Testing Checklist

### Registration and OTP

- Valid registration creates an unverified client.
- Duplicate email is rejected safely.
- Password is stored as a bcrypt hash.
- OTP expires within the configured window.
- Wrong, expired, and reused OTPs fail.
- OTP cannot be replayed after successful verification.
- OTP resend invalidates or supersedes the previous code.

### Login and Cookies

- Unverified accounts cannot log in.
- Wrong credentials return a generic error.
- Valid login sets the expected cookie flags.
- JWT is not present in localStorage, sessionStorage, URL, or response body.
- Logout clears the cookie.
- Expired/tampered JWT returns `401`.

### RBAC and Ownership

- Client cannot access staff/owner routes.
- Staff cannot access owner-only mutations.
- A user cannot change another user's password/profile by changing an ID.
- Backend ignores client-supplied role and ownership fields.
- Protected routes reject missing authentication.

### Security and Reliability

- Rate limits activate on sensitive endpoints.
- CORS rejects unknown origins.
- Password reset tokens are single-use and expiring.
- Sensitive actions create audit records without secrets.
- Tests run against a test database, not production.

## Phase 10: Local Verification Order

Patakbuhin ang checks sa ganitong order:

1. TypeScript check ng backend.
2. Prisma schema validation at client generation.
3. Fresh database migration.
4. Backend unit tests para sa password, OTP, JWT, validation, at role middleware.
5. API integration tests para sa buong register-to-login flow.
6. Frontend typecheck at build.
7. Manual browser test ng register, verify, login, redirect, refresh, logout, at protected route behavior.

Ayusin muna ang failure sa kasalukuyang layer bago magpatuloy sa susunod na layer.

## Phase 11: Render Deployment Preparation

Walang Docker sa phase na ito.

1. Gumawa ng managed PostgreSQL database na compatible sa Render deployment.
2. I-set ang production environment variables sa Render; huwag i-commit ang values.
3. I-configure ang backend build, start, at Prisma migration commands ayon sa package scripts ng project.
4. I-set ang exact frontend production origin sa backend CORS configuration.
5. I-set ang frontend API base URL sa Render frontend environment.
6. Gumamit ng HTTPS at production cookie settings.
7. I-run ang database migration sa production bago buksan ang auth flow.
8. I-test ang cross-origin cookie behavior sa deployed frontend at backend.
9. I-check ang logs para sa startup, database connection, CORS, SMTP, at cookie errors; huwag mag-log ng secrets.
10. Maghanda ng rollback plan para sa failed migration o bad deployment.

## Definition of Done

Auth setup ay ituturing na kumpleto kapag:

- Gumagana ang register -> OTP verify -> login flow.
- Secure `httpOnly` cookie ang ginagamit para sa JWT.
- Gumagana ang logout at password reset.
- May working auth at role middleware.
- Enforced sa backend ang redirects/permissions para sa tatlong roles.
- Validated ang lahat ng auth inputs gamit ang Zod.
- May rate limiting, Helmet, restricted CORS, at safe error handling.
- May Prisma migrations at test seed.
- May tests para sa invalid, expired, replayed, at unauthorized cases.
- Gumagana sa local environment at na-verify ang Render deployment configuration.
- Walang Docker setup na kasama sa kasalukuyang task.

## Suggested Implementation Order

1. Environment validation at shared Prisma client.
2. User, OTP, at password reset Prisma models.
3. Migration, seed, at database verification.
4. Password, OTP, JWT, cookie, at error utilities.
5. Zod validators.
6. Auth service methods.
7. Controllers at auth routes.
8. Auth and role middleware.
9. Security middleware and rate limits.
10. Backend auth tests.
11. Frontend API client, auth state, protected routes, at redirects.
12. End-to-end verification.
13. Render preparation and deployment test.
