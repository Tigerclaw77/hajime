# Hajime Domain Model

## Purpose and boundaries

Hajime coordinates cross-border business formation as a set of projects, obligations, evidence, and accountable handoffs. The core domain is country-neutral. Japan, Singapore, UAE, Portugal, Estonia, and the United States are configuration packages composed from country rules, workflow templates, requirement definitions, agency records, and partner capabilities.

The model deliberately separates:

- **Intent**: what the client wants to establish.
- **Obligation**: what must be true for that intent to succeed.
- **Work**: who must do what, by when, and under which dependencies.
- **Evidence**: which documents or external confirmations prove an obligation is satisfied.
- **Execution history**: what changed, who changed it, and why.

Every mutable record carries a stable identifier, tenant or workspace boundary, creation and update timestamps, creator, last editor, and archival state. Business records are archived rather than hard-deleted once they participate in an audit trail.

## Aggregate boundaries

The **Project** is the primary operational aggregate and source of truth for current formation state. Tasks, milestones, requirements, assignments, and project-specific document uses belong to it.

Other independently managed aggregates are:

- **Party and organization**: clients, people, coordinators, partners, and agencies.
- **Business**: the entity being created or expanded.
- **Document asset**: reusable evidence with versions and permissions.
- **Workflow template**: reusable country and package configuration.
- **Commercial package**: purchased scope and service commitments.
- **Communication**: notifications, comments, and activity records.

Cross-aggregate changes should be explicit domain actions. For example, uploading a passport creates a document version; linking it to a project creates a document use; accepting it for a requirement creates a verification decision.

## Core entities

### Project

**Purpose**: The operational container for one client outcome, such as forming a company in Japan or registering a foreign branch in Singapore.

**Fields**: Reference number, title, client, business, destination country, target regions, project type, package, current phase, current stage, health, status, target completion date, predicted completion date, start date, completion date, coordinator, team, workflow instance, commercial scope, risk level, pause reason, cancellation reason, client-visible summary.

**Relationships**: Belongs to a client and workspace; concerns one primary business; instantiates one or more workflows; contains milestones, tasks, requirement instances, timeline events, comments, activities, and partner assignments; references reusable documents.

**Lifecycle**: Prospect draft -> proposed -> active -> paused -> completed or cancelled. An active project advances through lifecycle phases independently of its commercial status.

**Visibility**: Clients see approved project summaries, client-visible work, dates, and evidence. Internal teams see full operational and commercial context. Partners see only assigned scopes and explicitly shared records.

**Scalability**: Project summary fields should be queryable without rebuilding the workflow graph. High-volume child histories should paginate and partition by project and time. Health and predicted dates are projections, not manually duplicated truth.

### Client

**Purpose**: The customer relationship that owns projects and receives services. A client may be an individual founder or an organization with multiple stakeholders.

**Fields**: Display name, legal name, client type, primary contact, billing contact, source, preferred language, time zone, communication preferences, residency countries, risk flags, account status, internal owner.

**Relationships**: Has people and memberships; owns projects, businesses, commercial packages, and billing references; may authorize document reuse across its projects.

**Lifecycle**: Prospect -> qualified -> active -> inactive -> archived. Client status is independent of any single project.

**Visibility**: Client members see their own account according to membership. Internal roles see operational fields; restricted risk and internal notes require elevated access.

**Scalability**: Keep client identity separate from user login identity. One person may represent multiple clients, and one client may have many projects across countries.

### Person

**Purpose**: A natural person involved as founder, director, shareholder, beneficial owner, contact, or service provider.

**Fields**: Names, aliases, contact details, preferred language, time zone, nationalities, residencies, date-of-birth reference, role descriptors, identity verification state, consent records.

**Relationships**: May be a client member, business stakeholder, coordinator, partner professional, task owner, document subject, commenter, or approver.

**Lifecycle**: Invited -> active -> inactive -> archived. Sensitive identity facts can expire or be superseded without deleting history.

**Visibility**: Personal data follows least privilege, field-level restriction, jurisdictional policy, and explicit project relevance.

**Scalability**: Separate a person from their roles and memberships so the same identity can safely participate in multiple organizations and projects.

### Workspace

**Purpose**: The tenant and data-governance boundary under which staff operate projects.

**Fields**: Name, operating entity, supported countries, default locale, time zone, policies, retention settings, branding, status.

**Relationships**: Contains members, projects, partner relationships, templates, and settings.

**Lifecycle**: Provisioning -> active -> suspended -> closed.

**Visibility**: Workspace administration only; users access records through membership and project scope.

