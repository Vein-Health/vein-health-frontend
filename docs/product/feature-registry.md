# MVP feature registry

Last updated: 2026-10-04

## Status vocabulary

- **Now** - belongs to the current landing-page/frontend-foundation build.
- **Next** - belongs to the patient-app frontend after dashboard design and/or API contracts are supplied.
- **Later MVP** - required for the MVP but not part of the first frontend build.
- **Deferred** - explicitly outside the first MVP.
- **Open** - needs a product, design, clinical, legal, or provider decision.

Implementation state:

- **Ready** - enough direction exists to implement.
- **Complete** - implemented and verified within its authorized phase.
- **Input required** - an essential artifact or decision is missing.
- **Contract required** - frontend intent exists but server/schema contract is not approved.
- **Not started** - specified but intentionally unscheduled.
- **Prohibited in V1** - must not be implemented as an MVP capability.

## Frontend foundation and public experience

| ID | Feature | Stage | State | Frontend responsibility | Acceptance boundary |
|---|---|---:|---|---|---|
| FE-FND-001 | Frontend repository and quality toolchain | Phase 0 | Complete | Maintain the standalone frontend repository, scripts, TypeScript, lint, tests, and build | All verification commands pass; versions are pinned by lockfile |
| FE-FND-002 | Router and application providers | Phase 0 | Complete | TanStack Router, Query provider, error boundary, app bootstrap | `/` renders; providers are testable; no dashboard invention |
| FE-FND-003 | Base styling and tokens | Phase 1 | Complete | Landing-specific color, type, space, radius, surface, focus, and motion tokens | No speculative clinical/dashboard design system |
| FE-FND-004 | API boundary | Phase 0 | Complete | Typed runtime/configuration seam and test mocks; feature API contracts remain deferred | No arbitrary AI prompt transport; no real backend required |
| FE-FND-005 | Privacy-safe client defaults | Phase 0 | Complete | No PHI persistence/logging; cache policy; secure-session assumptions | No health payload in browser storage or URLs |
| FE-FND-006 | Testing foundation | Phase 0 | Complete | Vitest, Testing Library, MSW, Playwright smoke path | Unit/component/E2E commands are documented and runnable |
| MKT-001 | Public landing page | Phase 1 | Complete | Responsive public experience at `/` with supplied imagery/dashboard, small section-bound companion, scroll reveals, 2.5-second carousel, pricing, calm garden footer, and no hero/footer mascot | Typecheck, lint, unit/component tests, build, four Chromium E2E tests, and desktop/mobile screenshot inspection pass |
| MKT-002 | Public legal/navigation destinations | Phase 1 | Complete | Accessible Privacy, Terms, and Cookie Policy routes linked from the footer; public CTAs resolve in-page | Policy drafts have section navigation and AI/privacy disclosures; legal review remains required before launch |

## Identity, consent, and account

| ID | Feature | Stage | State | Frontend responsibility | Safety/acceptance boundary |
|---|---|---:|---|---|---|
| AUTH-001 | Registration and login | Next | Contract required | Auth screens, route guards, session-aware UX | No health record before consent; no browser-stored long-lived token |
| AUTH-002 | Account recovery | Later MVP | Contract required | Recovery states and safe messaging | Avoid account enumeration; provider flow required |
| AUTH-003 | MFA capability | Later MVP | Contract required | Enrollment/challenge UI when provider supports it | Required capability for sensitive/admin access direction |
| CONS-001 | Versioned consent | Next | Contract required | Present version, capture decision, show current state | Consent required before health-record creation |
| PRIV-001 | Patient access history | Later MVP | Contract required | Read-only audit-history UI | Patient-scoped; opaque identifiers; no sensitive log leakage |
| PRIV-002 | Account deletion request | Later MVP | Open | Explain effect, confirm request, show status | Retention/deletion policy must be approved first |

## Patient app shell

