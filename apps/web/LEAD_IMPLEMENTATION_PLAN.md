# Lead Management Vertical Slice

## Objective

Support founder-led customer acquisition from first contact through a paying customer without introducing an enterprise CRM or marketing automation system.

The slice owns one question: can Hajime capture a real lead, prepare and record discovery, track the commercial proposal, and convert a Won lead into a production Project without losing provenance?

## Source of truth

- `docs/business/SALES_PROCESS.md` defines Lead, Discovery, Proposal, Engagement, and handoff expectations.
- `docs/business/CUSTOMER_JOURNEY.md` defines the lead and client mindset.
- `docs/business/SERVICE_PACKAGES.md` defines package names.
- `docs/architecture/DOMAIN_MODEL.md` defines Project identity and audit principles.
- `docs/architecture/PERMISSIONS.md` defines owner scope and least privilege.

## Aggregate

Phase 2 uses one Lead aggregate with:

- Lead identity and qualification context.
- One current discovery record.
- One current proposal record.
- Current acquisition status.
- Optional permanent Project link after conversion.

This is intentional. The first paying customer does not require meeting history, proposal versioning, campaigns, sequences, or pipeline analytics. When the business needs multiple discovery meetings or proposal revisions, those become child records through a reviewed migration rather than speculative empty tables.

## Statuses

- New.
- Contacted.
- Discovery scheduled.
- Proposal sent.
- Won.
- Lost.
- Archived.

Won is special: it cannot be written as an ordinary status update. It invokes the database conversion function and succeeds only when a package has been proposed.

## Conversion contract

Conversion is one Postgres transaction:

1. Authenticate the caller.
2. Lock the caller's lead row.
3. Return the existing Project for an already converted lead.
4. Reject lost, archived, or package-less conversion.
5. Create a Project owned by the same user.
6. Copy the proposed package and coordinator display name.
7. Start the Project at Client with On track health and Japan as destination.
8. Set Lead status to Won and Proposal outcome to Accepted.
9. Persist the permanent one-to-one Project link.

No partially converted state can be committed.

## Security

- Every Lead row carries the authenticated `owner_id`.
- RLS protects select, insert, and update.
- Authenticated users receive no delete permission.
- The conversion function accepts the server-verified owner ID, validates lead ownership, and completes the cross-table transaction atomically.
- The public role cannot execute conversion.
- An active email can identify only one lead per owner.
- Archived leads are read-only in the application.

## Validation

- React Hook Form provides immediate feedback.
- Zod validates every Server Action input.
- Postgres checks protect lengths, statuses, sources, packages, outcomes, money, date order, and conversion invariants.
- Commercial values use integer USD minor units rather than floating-point storage.

USD is the only Phase 2 display currency. Multi-currency is deferred until pricing and reporting policy require it.

## Routes

- `/leads`: active and archived acquisition portfolio.
- `/leads/new`: create lead.
- `/leads/[leadId]`: view lead, status, discovery, proposal, and conversion result.
- `/leads/[leadId]/edit`: edit lead metadata.
- `/leads/[leadId]/discovery`: schedule and record discovery.
- `/leads/[leadId]/proposal`: record the current proposal.

## Testing

- Unit tests cover lead, discovery, proposal, money, and presentation rules.
- Existing project tests remain unchanged.
- Public auth smoke remains infrastructure-independent.
- Credential-gated smoke covers lead creation, discovery, proposal, Won conversion, and resulting Project.

## Non-goals

- Email sending or templates.
- Calendar sync.
- Marketing forms or attribution analytics.
- Campaigns, scoring, sequences, or funnels.
- Multiple contacts per lead.
- Multiple discovery meetings.
- Proposal documents or version history.
- Contracts, deposits, Stripe, or invoicing.
- AI summaries.
- Partner workflows.
- Project timeline, tasks, or documents.
- Sales teams, territories, or advanced permissions.

## Definition of done

- An authenticated user can create, view, and edit only their own leads.
- Discovery and proposal data round-trip with full validation.
- Status language matches the operating manual.
- Marking Won creates and links exactly one Project transactionally.
- Repeating conversion cannot create a second Project.
- A proposed package is required for conversion.
- Archived leads are retained and read-only.
- Lint, strict typecheck, unit tests, smoke framework, production build, and audit pass.
