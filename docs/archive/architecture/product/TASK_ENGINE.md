# Task Engine

## Role of a task

A task is Hajime's smallest accountable unit of work. It answers:

1. What outcome is required?
2. Who is responsible now?
3. What must be true before work can start?
4. What evidence proves completion?
5. Who can see, review, or approve it?
6. When should it finish, and what happens if it does not?

A task is not a checklist string. It has identity, policy, state, history, and relationships. One current owner is accountable even when contributors, reviewers, and watchers are also involved.

## Task anatomy

### Identity and context

- Stable task ID and human-readable project sequence.
- Project, workflow instance, phase, and optional milestone.
- Task type and template version.
- Client-safe title and internal instructions.
- Country, jurisdiction, package, and service scope inherited at creation.

### Accountability

- **Owner**: exactly one person, partner assignment, client role, team queue, or system actor currently accountable.
- **Responsible party**: client, Hajime, partner, government, or system; used for client language and portfolio queues.
- **Contributors**: may work on the task without owning completion.
- **Reviewer and approver**: resolved roles or named assignments.
- **Watchers**: receive only policy-appropriate updates.

Ownership transfer is an explicit transition with prior owner, new owner, reason, accepted time, and effective time. A queue-owned task must be claimed or routed under a measurable policy.

### State

Canonical task states are:

- **Planned**: known but not eligible to begin.
- **Ready**: dependencies and entry conditions are satisfied.
- **In Progress**: active work is occurring.
- **Waiting**: an identified event or party is expected; waiting reason and expected date are required.
- **In Review**: work product is awaiting a defined decision.
- **Blocked**: no valid progress is possible without intervention; blocker and escalation owner are required.
- **Completed**: completion policy is satisfied.
- **Skipped**: applicability resolved false or an authorized path bypassed the task.
- **Cancelled**: work intentionally terminated.

Orthogonal flags include overdue, escalated, reopened, client-visible, SLA at risk, and critical-path. These are not separate states because they can coexist with several states.

### Timing

- Earliest start, target start, due date, and predicted completion.
- Estimated active duration and estimated waiting duration.
- Actual active duration and waiting duration by responsible party.
- Business calendar and time zone.
- SLA policy, clock start, pause intervals, warning threshold, and breach time.
- Hard deadline versus planning target.

Dates retain provenance: template default, dependency calculation, agency deadline, client commitment, coordinator override, or predictive model.

### Dependencies and blockers

Dependencies are typed:

- **Finish-to-start**: predecessor must complete.
- **Evidence**: requirement must be satisfied.
- **Decision**: approval or choice must exist.
- **External event**: filing acknowledgment or agency response must occur.
- **Time gate**: a lawful waiting period or scheduled date must pass.
- **Resource**: qualified owner or capacity must be available.

A task may depend on any or all predecessors. Dependency groups support AND and OR conditions. The resolved graph must be acyclic; cross-workflow dependencies use controlled boundary events rather than hidden links.

A blocking task is a dependency currently preventing another task from becoming ready. A blocker is a runtime condition preventing the current task itself. Both are recorded so Hajime can distinguish “waiting for task X” from “task X cannot proceed because the agency rejected the address.”

### Required documents and requirements

Tasks reference requirement instances, not filenames. A document can support a requirement, but the requirement's verification policy determines readiness. A task can require:

- Evidence uploaded.
- Evidence accepted for a named use.
- Translation or certification complete.
- Approval by a defined role.
- External acknowledgment recorded.
- Structured business data validated.

### Completion policy

Completion requirements are machine-evaluable policy plus human decisions where needed. They may require:

- Required fields present.
- All required requirement instances satisfied.
- Named deliverables attached and accepted.
- Review decision recorded.
- Dependent external event received.
- Client acknowledgment or approval.
- No unresolved critical blocker.

Manual completion cannot bypass policy. An authorized waiver satisfies a specific condition and records scope, reason, approver, and downstream impact.

### Visibility and permissions

Visibility is one of client-visible, partner-visible, shared, or internal-only, with an explicit audience when needed. Visibility controls discovery; permissions separately control commenting, uploading, editing, completing, approving, and reassigning.

Changing visibility triggers a content-safety check for instructions, comments, attachments, and history summaries. Internal content is never exposed merely because a task becomes client-visible.

### Priority

Priority combines operational importance and time sensitivity:

- **Critical**: threatens legal validity, hard deadline, or project outcome.
- **High**: threatens critical path or committed completion range.
- **Normal**: expected project work.
- **Low**: optional or non-blocking improvement.

Priority does not replace due date, SLA, or critical-path status. Automated suggestions may raise an attention signal; a policy or authorized operator changes priority.

## Task history

Every material change appends an audit entry with actor, acting role, timestamp, source, correlation ID, reason where required, and relevant before/after values. History includes:

