# Document Engine

## Core idea: documents satisfy requirements

Hajime does not treat a file's presence as progress. A document is evidence that may satisfy one or more requirements for specific consumers and purposes.

A passport, for example, can be reused as evidence for an attorney, bank, immigration partner, and business registration. Each consumer has an independent requirement instance, acceptance policy, verification decision, permission grant, and validity window. Acceptance by one consumer does not imply acceptance by another.

The engine separates five concepts:

1. **Document asset**: the logical evidence owned by a client or business.
2. **Document version**: one immutable uploaded or generated rendition.
3. **Requirement instance**: a project obligation that needs proof.
4. **Document use**: authorization to use a version for a purpose and consumer.
5. **Verification decision**: whether that version is acceptable in that context.

## Document asset

A document asset represents a logical item such as “Avery Stone passport” or “Northstar articles of incorporation.” It holds stable metadata:

- Document type and subject.
- Owner and source.
- Issuing country and authority.
- Issue and expiration dates.
- Sensitivity classification.
- Current version.
- Reuse and retention policy.
- Overall lifecycle state.

An asset can exist before a file arrives as a placeholder, allowing requirements and requests to reference it consistently.

### Lifecycle

**Placeholder -> Uploaded -> Processing -> Active -> Expired, Superseded, Revoked, or Archived**

Asset status summarizes usability. It does not replace use-specific verification.

## Version history

Every uploaded revision creates an immutable document version. Versions include:

- Sequence and upload timestamp.
- Uploader and source channel.
- Content reference, media type, size, and checksum.
- Malware and safety scan result.
- Extracted metadata and extraction confidence.
- Language and page count.
- Translation, certification, and notarization status.
- Relationship to the superseded version.

Corrections create new versions. They do not overwrite or edit accepted evidence. The current version is a convenience pointer selected under policy; active document uses may remain pinned to an earlier accepted version until reviewed.

Duplicate detection may suggest an existing asset or version. Hajime must not merge documents, ownership, or access automatically merely because content matches.

## Requirement satisfaction

A requirement definition specifies accepted evidence types, validity rules, verifier authority, and satisfaction policy. A project creates a requirement instance with one of these states:

**Pending applicability -> Required -> Evidence requested -> Under review -> Satisfied, Rejected, Waived, Expired, or Not applicable**

Satisfaction can depend on more than a document:

- Accepted document use.
- Structured field values matching the evidence.
- Translation or certification accepted.
- Named professional approval.
- External agency acknowledgment.
- Multiple documents considered together.

The satisfaction decision records requirement version, evidence set, reviewer, method, result, reason, and valid-until date. If evidence expires or is revoked, affected requirements re-evaluate and downstream work is assessed.

## Document reuse

Reuse is purposeful, consent-aware, and contextual. A reuse candidate is eligible only when:

- Client and document policies allow reuse.
- The requesting project and consumer have a lawful purpose.
- The version is current for the requirement's validity rules.
- Required translation and certification states apply.
- The owner approves sharing when policy requires it.
- No revocation, quarantine, or restriction applies.

The system can suggest reuse and explain which requirements it may satisfy. It creates a new document use and, where needed, a new verification request. It never copies acceptance from an unrelated consumer.

## Document use and routing

A document use grants a named consumer access to a named version for a named purpose. It includes:

- Project and requirement.
- Consumer: internal team, partner assignment, agency submission, or bank application.
- Purpose and permitted actions.
- Version or version-selection policy.
- Shared, accepted, rejected, revoked, and expiration dates.
- Client approval or consent basis.

Routing follows the work graph:

1. Requirement requests acceptable evidence.
2. Client uploads or approves reuse.
3. Safety processing completes.
4. Internal or professional verification occurs when required.
5. A document use grants scoped access to the consumer.
6. Consumer acceptance or rejection updates the requirement.
7. A rejected use produces remediation without invalidating unrelated accepted uses.

## Approval and verification

Approval states describe workflow disposition: proposed, approved for sharing, shared, accepted, rejected, needs changes, revoked, or expired.

Verification dimensions are separate and can be decided independently:

