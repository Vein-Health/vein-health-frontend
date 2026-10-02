# Sequential build plan

This is the controlled implementation order for Vein Health AI. Only one phase is authorized at a time. The frontend and backend repositories advance only when the user explicitly authorizes the applicable phase.

## Phase 0 - Project foundation and landing-page audit

Status: complete (2026-10-02)

Purpose:

- Establish separate frontend and backend Git repositories under a non-Git coordination folder.
- Scaffold the minimal frontend foundation at the frontend repository root.
- Read and understand the complete PRD and repository knowledge bank.
- Inspect the supplied landing-page design/source and assets.
- Produce `docs/frontend/landing-page-audit.md`.
- Record unresolved design, CTA, copy, asset, and responsive questions.

Allowed scope:

- Git/workspace inspection and safe branch setup
- Standalone frontend package setup and standalone backend repository boundary
- Minimal React/TypeScript/Vite app foundation
- Provider/router seams needed for future work
- Documentation and audit files

Not allowed:

- Landing-page implementation
- Auth or consent screens
- Dashboard design
- Backend/API, OCR, AI, medication, reminders, or clinical workflows

Gate:

- Repository structure is understandable.
- PRD and reference have been read.
- Landing audit exists, or the missing reference is explicitly recorded.
- Toolchain checks run where a scaffold exists.
- Builder stops and waits.

## Phase 1 - Landing page implementation

Status: complete (2026-10-02)

Purpose:

- Turn the supplied landing-page reference into the live public route `/`.

Dependencies:

- Phase 0 complete
- Actual design/source/reference and assets available
- CTA destinations identified

Allowed scope:

- Marketing feature components and public layout
- Supplied copy, visual language, images, illustrations, and interactions
- Responsive and accessible implementation
- Landing-page tests, metadata, asset optimization, and visual verification

Not allowed:

- Dashboard, auth, medical workflows, backend, OCR, AI, or fake product claims

Gate:

- Desktop/mobile output checked against the reference.
- Keyboard/accessibility behavior works.
- Typecheck, lint, tests, build, and browser smoke checks pass.
- CTA destinations are reported accurately.

## Phase 2 - Authentication and consent foundation

Status: next; waiting for the dedicated phase prompt and approved identity/consent inputs

Purpose:

- Add approved identity-provider integration, session-aware routing, account states, and versioned patient consent.

Dependencies:

- Landing page complete
- Authentication provider, callback URLs, session model, consent wording, and jurisdiction assumptions approved

Gate:

- No health record is created before valid consent.
- Unauthorized resources are not exposed.
- Logout clears patient-scoped client state.
- Recovery/session-expiry/error states are tested.

## Phase 3 - Patient app shell and dashboard

Status: waiting for dashboard design

Purpose:

- Build the authenticated app shell and patient home only after the user supplies dashboard information architecture and visual direction.

Dependencies:

- Auth/consent foundation complete
- Dashboard design approved

Gate:

- Responsive app shell and navigation are approved.
- No invented health scores, recommendations, or clinical conclusions.

## Phase 4 - Document upload and processing status

Status: waiting

Purpose:

- Add patient-scoped image/PDF selection, validation feedback, upload submission, async progress, retry, and failure states.

Dependencies:

- Auth/consent and app shell
- Approved API/file contract and object-storage behavior

Gate:

- Accepted types/size and error states are explicit.
- No file or document content persists in browser storage.
- Progress never presents a document as verified prematurely.

## Phase 5 - Extraction review and critical-field verification

Status: waiting

Purpose:

- Show candidate extraction, confidence, source highlights, uncertainty, correction, retake, rejection, and patient confirmation.

Dependencies:

- Document processing contract
- Extraction/provenance schema
- Approved critical-field behavior

Gate:

- Low-confidence critical fields cannot be auto-accepted.
- Every critical field has source/provenance presentation.
- Verification state is authoritative and test-covered.

## Phase 6 - Evidence-grounded explanations and summaries

Status: waiting

Purpose:

- Add typed explanation and summary requests with evidence, uncertainty, loading, block, and escalation states.

Dependencies:

- Verified data and typed AI gateway contract
- Approved knowledge corpus and response policy

Gate:

- No arbitrary prompt UI.
- Evidence is visible or reachable.
- Unsupported output is blocked or escalated.

## Phase 7 - Verified medications, schedules, and reminders

Status: waiting

Purpose:

- Display verified medication records and create deterministic schedules/reminders only from verified structured fields.

Dependencies:

- Verification complete
- Medication schema and deterministic schedule contract
- Notification-channel decision

Gate:

- Zero action paths from unverified extraction.
- No inferred missing dose/frequency/route/duration.
- Conflicts and ambiguity remain visible.

## Phase 8 - Symptoms, side effects, and longitudinal timeline

Status: waiting

Purpose:

- Add patient-entered observation journals and a provenance-aware chronological timeline.

Dependencies:

- App shell and patient data contracts
- Approved symptom/side-effect fields and escalation behavior

Gate:

- Journal entries are observation, not autonomous diagnosis.
- Timeline events retain source/status/timestamp context.

## Phase 9 - Safety escalation, audit history, export, and release controls

Status: waiting

Purpose:

- Add conservative red-flag presentation, blocked-output states, patient access history, authorized export/share, release monitoring, and kill-switch surfaces as approved.

Dependencies:

- Clinical safety policy and escalation ownership
- Audit/export/deletion contracts
- Pre-launch gate decisions

Gate:

- Red-flag canonical suite has no must-catch misses.
- Cross-patient authorization has no known failures.
- Audit, rollback, cost, rate, and support controls are operationally defined.

## Phase 10 - Backend, worker, and controlled-pilot hardening

Status: waiting

Purpose:

- Integrate the real FastAPI modular monolith, document workers, AI gateway, PostgreSQL/pgvector, encrypted object storage, queues, observability, security controls, and pilot release gates.

Dependencies:

- Frontend contracts stabilized
- Backend/AI/clinical/security owners available
- Jurisdiction and provider decisions resolved

Gate:

- Formal clinical, privacy, regulatory, security, safety, cost, rollback, monitoring, and support gates pass.

## Phase control rule

The current phase is always the earliest incomplete phase. A later phase may not be implemented because it is convenient, visible, or technically easy. The user supplies the next explicit phase instruction, and the applicable repository must update this file and `docs/project/state.md` when the phase is complete.
