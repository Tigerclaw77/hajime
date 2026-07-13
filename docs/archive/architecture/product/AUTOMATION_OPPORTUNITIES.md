# Automation Opportunities

## Purpose

This document identifies future automation opportunities without prescribing implementation, vendors, APIs, or data structures. Automation should reduce coordination cost, shorten waiting time, improve consistency, and surface risk while preserving human authority and client trust.

Hajime should automate **preparation, routing, checking, prediction, and summarization** before automating consequential decisions. Professional judgment, client attestation, government action, bank decisions, and policy exceptions remain attributable to authorized humans or external authorities.

## Automation maturity levels

### Level 0: Manual with structure

People perform the work using consistent fields, states, templates, and audit history. This creates reliable operating data.

### Level 1: Suggest

The system recommends an action, match, date, classification, or draft. A human accepts, edits, or rejects it.

### Level 2: Prepare

The system assembles a complete proposed output, routes it for review, and explains assumptions. An authorized person approves the outcome.

### Level 3: Execute reversible work

The system performs a low-risk, policy-approved action that is observable, idempotent, and readily reversible, such as updating a derived timeline or scheduling a reminder intent.

### Level 4: Execute consequential work

Reserved for mature, explicitly authorized processes with strong evidence, controls, monitoring, and exception handling. Many professional, financial, legal, and government actions may never be appropriate for this level.

## Universal guardrails

Every automation opportunity should define:

- Named purpose and responsible business owner.
- Eligible project, country, package, and risk scope.
- Required authoritative inputs and data quality threshold.
- Rule or model version.
- Confidence or uncertainty where applicable.
- Human review and override policy.
- Idempotency and retry behavior.
- Permission and sensitive-data boundaries.
- Audit record and client-safe explanation.
- Failure, rollback, and escalation path.
- Quality, fairness, and drift measures.
- Sunset or disable control.

Automation must return **unknown** or create an exception when facts are insufficient. It must not silently guess.

## Prospect and client intake

### Intake normalization

Convert structured responses and uploaded intake material into candidate person, business, country, activity, ownership, language, and timing facts. Flag conflicts for review rather than overwriting prior answers.

**Suggested maturity**: Prepare. Human confirms material legal and commercial facts.

### Eligibility triage

Compare known facts with supported countries, entity types, industries, ownership constraints, package boundaries, and partner availability. Produce eligible, ineligible, uncertain, and needs-review explanations.

**Suggested maturity**: Suggest. Adverse or high-risk outcomes require review.

### Duplicate relationship detection

Suggest possible duplicate people, clients, businesses, projects, and documents using stable identifiers and similarity. Never merge automatically.

**Suggested maturity**: Suggest.

### Package recommendation

Recommend a support package based on project complexity, client preference, language, timing, partner coordination, and expected service load. Explain fit and exclusions.

**Suggested maturity**: Suggest. Commercial owner confirms.

### Proposal and scope drafting

Prepare a proposal, assumptions, exclusions, target range, and responsibility map from approved package language and intake facts.

**Suggested maturity**: Prepare. Human approves before sending.

### Onboarding coordination

Generate welcome steps, invite required client roles, assign a coordinator candidate, request consents, and create planning tasks after engagement acceptance.

**Suggested maturity**: Execute reversible work within approved templates.

## Project planning

### Workflow selection and composition

Select candidate project-type, country, business-activity, and package templates. Resolve branches from known facts and identify missing decisions or template conflicts.

**Suggested maturity**: Prepare. Coordinator approves the resolved plan.

### Requirement generation

Instantiate applicable requirement definitions based on country, entity type, stakeholders, activities, package, and agency rules. Explain the source and applicability decision.

**Suggested maturity**: Execute reversible work for published deterministic rules; review uncertain and changed-rule cases.

### Timeline generation

Create an initial dependency-aware schedule using template durations, jurisdiction calendars, partner availability, external review ranges, and client target dates.

**Suggested maturity**: Prepare, then execute derived updates after approval.

