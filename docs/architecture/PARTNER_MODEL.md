# Partner Model

## Purpose

Partners extend Hajime's operating capacity and regulated expertise. The model must support attorneys, accountants, translators, banks, insurers, office and mail providers, government filing services, payroll firms, relocation specialists, and future service categories without reducing them to a contact directory.

Partner architecture separates organization identity, verified capability, capacity, commercial relationship, project assignment, scoped access, service-level measurement, and performance. This makes matching explainable and allows Hajime to coordinate thousands of projects without treating all providers of a category as interchangeable.

## Partner organization

A Partner Organization represents a legal or operating entity. Core information includes:

- Legal and display names.
- Organization type and service categories.
- Countries, regions, and physical coverage.
- Languages and supported client communication modes.
- Primary, operational, billing, and escalation contacts.
- Due-diligence, contracting, insurance, and compliance status.
- Client-visible profile and approved claims.
- Commercial terms and settlement references.
- Internal relationship owner and restricted notes.
- Lifecycle state.

### Lifecycle

**Candidate -> Due diligence -> Approved -> Active -> Restricted, Suspended, Offboarding, or Inactive**

Approval is not universal. It can be capability-, country-, and time-specific. Suspending one capability should not automatically terminate unrelated active assignments unless policy requires it.

## Partner professionals and locations

A partner organization can contain professionals, teams, offices, branches, and service desks. A professional record includes person identity, role, credentials, languages, regions, specialties, availability, and organization membership.

Credentials are separate, expiring records with issuing authority, jurisdiction, status, verification, and permitted scope. Hajime must not infer current licensure from a title.

Locations describe service geography, business calendar, submission channels, accessibility, and local capacity. A national organization may still have region-specific constraints.

## Capabilities

A capability is a normalized service the partner is verified to provide. Examples include:

- Corporate formation advice.
- Immigration eligibility review.
- Judicial or company registration filing.
- Tax registration and accounting handoff.
- Certified translation.
- Notarization coordination.
- Business bank onboarding support.
- Registered office provision.
- Residential housing search.
- Business insurance placement.
- Government filing courier or service.
- Mail receiving and forwarding.

Each capability records:

- Capability type and service description.
- Supported countries, regions, entity types, and project types.
- Eligibility constraints and prohibited activities.
- Specialties and complexity tiers.
- Languages.
- Required professional credentials.
- Typical inputs and deliverables.
- Average and percentile turnaround.
- Capacity unit and current availability.
- Standard SLA and escalation path.
- Client visibility.
- Quality tier and effective dates.

Capabilities are **Proposed -> Under verification -> Active -> Constrained -> Suspended or Retired**. Assignment matching can use only active capabilities that satisfy the project context.

## Availability and capacity

Availability answers whether a partner can accept work. Capacity answers how much and by when. Both are time-dependent.

Capacity can be expressed in units appropriate to the service:

- Concurrent active matters.
- Estimated work hours.
- Filing slots per week.
- Appointments per day.
- Addresses or housing units available.
- Translation pages by language pair.

A capability has normal capacity, reserved capacity, accepted load, forecast load, blackout dates, and confidence. Partner-provided capacity and Hajime-observed throughput are stored separately.

Capacity is not a single organization-wide percentage. Matching considers capability, location, language, complexity, deadline, and current assignments. A partner can be available for standard translations and unavailable for certified legal translations.

## Partner assignment

A Partner Assignment binds a provider to a project-specific scope. It includes:

- Project and capability.
- Organization, professional, team, or location.
- Statement of work and deliverables.
- Assignment owner inside Hajime.
- Offered, accepted, start, target, and completed dates.
- Pricing or fee reference where relevant.
- SLA and business calendar.
- Client-visible identity and status.
- Access grant and approved document uses.
- Handoff, escalation, and reassignment policy.

### Lifecycle

**Requested -> Matching -> Offered -> Accepted -> Active -> Submitted or In review -> Completed**

Alternate outcomes are Declined, Expired, Reassignment requested, Suspended, or Cancelled.

Acceptance confirms scope, capacity, target, and access terms. A task should not become partner-owned until an eligible assignment has accepted the relevant work, unless it is intentionally held by a partner queue.

Reassignment creates a new assignment and closes or limits the old one. It preserves ownership history, work product, document access history, and performance measurements.

## Matching and assignment policy

Matching is a ranked recommendation, not an opaque automatic decision. Eligibility gates include:

