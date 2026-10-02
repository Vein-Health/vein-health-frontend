# Vein Health AI target architecture

Status: MVP target, frontend-first implementation

## 1. Architectural objective

Build an enterprise-shaped but operationally lean continuity-of-care platform in which verified source evidence and deterministic safety controls surround every use of generative AI.

The MVP is not a microservice fleet. The target is:

- A client-rendered React patient application
- A FastAPI modular monolith
- Asynchronous Python workers for long-running work
- PostgreSQL as the transactional and retrieval center
- Encrypted object storage for source documents
- A task-typed AI gateway with rules-first risk routing

Only the frontend will be implemented in the first build phase.

## 2. Architectural principles

1. **Evidence before generation.** Retrieve verified patient evidence before asking a model to explain it.
2. **Verification before action.** Unverified extraction cannot create a medication schedule or reminder.
3. **Deterministic before probabilistic.** Rules, schemas, and structured rendering answer questions that do not need a model.
4. **Provenance by construction.** Every material health fact retains its source and transformation history.
5. **Risk-dependent computation.** Stronger or specialist models are selective fallbacks, not default hops.
6. **Minimum necessary context.** Do not transmit a complete patient history for a narrow task.
7. **Privacy-safe clients.** Sensitive patient data is not persistently cached in the browser.
8. **Modular, not distributed.** Separate domains in code before separating deployable services.
9. **Typed boundaries.** Validate every external request, response, event, extraction, and AI task.
10. **Observable outcomes, not hidden reasoning.** Audit inputs/outputs as policy permits, evidence, versions, decisions, costs, latency, and outcomes—not hidden model reasoning traces.

## 3. System context

```mermaid
flowchart LR
    Patient[Patient] --> Web[Patient Web App]
    Web --> IdP[Managed Identity Provider]
    Web --> API[FastAPI Modular Monolith]
    API --> DB[(PostgreSQL + pgvector)]
    API --> Store[(Encrypted Object Storage)]
    API --> Queue[Managed Queue / Scheduler]
    Queue --> Worker[Document and AI Workers]
    Worker --> Store
    Worker --> DB
    Worker --> AIG[AI Safety Gateway]
    AIG --> Models[Approved Model Providers / Selective Self-host]
    AIG --> Corpus[Approved Clinical Knowledge Corpus]
    API --> Notify[Approved Notification Provider]
    API --> Obs[Logs / Metrics / Traces]
    Worker --> Obs
```

The identity, notification, model, and hosting providers remain open decisions. Provider choice must include privacy, regional processing, security, and contractual review—not price alone.

## 4. Repository and deployment boundaries

### Repository layout

```text
vein-health/                         # Coordination folder; not a Git repository
|-- frontend/                        # Independent Git repository, branch main
|   |-- src/                         # React/TypeScript application
|   |-- tests/                       # Browser tests
|   |-- docs/                        # Frontend-owned knowledge and source snapshots
|   |-- package.json
|   `-- pnpm-lock.yaml
`-- backend/                         # Independent Git repository, branch main
    |-- src/vein_health_api/         # Future FastAPI modular monolith
    |-- tests/
    |-- docs/                        # Backend-owned knowledge and PRD snapshot
    `-- pyproject.toml