**Scalability**: Every operational query and authorization decision must resolve a workspace boundary. Shared global reference data is versioned separately.

### Membership and Role Assignment

**Purpose**: Connect a person or service identity to a workspace, client, partner organization, or project with explicit roles.

**Fields**: Principal, scope, role, permissions overrides, start, expiry, invitation state, status.

**Relationships**: References a person or system principal and one scoped resource.

**Lifecycle**: Invited -> active -> suspended -> expired or revoked.

**Visibility**: Scope administrators and affected principal.

**Scalability**: Use scoped assignments rather than a single global role. Permission resolution should remain deterministic and explainable.

### Coordinator

**Purpose**: A staff role responsible for project orchestration, client clarity, and exception handling.

**Fields**: Person, workspace membership, countries supported, languages, skills, capacity, availability, active project count, escalation manager.

**Relationships**: Leads projects, owns tasks, manages partner assignments, and receives escalations.

**Lifecycle**: Available -> assigned -> unavailable -> inactive. Assignment history remains permanent.

**Visibility**: Client-visible name and contact may be shared; capacity and performance remain internal.

**Scalability**: Capacity is modeled independently from assignment so routing can consider workload, skills, language, and time zone.

### Business

**Purpose**: The company, branch, or operating entity being planned, formed, registered, or expanded.

**Fields**: Proposed and legal names, entity type, jurisdiction, registered address, operating addresses, activities, industry, capital, currency, fiscal year, incorporation number, tax identifiers, formation date, operational status.

**Relationships**: Owned by a client; has stakeholders and officers; is the subject of projects, filings, bank applications, and registrations.

**Lifecycle**: Concept -> name proposed -> formation pending -> incorporated -> operational -> dormant, dissolved, or transferred.

**Visibility**: Clients and assigned operators see project-relevant fields. Partners receive only fields necessary for their engagement.

**Scalability**: Preserve historical names, addresses, ownership, and identifiers as effective-dated facts. A business can continue across many post-formation projects.

### Business Stakeholder

**Purpose**: Express a person's or organization's legal and operational relationship to a business.

**Fields**: Stakeholder, role, ownership percentage, voting percentage, effective dates, beneficial-owner flag, signing authority, verification state.

**Relationships**: Joins a person or organization to a business; can trigger requirements and approvals.

**Lifecycle**: Proposed -> pending verification -> active -> ended.

**Visibility**: Sensitive; limited to the client, assigned staff, and partners with a legal need.

**Scalability**: Effective dating supports ownership changes without overwriting formation history.

### Country and Jurisdiction

**Purpose**: Reference the legal geography that determines rules without embedding country behavior in the core engine.

**Fields**: ISO code, name, subdivisions, supported languages, currencies, time zones, business calendar, support status, configuration version.

**Relationships**: Selected by projects, businesses, templates, requirements, agencies, and partners.

**Lifecycle**: Research -> pilot -> supported -> deprecated.

**Visibility**: Generally public reference data; rollout notes may be internal.

**Scalability**: Country configuration is versioned and effective-dated so active projects retain the rules under which they began unless explicitly migrated.

### Government Agency

**Purpose**: Represent an external authority that receives filings, issues registrations, or determines outcomes.

**Fields**: Name, country, jurisdiction, agency type, submission channels, operating calendar, published turnaround range, contact references, outage state.

**Relationships**: Owns external requirements and receives submissions; referenced by tasks, milestones, filings, and timeline events.

**Lifecycle**: Active -> temporarily unavailable -> superseded -> inactive.

**Visibility**: Basic facts may be client-visible; operational notes and escalation contacts remain internal.

**Scalability**: Agency behavior should be observed through turnaround metrics and events, not hard-coded into workflow logic.

### Package

**Purpose**: Define the purchased service scope, service level, included workflows, and human support model.

**Fields**: Name, market, version, price reference, included deliverables, exclusions, support level, response commitments, amendment policy, status.

**Relationships**: Purchased for a project; selects or modifies workflow templates, staffing rules, notifications, and client-visible deliverables.

**Lifecycle**: Draft -> active -> retired. Existing purchases retain their package version.

**Visibility**: Purchased scope is visible to client and staff; margin and internal costing are restricted.

**Scalability**: Package versioning prevents commercial changes from silently altering active obligations.

## Work orchestration entities

### Workflow Template

**Purpose**: A reusable, versioned graph describing how a class of projects should proceed.

**Fields**: Name, version, project type, supported jurisdictions, eligibility conditions, phases, nodes, transitions, variables, default durations, publication status.