### Deadline prediction

Predict completion ranges for tasks, milestones, phases, and project based on current critical path, observed turnaround, waiting party, capacity, and known deadlines. Include confidence and assumptions.

**Suggested maturity**: Suggest. Predictions never replace legal deadlines or contractual commitments.

### Critical-path and slack calculation

Identify work currently controlling completion and the remaining tolerance for noncritical tasks. Refresh after relevant transitions.

**Suggested maturity**: Execute reversible derived projection.

### Scenario comparison

Compare route choices such as entity type, target city, office option, partner, or banking path by requirements, timing, cost categories, risks, and client work.

**Suggested maturity**: Prepare. Professional implications require attributed advice.

### Project plan quality check

Detect missing owners, impossible dates, unresolved branches, cyclic dependencies, absent completion policies, package conflicts, or unsupported requirements before activation.

**Suggested maturity**: Execute validation; block activation only under published policy.

## Task operations

### Task generation

Create template, conditional, dynamic, and recurring tasks from resolved workflow rules and domain events.

**Suggested maturity**: Execute reversible work with idempotency and complete provenance.

### Owner and queue routing

Recommend or assign tasks based on role, capability, project relationship, language, time zone, availability, capacity, continuity, and conflict policy.

**Suggested maturity**: Suggest for regulated or high-risk work; reversible execution for pre-approved internal queues.

### Readiness evaluation

Move planned tasks to ready when dependencies and entry conditions are satisfied, or identify the exact unresolved dependency.

**Suggested maturity**: Execute deterministic transitions.

### Waiting-state management

Classify waiting party, expected event, response range, affected SLA clocks, and downstream impact from structured facts. Suggest correction when a task remains “in progress” without active work.

**Suggested maturity**: Prepare or execute for deterministic workflow events.

### Due-date recalculation

Recalculate predicted dates when dependencies, calendars, partner estimates, or external waits change. Preserve committed and statutory dates separately.

**Suggested maturity**: Execute derived prediction; require approval to change commitments.

### Completion validation

Evaluate whether required fields, requirements, evidence, reviews, and external events satisfy the task completion policy.

**Suggested maturity**: Execute validation. Auto-complete only tasks whose published policy requires no human judgment.

### Recurring obligation generation

Create future occurrences from approved cadence, calendar, owner, and stop rules; suppress duplicates after handoff or cancellation.

**Suggested maturity**: Execute reversible work.

### Stale work detection

Identify tasks with no meaningful activity, stale ownership, missing expected response, excessive review cycles, or status inconsistent with evidence.

**Suggested maturity**: Suggest and route to an exception queue.

### Workload balancing

Forecast coordinator and team load using effort, complexity, deadlines, waiting state, and skills rather than raw task counts. Recommend reassignment before critical overload.

**Suggested maturity**: Suggest.

## Partner operations

### Partner matching

Rank eligible partner capabilities by jurisdiction fit, credentials, specialty, language, capacity, turnaround, quality, continuity, cost fit, and client constraints. Explain eligibility gates and ranking factors.

**Suggested maturity**: Suggest. Human approval remains for regulated, high-risk, or material engagements.

### Availability and capacity forecasting

Forecast capability-specific capacity from accepted assignments, estimated work, planned starts, historical throughput, and blackout dates. Compare partner-reported availability with observed load.

**Suggested maturity**: Suggest and derived projections.

### Assignment offer routing

Prepare scope, required capability, target, SLA, inputs, and access for a proposed partner assignment; route to partner acceptance.

**Suggested maturity**: Prepare. Auto-offer only under pre-approved low-risk routing policy.

### Partner SLA monitoring

Start, pause, warn, and close assignment measurements from authoritative task and waiting events. Route warnings and breaches according to policy.

**Suggested maturity**: Execute deterministic measurement and escalation intents.

### Bottleneck detection

Detect shared partner constraints affecting multiple projects, estimate critical-path impact, and identify alternate capability providers.

**Suggested maturity**: Suggest.

