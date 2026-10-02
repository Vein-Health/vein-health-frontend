# Vein Health frontend repository instructions

## Required reading

Before changing code, read in order:

1. `LLMS.md`
2. `docs/project/state.md`
3. `docs/product/feature-registry.md`
4. `docs/architecture/architecture.md`
5. `docs/frontend/system.md`
6. The specification for the feature being changed

## Repository boundary

- This repository owns the React/TypeScript frontend only.
- The backend is a separate Git repository at `../backend`.
- Do not add backend Python code, workers, databases, infrastructure, or server secrets here.
- Do not create cross-repository filesystem imports. Integrate later through an approved, versioned REST/OpenAPI contract.
- The current branch is `main`. Do not use tool- or agent-branded branch names.
- Do not create a `prompts` folder.

## Product and privacy rules

- Vein Health is continuity-of-care software, not autonomous diagnosis or treatment software.
- Medication actions can originate only from verified structured data.
- Never infer missing dose, unit, route, frequency, duration, or dates.
- Source evidence wins when model output disagrees.
- Do not persist PHI in localStorage, sessionStorage, IndexedDB, service-worker caches, URLs, logs, analytics, fixtures, or error reports.
- Use synthetic data only.

## Engineering rules

- TanStack Query owns server-derived state; Router owns route state; Form plus Zod owns validated form state.
- Zustand is limited to small ephemeral UI state and must not mirror server health records.
- Keep the application mobile-first, keyboard accessible, and feature-oriented.
- Preserve the supplied landing design when that phase is explicitly authorized.
- Add tests in proportion to behavior changed and run typecheck, lint, tests, build, and relevant browser checks.
- Never commit, push, publish, deploy, or configure a remote without explicit authorization.

