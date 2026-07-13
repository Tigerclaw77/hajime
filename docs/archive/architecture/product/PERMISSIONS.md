# Permissions and Roles

## Authorization model

Hajime uses role-based permissions constrained by resource scope, relationship, field sensitivity, assignment, and purpose. A role answers what a principal may generally do; scope answers where; relationship and policy answer whether it is allowed for this record now.

Authorization inputs include:

- Principal: person, service identity, or System.
- Active membership and role assignment.
- Workspace, client, partner organization, project, or object scope.
- Relationship: project member, task owner, partner assignee, document owner, reviewer, or approver.
- Record visibility and sensitivity.
- Purpose-bound document use.
- Project and assignment state.
- Explicit deny, legal hold, suspension, or temporary grant.

Explicit deny and restricted-data policy take precedence over broad role grants. UI visibility is never an authorization control.

## Actions

Permissions use precise actions rather than a generic “manage” grant:

- **Read**: retrieve permitted record fields and content.
- **View listing**: discover that a record exists in a queue, list, or summary.
- **Create**: add a record within scope.
- **Modify**: edit mutable fields allowed for the role and state.
- **Approve**: issue an authoritative decision within role competence.
- **Upload**: provide a new document or attachment version.
- **Share**: grant purpose-bound access to another party.
- **Delete**: request deletion or remove a draft where policy permits.
- **Archive**: close routine access while retaining history.
- **Invite**: create a scoped membership invitation.
- **Assign**: change accountable owner or partner assignment.
- **Complete**: transition eligible work under its completion policy.
- **Export**: produce a controlled copy outside the normal view.
- **Administer**: manage configuration or memberships within scope.

Read and View listing are distinct. A partner may know an assigned task exists without being able to read an unrelated document attached elsewhere in the project.

## Roles

### Prospect

**Scope**: Their own intake and proposal context before client activation.

**Can**: Read and modify their submitted intake; upload requested preliminary evidence; view package or proposal information; invite a co-founder only when intake policy permits; accept or decline proposed scope.

**Cannot**: View internal qualification notes, partner directory operations, other prospects, workflow configuration, or staff decisions; approve professional work; delete retained risk or consent records.

### Client

**Scope**: Clients and projects where the person has active membership. Client sub-roles may include account owner, project decision-maker, contributor, billing contact, and document owner.

**Can**: View client-visible project status, milestones, tasks, timeline, partners, and activities; read records shared with their client role; modify permitted business profile fields; upload document versions; approve decisions assigned to them; comment in client-visible threads; invite client members when authorized; request document revocation or deletion; export approved project deliverables.

**Cannot**: View internal-only tasks, comments, risk analysis, partner performance, margins, other clients, or restricted verification details; assign regulated work; modify completed professional or agency decisions; approve on behalf of another required role.

### Coordinator

**Scope**: Assigned projects and operational queues delegated by the workspace.

**Can**: Read project operational records; create and modify project-specific tasks and timelines within policy; assign permitted internal work; request partner assignments; share documents through approved uses; review routine evidence where qualified; communicate with client and partner audiences; pause or escalate work under policy; propose workflow revisions and waivers; invite project participants within allowed roles.

**Cannot**: Issue regulated professional decisions without the relevant role; alter immutable history; expose internal notes; change workspace-wide templates; access unrelated projects unless queue policy grants it; approve their own restricted override when separation of duties applies.

### Admin

**Scope**: Workspace, with restricted sub-roles for operations, partner management, compliance, and configuration.

**Can**: View portfolio and exception queues; manage workspace memberships and role assignments; manage partner organizations and capabilities; approve high-risk assignments and workflow revisions; publish templates when separately authorized; administer retention and operational settings; investigate audit records; suspend access; handle controlled exports and deletion requests.

**Cannot**: Impersonate client or professional approval; rewrite history; bypass purpose-bound document access without an audited emergency or compliance basis; read restricted content merely because it appears in a portfolio metric.

### Partner

**Scope**: Active partner organization membership plus accepted project assignments.

**Can**: View assigned scope, tasks, approved project facts, shared comments, and purpose-bound document uses; modify or complete partner-owned tasks; upload deliverables; request missing information; comment with allowed audiences; approve or verify only within assigned capability and credential; invite partner colleagues when assignment and organization policy allow.

**Cannot**: Browse the full client project, other partner assignments, unrelated client documents, internal Hajime notes, pricing, matching rationale, or performance data; reuse evidence for another matter; share documents onward; change project phase or client commitments.

### Read-only Auditor

**Scope**: Explicit workspace, project, record category, and time window defined by an audit engagement.

**Can**: View approved records, immutable activity, decisions, and exports necessary for the audit; add segregated audit observations if the engagement permits.

**Cannot**: Modify project data, approve work, upload operational evidence, invite users, assign tasks, trigger notifications, or view content outside the audit purpose. Auditor access is time-bound and monitored.

### Support

**Scope**: Technical and customer-support cases, normally metadata-first and time-bound.

**Can**: View account and delivery metadata needed to diagnose access, rendering, or notification issues; manage support cases; guide users; request elevated access through an approved process.

