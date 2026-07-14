# Hajime Architecture

## Purpose

Hajime is a production web application for capturing leads, managing founder-owned Japan launch projects, and coordinating one-time engagement payments.

## Technology

| Area | Current production decision |
| --- | --- |
| Hosting | Vercel project `tigerclaw77s-projects/hajime` |
| Frontend | Next.js App Router, React, TypeScript, Tailwind CSS |
| Backend | Next.js Server Actions and Route Handlers on the Node.js runtime |
| Database | Neon PostgreSQL 17 using `pg` and checked-in SQL migrations |
| Authentication | Better Auth email/password sessions stored in Neon |
| Payments | Stripe Node SDK; one-time Invoices and Payment Links |
| Email | None configured; founder reviews CRM manually twice daily |
| Storage | Neon relational storage only; no file or object storage |
| Monitoring | Vercel deployment and runtime logs only |
| Analytics | None configured |
| Testing | ESLint, TypeScript, Vitest, Playwright, and production builds |
| Deployment | `main` on GitHub; migrations via `npm run db:migrate`; production deploy via Vercel CLI |

## Production Stack

- Vercel
- Next.js 16, React 19, TypeScript, Tailwind CSS 4
- Neon PostgreSQL 17 and `pg`
- Better Auth
- Stripe
- Zod, React Hook Form
- Vitest, Playwright, ESLint

## Business Rules

- Hajime coordinates.
- Licensed professionals perform regulated work.
- No legal advice.
- No immigration advice.
- No tax advice.
- No accounting advice.

## Stripe

- Dedicated Hajime Stripe account under Passport Informatics.
- Invoices and Payment Links only.
- No ecommerce, subscriptions, carts, or coupons.
- Test-mode key and webhook are active for launch verification; live credentials are not yet configured.

## Database

Neon PostgreSQL is the production database. No Supabase dependency remains. Schema authority is `apps/web/db/migrations`; protected repositories verify the Better Auth user and scope SQL by `owner_id`.

## Project Status

- **Phase:** Production launch wiring before the first paying customer.
- **Blockers:** Complete subscriber, Invoice, Payment Link, and duplicate-webhook tests; replace test Stripe credentials with live credentials before accepting payment.
- **Accepted limitation:** The founder reviews CRM manually twice daily. No automated notifications will be built until a real customer need or operational incident demonstrates the requirement.
- **Production URL:** https://hajimejapan.com

## Engineering Rules

- Read this file before every Hajime coding session.
- Every implementation must conform to this document.
- If code conflicts with this file, report the conflict before writing code.
- Database access stays server-only and owner-scoped; secrets stay in production environment variables.
- Documents under `docs/archive/architecture` are historical and non-authoritative.
