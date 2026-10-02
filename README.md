# Vein Health frontend

Standalone React/TypeScript frontend for Vein Health AI. This directory is an independent Git repository and deployable boundary.

## Current state

Phase 0 foundation and the landing-reference audit are complete. The public landing page has not been implemented. The current `/` route is a neutral foundation screen.

## Read first

1. `LLMS.md`
2. `docs/project/state.md`
3. `docs/product/feature-registry.md`
4. `docs/architecture/architecture.md`
5. `docs/frontend/system.md`
6. `docs/frontend/landing-page-audit.md`

## Commands

```powershell
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
```

The frontend must not persist PHI, documents, prompts, signed URLs, or long-lived tokens in browser storage. It must not invent dashboard design, clinical conclusions, medication instructions, or backend behavior.