**Cannot**: Read sensitive document content or internal professional notes by default; modify business facts, complete tasks, approve decisions, invite project users, or act as the client. Any temporary content access requires reason, approval, expiry, and audit.

### System

**Scope**: Named, versioned automation rule or service function operating on explicitly granted resources.

**Can**: Evaluate workflows, create tasks from approved rules, update derived projections, propose notifications, perform approved document processing, and execute deterministic transitions whose policy permits automatic progression.

**Cannot**: Hold human credentials, bypass policy, make client attestations, issue professional judgment, invent government or bank outcomes, broaden its own access, or erase audit history. Every action includes rule, version, and correlation ID.

## Capability matrix

The matrix below describes typical maximum capability. Actual permission still depends on scope, state, sensitivity, and separation-of-duties policy.

| Action | Prospect | Client | Coordinator | Admin | Partner | Auditor | Support | System |
|---|---|---|---|---|---|---|---|---|
| View scoped records | Intake only | Client-visible | Assigned projects | Portfolio by duty | Assignment only | Audit scope | Support metadata | Rule scope |
| Modify business data | Intake only | Permitted fields | Yes | Exception only | Assigned fields | No | No | Deterministic rules |
| Create/modify tasks | No | Limited response | Yes | Yes | Assigned scope | No | No | From approved rules |
| Complete tasks | Intake actions | Client-owned | Authorized internal | Authorized | Partner-owned | No | No | Policy-permitted only |
| Approve decisions | Accept scope | Assigned client decisions | Operational only | Overrides by policy | Professional scope | No | No | Never human judgment |
| Upload documents | Requested intake | Yes | Yes | Controlled | Deliverables/shared uses | No | No | Approved processing output |
| Share documents | No | Own documents by policy | Purpose-bound | Controlled | No onward sharing | No | No | Approved routing only |
| Delete records | Draft/request | Request or drafts | Drafts only | Controlled disposition | Own drafts | No | Case metadata only | Retention jobs only |
| Invite users | Limited | Client scope by role | Project scope | Workspace scope | Partner scope by policy | No | No | Invitation workflow only |
| Assign work | No | No | Project/internal request | Yes | Internal partner delegation | No | No | Approved routing rules |
| View internal notes | No | No | Assigned projects | By duty | No | No | Case-specific exception | No |
| View document content | Requested own | Authorized own/project | Project purpose | By duty/purpose | Document use only | Audit purpose | Exceptional grant | Processing purpose |
| Export | Intake copy | Approved deliverables | Controlled project export | Controlled | Assigned deliverable | Audit export | No | Approved generation only |

## Field-level sensitivity

Records classify fields as:

- **General**: normal scoped project access.
- **Client personal**: identity and contact information.
- **Sensitive evidence**: document content, identifiers, ownership, financial sources.
- **Internal confidential**: operations notes, pricing, performance, matching rationale.
- **Restricted**: risk investigations, credentials, incidents, legal holds, fraud indicators.

Queries and projections must apply field policy before returning data. A role that can read a project does not automatically read every field or child record.

## Approval authority and separation of duties

Approval is typed. Client approval, coordinator review, professional verification, admin override, and agency decision are not interchangeable.

High-risk actions can require two distinct principals or roles, including:

- Publishing or migrating compliance workflows.
- Waiving critical requirements.
- Exporting restricted evidence.
- Granting emergency access.
- Reinstating a suspended partner.
- Completing deletion disposition under legal hold.

The actor who prepares work may be prohibited from final approval. Delegation is time-bound, scoped, and auditable.

## Invitations and membership

An invitation names principal contact, scope, proposed role, inviter, expiry, and acceptance status. Acceptance verifies the invited identity in a future authentication layer; this architecture does not define authentication itself.

Membership changes trigger access recalculation, pending-notification cancellation, task ownership review, and document-use review. Removing a user does not delete their historical actions.

## Delete, archive, and retention

Most operational records cannot be hard-deleted after participating in a decision or audit trail. Permissions distinguish:

- Delete an unused draft.
- Request personal-data deletion.
- Archive an inactive operational record.
- Revoke access or document use.
- Apply a retention disposition.

Admins do not receive a universal “force delete.” Legal hold, contract, country rule, and evidence obligations remain authoritative.

## Emergency access

Emergency access is exceptional, time-limited, reasoned, approved, and highly visible in audit. It specifies exact resource, fields, purpose, start, expiry, approver, and follow-up review. It cannot authorize client attestation or professional judgment.

## Authorization invariants

1. Every decision evaluates principal, role, scope, relationship, sensitivity, state, and purpose.
2. Explicit deny and restricted-data policy override broad grants.
3. Partner document access requires an active assignment and document use.
4. Visibility never implies modification or approval rights.
5. Approval types are not interchangeable.
6. System actions are limited to named, versioned rules.
7. Membership removal preserves history and revokes future access.
8. Support access is metadata-first and content access is exceptional.
9. Every export, emergency grant, role change, and restricted access is audited.
10. No administrator can rewrite immutable audit or accepted decision history.
