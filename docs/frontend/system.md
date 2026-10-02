# Frontend system specification

Status: canonical frontend engineering contract for the MVP

## 1. Purpose

The frontend is the patient-facing surface of Vein Health. It must make fragmented post-consultation information easier to verify, understand, organize, and act on while clearly exposing uncertainty and preserving the boundary between assistance and medical decision-making.

The first implementation milestone is the public landing page. The authenticated dashboard and clinical workflows remain planned but must not be visually invented before design direction is supplied.

## 2. Stack

The PRD baseline is:

| Concern | Technology |
|---|---|
| Language | TypeScript |
| UI runtime | React 19.2 |
| Build tool | Vite |
| Routing | TanStack Router |
| Server state | TanStack Query |
| Forms | TanStack Form |
| Tables | TanStack Table |
| Runtime validation | Zod |
| Accessible primitives | Radix UI |
| Component foundation | shadcn/ui, customized rather than treated as a finished design |
| Styling | Tailwind CSS |
| Ephemeral shared UI state | Zustand, only when needed |
| Upload experience | Uppy or react-dropzone, chosen when upload work begins |
| Dates | date-fns |
| Icons | Lucide |
| Unit/component tests | Vitest and Testing Library |
| API mocking | MSW |
| End-to-end tests | Playwright |

During setup, verify library compatibility and record the resolved versions in the lockfile. Do not silently replace this stack with a different framework.

## 3. Frontend principles

1. **Patient comprehension over interface density.** Use plain language and progressive disclosure.
2. **Evidence is visible.** Users must be able to understand where a critical field came from.
3. **Uncertainty is a first-class state.** Never make low-confidence data look final.
4. **Safety gates are structural.** Disabled actions, review steps, and block states are backed by server policy, not cosmetic warnings.
5. **Mobile first.** Document capture, verification, reminders, and timeline use should work comfortably on a phone.
6. **Accessible by default.** Semantic structure, keyboard operation, focus visibility, readable contrast, labels, and reduced-motion support are baseline requirements.
7. **Privacy by default.** The browser retains the minimum necessary data for the minimum time.
8. **One owner per state class.** Do not mirror server health data across Query, Zustand, and component state.
9. **Feature ownership.** Feature modules contain their own UI, contracts, hooks, and tests.
10. **No speculative clinical UX.** Do not create health scores, recommendations, risk colors, or clinician-like conclusions without approved requirements.

## 4. Application composition

```text
src/
|-- main.tsx
|-- app/
|   |-- router/
|   |   |-- router.tsx
|   |   `-- routes/
|   |-- providers/
|   |   |-- app-providers.tsx
|   |   |-- query-provider.tsx
|   |   `-- error-boundary.tsx
|   |-- layouts/
|   |   |-- public-layout.tsx
|   |   `-- app-layout.tsx              # Create only when dashboard design is approved
|   `-- config/
|-- features/
|   |-- marketing/
|   |-- auth/
|   |-- onboarding/
|   |-- documents/
|   |-- medications/
|   |-- reminders/
|   |-- symptoms/
|   |-- timeline/
|   |-- explanations/
|   `-- safety/
|-- components/
|   |-- ui/
|   `-- medical/
|-- api/
|   |-- client.ts
|   |-- errors.ts
|   |-- queries/
|   `-- schemas/
|-- domain/
|-- lib/
|-- styles/
`-- tests/
```

### Import direction

- `app` may compose features, shared components, API infrastructure, domain types, and utilities.
- `features` may depend on shared components, API infrastructure, domain types, and utilities.
- `components/ui` must not import product features.
- `domain` must remain UI-framework independent when practical.
- Feature-to-feature imports should go through a narrow public entry point or be lifted into an explicit shared domain abstraction.

Avoid index-barrel sprawl that hides dependency cycles.

## 5. Route model

### Approved now

| Route | Access | Purpose | Status |
|---|---|---|---|
| `/` | Public | Existing landing-page design | First build target |

### Planned, not visually designed

| Route | Access | Purpose |
|---|---|---|
| `/auth/*` | Public/session-aware | Registration, login, recovery, and identity-provider callbacks |
| `/consent` | Authenticated | Current consent review and acceptance |
| `/app` | Authenticated + consented | Patient home/dashboard |
| `/app/documents` | Authenticated + consented | Document list and upload |
| `/app/documents/:documentId` | Authenticated + consented | Document detail and processing state |
| `/app/extractions/:extractionId/review` | Authenticated + consented | Critical-field verification |
| `/app/medications` | Authenticated + consented | Verified medications |
| `/app/medications/:medicationId` | Authenticated + consented | Medication source/instructions/reminders |
| `/app/reminders` | Authenticated + consented | Care actions and reminders |
| `/app/symptoms` | Authenticated + consented | Symptom journal |
| `/app/side-effects` | Authenticated + consented | Possible side-effect journal |
| `/app/timeline` | Authenticated + consented | Longitudinal health timeline |
| `/app/access-history` | Authenticated + consented | Patient-visible access events |

