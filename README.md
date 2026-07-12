# Hajime Japan

Hajime Japan is a premium business launch concierge platform.

## Repository areas

- `apps/web`: production Next.js foundation. Phase 1 contains authentication and Projects only.
- `src`, `scripts`: local Electron UX prototype. It remains a mock and is not a production dependency.
- `docs/architecture`: product architecture and domain source of truth.
- `docs/business`: business operating manuals and service source of truth.

## Production web app

```powershell
cd apps\web
npm.cmd install
Copy-Item .env.example .env.local
npm.cmd run dev
```

Apply the migration in `apps/web/supabase/migrations` to the configured Supabase project before using authenticated project routes. See [apps/web/README.md](apps/web/README.md) for setup and verification.

## Electron prototype

```powershell
npm.cmd install
npm.cmd start
```

The Electron application uses local mock JSON and remains available only for UX reference.