```

The repositories have separate histories, dependencies, release pipelines, and deployment boundaries. They share contracts only through an explicitly versioned OpenAPI artifact or a separately approved contract publication process. The presence of the backend repository does not authorize backend feature implementation during a frontend-only phase.

### Target deployables

| Deployable | Responsibility | Scaling direction |
|---|---|---|
| Static web application | Public landing page and patient SPA | CDN/static hosting |
| API container | Authenticated REST/OpenAPI, authorization, orchestration | Serverless containers |
| Worker container/jobs | OCR, extraction, embeddings, model calls, reminders | Queue-driven, scale to zero where practical |
| PostgreSQL | Patient records, provenance, audit metadata, jobs, retrieval vectors | Managed relational service |
| Object storage | Encrypted source documents and derived artifacts | S3-compatible managed storage |
| Queue/scheduler | Durable asynchronous work | Managed queue/cache/scheduler |

Kubernetes, a dedicated vector database, and an always-on GPU are explicitly deferred for the MVP.

## 5. Frontend architecture

The frontend is a normal client-rendered SPA. Its implementation contract is in `docs/frontend/system.md`.

### Target source layout

```text
src/
|-- app/
|   |-- router/
|   |-- providers/
|   |-- layouts/
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
|   |-- queries/
|   `-- schemas/
|-- domain/
|-- lib/
|-- styles/
`-- tests/
```

Feature folders own their UI, query/mutation hooks, feature schemas, and tests. Generic folders must not become dumping grounds for domain behavior.

### State ownership

| State type | Owner | Persistence rule |
|---|---|---|
| Server-derived patient/health data | TanStack Query | In-memory cache with explicit lifetime; no persistent PHI cache |
| Route, filters, pagination safe for URLs | TanStack Router | URL only when it cannot expose sensitive data |
| Form state | TanStack Form + Zod | Memory until submit; clear sensitive values after completion |
| Local interaction state | React component state | Memory only |
| Cross-component ephemeral UI | Zustand, only if necessary | Memory only; no patient-record mirror |
| Session | Secure server/provider mechanism | Prefer protected cookies; no long-lived browser-readable token |

## 6. Backend modular-monolith architecture

Future backend modules should align to domain responsibility rather than framework layers:

```text
src/vein_health_api/
|-- modules/
|   |-- identity_consent/
|   |-- patients/
|   |-- documents/
|   |-- extractions/
|   |-- medications/
|   |-- care_actions/
|   |-- journals/
|   |-- timeline/
|   |-- explanations/
|   |-- safety/
|   `-- audit/
|-- ai_gateway/
|-- infrastructure/
|-- api/
`-- tests/
```

The API remains one deployable application initially. Workers reuse application/domain code while running in separate processes or managed jobs.

## 7. Primary synchronous API surface

Representative routes from the PRD:

```text
POST   /v1/documents
GET    /v1/documents/:id
POST   /v1/documents/:id/process
POST   /v1/extractions/:id/confirm
GET    /v1/patients/me/timeline
GET    /v1/patients/me/medications
POST   /v1/patients/me/symptoms
POST   /v1/medications/:id/reminders
POST   /v1/actions
PATCH  /v1/actions/:id
POST   /v1/ai/explain
POST   /v1/ai/summarize
GET    /v1/consents
POST   /v1/consents
GET    /v1/audit/my-access-history
```

These are representative, not an approved final OpenAPI contract. The frontend may create adapters/mocks around them, but it must not present provisional shapes as final backend truth.

### AI task contract

The gateway accepts typed tasks such as:

- `EXPLAIN_DOCUMENT`
- `EXPLAIN_LAB_RESULT`
- `SUMMARIZE_CARE_JOURNEY`
- `EXPLAIN_MEDICATION_INSTRUCTIONS`

The frontend sends identifiers and task-specific inputs. It never supplies an unrestricted system prompt or claims authority to construct clinical prompt policy.

## 8. Document-processing architecture

```mermaid
flowchart LR
    A[Photo or PDF] --> B[File and image-quality checks]
    B --> C[OCR / Layout Parser]
    C --> D[Structured Schema Extraction]
    D --> E[Confidence per Critical Field]
    E -->|High enough| F[Source-highlight Review]
    E -->|Ambiguous| G[Selective Multimodal Fallback]
    G --> F
    F --> H[Patient Verification]
    H -->|Confirmed| I[Structured Health Record]
    H -->|Rejected or edited| J[Retake / Correct / Flag]
