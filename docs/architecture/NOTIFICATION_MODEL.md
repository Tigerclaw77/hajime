# Notification Model

## Philosophy

Hajime notifications exist to preserve clarity and momentum, not to narrate every database change. Every user-facing notification must answer at least one question:

1. **You need to do something.**
2. **Something finished.**
3. **Something is blocked.**
4. **Something changed.**

If a change does not fit one of these purposes, it is usually an activity record, dashboard projection, or silent update rather than an interruptive notification.

The primary experience is the project workspace. Email, SMS, and push bring a person back to a clear action or meaningful update; they do not become a second project-management system.

## Model layers

### Domain event

An authoritative event states what happened, such as a task becoming client-ready, a partner SLA entering risk, or a document use being rejected. Domain events are not messages.

### Notification intent

A policy evaluates the event and proposes a recipient, purpose, urgency, content variables, action target, eligible channels, digest eligibility, and deduplication key.

### Delivery

Recipient permissions, preferences, locale, quiet hours, recent related messages, and current domain state are evaluated immediately before delivery. One intent can produce dashboard and email deliveries without duplicating the underlying meaning.

### Activity and read state

Delivery, failure, open, read, dismissal, and action are channel observations. They do not alter the project unless the user performs the named domain action.

## Notification categories

### Action required

Used when the recipient is responsible for an available action. It includes:

- Plain-language action.
- Project and purpose.
- Due date or expected effort.
- Consequence of delay when material.
- Direct destination to the exact task or decision.

Examples: approve an office, upload capital evidence, accept a partner assignment, review a corrected document.

An action notification expires or resolves when the task completes, ownership changes, or the action is no longer valid.

### Completed

Used for meaningful outcomes, not every task. It identifies what finished, what that unlocks, and what happens next. Routine internal completion can remain silent and appear in activity.

Examples: company registration accepted, bank interview packet approved, formation milestone achieved.

### Blocked

Used when intervention or expectation management is needed. It names the blocker, affected outcome, responsible intervention, and next review point. The message does not blame an external party or expose internal performance notes.

Examples: identity document rejected, government request received, partner capacity threatens a committed date.

### Changed

Used for material scope, date, owner, or requirement changes. It explains the prior expectation, new expectation, reason at an appropriate level, and whether action is needed.

Minor edits and routine date recalculation remain in activity or digest.

## Channels

### Dashboard

The durable source for current notifications. It supports unread state, category, project, due date, action target, and resolution. The dashboard should favor a short exception queue over an endless inbox.

### Email

Suitable for action required, major completion, material blockers, and digests. Email content is permission-safe, minimizes sensitive detail, and links to the authenticated project context in a future production system.

### SMS (future)

Reserved for time-sensitive, high-importance actions when the recipient has explicitly opted in. SMS should contain minimal sensitive information and a recognizable project reference. It is not appropriate for routine updates or document details.

### Push (future)

Suitable for timely actions and blockers after explicit opt-in. Push previews follow privacy settings and avoid sensitive content on locked devices.

### Digest

A scheduled summary that bundles non-urgent changes by recipient and project. It highlights new actions, completed milestones, blockers, and meaningful changes, suppressing anything already resolved or delivered urgently.

### Silent update

Refreshes dashboard, timeline, health, or activity without interrupting the user. This is the default for routine progress, derived date changes within tolerance, comments not mentioning the user, and internal automation.

## Urgency

- **Critical**: immediate risk to legal validity, hard deadline, security, or irreversible outcome.
- **Time-sensitive**: action needed within a defined short window or critical path is at risk.
- **Normal**: useful action or meaningful update without immediate risk.
- **Informational**: digest or dashboard only.

Urgency controls eligible channels and timing. It does not bypass consent, permissions, or quiet-hour policy except for narrowly defined critical events.

## Recipient resolution

Recipients are resolved from current domain responsibility, not hard-coded addresses. Possible recipients include task owner, named client role, coordinator, project team, partner assignee, partner manager, admin queue, or watcher.

