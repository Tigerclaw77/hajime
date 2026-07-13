# Phase 1 Implementation Plan

## Objective

Establish the smallest production-quality Hajime platform slice around one domain: Projects.

The slice proves that an authenticated user can create, inspect, change, and archive a project through the same architecture that future domains can follow. It does not attempt to prove partner coordination, workflow execution, documents, timelines, notifications, or automation.

## Source of truth

Implementation decisions derive from:

- `docs/architecture/DOMAIN_MODEL.md` for Project meaning and lifecycle.
- `docs/architecture/PERMISSIONS.md` for scope and least privilege.
- `docs/business/SERVICE_PACKAGES.md` for package names.
- `docs/business/OPERATIONS_MANUAL.md` for project status language.
- `docs/business/DISCLAIMERS_AND_BOUNDARIES.md` for honest outcome and timing language.

Where Phase 1 intentionally simplifies the source model, the simplification is documented as a migration boundary rather than treated as the final design.

## Deliverable

### Authentication

- Email/password sign-up and sign-in through Better Auth.
- Cookie-based server-side sessions stored in Neon PostgreSQL.
- Authenticated application layout.
- Sign-out.
- Secure server checks for every project query and mutation.

### Projects

- Active and archived project portfolio.
- Project creation.
- Project detail view.
- Metadata editing while active.
- Archive action and read-only archived view.
- Fields: name, country, package, current stage, health, estimated completion, coordinator, created, updated, and archived.

### Data protection

- Owner-scoped server repositories and guarded database functions.
- No client-provided owner ID.
- No hard delete grant for authenticated users.
- Database checks mirror domain values.
- Server-side Zod validation on every mutation.
- Current user verified through Better Auth before data access.

### Quality foundation

- Strict TypeScript.
- ESLint with Next.js core-web-vitals and TypeScript rules.
- Vitest unit test framework.
- Playwright smoke test framework.
- Production build verification.
- Dependency audit.

## Domain boundaries

### `domains/projects`

Owns project vocabulary, validation, data access, mutations, presentation mapping, and project-specific UI. Other domains must not write the `projects` table directly.

### `domains/auth`

Owns authentication input, auth actions, and current-user policy. It does not own project authorization; row-level security and project data access enforce that close to the data.

### `shared`

Contains only cross-domain infrastructure with an established second consumer or clear platform role: PostgreSQL connection management, environment validation, action results, and date formatting. It is intentionally not a generic `lib` directory.

### `app`

Composes routes and pages. Pages retrieve data through domain repositories and mutate through domain actions. Business rules do not live in route files.

## Delivery sequence

1. Create an isolated Next.js application beside the Electron prototype.
2. Pin supported framework and test versions.
3. Define and migrate the minimal projects table with owner constraints.
4. Add server-side Better Auth session handling.
5. Define project vocabulary and Zod validation.
6. Implement the server-only project repository.
7. Implement Server Actions that validate and revalidate routes.
8. Build portfolio, create, detail, edit, and archive screens.
9. Add unit and browser smoke coverage.
10. Run lint, typecheck, unit, smoke, build, and audit checks.

## Definition of done

- An authenticated user cannot read or mutate another user's project.
- Valid project metadata persists and returns after navigation.
- Invalid metadata is rejected in the browser and on the server.
- Active projects can be edited.
- Archive is auditable by timestamp and does not delete the row.
- Archived projects are read-only in the application.
- Authenticated routes are dynamically rendered and do not cache user sessions.
- Public authentication pages are smoke-tested.
- Full project CRUD smoke coverage can run against a test Neon branch.
- Lint, typecheck, unit tests, production build, and dependency audit pass.
- No out-of-scope domain or placeholder feature is introduced.

## Explicit non-goals

- Partner records or assignment.
- Timeline or milestones.
- Tasks or workflow engine.
- Documents or requirements.
- Notifications.
- Automation.
- Comments or activity feeds.
- Billing.
- Admin portfolio.
- Multi-user workspaces.
- Role-based authorization beyond authenticated owner access.
- Importing Electron mock records.
- General international availability beyond the country-ready field shape.

## Next-phase gate

No second domain should begin until Phase 1 runs against a real Neon staging branch, authenticated smoke coverage passes, deployment and recovery are demonstrated, and the temporary ownership model has an approved evolution path.

The next vertical slice should be selected from a real operating need, not from the architecture document's full entity list.