- Active and verified capability.
- Country, region, entity, and activity fit.
- Required credentials and language.
- Capacity within the target window.
- Conflict-of-interest or exclusivity clearance.
- Compliance and contract status.
- Client or package constraints.

Ranking can consider turnaround reliability, quality, communication, cost fit, existing client relationship, continuity, workload balance, and time zone. Hajime should retain the factors and version of the matching policy used.

Regulated, high-risk, or high-value assignments may require human approval. Automated assignment may eventually be allowed only for pre-approved, low-risk service categories with clear reversal and escalation.

## Service-level agreements

An SLA specifies:

- Measurement: response, acceptance, review, completion, or correction time.
- Clock start and business calendar.
- Target and warning threshold.
- Valid pause reasons, such as waiting on client evidence.
- Breach definition.
- Escalation contacts and required response.
- Client visibility and contractual status.

Each assignment creates actual SLA measurements. Internal targets, partner commitments, and client promises remain distinct so one missed internal goal does not incorrectly appear as a contractual breach.

## Average turnaround and forecasting

Turnaround metrics use comparable work:

- Capability and deliverable type.
- Country and region.
- Complexity tier.
- Complete-input date versus assignment date.
- Active working time versus waiting time.
- Calendar period and sample size.

Display median and percentile ranges rather than only an average. Forecasts include confidence and exclude periods when the partner was legitimately waiting on another party. Manual adjustments remain annotated rather than rewriting observed history.

## Performance metrics

Partner performance is multidimensional:

- Assignment acceptance rate and speed.
- On-time completion rate.
- Median and percentile turnaround.
- SLA warning and breach rate.
- First-pass acceptance or rework rate.
- Document rejection and correction rate.
- Responsiveness and status-update reliability.
- Client feedback where appropriate.
- Coordinator quality review.
- Capacity accuracy.
- Escalation and reassignment rate.
- Outcome measures only where attribution is fair.

Metrics include sample size, period, comparable cohort, and exclusions. Hajime should avoid one opaque score that punishes partners for government delays or difficult matters. A derived recommendation tier can exist, but operators need the contributing evidence.

## Internal notes and client visibility

Partner data is classified:

- **Public or client-visible**: approved name, role, profile, languages, contact route, assignment status, and expected timing.
- **Shared operational**: task instructions, approved comments, deliverables, and assigned document uses.
- **Internal confidential**: performance, pricing, capacity concerns, escalation history, selection rationale, and relationship notes.
- **Restricted**: due diligence, contracts, credentials, incidents, disputes, and compliance investigations.

Internal notes never appear in client or partner projections. A note's audience is fixed at creation and cannot be broadened implicitly.

## Partner access and offboarding

Partner access begins through organization membership and becomes project-specific through an accepted assignment. The partner can access only assigned tasks, shared comments, necessary project facts, and purpose-bound document uses.

Completion, cancellation, suspension, or reassignment triggers access review. Unnecessary project and document access is revoked promptly while required records remain available under retention policy. Offboarding also resolves active assignments, rotates shared channels or credentials where relevant, and records alternate providers.

## Bottleneck management

A partner bottleneck exists when constrained capacity, SLA risk, repeated waiting, or quality issues threaten one or more project critical paths. Admin views should show:

- Affected capability and partner.
- Number and importance of projects affected.
- Oldest and predicted delays.
- Root cause: capacity, missing input, quality, communication, agency dependency, or incident.
- Available alternate partners and reassignment cost.
- Current escalation owner and next decision.

Bottlenecks are measured from assignments and tasks rather than manual labels alone.

## Scalability

At scale, Hajime needs indexed operational views for available capability, capacity forecast, assignment queue, SLA risk, credential expiry, restricted providers, bottlenecks, and reassignment candidates.

Global partner organizations can have many local capabilities and contracts. Performance data is append-only observation summarized into time-windowed projections. Matching and scoring policies are versioned so decisions remain explainable.

## Invariants

1. A category label alone never qualifies a partner for work.
2. Every partner-owned task maps to an active assignment or explicit assignment queue.
3. Assignment scope is the boundary for access and performance measurement.
4. Capacity is capability-, time-, and location-specific.
5. Partner suspension prevents new matching and triggers active-assignment review.
6. Reassignment preserves prior ownership and access history.
7. Government or client waiting time is not counted as partner working delay when policy pauses the clock.
8. Client-visible profiles contain only approved claims.
9. Performance metrics retain cohort, period, and sample context.
10. Internal notes, pricing, and due-diligence records never leak to client views.