This is a planning route map, not approval to implement the dashboard. IDs in paths are opaque. Never put document text, medication values, symptoms, prompts, or other sensitive content into route parameters or query strings.

## 6. State ownership matrix

| State | Owner | Examples | Rule |
|---|---|---|---|
| Server state | TanStack Query | Documents, medications, actions, timeline | Single client source of truth; scope query keys by patient/session |
| URL state | TanStack Router | Safe tab, pagination, non-sensitive sort | No PHI or secrets in the URL |
| Form state | TanStack Form | Upload metadata, verification form, symptom entry | Zod validation at trust boundary |
| Component state | React | Disclosure, focus, temporary selection | Prefer local ownership |
| Shared ephemeral UI | Zustand if justified | Temporary upload drawer or non-sensitive UI coordination | Never mirror patient records; no persistence middleware |
| Session | Identity/session layer | Authenticated identity and capability flags | Prefer secure cookies and short-lived server state |

### Query-cache defaults for health data

- Do not persist the Query cache.
- Clear patient-scoped queries on logout and identity change.
- Use explicit stale/refetch policies based on workflow risk.
- Avoid optimistic updates for critical verification or medication state unless the server returns an authoritative version and rollback behavior is safe.
- Do not expose cached health payloads through debug tools in production.

## 7. API and contract layer

The frontend calls REST endpoints through one configured client boundary.

Required properties:

- Base URL from validated runtime/build configuration
- Credentials/session behavior configured centrally
- JSON and problem/error normalization
- Request correlation ID support without patient data
- Abort/cancellation support
- Explicit retry policy; never blindly retry non-idempotent actions
- Zod validation for high-risk or externally unstable payloads
- Generated OpenAPI types when an approved backend contract exists
- No unrestricted AI prompt endpoint

### Error categories

Normalize at least:

- Authentication required or session expired
- Consent required
- Authorization denied
- Validation failure
- Conflict/stale version
- Rate or cost limit reached
- Processing still pending
- Provider/service unavailable
- Safety block or escalation required
- Unknown recoverable/unrecoverable error

Clinical/safety blocks are not ordinary toast errors. They require dedicated, accessible presentation and an approved next action.

## 8. Authentication and authorization UX

- Route guards improve UX but do not provide security; the server authorizes every request.
- Handle loading, authenticated, unauthenticated, consent-required, and locked/disabled account states explicitly.
- Clear patient-scoped memory state at logout.
- Do not reveal whether an unrelated patient/resource identifier exists.
- Do not store access or refresh tokens in localStorage.
- Admin/clinical/operator interfaces are not part of the patient frontend unless explicitly scoped later.

## 9. Design-system boundary

### Public landing page

The supplied landing-page design defines its visual tokens. Extract typography, color, spacing, radii, shadows, and motion into maintainable tokens without changing the visual result.

### Authenticated product

Dashboard visual direction is currently unknown. Do not assume that the marketing page's decorative language automatically becomes the clinical product UI. Shared brand primitives may be reusable, but dense health workflows require a separately approved system for hierarchy, evidence, uncertainty, verification, and safety states.

### Component tiers

1. **Primitive components** - button, input, dialog, popover, tabs, tooltip.
2. **Brand components** - public header, logo treatment, marketing section patterns.
3. **Medical components** - source evidence, confidence/verification state, medication field, safety escalation.
4. **Feature composites** - upload panel, extraction review, timeline event, reminder editor.

Medical components require product and clinical review before being treated as stable reusable primitives.

## 10. Accessibility contract

- Semantic landmarks and a logical heading hierarchy
- Keyboard operation for all controls
- Visible focus styles and predictable focus movement
- Skip navigation on multi-section pages
- Labels and instructions connected to inputs
- Errors summarized and associated with fields
- Status/progress changes announced appropriately
- Color never acts as the only indicator of confidence, error, verification, or risk
- Touch targets suitable for mobile use
- Motion respects `prefers-reduced-motion`
- Images have meaningful alternative text or are correctly decorative
- Dialogs, menus, and disclosures use tested accessible primitives

Automated checks support but do not replace keyboard and screen-reader-oriented review.

## 11. Responsive behavior

Design from the smallest supported layout upward.