- Identity and subject match.
- Legibility and completeness.
- Authenticity indicators.
- Issue date and expiration.
- Data consistency with business and person records.
- Translation completeness.
- Certification, notarization, or apostille.
- Consumer-specific acceptability.

A decision identifies human or system method and confidence. Automated extraction or checks can support review but cannot claim legal authenticity unless an approved verification service and policy explicitly authorize that conclusion.

Rejected evidence includes structured reason, client-safe remediation, responsible party, and whether a new version or different evidence type is needed.

## Expiration and validity

Document expiration can come from:

- Printed expiration date.
- Consumer rule such as “issued within three months.”
- Translation or certification validity.
- Project or submission date moving beyond an accepted window.
- Revocation by owner or issuing authority.

The engine calculates validity per requirement and expected use date, not only against today's date. It warns early enough to replace evidence before a critical submission and identifies every impacted requirement, task, partner use, and predicted date.

## Translation status

Translation is modeled as a bounded sub-workflow associated with a source version:

**Not required -> Requested -> Assigned -> In progress -> Review -> Complete, Rejected, or Superseded**

Translation metadata includes source and target languages, translator or organization, translation version, completeness, formatting relationship, certification need, reviewer, and accepted purposes. A translated file is a related document version or rendition, never a silent replacement for the source.

Different consumers can require different target languages or certified forms. One completed translation can be reused only when its scope and certification satisfy the new use.

## Certification status

Certification is expressed as typed attestations rather than a single boolean:

- Certified copy.
- Notarized copy.
- Apostille or legalization.
- Sworn translation.
- Professional certification.
- Agency-issued original.

Each attestation records issuer, jurisdiction, date, expiry where applicable, evidence, verification decision, and accepted uses. Country templates determine which combinations satisfy a requirement.

## Visibility and partner permissions

Documents are deny-by-default and highly sensitive. Access is determined by:

- Ownership and client membership.
- Project membership and staff role.
- Document sensitivity.
- Named document use and consumer assignment.
- Purpose, permitted actions, and time window.
- Revocation or project cancellation.

Partner access is granted through an active partner assignment and document use. A partner may view or download only the versions needed for assigned work. Sharing onward, changing metadata, granting access, or reusing evidence for another project requires separate authority.

Previews, downloads, exports, and permission changes are auditable. Client-facing lists do not expose internal verification methods or fraud indicators.

## Document requests

A document request is a client-facing work item generated from one or more compatible requirements. Requests should be consolidated when the same evidence can serve multiple requirements, while clearly explaining:

- What is needed.
- Why it is needed and by whom.
- Accepted formats and alternatives.
- Translation or certification expectations.
- Due date and consequence of delay.
- Whether an existing document may be reused.

One upload can be proposed for multiple requirements, but each use and acceptance remains separate.

## Retention, revocation, and deletion

Retention follows document category, jurisdiction, engagement terms, consent, legal hold, and accepted use. Project completion does not imply immediate deletion or perpetual partner access.

Revocation stops future access where legally and operationally possible and records impacted uses. It does not erase evidence already submitted to an agency or held under an independent legal obligation.

Deletion requests produce a disposition per asset and version: deleted, anonymized, retained under obligation, or pending review. Audit history should retain minimal non-content facts necessary to prove compliant handling.

## Scalability and derived views

At scale, the engine should support:

- A client evidence vault across projects.
- Requirement readiness by project and milestone.
- Expiring evidence queue.
- Verification work queue.
- Translation and certification pipeline.
- Partner-access register.
- Duplicate and reuse suggestions.
- Impact search from one document to every requirement and task.

These are projections over document assets, versions, uses, and decisions. Binary content storage is separate from metadata and authorization. Content processing is asynchronous and quarantine-safe.

## Invariants

1. File presence never satisfies a requirement by itself.
2. Document versions are immutable.
3. Every partner access has a project, assignment, purpose, and time-bound document use.
4. Acceptance is consumer- and requirement-specific.
5. Reuse creates a new use and does not copy unrelated acceptance.
6. Expiration and revocation trigger impact evaluation.
7. Translation and certification are typed, versioned states with provenance.
8. Restricted verification details never leak into client-facing projections.
9. Content access and permission changes are auditable.
10. Duplicate processing cannot create duplicate versions, uses, or decisions.