**Relationships**: Composes task, milestone, and requirement templates; may extend a global template with country and package overlays; creates workflow instances.

**Lifecycle**: Draft -> validated -> published -> deprecated -> retired.

**Visibility**: Internal operations and authorized partner designers only.

**Scalability**: Published versions are immutable. Template composition must detect conflicting rules and produce a resolved plan before activation.

### Workflow Instance

**Purpose**: The project-specific execution graph created from resolved templates.

**Fields**: Template versions, variables, state, active nodes, paused reason, started and completed dates, revision number.

**Relationships**: Belongs to a project; governs milestones, tasks, requirements, branches, and transitions.

**Lifecycle**: Planned -> active -> paused -> completed or cancelled.

**Visibility**: Clients see a simplified projection; internal staff see the full graph; partners see assigned branches.

**Scalability**: Store current state plus an append-only transition history. Re-evaluation must be idempotent and safe under concurrent completion events.

### Phase

**Purpose**: A stable business-level segment such as Planning, Formation, Registration, Tax, or Banking.

**Fields**: Name, order, description, entry and exit policy, expected duration, visibility.

**Relationships**: Groups milestones, tasks, and requirements within a workflow.

**Lifecycle**: Not started -> active -> completed, skipped, paused, or blocked.

**Visibility**: Usually client-visible, with internal sub-phases hidden when appropriate.

**Scalability**: Phase is a reporting and experience construct; it must not replace task-level dependency truth.

### Milestone

**Purpose**: Mark a meaningful outcome that clients and operators can understand, such as “registered office confirmed.”

**Fields**: Name, description, phase, state, target date, predicted date, achieved date, owner, completion policy, client summary.

**Relationships**: Belongs to a project and phase; is achieved by task and requirement conditions; emits timeline events.

**Lifecycle**: Upcoming -> ready -> in progress -> achieved, blocked, skipped, or cancelled.

**Visibility**: Most milestones are client-visible; technical and internal control milestones can be hidden.

**Scalability**: Milestone status should be derived from its completion policy and cached for portfolio queries.

### Task

**Purpose**: The smallest accountable unit of work with one current owner and explicit completion requirements.

**Fields**: Title, instructions, status, task type, owner, responsible party, priority, due date, estimated and actual duration, dependencies, SLA, visibility, automation eligibility, completion policy, blocker reason, escalation state.

**Relationships**: Belongs to a project, workflow node, phase, and optionally milestone; references requirements, documents, partner assignments, comments, and task history.

**Lifecycle**: Planned -> ready -> in progress -> waiting -> review -> completed; may become blocked, skipped, cancelled, reopened, or overdue.

**Visibility**: Defined per task as client-visible, partner-visible, shared, or internal-only. Visibility does not grant edit rights.

**Scalability**: Current task state is optimized for queues; every transition is appended to audit history. Dependencies use stable identifiers and must remain acyclic within a workflow revision.

### Task Template

**Purpose**: Define repeatable task creation rules without making active tasks depend on mutable template content.

**Fields**: Title pattern, instructions, owner rule, duration, priority, dependencies, requirement links, completion policy, visibility, SLA, generation condition, recurrence.

**Relationships**: Used by workflow templates to create tasks.

**Lifecycle**: Draft -> published -> deprecated.

**Visibility**: Internal configuration.

**Scalability**: Instantiated tasks retain template ID and version for traceability while owning a resolved copy of execution fields.

### Requirement Definition

**Purpose**: Define an obligation that must be satisfied, such as proof of identity, minimum capital, or a filing acceptance.

**Fields**: Name, category, jurisdiction, applicability rule, satisfaction policy, accepted evidence types, validity window, verifier role, criticality, source citation, version.

**Relationships**: Used by workflow templates; may be imposed by a government agency, partner capability, package, or compliance rule.

**Lifecycle**: Draft -> approved -> active -> superseded -> retired.

**Visibility**: Client-friendly explanation may be visible; legal reasoning and internal interpretation may be restricted.

**Scalability**: Definitions are immutable by version and include effective dates. Requirements from multiple consumers can share evidence without becoming the same obligation.

### Requirement Instance

**Purpose**: Track whether a specific obligation is satisfied for a project or business.

**Fields**: Definition version, subject, status, due date, applicability decision, satisfaction method, verifier, verified date, exception, waiver, expiration.

**Relationships**: Belongs to a project; is satisfied by document uses, field values, approvals, task outcomes, or external events.

