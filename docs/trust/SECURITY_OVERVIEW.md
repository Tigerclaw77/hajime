# Security Overview

**Status:** Public copy with mandatory verification gates  
**Not a certification:** Hajime does not currently claim ISO 27001, SOC 2, penetration-test coverage, or any other certification not evidenced in writing.

## Public summary

Business formation can involve identity records, ownership information, financial context, signatures, and commercially sensitive plans. Hajime treats security as an operating responsibility, not a badge.

Our approach is to collect less information, keep access narrow, use business-controlled systems, separate public inquiries from sensitive project documents, and respond quickly when something appears wrong.

## What customers should expect

### Minimal collection

The public consultation form is for qualification context only. Customers should not submit passports, financial records, signatures, corporate source documents, or other sensitive files through it.

### Purpose-limited access

Project information should be available only to the people who need it for an assigned purpose. A partner does not receive broad access merely because they participate in the project.

### Controlled document transfer

Hajime provides the approved transfer method before requesting sensitive documents. Identity or financial records should not move through informal personal accounts or unapproved messaging channels.

### Account protection

Business systems used for customer information must use strong authentication, multi-factor authentication where supported, current software, managed access, and prompt removal of access that is no longer needed.

### Vendor care

Hajime reviews what customer information a service provider handles, why it is needed, who can access it, where it is processed when relevant, how it can be recovered, and how the relationship ends.

### Incident response

Suspected unauthorized access, loss, misdirection, malware, or unintended disclosure is escalated immediately. Hajime contains the issue, preserves facts, identifies affected information and people, obtains professional advice, and communicates as required by applicable law and the circumstances.

## Current technical scope

The public website collects only the consultation fields shown to the visitor and places a valid submission into the internal Lead domain. Internal project and lead records are designed to be owner-scoped. The public website does not provide customer document uploads.

This description does not cover manual tools used during paid delivery. Those tools must pass the launch verification below before Hajime accepts sensitive customer material.

## Launch verification checklist

Do not publish this overview or accept sensitive records until the security owner can evidence:

- [ ] Business-controlled email and document storage, not personal accounts
- [ ] MFA enabled for every account with customer access
- [ ] Named users and least-privilege permissions
- [ ] Current device update, malware protection, and screen-lock controls
- [ ] Vendor and data-location inventory
- [ ] Approved document-transfer instructions
- [ ] Retention and secure-deletion schedule
- [ ] Backup and restore test for critical operating records
- [ ] Offboarding and quarterly access-review procedure
- [ ] Incident contact, decision owner, evidence log, and notification procedure
- [ ] No production secret or customer record in source control, test fixtures, or public logs

## What Hajime will not claim without evidence

- ???Military-grade??? or ???bank-grade??? security
- End-to-end encryption
- Encryption at rest or in transit beyond the documented provider configuration
- Zero-knowledge handling
- Data residency in Japan
- Continuous monitoring
- Independent audit or certification
- Guaranteed prevention of incidents

## Customer security requests

Customers may ask what information Hajime holds, who has access for the project, which partner needs a particular record, and how to report a concern. Security questions and suspected incidents receive priority escalation.

## Evidence basis

The [Japan PPC legal framework](https://www.ppc.go.jp/en/legal/) emphasizes appropriate handling and safeguards for personal information. PPC guidance also calls for clear notice and care against unintended collection through third-party platforms. [IPA's SME security guidance](https://www.ipa.go.jp/en/about/activities/security-action.html) highlights software updates, malware protection, strong passwords, sharing-setting review, threat awareness, and a public security policy. The latest Japanese SME guidance also adds backups and website security. This overview is a conservative operational statement, not a conclusion about legal compliance.

