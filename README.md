# Hajime Japan

> Engineering source of truth: read [ARCHITECTURE.md](ARCHITECTURE.md) before changing production code. Archived architecture documents are historical only.

Hajime Japan is a premium business launch concierge platform.

## Repository areas

- `apps/web`: production Next.js application for the public site, authentication, leads, projects, subscribers, and one-time payments.
- `src`, `scripts`: local Electron UX prototype. It remains a mock and is not a production dependency.
- `docs/archive/architecture`: historical architecture and implementation records; non-authoritative.
- `docs/business`: business operating manuals and service source of truth.

## Production web app

```powershell
cd apps\web
npm.cmd install
Copy-Item .env.example .env.local
npm.cmd run dev
```

Set `DATABASE_URL` to the Neon PostgreSQL connection string and run `npm.cmd run db:migrate` before using authenticated project routes. See [apps/web/README.md](apps/web/README.md) for setup and verification.

## Electron prototype

```powershell
npm.cmd install
npm.cmd start
```

The Electron application uses local mock JSON and remains available only for UX reference.