| ID | Feature | Stage | State | Frontend responsibility | Acceptance boundary |
|---|---|---:|---|---|---|
| APP-001 | Authenticated app shell | Next | Input required | Layout, navigation, protected outlet, responsive behavior | Dashboard design/information architecture must be supplied |
| APP-002 | Patient dashboard/home | Next | Input required | Present approved overview and entry points | Do not invent metrics, cards, health scores, or recommendations |
| APP-003 | Profile and preferences | Later MVP | Contract required | Basic identity, locale, notification preferences | Minimize collected data; demographics may require encryption/server rules |

## Documents and verification

| ID | Feature | Stage | State | Frontend responsibility | Safety/acceptance boundary |
|---|---|---:|---|---|---|
| DOC-001 | Image/PDF document upload | Next | Contract required | File selection/capture, validation feedback, consent-aware submission | Accepted types/size defined; file is patient-scoped; no local persistence |
| DOC-002 | Processing progress | Next | Contract required | Async progress, retry, failure, cancellation guidance | Never imply processing succeeded before durable server state |
| DOC-003 | Extracted-field review | Next | Contract required | Show fields, confidence, uncertainty, and source highlights | Every critical field links to document/page/location |
| DOC-004 | Critical-field verification | Next | Contract required | Confirm, correct, retake, reject, or flag | Low-confidence medication fields cannot be auto-accepted |
| DOC-005 | Document detail | Later MVP | Contract required | Metadata, pages, extraction status, related timeline events | Short-lived authorized file access only |

## Medications, care actions, and reminders

| ID | Feature | Stage | State | Frontend responsibility | Safety/acceptance boundary |
|---|---|---:|---|---|---|
| MED-001 | Verified medication list/detail | Next | Contract required | Display source-grounded medication and verification status | Raw source and normalized values remain distinguishable |
| MED-002 | Medication schedule | Later MVP | Contract required | Render deterministic schedule from verified fields | Never infer dose/frequency/duration; block until verification |
| MED-003 | Conflict/ambiguity UI | Later MVP | Contract required | Show conflicting sources and required patient/clinical action | System does not reconcile conflicting prescriptions automatically |
| ACT-001 | Care action list/status | Later MVP | Contract required | Show due/completed/missed state and source | Every action has a verified or explicit patient-entered origin |
| REM-001 | Medication reminder | Later MVP | Contract required | Configure permitted reminder schedule/channel | Derived from verified medication information only |
| REM-002 | Test/follow-up reminder | Later MVP | Contract required | Create/edit reminder from verified instruction or patient choice | Preserve source and avoid interpreting clinical intent |

## Explanations and summaries

| ID | Feature | Stage | State | Frontend responsibility | Safety/acceptance boundary |
|---|---|---:|---|---|---|
| EXP-001 | Document explanation | Later MVP | Contract required | Request typed task, show evidence and uncertainty | No unsupported diagnosis/treatment; evidence link required |
| EXP-002 | Lab-result explanation | Later MVP | Contract required | Present selected observations and source-grounded explanation | Educational context must not overwrite patient source data |
| EXP-003 | Medication-instruction explanation | Later MVP | Contract required | Explain verified structured instructions | Model never supplies or alters medication fields |
| SUM-001 | Care-journey summary | Later MVP | Contract required | Date-range selection and structured summary | Source/uncertainty clearly identified |
| SUM-002 | Export/share summary | Later MVP | Open | Preview, authorization, export status | Explicit patient authorization; format and recipient workflow open |

## Journals and timeline

| ID | Feature | Stage | State | Frontend responsibility | Safety/acceptance boundary |
|---|---|---:|---|---|---|
| SYM-001 | Symptom journal | Later MVP | Contract required | Patient-entered symptom, severity, timestamp, notes | Observation only; no autonomous diagnosis |
| SIDE-001 | Side-effect journal | Later MVP | Contract required | Link possible effect to medication and severity | Concerning patterns trigger conservative escalation |
| TIME-001 | Longitudinal timeline | Later MVP | Contract required | Chronological documents, medications, symptoms, actions | Provenance on every event |

