# Hajime Web

Production foundation for Hajime Japan. The current vertical slices implement:

- Supabase email/password authentication.
- Create a project.
- View a project.
- Edit active project metadata.
- Archive a project into a read-only state.
- Create and manage an owner-scoped lead.
- Record the current discovery and proposal.
- Move a lead through the founder-led sales statuses.
- Convert a Won lead into exactly one permanently linked project.

Email automation, calendar integration, Stripe, invoicing, AI, partners, timelines, documents, notifications, workflows, and advanced permissions are out of scope.

## Requirements

- Node.js 20.9 or newer.
- A Supabase project.
- A Supabase publishable key.

## Setup

1. Install dependencies with `npm.cmd install`.
2. Copy `.env.example` to `.env.local`.
3. Add the Supabase project URL and publishable key.
4. Apply `supabase/migrations/202607120001_create_projects.sql` with the Supabase CLI or SQL editor.
5. Configure the Supabase Auth site URL and allowed redirect URL for `/auth/callback`.
6. Run `npm.cmd run dev`.

The migration enables row-level security. Each Phase 1 user can access only projects whose `owner_id` matches their authenticated user ID.

## Verification

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run test
npm.cmd run build
npm.cmd run test:smoke
```

Public auth smoke tests run without credentials. To run the authenticated project lifecycle test, provide `E2E_TEST_EMAIL` and `E2E_TEST_PASSWORD` for an existing test user in the configured Supabase project.

## Source layout

- `src/domains/auth`: authentication actions, schemas, and session policy.
- `src/domains/projects`: project model, validation, data access, actions, presenters, and components.
- `src/domains/leads`: acquisition model, discovery, proposal, conversion, data access, actions, presenters, and components.
- `src/shared`: cross-domain environment, Supabase, action-result, and formatting primitives.
- `src/components`: application-level composition shared across domains.
- `src/app`: routing and page composition only.
- `supabase/migrations`: database changes and row-security policy.

Do not add unrelated domain placeholders. New domains enter only with an approved vertical slice and architecture decision.