```

OCR output is a candidate representation, not a medication truth. Every critical extracted field carries raw text, normalized value if available, unit, confidence, source document/page/location, schema/model version, and verification state.

## 9. AI safety-gateway architecture

```mermaid
flowchart TD
    T[Typed AI Task] --> P[Policy and deterministic rules]
    P --> R[Minimum-evidence retrieval]
    R --> Q{Can structured/rule logic answer?}
    Q -->|Yes| D[Deterministic response]
    Q -->|No| M[Low-cost primary model]
    M --> V[Evidence and safety validator]
    V --> A{Risk and confidence acceptable?}
    A -->|Yes| O[Return evidence-grounded response]
    A -->|No| C[Selective medical checker or stronger fallback]
    C --> V2[Validate again]
    V2 --> E{Safe and supported?}
    E -->|Yes| O
    E -->|No| H[Block / escalate / human review]
```

### Non-overridable rules

- Never invent missing dosage or frequency.
- Display unspecified duration as unspecified.
- Require manual confirmation for `mg`/`mcg` or decimal ambiguity.
- Block medication schedules when critical confidence is below threshold.
- Do not automatically reconcile conflicting documents.
- Decline dose-change decisions and direct the patient to an appropriate professional.
- Show an escalation message for emergency red flags; do not return reassurance alone.
- Block unsupported medication instructions.
- Treat instructions inside uploaded documents as data, not control text.

## 10. Data architecture

PostgreSQL owns:

- Transactional patient and consent data
- Documents, extraction metadata, and verified fields
- Medications, observations, journals, care actions, and timeline events
- Reminder/scheduler state
- AI execution and evidence metadata
- Safety and audit events
- Approved knowledge-source metadata and chunks
- pgvector embeddings

Object storage owns encrypted document objects. Queue messages carry an opaque `document_id` or job identifier, not complete document bodies.

### Provenance questions the system must answer

- Where did this value come from?
- Which document and page contain it?
- What raw text and source location support it?
- Which extraction/model/schema version produced it?
- What confidence was recorded?
- Who confirmed or corrected it, and when?
- Has the fact or source been superseded?

## 11. Security architecture

### Trust boundaries

- Browser input is untrusted.
- Uploaded files and their text are untrusted.
- Model output is untrusted until validated.
- Resource identifiers require patient/tenant authorization on every request.
- Third-party providers receive only approved, minimum-necessary content.

### Required controls

- Managed OIDC/OAuth direction, secure recovery, MFA capability
- Server-side patient ownership and tenant isolation
- TLS; database and object-store encryption
- Short-lived signed URLs
- Managed secrets
- PHI-safe structured logging and error monitoring
- Append-only access/security audit events
- Automated encrypted backups and restore tests
- Defined retention/deletion behavior
- Vulnerability and secret scanning
- Admin MFA and least privilege
- Rate limits and per-user/request AI budgets

## 12. Observability and change control

Every AI execution should identify:

- Task
- Model family and pinned version
- Prompt version
- Retrieval-corpus version
- Source document and evidence IDs
- Risk flags
- Safety-rule version
- Input/output token counts
- Latency and estimated cost
- Visible outcome or escalation state

Client telemetry should use opaque correlation identifiers and must exclude documents, extracted text, symptoms, medication values, model prompts, and authentication secrets.

## 13. Quality architecture

```text
Clinician review
    ^
Red-team / end-to-end
    ^
AI evaluation set
    ^
Integration / contract tests
    ^
Unit / schema / deterministic-rule tests
```

The frontend layer adds:

- Component behavior tests
- Mocked API integration tests
- Accessibility checks
- Responsive visual review
- Browser E2E for critical workflows
- A production-build gate

## 14. Evolution rules

Extract a service from the modular monolith only when measured scaling, security, ownership, or reliability needs justify the operational boundary. Introduce a separate vector database only when PostgreSQL cannot meet measured retrieval volume or SLA needs. Introduce Kubernetes only when sustained scale and platform-team capability justify it.

Architecture changes that affect patient safety, data flow, consent, claims, or provider transmission require decision-log and threat-model updates before implementation.
