# Hajime Experiment Backlog

## Ranking method

Every experiment must finish in less than 30 days and materially affect a capital-allocation decision. Cost and founder time are treated as constraints, not signs of seriousness.

Scores are 1-5:

- **Learning potential:** Ability to distinguish a viable business from a false positive.
- **Risk reduction:** Importance of the assumptions tested.
- **Cost efficiency:** Higher is cheaper.
- **Time efficiency:** Higher is faster.

**Priority score = learning + risk reduction + cost efficiency + time efficiency.** Payment and observed behavior outrank traffic or stated interest.

## Ranked backlog

| Rank | ID | Experiment | Assumptions | Cash cost | Founder time | Duration | Learning | Risk reduction | Cost efficiency | Time efficiency | Score | Run decision |
|---:|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | E01 | Six qualified paid offers | A01, A02, A03, A05 | $0-$100 | 12-20h | 14 days | 5 | 5 | 5 | 5 | **20** | Run immediately |
| 2 | E02 | Problem interviews ending in a real paid ask | A02, A04, A07 | $0-$100 | 12-15h | 14 days | 5 | 5 | 5 | 5 | **20** | Run with E01 |
| 3 | E03 | Manual paid readiness pilot | A10, A11, A12, A13, A17, A18 | Direct labor | 8-15h/customer | 21 days | 5 | 5 | 5 | 4 | **19** | Run after first payment |
| 4 | E04 | Four-partner referral sprint | A03, A08, A09, A14 | $0-$200 | 15-20h | 28 days | 5 | 5 | 5 | 4 | **19** | Start immediately; decide at Day 28 |
| 5 | E05 | $1,500 pricing cohort | A05, A07, A12 | $0 | 8-12h sales | 21 days | 5 | 5 | 5 | 4 | **19** | Run after qualification script is stable |
| 6 | E06 | Trigger-based LinkedIn outreach | A04, A07 | $0-$100 | 12-15h | 21 days | 4 | 4 | 5 | 4 | **17** | Run if warm pipeline is insufficient |
| 7 | E07 | Trust-source comparison | A03, A08 | $0 | 8-10h | 21 days | 4 | 4 | 5 | 4 | **17** | Compare warm/partner/direct sources; no extra campaign |
| 8 | E08 | One-page offer with targeted traffic | A02, A04, A05 | $50-$200 | 8-10h | 21 days | 3 | 3 | 4 | 4 | **14** | Run only after one manual sale |
| 9 | E09 | Founder-community office hours with paid follow-up | A02, A04, A07 | $0-$250 | 12-18h | 21 days | 3 | 3 | 4 | 4 | **14** | Run only through a qualified host |
| 10 | E10 | High-intent Google Ads kill test | A04, A05, A07 | $300-$500 | 10-12h | 14 days | 3 | 3 | 2 | 5 | **13** | Conditional; run after two manual sales |
| 11 | E11 | Post-delivery referral ask | A15 | $0 | 1h/customer | 14 days | 4 | 3 | 5 | 5 | **17** | Run automatically after demonstrated value |
| 12 | E12 | Upgrade / stabilization offer | A06, A16, A19 | $0 | 2-4h | 21 days | 4 | 3 | 5 | 4 | **16** | Run after 3 satisfied customers |

E11 and E12 rank lower operationally because they are blocked by completed customers, not because their score is weak.

## Experiments not worth running now

| Proposed experiment | Why not run | Evidence that would change the decision |
|---|---|---|
| Broad awareness landing page | Traffic and email signups do not test payment | One proven offer and a qualified traffic source |
| Large customer survey | Stated preference produces weak evidence and consumes time | Use only to explain paid or observed behavior |
| Broad social advertising | Poor trigger targeting and no validated conversion path | Two manual sales from stable messaging |
| Free concierge pilot | Tests willingness to accept free labor, not willingness to pay | Never required; use paid, narrow scope |
| Feature prototype or usability test | Software is not the critical uncertainty | Five paid customers and a measured repeated bottleneck |
| Enterprise outreach campaign | Long cycle cannot resolve core assumptions inside 30 days | Founder/SMB proof and references |
| Country-interest campaign | Expands uncertainty instead of reducing it | Japan repeatability and existing-customer pull |
| Affiliate partnership test | Tests monetization before trust and core value | Ten customers plus counsel/conflict review |

## 60-90 day sequence

### Days 1-14: attempt to disprove payment

- Run E01 and E02.
- Start E04 partner outreach.
- Build the E06 trigger list only if warm introductions cannot produce six qualified offers.

**Decision at Day 14:**

- **Continue:** At least one cleared payment from six qualified offers.
- **Pivot once:** Qualified prospects identify a repeated problem but reject the current scope or price.
- **Stop current offer:** Zero payments and no coherent paid alternative.

### Days 15-30: attempt to disprove delivery economics

- Run E03 for every paid customer.
- Run E05 at $1,500 with comparable prospects.
- Continue E04 and E06.

**Decision at Day 30:**

- **Continue:** At least two payments, one completed valuable delivery, and positive initial contribution.
- **Pivot:** Payment exists but scope, segment, or labor is inconsistent.
- **Stop:** Fewer than one payment from ten qualified offers or delivery has no measurable value.

### Days 31-60: attempt to disprove repeatability

- Repeat E01/E05 until at least 20 qualified discoveries or 10 proposals exist.
- Complete 3-5 E03 pilots.
- Assess E04 and E07 by source.
- Run E08 only if manual sales already exist.
- Run E11 after each completed case.

**Decision at Day 60:**

- **Continue:** At least five paying customers, two from one source, positive margin, and value rating >=8/10.
- **Pivot:** Two to four customers pay and reveal a coherent different segment, scope, or price.
- **Stop:** Fewer than two customers pay from 20 qualified discoveries or 10 proposals.

### Days 61-90: test channel and revenue depth only if core survives

- Run a second 28-day E04 sprint only if the first produced qualified referral behavior and recurrence remains uncertain.
- Run E09 or E10, not both, based on the best remaining channel uncertainty.
- Run E12 after three satisfied eligible customers.
- Audit A13, A14, A17, A18, and A20.

**Final capital decision:** Apply the business-level failure gate in `ASSUMPTION_REGISTER.md`. Do not extend the experiment period merely because results are emotionally uncomfortable.

## Backlog governance

- Run no more than three active experiments at once.
- Assign one primary assumption to each experiment.
- Set the decision rule before execution.
- Record negative and null results.
- Stop collecting data when the decision threshold is reached.
- Do not repeat a failed experiment without changing one explicit variable.
- If an experiment cannot change a decision, delete it from the backlog.