**Lifecycle**: Pending applicability -> required -> evidence requested -> under review -> satisfied, rejected, waived, expired, or not applicable.

**Visibility**: Follows requirement visibility and evidence permissions.

**Scalability**: Satisfaction is a decision record with provenance. Re-evaluation never erases the previous decision.

### Timeline Event

**Purpose**: Provide a human-readable, chronological projection of meaningful project changes.

**Fields**: Event type, title, summary, effective time, expected time, actor, source, importance, visibility, related object.

**Relationships**: Belongs to a project and references the domain event or record that produced it.

**Lifecycle**: Scheduled -> occurred, revised, cancelled, or superseded.

**Visibility**: Explicitly client, partner, or internal. Sensitive source details may be replaced by a safe summary.

**Scalability**: Timeline entries are projections derived from domain events. Rebuilding a projection must not send duplicate notifications.

## Evidence and collaboration entities

### Document Asset

**Purpose**: Represent a reusable logical document independently of any one project requirement.

**Fields**: Title, document type, subject, owner, issuing country, issue and expiration dates, sensitivity, current version, verification summary, reuse policy, retention policy.

**Relationships**: Has versions; is linked to projects through document uses; may satisfy many requirement instances for different consumers.

**Lifecycle**: Placeholder -> uploaded -> processing -> active -> expired, superseded, revoked, or archived.

**Visibility**: Deny by default. Access is granted through client ownership, project scope, document use, and purpose-specific partner permission.

**Scalability**: Metadata, content storage, and project usage are separate concerns. Content access should be auditable and revocable without deleting the asset.

### Document Version

**Purpose**: Preserve each immutable rendition or revision of a document.

**Fields**: Version number, content reference, checksum, media type, size, uploader, upload time, extracted metadata, translation and certification state, malware-scan state.

**Relationships**: Belongs to one document asset; has verification and approval decisions.

**Lifecycle**: Uploaded -> processing -> available -> superseded or quarantined.

**Visibility**: Inherits document access, with quarantined versions restricted to authorized staff.

**Scalability**: Versions are immutable and content-addressable. Duplicate detection may suggest reuse but cannot merge ownership without authorization.

### Document Use

**Purpose**: Express why a document version is shared and which requirement or consumer may use it.

**Fields**: Document version, project, requirement, consumer, purpose, permission scope, approval status, shared and revoked dates.

**Relationships**: Joins evidence to a requirement instance, task, partner assignment, filing, or agency submission.

**Lifecycle**: Proposed -> approved -> shared -> accepted, rejected, revoked, or expired.

**Visibility**: Only the document owner, authorized project roles, and named consumer.

**Scalability**: Purpose-bound uses prevent broad project access from becoming perpetual document access.

### Verification Decision

**Purpose**: Record whether evidence is authentic, legible, current, translated, certified, and acceptable for a specific use.

**Fields**: Decision type, result, reviewer, method, reason, checked fields, decided date, valid-until date.

**Relationships**: Applies to a document version or document use and may satisfy a requirement instance.

**Lifecycle**: Requested -> under review -> accepted, rejected, or needs changes; later superseded or expired.

**Visibility**: Safe result and remediation can be client-visible; methods and fraud signals may be restricted.

**Scalability**: Verification is contextual. Bank acceptance does not imply immigration acceptance.

### Comment

**Purpose**: Enable contextual discussion on a project object without making conversation the system of record.

**Fields**: Body, author, visibility, mentions, created and edited times, resolution state.

**Relationships**: Anchored to a project, task, requirement, document use, milestone, or partner assignment; may have attachments.

**Lifecycle**: Active -> edited -> resolved or archived. Deletion is restricted and represented by a tombstone when audited.

**Visibility**: Explicit audience selected at creation; cannot silently broaden when the parent becomes more visible.

**Scalability**: Paginated by anchor and time. Mentions create delivery intents, not duplicate comments.

### Attachment

**Purpose**: Attach supplementary material to a comment or activity without treating it as requirement-satisfying evidence by default.

**Fields**: File reference, filename, media type, size, uploader, sensitivity, scan state.

**Relationships**: Belongs to a comment or activity; can be promoted into a document asset through an explicit action.

**Lifecycle**: Uploaded -> available -> archived or quarantined.

**Visibility**: Inherits the parent audience and cannot exceed it.

**Scalability**: Separate lightweight collaboration files from governed document assets.

### Activity

**Purpose**: Provide an immutable audit record of material domain actions.

**Fields**: Action type, actor, acting role, timestamp, source, subject, before/after summary, reason, correlation ID, client-safe summary.

