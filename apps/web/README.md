# Hajime Web

> Current production decisions are defined only in the repository-root `ARCHITECTURE.md`.

Production foundation for Hajime Japan. The current vertical slices implement:

- Better Auth email/password authentication backed by Neon PostgreSQL.
- Create a project.
- View a project.
- Edit active project metadata.
- Archive a project into a read-only state.
- Create and manage an owner-scoped lead.
- Record the current discovery and proposal.
- Move a lead through the founder-led sales statuses.
- Convert a Won lead into exactly one permanently linked project.
- Capture public discovery requests and update subscriptions.
- Create one-time Stripe Invoices and Payment Links for qualified leads.
- Convert a paid lead into exactly one linked project through an idempotent webhook.

Email delivery, calendar integration, subscriptions, ecommerce, AI, partners, timelines, document storage, notifications, workflows, and advanced permissions are not implemented.

## Requirements

- Node.js 20.9 or newer.
- A Neon PostgreSQL database.
- A strong Better Auth secret.

## Setup

1. Install dependencies with `npm.cmd install`.
2. Copy `.env.example` to `.env.local`.
3. Add the Neon `DATABASE_URL`, `BETTER_AUTH_SECRET`, and site URL.
4. Apply all checked-in migrations with `npm.cmd run db:migrate`.
5. Run `npm.cmd run dev`.

Every repository resolves the authenticated user on the server and includes an explicit `owner_id` predicate. Transactional database functions also require and verify that owner ID.

## Verification

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run test
npm.cmd run build
npm.cmd run test:smoke
```

Public auth smoke tests run without credentials. To run the authenticated project lifecycle test, provide `E2E_TEST_EMAIL` and `E2E_TEST_PASSWORD` for an existing test user in the configured Neon database.

## Source layout

- `src/domains/auth`: authentication actions, schemas, and session policy.
- `src/domains/projects`: project model, validation, data access, actions, presenters, and components.
- `src/domains/leads`: acquisition model, discovery, proposal, conversion, data access, actions, presenters, and components.
- `src/shared`: cross-domain database, environment, action-result, and formatting primitives.
- `src/components`: application-level composition shared across domains.
- `src/app`: routing and page composition only.
- `db/migrations`: forward-only Neon PostgreSQL schema changes.

Do not add unrelated domain placeholders. New domains require an approved vertical slice reflected in the repository-root `ARCHITECTURE.md`.