Before delivery Hajime verifies:

- Recipient still has access to the project and referenced object.
- Recipient still owns or watches the work.
- The triggering state is still current.
- The message does not include fields the recipient cannot read.
- A more recent event has not superseded the intent.

Messages to organizations route through active memberships and escalation policies. Removing a user or assignment cancels pending deliveries where appropriate.

## Deduplication and bundling

Each intent has a semantic deduplication key such as recipient + project + task + category + state revision. Reprocessing an event cannot deliver the same meaning twice.

Related events are bundled when they share recipient, project, purpose, and delivery window. Examples:

- Three document requests become one “3 documents need you” message.
- Multiple comments within a short period become one update unless the user is directly mentioned.
- A task-ready message is suppressed if a later blocker makes the action unavailable.

Urgent blockers are not delayed merely to bundle them. Bundling never obscures distinct deadlines or responsible actions.

## Reminder policy

Reminders are derived from unresolved actions and escalation policy. A reminder contains new information: approaching due date, changed impact, or escalation. Repeating identical copy on a fixed daily schedule is spam.

A typical cadence can include:

- Initial action request.
- One reminder based on expected effort and due date.
- Due-soon warning when critical-path impact begins.
- Overdue escalation to owner and then coordinator.

Completion, owner change, pause, waiver, or cancellation stops reminders. Coordinators can snooze with reason and next-review time.

## Preferences and quiet hours

Preferences are scoped by category and channel, with required operational exceptions defined by engagement terms. Users can choose immediate or digest delivery for eligible categories, preferred language, time zone, quiet hours, and SMS or push consent.

Critical legal or security notices may be mandatory, but Hajime should clearly identify why they cannot be disabled. Dashboard records remain available regardless of external channel choice.

## Content design

Every notification uses this hierarchy:

- Outcome or required action as the title.
- One sentence of context.
- Responsible party and deadline or completion date.
- One primary action when relevant.
- What happens next.

Avoid internal status codes, percentages without meaning, generic “project updated” copy, legal conclusions not approved by a professional, false urgency, and partner performance details.

Templates are versioned by locale and category. Generated drafts must preserve approved meaning and required variables. A client-visible message can reference an internal event only through an approved safe summary.

## Escalation versus notification

Escalation is a domain policy that changes attention and responsibility. Notifications communicate the escalation. A failed email does not mean escalation failed; the dashboard queue and accountable owner still exist.

Escalation can raise project health, notify a manager, create an intervention task, or trigger reassignment review. Notification delivery is one consequence, not the source of truth.

## Delivery failure

Channel delivery records track queued, delivered, failed, bounced, suppressed, and opted-out states. Retry policy depends on channel and urgency. Permanent failure routes required actions to an internal exception queue so coordinators can restore contact without repeatedly sending.

No delivery provider response changes a task to completed. Links and action tokens, if implemented later, still require current authorization and state validation.

## Measurement

Useful measures include:

- Action completion after notification.
- Time from action readiness to recipient awareness and completion.
- Notification volume per active project and person.
- Bundle and suppression rate.
- Reminder-to-completion rate.
- Unsubscribe, dismissal, bounce, and complaint rate.
- Stale message cancellation rate.
- Critical delivery failures.

Open rate alone is not success. The desired outcome is timely understanding and work completion with fewer interruptions.

## Invariants

1. Every interruptive notification has one of four approved purposes.
2. Domain events, notification intents, and channel deliveries are separate records.
3. Permissions and current state are checked immediately before delivery.
4. Retries cannot produce duplicate messages.
5. Resolved or superseded actions cannot continue reminding.
6. Sensitive data is minimized by channel.
7. Silent updates are the default for routine progress.
8. Escalation remains effective even if external delivery fails.
9. System-generated content never invents legal, bank, or government outcomes.
10. Every notification links to a current, specific object or meaningful project summary.