### Reassignment recommendation

Compare continuing delay against reassignment cost, access changes, work already completed, client continuity, and alternate availability.

**Suggested maturity**: Suggest. Reassignment remains human-approved.

### Performance summarization

Calculate cohort-aware turnaround, first-pass acceptance, rework, SLA, responsiveness, and capacity accuracy while excluding legitimate external waits.

**Suggested maturity**: Execute derived projection with transparent inputs.

### Credential and contract expiry

Warn before professional credentials, due diligence, insurance, contracts, or capability approvals expire; identify affected future and active assignments.

**Suggested maturity**: Execute reminders and exception routing.

## Document operations

### Document classification

Suggest document type, subject, issuing country, language, issue date, and expiration from content and project context.

**Suggested maturity**: Prepare. Sensitive or low-confidence classifications require review.

### Metadata extraction

Extract candidate names, dates, identifiers, addresses, and structured facts while preserving source location and confidence. Compare against project facts and surface discrepancies.

**Suggested maturity**: Prepare. Never overwrite authoritative facts automatically.

### Document quality checks

Detect unreadable pages, truncation, missing pages, unsupported format, obvious expiration, inconsistent orientation, or absent expected sections.

**Suggested maturity**: Execute reversible request-for-correction for high-confidence technical defects; otherwise suggest.

### Requirement-to-evidence matching

Suggest which existing or newly uploaded documents could satisfy each requirement and which consumer-specific checks remain.

**Suggested maturity**: Suggest. Requirement satisfaction still needs its defined decision.

### Reuse suggestion

Identify eligible existing versions across authorized client projects, explain validity and certification fit, and prepare a new purpose-bound document use.

**Suggested maturity**: Prepare. Client approval and consumer verification follow policy.

### Expiry prediction and impact analysis

Identify documents that will expire before expected submission, then list affected requirements, tasks, partners, and timeline risk.

**Suggested maturity**: Execute derived analysis and reminders.

### Verification assistance

Prepare legibility, consistency, date, translation, certification, and consumer-specific check results for a qualified reviewer.

**Suggested maturity**: Prepare. Automated acceptance is limited to explicitly approved, objective checks.

### Translation request creation

Detect language mismatch, determine required target language and certification from the requirement, estimate volume, and prepare a translator assignment.

**Suggested maturity**: Prepare.

### Translation quality assistance

Flag missing sections, mismatched names or dates, and source-to-translation coverage for reviewer attention.

**Suggested maturity**: Suggest; certified translation approval remains qualified human work.

### Certification routing

Determine candidate certification, notarization, apostille, legalization, or sworn-translation path from country and consumer rules; generate the appropriate sub-workflow.

**Suggested maturity**: Prepare. Ambiguous cross-border rules require professional review.

### Document packet assembly

Assemble an ordered candidate packet using accepted versions, translations, certifications, and required cover materials. Produce a readiness report and version manifest.

**Suggested maturity**: Prepare. Responsible filer approves before submission.

### Permission and retention review

Recommend revocation of partner access after assignment completion and retention dispositions after project closure, subject to legal holds and policy.

**Suggested maturity**: Prepare; execute only deterministic access expiry already approved in the grant.

## Timeline, health, and risk

### Timeline updates

Project meaningful task and milestone changes into a client-safe timeline, suppressing internal noise and sensitive details.

**Suggested maturity**: Execute deterministic projection from approved event mappings.

### Project health scoring

Combine critical-path delay, unresolved blockers, overdue client work, partner SLA risk, document readiness, agency variance, scope change, and completion confidence into an explainable health assessment.

**Suggested maturity**: Suggest. Display contributing reasons and allow reasoned human override.

### Risk detection

Identify patterns such as expiring evidence, inconsistent ownership, repeated document rejection, agency delays, unrealistic target, partner concentration, or unresolved regulated activity.

**Suggested maturity**: Suggest and route by severity. Risk signals do not become accusations or legal conclusions.

### Change-impact analysis

