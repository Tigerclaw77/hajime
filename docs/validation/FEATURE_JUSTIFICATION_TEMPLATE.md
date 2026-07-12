# Feature Justification: [Feature Name]

**Owner:** [Name]  
**Date:** [YYYY-MM-DD]  
**Decision:** [Build now / Run manually first / Defer / Kill]  
**Primary condition:** [Acquire customers / Reduce founder workload serving real customers]

## Gate

A feature may be built only when it directly:

1. Helps acquire paying customers, or
2. Reduces measured founder workload while serving real customers.

If neither condition is supported by evidence, the decision is **Defer**.

## Problem Being Solved

[Describe the observed customer-acquisition or service-delivery problem. Include evidence from real prospects, customers, delivery logs, or funnel metrics. Do not describe a hypothetical future need.]

**Current manual workaround:** [How the work is performed today.]  
**Measured frequency:** [Occurrences per week/customer/project.]  
**Measured cost:** [Founder hours, lost opportunities, delays, errors, or direct expense.]

## Who Benefits

**Primary beneficiary:** [Prospect / Paying customer / Founder serving paying customers]  
**Affected customer stage:** [Acquisition / Discovery / Proposal / Onboarding / Active delivery / Closeout]

[Explain the concrete improvement. Internal convenience alone is insufficient unless it releases measurable founder capacity for acquisition or paid delivery.]

## Assumption Validated

[State one falsifiable business assumption.]

Example: "Sending a decision-ready proposal within two hours increases qualified proposal acceptance from 25% to at least 35%."

## Expected ROI

| Input or outcome | Estimate | Evidence / calculation |
|---|---:|---|
| Development cost | [hours x loaded rate] | |
| Ongoing monthly cost | | |
| Founder hours saved per month | | |
| Additional qualified opportunities per month | | |
| Additional paying customers per month | | |
| Expected monthly contribution | | |
| Payback period | | |

**ROI hypothesis:** [Expected gain divided by total build and operating cost.]  
**Confidence:** [Low / Medium / High]

## Estimated Development Time

**Build:** [Hours or days]  
**Testing and release:** [Hours or days]  
**Maintenance:** [Expected hours per month]  
**Dependencies and risks:** [List only material items.]

Estimate the smallest version that can test the assumption. Include design, testing, documentation, deployment, and maintenance rather than coding time alone.

## Why Now Instead of Later

[Identify the current customer, funnel loss, or repeated delivery burden that makes delay costly.]

**Evidence that manual delivery is no longer sufficient:** [Measured threshold exceeded.]  
**What happens if deferred for 30 days:** [Specific commercial or workload consequence.]

If the answer is "nothing material," defer the feature.

## Success Metrics

| Metric | Baseline | Target | Measurement window | Source |
|---|---:|---:|---|---|
| [Primary business metric] | | | | |
| [Founder workload metric] | | | | |
| [Quality or error metric] | | | | |

Success must be observable in customer acquisition, collected revenue, delivery time, founder hours, contribution margin, or customer outcome. Usage alone is not sufficient.

## Kill Criteria

Kill, remove, or return to the manual workflow when any applies:

- The primary target is missed after [sample size or time window].
- Founder workload falls by less than [threshold].
- The feature produces no measurable acquisition or paid-delivery benefit.
- Maintenance exceeds [hours or cost] per month.
- Customers do not use or value the resulting outcome.
- The workflow has not occurred at least [frequency] among real prospects or customers.
- The feature creates professional-boundary, privacy, security, or operational risk disproportionate to its value.

## Decision

**Decision:** [Build now / Run manually first / Defer / Kill]  
**Reason:** [One paragraph tied to evidence and the two-condition gate.]  
**Review date or trigger:** [Date, customer count, workload threshold, or funnel event.]

### Approval Checklist

- [ ] Directly supports acquisition or measured paid-service delivery workload.
- [ ] Evidence comes from real prospects, customers, or delivery logs.
- [ ] A manual workaround has been attempted.
- [ ] The smallest testable version is defined.
- [ ] ROI and full development cost are estimated.
- [ ] Success metrics have baselines, targets, and a measurement window.
- [ ] Kill criteria are explicit.
- [ ] Building this does not displace a higher-value founder activity.

Any unchecked item defaults the decision to **Run manually first** or **Defer**.
