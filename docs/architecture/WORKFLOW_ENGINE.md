# Workflow Engine

## Purpose

The workflow engine turns a client's objective and jurisdictional facts into an executable, explainable project plan. It coordinates dependencies, branching, parallel work, ownership, waiting, escalation, and progression while keeping professional and government decisions outside the engine's authority.

The engine is country-neutral. Japan is a versioned configuration assembled from the same primitives used for Singapore, UAE, Portugal, Estonia, and the United States.

## Design principles

1. **Configuration over country forks**: countries contribute templates, requirements, calendars, agencies, and partner capabilities, not custom project classes.
2. **Immutable published versions**: active projects execute against resolved template versions until a controlled migration is approved.
3. **Explicit graph semantics**: every dependency, branch, wait, and completion rule is inspectable.
4. **Facts drive progression**: state changes follow authoritative events and decisions, not UI actions or percentages.
5. **Human authority is preserved**: automation may coordinate but cannot impersonate a client, professional, bank, or agency.
6. **Safe retries**: repeated evaluation produces the same state and no duplicate work.
7. **Client clarity is a projection**: the full graph can be operationally precise while the client sees a calm current/next/owner/timeframe view.

## Template composition

A resolved workflow is composed in layers:

1. **Core project-type template**: common formation concepts such as planning, identity evidence, ownership, registration, tax, banking, and handoff.
2. **Country and jurisdiction overlay**: local entity types, agencies, requirements, calendars, sequencing, and accepted evidence.
3. **Business-activity overlay**: regulated industry, immigration route, foreign ownership, licensing, or other applicability rules.
4. **Package overlay**: support level, internal reviews, SLAs, deliverables, and client communication commitments.
5. **Client and business facts**: founders, ownership, language, target city, capital, timing, and chosen options.
6. **Approved project exceptions**: explicit additions, waivers, substitutions, or schedule decisions.

Composition produces a resolved plan and a conflict report. Conflicts include incompatible owner rules, contradictory sequencing, requirement substitutions, duplicate deliverables, and package exclusions. A project cannot activate while critical conflicts remain unresolved.

Each resolved node records source template, source version, overlay precedence, and resulting policy. This allows an operator to answer “why is this required?” without reading code.

## Workflow primitives

### Node types

- **Phase**: client-understandable grouping and reporting boundary.
- **Milestone**: meaningful outcome achieved by policy.
- **Task**: accountable work owned by one party.
- **Requirement**: obligation satisfied by evidence, fact, approval, or event.
- **Decision**: authoritative choice or review result.
- **Branch**: selects valid paths from facts or decisions.
- **Wait**: expects a party, date, or external event.
- **External event**: records an agency, bank, or partner outcome.
- **Sub-workflow**: reusable bounded process such as translation or address procurement.
- **Boundary event**: communicates a stable outcome between sub-workflows without coupling internal graphs.

### Transitions

A transition defines source states, target state, condition, actor authority, required evidence, side effects, and client visibility. Transitions are evaluated against a versioned fact snapshot and produce an immutable transition record.

Side effects are expressed as domain intents such as “create task from template,” “request partner assignment,” “recalculate timeline,” or “propose notification.” The transition itself does not send messages or mutate unrelated aggregates directly.

## Dependency semantics

Dependencies may require:

- Completion of one or all predecessor nodes.
- Satisfaction of a requirement.
- A specific decision result.
- Occurrence of an external event.
- Passage of a lawful time interval.
- Availability of a qualified resource.
- Achievement of a milestone or boundary event.

AND groups require all conditions. OR groups require at least one accepted path. Optional dependencies influence planning but do not gate readiness. Dependency cycles are rejected at template validation and controlled workflow revision.

The engine calculates a critical path from dependency graph, active and waiting durations, hard deadlines, calendars, and resource constraints. The critical path is a projection and may change as facts or observed durations change.

## Conditional branching

Branch conditions operate on normalized, versioned facts. Every evaluation returns one of:

- **True**: activate the branch.
- **False**: record non-applicability and skip the branch.
- **Unknown**: identify missing facts and generate or expose the work needed to decide.
- **Conflict**: facts are inconsistent or multiple exclusive paths resolve true; require review.

Examples include whether translation is required, whether a foreign director changes address requirements, whether an immigration sub-workflow applies, or whether a tax election is available.

Branch decisions record inputs, rule version, result, and actor if manually decided. When a source fact changes, the engine performs impact analysis. It does not silently erase completed work. The result may be a new branch, invalidated requirement, reopened task, or proposed workflow revision.

## Parallel work

Any ready nodes without mutual dependencies may progress concurrently. Parallel groups can define:

- All branches must complete.
- Any one branch may complete.
- A minimum subset must complete.
- One branch is critical while others are best effort.
- A branch may continue after project completion under a successor project.

Phase overlap is expected. For example, banking preparation and tax intake can begin while government registration is pending. Client projections identify the primary current stage using critical-path significance, not simply the first active phase.

## Ownership classes

### Client-owned work

Requires a client role or named client member to provide a decision, evidence, signature, attendance, or acknowledgment. The engine provides plain-language purpose, deadline, expected effort, acceptable evidence, and consequence of delay.

### Partner-owned work

Requires an accepted partner assignment with the necessary capability and access. Partner ownership is scoped to the assignment. If the assignment ends, uncompleted work returns to an assignment queue or is explicitly transferred.

### Internal work

Owned by a coordinator, specialist, team queue, or administrator. Internal-only instructions and comments never project to client or partner views.

### Government or external waiting

