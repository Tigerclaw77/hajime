# Architecture Decisions

## ADR-001: Isolate production from the Electron prototype

**Decision**: Build the production application in `apps/web` and leave the root Electron prototype intact.

**Why**: Prototype dependencies, mock data, preload behavior, and renderer structure are not production foundations. Isolation prevents accidental reuse while preserving validated UX reference.

**Consequence**: The repository temporarily has two package roots. A monorepo tool is unnecessary until shared production packages or multiple deployable applications justify it.

## ADR-002: Use Next.js App Router with Server Components

**Decision**: Use Next.js 16 App Router. Pages render on the server; interactive forms and archive confirmation are client components.

**Why**: Project reads remain close to secure data access, client bundles stay small, and routes can compose server-side authorization with focused client interaction.

**Consequence**: Authenticated layouts are forced dynamic. Route parameters and request APIs follow current asynchronous Next.js conventions.

## ADR-003: Use Neon PostgreSQL as the persistence boundary

**Decision**: Use Neon PostgreSQL, Better Auth, checked-in SQL migrations, and server-only parameterized repositories.

**Why**: Neon provides managed PostgreSQL while Better Auth keeps identity and sessions in the same production database. Domain repositories retain explicit ownership and transaction boundaries without a second database platform.

**Consequence**: A pooled Neon connection string, Better Auth secret, and forward-only migration discipline are production dependencies. Database access remains server-only.

## ADR-004: Do not use Prisma

**Decision**: Do not install Prisma in Phase 1.

**Why**: Checked-in PostgreSQL migrations already own the schema, and the domain repositories use focused parameterized SQL. Prisma would add a second schema and migration authority without solving a current problem.

**Revisit when**: Query volume or schema complexity makes generated query types materially reduce risk. Revisit through a new ADR, not by incremental convenience imports.

## ADR-005: Enforce authorization twice

**Decision**: Verify the authenticated user in the server data-access layer and include ownership in every protected SQL statement and transactional function.

**Why**: The browser never receives database credentials. Session verification and owner predicates keep authorization close to each server-only data operation.

**Consequence**: Direct browser database access is prohibited. Any future data access path must preserve explicit owner scoping or introduce a separately reviewed database authorization model.

## ADR-006: Use Server Actions for mutations

**Decision**: Project and auth mutations use narrow Server Actions rather than public route handlers.

**Why**: The Phase 1 UI is the only mutation consumer. Server Actions keep validation, current-user resolution, repository calls, and route revalidation in one typed boundary without inventing a public API contract.

**Consequence**: A future mobile app, partner integration, or public API receives its own explicit interface. Domain repositories and schemas can be reused; Server Actions are not treated as that API.

## ADR-007: Validate at form, server, and database boundaries

**Decision**: React Hook Form and Zod provide immediate form feedback; Server Actions parse the same domain schema; Postgres constraints enforce essential invariants.

**Why**: Browser validation is user experience, not security. Server validation handles untrusted input, while database checks protect every write path.

**Consequence**: Some constraints appear in more than one layer by design. Their representations must remain aligned and are tested.

## ADR-008: Archive instead of delete

**Decision**: Archive sets `archived_at`, removes edit affordances, and keeps the record readable. Authenticated users have no delete grant.

**Why**: The source architecture treats business records as auditable. Phase 1 has no approved retention or deletion policy, so hard deletion would be premature.

**Consequence**: Restore and deletion are not available. They require explicit lifecycle and permission design later.

## ADR-009: Keep package, stage, and health as constrained domain values

**Decision**: Store stable machine values with database checks and map them to source-of-truth labels in the project domain.

**Why**: Free text would drift; premature reference tables would create configuration features outside the slice. Constrained values are sufficient until package versions and health calculation become real domains.

**Consequence**: Adding a value requires coordinated schema, type, validation, label, and test changes.

## ADR-010: Use temporary owner and coordinator representations explicitly

**Decision**: `owner_id` is the Phase 1 access boundary; `coordinator_name` is nullable display text.

**Why**: Multi-user workspace membership and staff profiles are explicitly out of scope. Pretending those domains exist would produce shallow placeholders and unclear authorization.

**Consequence**: Neither field is the final collaboration model. The migration strategy defines the gate before shared access or coordinator assignment.

## ADR-011: Use date-only completion estimates

**Decision**: Estimated completion is a nullable Postgres `date` and is formatted in UTC.

**Why**: A planning date is not a moment in a user's local time zone. Date-only storage prevents an estimate from shifting a day during display.

**Consequence**: Future prediction ranges or confidence values belong to an explicit forecasting design, not timestamp overloading.

## ADR-012: Keep cross-domain shared code small

**Decision**: Use named `domains`, `shared`, and `components` boundaries and avoid a generic `lib` folder.

**Why**: Ownership should remain obvious as the platform grows. A generic helper bucket makes dependencies and business authority harder to understand.

**Consequence**: Code stays in a domain until it has a clear platform responsibility. Sharing is an architectural decision, not a cleanup reflex.

## ADR-013: Layer testing by risk

**Decision**: Use Vitest for deterministic domain validation and presenters, and Playwright for browser smoke coverage. The full authenticated CRUD smoke is environment-gated.

**Why**: Pure rules should run quickly without infrastructure. Auth, cookies, Server Actions, owner scoping, and persistence need a real Neon staging branch to be meaningful.

**Consequence**: CI must provide a dedicated test project and credentials before authenticated smoke is considered a deployment gate. Public auth smoke remains available without external state.

## ADR-014: Pin framework versions and audit dependencies

**Decision**: Pin direct framework versions and use a patched PostCSS override while the current Next.js release carries an older nested range.

**Why**: A production foundation should be reproducible and should not begin with a known dependency advisory.

**Consequence**: Dependency updates are intentional changes with lint, typecheck, tests, build, smoke, and audit. The override should be removed when Next.js carries a fixed compatible version directly.

## ADR-015: Model Lead as a small acquisition aggregate

**Decision**: Store lead identity, current discovery, current proposal, status, and conversion link in one owner-scoped aggregate.

**Why**: Founder-led sales needs one current commercial truth, not CRM history infrastructure. Separate meeting, contact, activity, and proposal-version domains would add workflows the business has not validated.

**Consequence**: Discovery and proposal represent the current accepted record. The migration strategy defines when real multiplicity justifies child tables.

## ADR-016: Convert Won leads through a database transaction

**Decision**: A guarded Postgres function creates the Project, marks the Lead Won, accepts the proposal, and writes the permanent link atomically.

**Why**: Separate cross-table writes are not atomic. Partial conversion would corrupt customer provenance and could duplicate projects under retries.

**Consequence**: The function accepts the verified owner ID, checks row ownership, locks the lead, requires a proposed package, and returns the existing Project on repeat calls.

## ADR-017: Store acquisition money in USD minor units

**Decision**: Budget estimate and proposal expected value use nullable integer cents with a fixed USD currency code.

**Why**: Floating-point money is unsafe, and adding multi-currency behavior before the pricing process needs it would create reporting ambiguity.

**Consequence**: Forms display decimal USD values while persistence remains integer. Adding currencies requires explicit currency policy, formatting, conversion, and reporting decisions.