When a business fact, country rule, partner assignment, or accepted document changes, identify affected requirements, tasks, branches, dates, permissions, and communications before mutation.

**Suggested maturity**: Prepare. Controlled workflow revision applies approved changes.

### Government delay modeling

Compare current external waits with agency, jurisdiction, filing type, season, and recent observed ranges. Explain uncertainty and distinguish published from observed timing.

**Suggested maturity**: Suggest.

### Ahead/behind schedule language

Generate client-safe status such as “On track,” “Waiting on government review,” or “Your office decision is now controlling the timeline” from approved health rules.

**Suggested maturity**: Prepare or execute for deterministic mappings. Never imply certainty beyond the forecast.

## Communication and notifications

### Reminder generation

Create reminder intents based on unresolved actions, due dates, expected effort, critical path, prior delivery, quiet hours, and escalation level.

**Suggested maturity**: Execute under notification policy.

### Notification suppression and bundling

Cancel stale messages, deduplicate retries, combine related requests, and route low-urgency changes into digests.

**Suggested maturity**: Execute deterministic policy.

### Status update drafting

Draft concise current/next/owner/timeframe summaries from authoritative project state, with separate client, partner, and internal versions.

**Suggested maturity**: Prepare. Automatic delivery only for deterministic approved templates.

### Email drafting

Prepare contextual action requests, completion notices, blocker explanations, meeting summaries, and follow-ups using approved language and current facts.

**Suggested maturity**: Prepare. Sensitive, adverse, or professional content requires review.

### Digest generation

Bundle meaningful actions, completions, blockers, and changes by recipient and project, excluding resolved or already delivered urgent items.

**Suggested maturity**: Execute after permission and freshness checks.

### Comment summarization

Summarize long operational threads into candidate decisions, unresolved questions, and next actions while linking back to source comments.

**Suggested maturity**: Suggest. Summary is never the audit record.

### Meeting preparation and recap

Prepare agenda, open decisions, expiring items, partner handoffs, and recent changes; after a meeting, propose tasks and decisions for confirmation.

**Suggested maturity**: Prepare. No task or decision is created from ambiguous conversation without confirmation.

### Translation of communications

Prepare localized client and partner communication while preserving approved meaning, names, dates, and action targets.

**Suggested maturity**: Prepare. Professional or legally significant language requires qualified review.

## Government and filing operations

### Filing readiness

Evaluate packet requirements, accepted evidence, signatures, dates, translations, certifications, and professional approval before submission.

**Suggested maturity**: Execute validation; responsible filer approves readiness.

### Submission preparation

Prepare filing forms or packets from approved facts and documents, with source provenance and unresolved-field report.

**Suggested maturity**: Prepare. Submission remains authorized human or future approved integration work.

### Acknowledgment and result classification

Classify received agency correspondence as acknowledgment, request for information, approval, rejection, payment request, appointment, or other event and route for confirmation.

**Suggested maturity**: Prepare. Consequential classification requires review before workflow progression.

### Request-for-information routing

Extract candidate deadline, requested items, agency, affected filing, and responsible parties; generate a remediation plan for approval.

**Suggested maturity**: Prepare with urgent review.

### Agency status and calendar updates

Maintain observed closures, outages, and turnaround ranges; identify affected active projects.

**Suggested maturity**: Suggest from approved sources and internal observations. Country operations validates material changes.

## Banking, tax, and operational handoff

### Banking readiness score

Assess whether business plan, ownership, formation evidence, address, capital source, local presence, and interview preparation are ready for a selected bank path.

**Suggested maturity**: Suggest. It does not predict or promise approval.

### Bank request routing

Map an additional-information request to existing evidence, new requirements, client actions, and deadlines; prepare reuse permissions.

**Suggested maturity**: Prepare.

### Tax applicability and calendar

Generate candidate registrations and recurring obligations from jurisdiction, entity, fiscal, payroll, and activity facts.

**Suggested maturity**: Prepare. Qualified tax partner approves applicability and elections.

