# Frontend project state

Last updated: 2026-11-02

## Repository

- Path: `C:\Users\Divergent\Documents\AI_LOCKIN\MVP\vein-health\frontend`
- Git repository: yes, independent from the backend
- Branch: `main`
- Remote: `origin` -> `https://github.com/Vein-Health/vein-health-frontend.git`
- Commits: local project history initialized for the organization repository
- Sibling backend: `..\backend`

The parent `vein-health` folder is a coordination directory, not a Git repository. No branch or directory is named for an implementation tool or agent. No `prompts` folder exists.

## Current phase

The public landing-page rebuild is complete through the approved design-reference pass. The public route `/` now renders the responsive Vein Health landing page, shared public navigation/footer architecture, legal routes, and deferred Refund/Support shells. Authentication, backend, billing, mobile, and deployment infrastructure remain outside this pass.

## What exists

- React 19.2, TypeScript, and Vite application at the repository root
- TanStack Router and Query provider seams
- Zod-validated runtime configuration
- Privacy-safe error boundary without raw error logging
- Tailwind/Radix/shadcn-compatible styling foundation
- Complete public landing flow: responsive header, three-second head-only owl preloader, approved visual sections, FAQ, private-by-design strip, shared footer, and legal navigation
- Full-height two-phone scan-to-understand visual assembled from adjacent approved reference captures; the document-scanning asset is byte-identical to `new\image assets\2.png`
- Typed marketing content, clean Plus Jakarta Sans typography, tighter section rhythm, restrained IntersectionObserver reveals, and reduced-motion support
- Get App routing to official Google Play/App Store searches until final app listing IDs are approved
- Clean footer with Explore and Connect columns, legal links, support email, dynamic copyright year, and no legacy medications/reminders/contact column
- Public Privacy, Terms and Cookie Policy routes with sticky, keyboard-accessible section navigation, reliable active-location highlighting, contact sections, and AI-risk/clinical-escalation disclosures
- Safe external store-search CTA destinations; the public page exposes no login or authentication entry point
- Vitest, Testing Library, MSW, and Playwright coverage for the landing interactions
- Byte-identical PRD and 25 landing design PNG snapshots
- Product, architecture, frontend, audit, decision, and phase-control documentation

## Not implemented

- Authentication, an interactive authenticated dashboard, protected patient routes, or clinical workflows
- Backend/API, storage, queue, OCR, extraction, AI, medication, reminder, timeline, or safety logic
- Deployment, analytics, remotes, or commits

## Verification

Phase 1 type checking, linting, 13 unit/component tests, production build, five Chromium end-to-end tests, and desktop/mobile static screenshot inspection pass after the owner-directed refinement. The local runtime uses explicit Node heap and semi-space limits plus single-worker browser/test settings to avoid the Windows `ELIFECYCLE`/worker crashes reproduced on this host. Exact results are recorded in `docs/project/verification.md`.

## Next action

Collect owner review of the refined public experience and walkthrough. Phase 2 remains **Authentication + consent** and requires the identity provider, callback/session model, consent wording/versioning, and jurisdiction assumptions. Backend work remains independently scoped in the backend repository.
