# Migration Strategy

## What is being migrated

Phase 1 migrates the product from a mock-only Electron experience to a production-capable web foundation. It does not migrate prototype data.

The Electron prototype contains local fake JSON created for UX validation. It has no authoritative customers, projects, audit history, or user accounts. Treating those records as production data would create false provenance.

The business and architecture documents remain the source of truth and are not duplicated into application configuration unless a feature needs the specific values.

## Coexistence strategy

- The Electron prototype remains at repository root under `src` and `scripts`.
- The production web platform lives in `apps/web`.
- The web application does not import prototype code, CSS, JSON, dependencies, or state.
- Screens may use the prototype as a visual reference, but implementation follows the production domain and security boundaries.
- The prototype can be retired after the production experience supersedes its validated flows.

## Database migration authority

Supabase SQL migrations are the sole database schema authority in Phase 1.

- Migrations are forward-only and reviewed.
- Production changes are never made solely through an unrecorded dashboard edit.
- Row-security policies are versioned with table changes.
- Generated Supabase database types should replace the checked-in type snapshot after connection to a real project.
- Rollback is a new corrective migration unless a failed deployment has not reached shared environments.

Prisma is not introduced because it would create a second schema and migration authority without adding value to this single-table, Supabase-native slice.

## Environment progression

### Local development

Use a local Supabase stack or a dedicated development project. Developer accounts and records are disposable.

### Staging

Use a separate Supabase project with production-like Auth, RLS, redirect configuration, and migrations. Run authenticated smoke tests after every migration and deployment.

### Production

Use an isolated project, reviewed migration process, backups, recovery checks, restricted administrative access, and production-only secrets. Never reuse staging users or keys.

## Phase 1 schema boundaries

### Owner

`owner_id` references `auth.users` and acts as the temporary tenant boundary. It is appropriate only while one authenticated user owns a project.

Before client teams, coordinators, partners, auditors, or support users share access:

1. Introduce workspace, person/profile, and membership records.
2. Create one workspace for each existing owner.
3. Add `workspace_id` to projects and backfill from owner workspaces.
4. Introduce scoped roles and project assignments.
5. Replace owner-only RLS with membership-aware policies.
6. Validate every existing project through staging migration rehearsal.
7. Retain `owner_id` temporarily for provenance, then retire it through a later migration.

Do not overload `owner_id` to represent a coordinator, client organization, or workspace.

### Coordinator

`coordinator_name` is display-only. It avoids inventing a staff directory before that domain exists.

Before coordinator assignment workflows:

1. Add a profile or person record linked to authenticated staff identity.
2. Add workspace membership and coordinator capability.
3. Add project assignment with effective dates and history.
4. Backfill known names through reviewed identity matching.
5. Replace the display field with an assignment-derived projection.

Do not treat the string as authorization or stable identity.

### Country

`country_code` uses an ISO-style two-letter value while the Phase 1 UI offers only Japan. Before adding a country:

1. Complete country business readiness and boundary review.
2. Add approved country reference and support status.
3. Validate packages and service language for that country.
4. Expand application options only after operations can deliver.

The schema being country-ready is not permission to market an unsupported country.

### Package, stage, and health

Phase 1 uses constrained text values aligned with source manuals. When package versions, country overlays, or derived health policy become real domains:

- Preserve existing stored meaning.
- Add reference/version records.
- Backfill stable identifiers.
- Keep presentation labels outside historical rows.
- Migrate through explicit mappings and exception reports.

Do not silently rename stored values in place when that would alter historical meaning.

## Archive and retention

Archiving sets `archived_at`; it never deletes the project. Phase 1 provides no restore or hard-delete workflow because retention, audit, and deletion policy are not yet implemented.

Before deletion is offered:

- Define retention and legal-hold rules.
- Distinguish draft deletion, archive, access revocation, and personal-data disposition.
- Record authorized actor and reason.
- Assess downstream records.

## Future domain migrations

New domains reference the stable project UUID and own their own tables and policies. They should not widen the projects table with unrelated task, partner, document, or workflow columns.

### Lead history

Phase 2 stores one current discovery and one current proposal on the Lead aggregate. Before Hajime needs multiple meetings, proposal versions, or immutable commercial history:

1. Introduce `lead_discoveries` and `lead_proposals` as owner-scoped child records.
2. Backfill non-empty current fields into one initial child record per lead.
3. Preserve the lead's current summary as a derived projection during transition.
4. Keep the permanent `lead.project_id` conversion link unchanged.
5. Rehearse Won conversion and archive behavior against migrated staging data.

Do not normalize these records merely to imitate a CRM. Migrate when real operating history requires multiplicity.

For each new vertical slice:

1. Confirm the source-of-truth business outcome.
2. Write or update an architecture decision.
3. Add the smallest schema and RLS policy.
4. Generate database types.
5. Implement one domain repository and action boundary.
6. Rehearse migration with staging data.
7. Add unit, integration, and smoke coverage proportional to risk.

## Prototype retirement

Retire the Electron prototype only when all of its still-useful validation paths are either implemented or explicitly abandoned. Retirement should remove prototype runtime dependencies in a dedicated change, preserve screenshots or design references where useful, and update the root documentation.

Phase 1 does not change or retire the prototype.
