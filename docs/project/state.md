# Frontend project state

Last updated: 2026-10-02

## Repository

- Path: `C:\Users\Divergent\Documents\AI_LOCKIN\MVP\vein-health\frontend`
- Git repository: yes, independent from the backend
- Branch: `main`
- Remote: none configured
- Commits: none created
- Sibling backend: `..\backend`

The parent `vein-health` folder is a coordination directory, not a Git repository. No branch or directory is named for an implementation tool or agent. No `prompts` folder exists.

## Current phase

Phase 1 is complete. The public route `/` now renders the responsive Vein Health landing page. Work stops at the public boundary; authentication and consent are the next phase and require a separate authorization and approved contracts.

## What exists

- React 19.2, TypeScript, and Vite application at the repository root
- TanStack Router and Query provider seams
- Zod-validated runtime configuration
- Privacy-safe error boundary without raw error logging
- Tailwind/Radix/shadcn-compatible styling foundation
- Complete public landing flow: header, hero, trust row, three-step workflow, organized preview, feature carousel, pricing preview, FAQ, closing CTA, and footer
- Four-state/eight-card accessible feature carousel with buttons, pagination, swipe gestures, live announcements, and no automatic advancement
- Typed marketing content, integer-cent pricing helpers, responsive source images, original contour artwork, and contextual mascot motion with reduced-motion handling
- Safe in-page CTA destinations; disabled login and pricing controls accurately disclose unavailable functionality
- Vitest, Testing Library, MSW, and Playwright coverage for the landing interactions
- Byte-identical PRD and 25 landing design PNG snapshots
- Product, architecture, frontend, audit, decision, and phase-control documentation

## Not implemented

- Authentication, dashboard, protected patient routes, or clinical workflows
- Backend/API, storage, queue, OCR, extraction, AI, medication, reminder, timeline, or safety logic
- Deployment, analytics, remotes, or commits

## Verification

Phase 1 type checking, linting, 8 unit/component tests, production build, 3 Chromium browser tests, and desktop/tablet/mobile visual inspection pass. Exact results are recorded in `docs/project/verification.md`.

## Next action

Await the complete Phase 2 prompt for **Authentication + consent**. Required inputs include the identity provider, callback/session model, consent wording/versioning, and jurisdiction assumptions. Backend work remains independently scoped in the backend repository.