## Safety, escalation, and audit

| ID | Feature | Stage | State | Frontend responsibility | Safety/acceptance boundary |
|---|---|---:|---|---|---|
| SAF-001 | Red-flag escalation presentation | Later MVP | Open | Interruptive, accessible emergency/escalation message | Deterministic trigger cannot be bypassed by model output |
| SAF-002 | Unsupported-output block state | Later MVP | Contract required | Suppress unsafe response; show safe next action | Blocked content is never briefly rendered or cached |
| SAF-003 | Uncertainty/evidence UI | Later MVP | Input required | Consistent confidence, missing-source, and evidence patterns | Must not create false reassurance or false precision |
| AUD-001 | Client correlation and safe telemetry | Next | Contract required | Opaque request IDs, performance/error signals | No PHI, document text, prompt content, or tokens in telemetry |

## Platform enablers outside the first frontend build

| ID | Capability | Stage | Owner | Required boundary |
|---|---|---:|---|---|
| API-001 | FastAPI modular monolith | Later MVP | Backend | REST/OpenAPI, authorization on every resource |
| DATA-001 | PostgreSQL longitudinal record | Later MVP | Backend/data | Relational, patient-scoped, provenance-centric |
| DATA-002 | pgvector retrieval | Later MVP | Backend/AI | Patient and approved-knowledge evidence separated |
| FILE-001 | Encrypted object storage | Later MVP | Backend/platform | Checksums, malware/file validation, signed URLs |
| JOB-001 | Durable workers and scheduler | Later MVP | Backend/platform | Queue carries opaque IDs, not full medical documents |
| OCR-001 | OCR and layout parsing | Later MVP | Document/AI | Structured output, bounding boxes, confidence |
| AI-001 | Typed AI gateway | Later MVP | Backend/AI | No arbitrary prompt endpoint; versioned execution metadata |
| AI-002 | Rules-first risk router | Later MVP | Backend/AI/clinical | Classifier can raise risk, never cancel deterministic flag |
| AI-003 | Evidence-grounded RAG | Later MVP | Backend/AI/clinical | Minimum necessary evidence; versioned approved corpus |
| SAFE-001 | Deterministic safety engine | Later MVP | Backend/clinical | Medication and emergency invariants enforced in application logic |

## Explicitly deferred feature registry

| ID | Capability | State | Reason |
|---|---|---|---|
| DEF-001 | Autonomous diagnosis | Prohibited in V1 | High clinical and regulatory risk |
| DEF-002 | AI treatment changes | Prohibited in V1 | Outside continuity-of-care thesis |
| DEF-003 | AI-generated medication dose | Prohibited in V1 | High-consequence model error |
| DEF-004 | Personalized therapeutic recommendations | Prohibited in V1 | Requires extensive clinical validation |
| DEF-005 | Broad health insights | Deferred | No bounded acceptance criteria |
| DEF-006 | Family/caregiver permissions | Deferred | Additional consent/access-control model |
| DEF-007 | Clinic dashboards | Deferred | Separate B2B product workflow |
| DEF-008 | Patient-clinician messaging | Deferred | Creates clinical-response obligations |
| DEF-009 | Full FHIR server | Deferred | Premature before integration demand |
| DEF-010 | Hospital integrations | Deferred | Enterprise implementation project |
| DEF-011 | Telemedicine | Deferred | Different operational/regulatory product |
| DEF-012 | Insurance/payment workflows | Deferred | Not required to validate the core hypothesis |

## Registry update rule

When implementation starts or finishes a feature:

1. Update its `Stage` or `State` here.
2. Link its detailed specification if one exists.
3. Record newly accepted architecture decisions in `docs/project/decisions.md`.
4. Update `docs/project/state.md` with the current milestone and verification result.
5. Never mark a safety-critical feature ready based only on visual completion.