- Creation and template provenance.
- State transitions and failed transition attempts.
- Ownership and due-date changes.
- Dependency and requirement changes.
- SLA starts, pauses, warnings, and breaches.
- Visibility and permission changes.
- Approvals, rejections, waivers, and reopenings.
- Automation actions and human overrides.

The task's current record is optimized for queues. Audit history remains immutable and is the basis for duration and process-quality measurement.

## Task generation

### Template-generated tasks

Published workflow templates contain versioned task templates. At workflow resolution, Hajime creates only tasks that are known and useful for planning. Future conditional tasks may remain latent nodes until their condition becomes decidable.

Template instantiation resolves:

- Display text and instructions.
- Owner and reviewer rules.
- Visibility.
- Dependencies and completion policy.
- Default duration, calendar, and SLA.
- Required requirement definitions.
- Country, package, and partner overlays.

The resulting task retains template lineage but owns its execution fields. Updating a template does not mutate active work.

### Dynamic tasks

Dynamic tasks are generated from project facts or domain events, for example:

- A government request for additional information.
- A document rejection requiring correction.
- A change in beneficial ownership.
- A failed partner handoff.
- A coordinator-created remediation task.

Every generation rule has a stable rule ID and idempotency key. Reprocessing the same event cannot create duplicates.

### Conditional tasks

Conditional tasks activate only when a versioned rule resolves true, such as “create translation task if document language is not accepted by the receiving agency.” A false result records why the task was not applicable. An unknown result waits for missing facts rather than guessing.

If an input changes after a branch was resolved, the engine performs impact analysis. It may activate new tasks, invalidate completions, or request a controlled workflow revision. It never silently deletes work.

### Recurring tasks

Recurring definitions create individual task occurrences with their own due dates and histories. A recurrence specifies cadence, calendar, horizon, stop condition, owner rule, carry-forward policy, and missed-occurrence behavior.

Formation projects should use recurring tasks only for obligations beginning within scope. Long-term compliance usually transitions to a separate operational or compliance project at handoff.

### Manually created tasks

Authorized users may create project-specific tasks. They must select purpose, owner, visibility, timing, and completion policy appropriate to risk. Manual tasks can join the dependency graph through a controlled revision and cannot weaken template obligations.

## Task readiness and progression

The engine evaluates tasks whenever relevant facts change:

1. Confirm task applicability.
2. Evaluate dependencies and entry conditions.
3. Resolve an eligible owner or assignment.
4. Determine Ready, Planned, Waiting, or Blocked state.
5. Recalculate dates and critical-path impact.
6. Generate only necessary notification intents.
7. Refresh project, milestone, timeline, and admin projections.

Evaluation is deterministic for the same facts and rule versions. It is safe to retry, and concurrent events are resolved with task revision checks.

Automatic progression may move Planned to Ready, Waiting to Ready, or In Review to Completed when policy explicitly permits. It may not fabricate a professional judgment, client approval, or government decision.

## Review, rejection, and reopening

Review is a decision with reviewer, decision scope, result, reason, and timestamp. A rejection moves the task to the state defined by policy, often In Progress or Waiting, and creates explicit remediation requirements.

A completed task may reopen when:

- Accepted evidence expires or is revoked.
- A dependent fact changes materially.
- A downstream reviewer rejects the result.
- An authorized operator identifies an error.

Reopening preserves completion history, records impact, re-evaluates downstream tasks, and updates the predicted timeline.

## SLA and escalation

An SLA defines the measured interval, eligible calendar, clock start, pause rules, warnings, breach, and escalation actions. Waiting on a client may pause a partner SLA but continue a project target clock. Both measurements remain visible internally.

Escalation rules can:

- Notify the current owner before risk becomes a breach.
- Route to the coordinator or partner manager.
- Request ownership acceptance.
- Raise project health risk.
- Trigger reassignment review.
- Surface the task in an admin exception queue.

Escalation never silently reassigns regulated professional work or sends client communications without an approved rule.

## Bulk operations and scale

At portfolio scale, task operations must support saved queues by owner, responsible party, jurisdiction, partner, state, SLA risk, critical path, and client action. Bulk updates require homogeneous permission, an explicit reason, a preview of affected work, and one correlated audit record plus per-task outcomes.

Task counts are not a useful workload measure by themselves. Capacity planning should incorporate estimated effort, waiting state, deadline proximity, complexity, language, and required capability.

## Task engine invariants

1. Every actionable task has exactly one current owner.
2. Completed tasks satisfy their completion policy or carry an explicit authorized waiver.
3. Dependency graphs are acyclic within a workflow revision.
4. Unknown applicability never resolves to not applicable.
5. Waiting states name the expected party or event and expected response window.
6. Blocked states name the blocker and escalation owner.
7. Template changes do not mutate active tasks without a controlled migration.
8. Reprocessing an event does not duplicate tasks or transitions.
9. Visibility changes never expose internal comments or restricted evidence.
10. All automation remains attributable, explainable, and reversible through a new audited action.
