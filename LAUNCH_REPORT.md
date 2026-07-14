# Hajime Launch Report

## Production URL

https://hajime-blue.vercel.app

## Git Commit

Application commit: `ca21e3046472c160ebf893131f55f37c6cee0797`

## Architecture Version

Canonical `ARCHITECTURE.md` at application commit `ca21e30`.

## Deployment Status

Vercel production deployment `dpl_J8ayPiBe1hkP1xpf7eRT8MPig16z` is ready and aliased to the production URL. The final deployment contains no temporary provisioning routes or credentials.

## Stripe Status

- Hajime's dedicated live account-level restricted key is active in Vercel production.
- Live webhook `we_1TsuCaJ1etUTUrMyGk8EsE9f` is the only live endpoint at the production webhook URL.
- Enabled events: `invoice.paid`, `checkout.session.completed`, and `checkout.session.async_payment_succeeded`.
- A live Invoice was generated and marked paid out of band without charging a card. The genuine live webhook marked the lead and payment Paid and created one project.
- The same live event was delivered again; no duplicate project was created.
- A live Payment Link was generated and verified, then deactivated after testing.

## Neon Status

Neon PostgreSQL is connected in production. All migrations are applied. Lead, subscriber, payment, webhook-event, and project persistence were verified through production workflows.

## Verified Workflows

- Homepage availability
- Personalized roadmap completion
- Discovery request submission and confirmation
- CRM lead persistence
- Founder login and owner-scoped CRM access
- Live Stripe Invoice generation
- Live Stripe Payment Link generation
- Live webhook signature and event processing
- Lead and payment conversion to Paid
- Automatic project creation
- Duplicate webhook protection
- Subscriber persistence
- Lint, TypeScript, 27 unit tests, production build, and 9 applicable Playwright smoke tests

## Accepted Operational Limitations

- The founder reviews the CRM manually twice daily.
- No automated founder notifications are configured.
- Notifications remain deferred until a real customer need or operational incident demonstrates the requirement.

## Remaining Known Issues

- No launch-blocking issues are known.
- Clearly named production verification records remain for auditability.
- The $1 live verification Invoice was marked paid out of band and did not charge a card.
- The live verification Payment Link is inactive.

## Launch Recommendation

**READY FOR LIVE CUSTOMERS**