- Avoid horizontal scrolling for primary content.
- Preserve readable line lengths and minimum font sizes.
- Keep primary actions reachable without hiding safety context.
- Tables must have an intentional narrow-screen alternative or controlled overflow with labels.
- Document/source review must preserve a usable relationship between a field and its evidence on small screens.
- Do not use hover as the only way to reveal critical information.

The landing page must match the supplied responsive references. If only desktop artwork is supplied, infer responsive mechanics conservatively and document any material visual interpretation.

## 12. Loading, empty, error, and stale states

Every data-backed feature must define:

- Initial loading
- Background refresh
- Empty state
- Recoverable error and retry
- Unrecoverable/safety-blocked state
- Offline or connectivity failure where relevant
- Stale/conflicting update behavior

Do not use skeletons that imply clinical facts before data arrives. Do not make a pending document appear verified.

## 13. Document and upload UX contract

When implemented:

- Accept only approved image/PDF types and size limits.
- Show local validation before upload without claiming server validation.
- Explain progress across upload, validation, processing, extraction, and review.
- Support safe retry without duplicate records where the API permits.
- Do not store the file in offline caches.
- Revoke temporary object URLs when no longer required.
- Never log filenames or document text if they may contain health information.

## 14. Verification and medication UI contract

When implemented:

- Show the candidate value beside its source highlight or a clear route to evidence.
- Distinguish raw source text from normalized value.
- Expose low confidence, ambiguity, missing fields, and conflicts in plain language.
- Require affirmative confirmation for critical fields.
- Offer correction, retake, rejection, or flagging as allowed by the backend.
- Never enable a schedule/reminder action from an unverified medication record.
- Render “not specified in source” instead of filling a missing duration or instruction.

The UI cannot weaken a backend safety gate. The backend cannot rely on the UI as the sole enforcement layer.

## 15. Telemetry and error reporting

Allowed examples:

- Page or workflow identifier
- Opaque request/correlation ID
- Build/version identifier
- Timing and Web Vital measurements
- Coarse result category such as success, validation error, or server unavailable

Disallowed examples:

- Patient names, emails, demographics, symptoms, medications, lab values
- Filenames or document contents
- Extracted text or source images
- Prompt/evidence content
- Session tokens or signed URLs
- Full API payloads

Production source maps and error tooling require access controls and PHI-safe configuration.

## 16. Environment and configuration

Only public, non-secret configuration may be embedded in the frontend bundle.

An eventual `.env.example` may include names such as:

```text
VITE_APP_ENV=
VITE_API_BASE_URL=
VITE_AUTH_ISSUER=
VITE_AUTH_CLIENT_ID=
VITE_RELEASE_VERSION=
```

Never place client secrets, database credentials, model API keys, signing keys, or private storage credentials in `VITE_*` values.

Validate configuration at startup and fail with a non-sensitive operational message when required values are missing.

## 17. Testing strategy

### Unit and domain tests

- Pure formatting and normalization that is safe to perform client-side
- Route helpers and configuration validation
- Component state and accessibility behavior

Do not recreate authoritative medication or safety rules only in the browser.

### Component tests

- User-visible behavior through Testing Library
- Loading, empty, error, and blocked states
- Keyboard behavior and accessible naming
- Source/verification relationships

### Mocked integration tests

- MSW handlers aligned to approved API examples
- Session/consent/authorization transitions
- Stale version, retry, and service-unavailable behavior

All fixtures must be synthetic and clearly non-real.

### End-to-end tests

First build:

- Landing page loads at `/`
- Primary navigation and CTA destinations behave as approved
- Mobile navigation is keyboard accessible
- No severe runtime or console errors

Later critical paths:

- Upload -> process -> review -> verify
- Verified medication -> deterministic schedule/reminder
- Symptom/side-effect entry -> appropriate status/escalation
- Session expiry and logout cache clearing

## 18. Performance and delivery

- Use optimized local assets and responsive image sources.
- Avoid blocking the landing-page first render with patient-app code.
- Route-split authenticated feature areas.
- Measure before adding complex memoization or state machinery.
- Prevent accidental inclusion of development tools and synthetic fixtures in production.
- Keep ordinary text explanations targeting the PRD's approximate P95 under five seconds once the full system exists; document processing remains asynchronous with visible progress.

## 19. Frontend definition of done

A feature is not done until:

- Its feature-registry row and specification are current.
- Type checking, linting, tests, and production build pass.
- Keyboard and responsive behavior have been reviewed.
- Loading, empty, error, retry, blocked, and success states are covered as applicable.
- No sensitive data is persisted, logged, placed in URLs, or leaked through analytics.
- API assumptions are typed and clearly marked as mock/provisional or generated/approved.
- Safety-critical behavior is enforced by server policy as well as reflected in UI.
- The project-state file records the result and next action.
