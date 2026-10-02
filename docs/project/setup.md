# Frontend local setup

This is a standalone pnpm repository. Run commands from the frontend repository root.

## Requirements

- Node.js 22 or newer
- pnpm 11.25.0 through Corepack or an equivalent installation
- Chromium installed through Playwright for browser tests

## Install and verify

```powershell
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
```

## Repository rules

- Do not initialize another Git repository inside this one.
- Use `main` as the current branch; do not use tool- or agent-branded branch names.
- Do not add backend source here. The backend repository is `../backend`.
- Do not add a `prompts` folder.
- Do not put secrets in `VITE_*` variables; all frontend build variables are browser-readable.
- Do not persist protected health information or tokens in browser storage.
- Do not configure a remote, commit, push, publish, or deploy without explicit authorization.