**Relationships**: References any domain entity and groups related actions by request or workflow transition.

**Lifecycle**: Append-only. Corrections are additional activities.

**Visibility**: Full audit access is restricted; selected activities project into client timelines.

**Scalability**: Partition by workspace and time, index by project and subject, and separate immutable audit retention from operational read models.

### Notification

**Purpose**: Deliver a purposeful message generated from a domain change or scheduled obligation.

**Fields**: Recipient, category, urgency, channel, title, body, action target, deduplication key, send-after, delivery state, read state, digest eligibility.

**Relationships**: References its triggering event and affected project object.

**Lifecycle**: Proposed -> suppressed, queued, delivered, failed, read, acted upon, or expired.

**Visibility**: Recipient and authorized support staff; message contents must respect the recipient's permissions at delivery time.

**Scalability**: Notification intent is separate from channel delivery. Deduplication, bundling, and preference evaluation occur before delivery.

## Partner entities

### Partner Organization

**Purpose**: Represent an external service organization such as a law office, bank, translator, accountant, or office provider.

**Fields**: Legal and display names, organization type, countries and regions, languages, status, contacts, compliance state, visibility profile, commercial terms, internal notes.

**Relationships**: Has professionals, capabilities, capacity calendars, SLAs, performance records, and project assignments.

**Lifecycle**: Candidate -> due diligence -> approved -> active -> restricted, suspended, or offboarded.

**Visibility**: Client profile fields are curated; contracts, performance, and internal notes remain internal.

**Scalability**: Organization identity is independent from country-specific approval and capability records.

### Partner Capability

**Purpose**: Describe a service a partner can perform under specific jurisdictional and operational constraints.

**Fields**: Capability type, countries, regions, specialties, languages, eligibility constraints, average turnaround, capacity unit, current availability, pricing reference, quality tier.

**Relationships**: Belongs to a partner organization; matched to task templates and assignment requests.

**Lifecycle**: Proposed -> verified -> active -> constrained -> inactive.

**Visibility**: Selected capability information may be client-visible; ranking and margin data are internal.

**Scalability**: Matching works on normalized capabilities, not free-text partner categories.

### Partner Assignment

**Purpose**: Bind a partner organization or professional to a defined project scope with accountability and access.

**Fields**: Scope, capability, assignee, start, target completion, SLA, state, access grant, acceptance, fee reference, handoff notes.

**Relationships**: Belongs to a project; owns tasks, receives document uses, and contributes performance observations.

**Lifecycle**: Requested -> offered -> accepted -> active -> completed; may be declined, reassigned, suspended, or cancelled.

**Visibility**: Client sees approved partner identity, role, and status. Commercial and performance details remain internal.

**Scalability**: Assignment is the permission boundary and performance measurement unit. Reassignment preserves the prior assignment record.

### Service-Level Agreement

**Purpose**: Define measurable response and completion expectations for packages, tasks, or partner assignments.

**Fields**: Metric, start condition, target, business calendar, pause conditions, warning thresholds, breach action, applicability.

**Relationships**: Referenced by packages, partner capabilities, assignments, and tasks.

**Lifecycle**: Draft -> active -> retired; measurements run -> paused -> met or breached.

**Visibility**: Client-visible only when contractually promised; internal operating targets remain private.

**Scalability**: SLA clocks use jurisdiction-aware business calendars and produce durable measurement records.

## Derived projections

The following are useful read models, not independent sources of truth:

- Project health and risk score.
- Predicted completion date and confidence range.
- Current stage and next client action.
- Client timeline.
- Partner capacity and performance scorecards.
- Admin exception queues.
- Document readiness matrix.
- Portfolio revenue and workload summaries.

Derived projections must name their source facts, calculation version, and last refresh time. Operators may override a projection only through an explicit, reasoned decision that remains visible in audit history.

## Invariants

1. Every active project has one accountable coordinator and one resolved workflow version.
2. Every actionable task has exactly one current owner, even when many parties collaborate.
3. A task cannot complete until its completion policy is satisfied.
4. A requirement is satisfied by a recorded decision, never merely by file presence.
5. A partner sees only assignment-scoped information shared for an explicit purpose.
6. Published templates and accepted document versions are immutable.
7. Current status is queryable, while every prior transition remains auditable.
8. Country-specific rules enter through versioned configuration, not core entity variants.
9. Client-facing projections cannot expose internal notes, hidden tasks, or restricted evidence.
10. Retries and duplicate events cannot create duplicate tasks, transitions, or notifications.
