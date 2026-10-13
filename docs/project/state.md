# Frontend project state

Last updated: 2026-10-13

## Repository

- Path: `C:\Users\Divergent\Documents\AI_LOCKIN\MVP\vein-health\frontend`
- Git repository: yes, independent from the backend
- Branch: `main`
- Remote: `origin` -> `https://github.com/Vein-Health/vein-health-frontend.git`
- Commits: local project history initialized for the organization repository
- Sibling backend: `..\backend`

The parent `vein-health` folder is a coordination directory, not a Git repository. No branch or directory is named for an implementation tool or agent. No `prompts` folder exists.

## Current phase

Phase 1 is complete, including the owner-directed interaction and visual refinement. The public route `/` now renders the responsive Vein Health landing page, the supplied dashboard reference, the living AI companion, and public policy pages. Work stops at the public boundary; authentication and consent remain a separate phase requiring approved contracts.

## What exists

- React 19.2, TypeScript, and Vite application at the repository root
- TanStack Router and Query provider seams
- Zod-validated runtime configuration
- Privacy-safe error boundary without raw error logging
- Tailwind/Radix/shadcn-compatible styling foundation
- Complete public landing flow: header, direct AI-companion hero, trust row, three-step workflow, supplied dashboard preview, feature carousel, pricing, FAQ, garden footer, and legal navigation
- A 2.55-second full-screen first-load companion banner, followed by a compact, wings-down full-character companion that stays off the hero, bounces from the navbar mark at the first workflow waypoint, hides while the page is moving, lands at section-safe edges, and uses simple health-friendly guidance in a full cloud bubble; the supplied owl remains the compact brand mark
- Accessible feature carousel with buttons, pagination, swipe gestures, live announcements, automatic advancement every 3.5 seconds, two cards per desktop state, and one card per narrow-screen state (with reduced-motion support)
- Typed marketing content, integer-cent pricing helpers, responsive WebP source images, sparse irregular landing/legal contour accents that avoid the footer, and staggered scroll reveals
- Compact dashboard-to-features handoff without the former preview caption or its trailing gap
- Reference-complete footer inventory with the solid Apple and multicolor Google Play marks, Explore/Support/Connect columns, dynamic copyright year, and expanded legal navigation; unavailable external destinations remain clearly non-interactive instead of being fabricated
- Public Privacy, Terms and Cookie Policy routes with sticky, keyboard-accessible section navigation, reliable active-location highlighting, contact sections, and AI-risk/clinical-escalation disclosures
- Safe in-page CTA destinations; the public page exposes no login or authentication entry point until that separate phase is authorized
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