### Operational readiness check

Evaluate whether address, banking, tax, accounting, payroll, insurance, mail, records, credentials, and recurring owners meet the package completion policy.

**Suggested maturity**: Execute validation with explicit waivers.

### Handoff packet preparation

Assemble accepted deliverables, identifiers, contacts, recurring obligations, credentials references, open risks, and next dates into a candidate operating packet.

**Suggested maturity**: Prepare. Coordinator approves and client accepts.

## Admin and portfolio operations

### Exception queue prioritization

Rank blocked projects, overdue tasks, partner bottlenecks, client actions, expiring documents, and nearing-completion projects by impact, urgency, and confidence.

**Suggested maturity**: Execute derived ordering with transparent reasons.

### Portfolio forecasting

Forecast starts, completions, coordinator load, partner demand, service revenue timing, and support volume by country, package, and capability.

**Suggested maturity**: Suggest for planning.

### Quality assurance sampling

Select projects, decisions, document reviews, or partner assignments for audit based on risk and representative coverage, without letting high-volume standard work crowd out rare high-risk cases.

**Suggested maturity**: Suggest. Audit owners control the review.

### Template performance analysis

Compare expected and observed duration, rework, branch frequency, blocker rate, client effort, and outcome by template version. Recommend candidate improvements.

**Suggested maturity**: Suggest. Template publishing remains governed.

### Regulatory change impact search

Given an approved rule advisory, find affected templates, active workflows, requirement instances, evidence, partner assignments, and future projects.

**Suggested maturity**: Prepare impact report. Country operations and professionals decide remediation.

### Revenue and scope-risk detection

Flag projects whose actual complexity, partner load, or work volume materially diverges from package assumptions. Keep service-delivery decisions separate from automated commercial pressure.

**Suggested maturity**: Suggest to authorized commercial and operations roles.

### Retention and access review

Identify completed projects, expired memberships, ended partner assignments, stale exports, and documents eligible for retention review.

**Suggested maturity**: Prepare. Execute only pre-approved expiry and archival rules; deletion requires disposition policy.

## Recommended sequencing

### Foundation

Begin with structured manual operations, deterministic workflow validation, requirement generation, task readiness, timeline projections, SLA clocks, notification deduplication, and audit-complete routing. These create trustworthy data and immediate operational leverage.

### Assisted operations

Add partner matching suggestions, document classification and extraction, requirement-to-evidence matching, status drafting, deadline prediction, project health reasons, and bottleneck detection. Keep humans in approval loops and measure suggestion quality.

### Controlled execution

Allow approved low-risk automatic progression, reminders, digests, capacity-based internal routing, access expiry, recurring task generation, and derived timeline updates. Every action remains observable and reversible through a new audited transition.

### Advanced coordination

Only after sufficient quality evidence, consider broader document verification, low-risk partner auto-assignment, external status retrieval, submission preparation, or consequential execution. Each country and process earns this maturity independently.

## Automation readiness criteria

An opportunity is ready to advance only when:

- The manual process and accountable owner are stable.
- Inputs are structured, available, and permissioned.
- Success, failure, and abstention are measurable.
- Exceptions have a staffed queue and response policy.
- The action is idempotent or has a safe duplication control.
- Human override and rollback are understood.
- Audit and client explanation are complete.
- Country and package variations are represented in versioned policy.
- Quality is demonstrated across representative cases, not only easy ones.
- The expected client and operating benefit exceeds added complexity and risk.

## Automation anti-patterns

- Automating a process that has no clear human owner.
- Treating model confidence as legal authority.
- Generating tasks or notifications without deduplication.
- Hiding uncertainty behind a single percentage or exact date.
- Changing active workflow obligations when templates update.
- Copying one consumer's document acceptance to another.
- Ranking partners with an opaque score lacking cohort context.
- Auto-sending sensitive or adverse communications without review policy.
- Using automation to broaden access or bypass separation of duties.
- Optimizing message opens or task closures instead of valid project outcomes.