No Hajime user owns the external decision. A coordinator or partner owns monitoring and response readiness. The project displays “waiting on government” rather than implying active work by Hajime.

### System-owned work

Limited to deterministic, approved operations such as evaluating conditions, generating a reminder intent, or assembling a draft. System ownership never covers professional approval, client attestation, or external submission unless a future authorized integration explicitly supports it.

## Automatic progression

The engine can progress when an explicit rule has authoritative inputs. Typical automatic transitions include:

- Planned task becomes Ready after dependencies complete.
- Waiting task resumes when the expected document use is accepted.
- Milestone becomes Achieved when all completion conditions are satisfied.
- A conditional branch activates after a structured decision.
- A phase completes after its exit policy succeeds.
- A downstream timeline is recalculated after dates change.

Before automatic progression, the engine verifies workflow revision, transition preconditions, actor authority for source decisions, and idempotency key. The resulting transition is attributed to the System principal with rule version and source events.

Automatic progression stops and creates an exception when facts conflict, policy is ambiguous, a required owner cannot be resolved, or the resulting change would invalidate accepted professional work.

## Waiting states

A waiting state records:

- Waiting category: client, partner, government, date, document, decision, resource, or external system.
- Expected party or event.
- Started date and expected response range.
- Reminder and escalation policy.
- Which SLA clocks pause or continue.
- Downstream tasks and dates at risk.
- Client-safe explanation.

Waiting is normal project state. It becomes blocked when the expected event is overdue beyond policy, is rejected, becomes impossible, or lacks a responsible monitor.

## Escalation

Escalation is a policy-driven response to risk, not just another notification. Escalation levels may include:

1. Owner reminder.
2. Coordinator attention.
3. Partner manager or team lead review.
4. Admin intervention and project health change.
5. Client expectation reset or alternate path decision.

Each escalation has trigger, target, required response, due time, resolution, and audit history. Repeated reminders are suppressed once escalation moves to a higher level. A project may remain active while one branch is escalated.

## Paused workflows

A workflow can be paused wholly or by scope. Pause records reason, initiator, authority, effective time, affected nodes, SLA behavior, client visibility, review date, and permitted background work.

On resume, the engine re-evaluates:

- Expired or superseded documents.
- Changed country rules and whether migration is required.
- Partner assignment and capacity.
- Missed hard deadlines.
- Branch inputs and requirement applicability.
- Predicted dates and package commitments.

Resume produces an impact summary before work restarts.

## Cancelled workflows

Cancellation is terminal for the workflow instance. It:

- Stops future task and recurrence generation.
- Cancels or closes open work according to disposition rules.
- Revokes unnecessary partner permissions and document uses.
- Closes SLA measurements.
- Preserves all history and accepted evidence.
- Records reason, authority, effective date, client communication, and successor workflow if any.

A cancelled project can be copied into a new project, but the old workflow is never reactivated or rewritten.

## Workflow revisions and migration

Active projects sometimes need a controlled revision because client facts change, regulations change, or an error is found. A revision proposal contains:

- Reason and initiating event.
- Current and proposed resolved graphs.
- Added, removed, reopened, or changed nodes.
- Requirement and document impact.
- Partner scope and permission impact.
- Timeline and package impact.
- Required approvals and client communication.

Removed obligations receive a disposition such as not applicable, superseded, or cancelled; they are not deleted. Completed work remains historical. Migration is atomic from the project's perspective and can be safely retried.

Template publishers may issue advisories for active projects. Advisories can be informational, recommended, or mandatory. A mandatory advisory still follows controlled migration and authority rules.

## Reusable sub-workflows

Common processes should be reusable sub-workflows with declared inputs, outputs, owner classes, and boundary events. Candidates include:

- Identity evidence collection.
- Translation and certification.
- Registered address procurement.
- Capital evidence preparation.
- Beneficial-owner review.
- Professional partner review.
- Government filing and response.
- Banking readiness.
- Operational handoff.

Sub-workflows do not read arbitrary parent internals. They receive explicit facts and emit stable outcomes, making country overlays composable and testable.

## Validation and simulation

Before publication, a template must pass:

- Schema and reference validation.
- Dependency cycle detection.
- Unreachable and dead-end node detection.
- Missing owner, visibility, completion, and escalation policies.
- Branch coverage for true, false, unknown, and conflict results.
- Permission and data-exposure checks.
- Package and country overlay conflict checks.
- Simulation against representative project scenarios.

Simulation should explain generated tasks, requirements, critical path, predicted range, responsible parties, and unresolved facts. It does not create live project records.

## Operating at scale

The engine maintains operational projections for current project phase, next action, health, completion prediction, open client work, blocked work, partner bottlenecks, and SLA risk. These projections are derived from workflow truth and can be rebuilt.

Evaluation occurs from relevant domain events, not constant full-project polling. Events are ordered within a project, handlers are idempotent, and long histories are compacted into snapshots without discarding audit records.

Portfolio operations can filter by template and configuration version, making it possible to identify every active project affected by a rule advisory or agency outage.

## Engine invariants

1. Every active workflow has immutable template provenance and one current revision.
2. Every active node has a valid owner class, completion policy, and visibility policy.
3. Dependency graphs contain no cycles.
4. Unknown branch inputs create questions, not guessed paths.
5. Automatic transitions use authoritative facts and leave attributable records.
6. Country behavior is expressed through configuration and reference data.
7. Pausing and cancellation preserve history and revoke unnecessary access.
8. Workflow revision never silently deletes obligations or accepted work.
9. Client timelines are permission-safe projections, not the execution graph itself.
10. Repeated events cannot duplicate nodes, transitions, or side effects.
