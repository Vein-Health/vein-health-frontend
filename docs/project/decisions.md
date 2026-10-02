# Decision register

This file records durable project decisions. It should not contain temporary implementation notes.

| ID | Status | Decision | Reason / consequence |
|---|---|---|---|
| DEC-001 | Accepted | The MVP is a patient-facing continuity-of-care product, not an autonomous diagnosis or treatment system. | Defines scope, claims, safety behavior, and deferred capabilities. |
| DEC-002 | Accepted | Patient verification sits between extraction and any safety-critical organization/action. | Prevents OCR/model errors from becoming medication actions. |
| DEC-003 | Accepted | Medication dose, unit, route, frequency, duration, and dates can originate only from verified structured fields. | The model may explain but cannot author medication facts. |
| DEC-004 | Accepted | The frontend is a client-rendered React/TypeScript/Vite SPA. | Avoids unnecessary server-component complexity for the MVP. |
| DEC-005 | Accepted | TanStack Query owns server-derived health state. | Prevents a second global store from duplicating sensitive patient data. |
| DEC-006 | Accepted | Sensitive health payloads are not persistently cached in browser storage. | Reduces privacy and stale-data exposure. |
| DEC-007 | Accepted | The backend target is a FastAPI modular monolith with asynchronous workers. | Keeps delivery simple while retaining clear domain boundaries. |
| DEC-008 | Accepted | The initial API is REST/OpenAPI and AI operations are typed tasks. | Improves authorization, validation, testing, cost control, and auditability. |
| DEC-009 | Accepted | PostgreSQL plus pgvector is the MVP data/retrieval platform. | Keeps transactional, provenance, audit, and vector data together until scale proves otherwise. |
| DEC-010 | Accepted | MVP deployment uses static frontend hosting and serverless containers, not Kubernetes. | Avoids premature platform complexity and cost. |
| DEC-011 | Accepted | Deterministic rules and source evidence take priority over model agreement. | Two models agreeing is not a patient-safety guarantee. |
| DEC-012 | Accepted | The current implementation phase is frontend-first, beginning with the public landing page. | Matches the user's delivery sequence. |
| DEC-013 | Accepted | The existing landing-page design is the public-page visual authority. | Engineering must preserve it rather than invent a redesign. |
| DEC-014 | Accepted | Dashboard UI and visual language remain undefined until the user supplies direction. | Prevents accidental product-design decisions from becoming implementation fact. |
| DEC-015 | Superseded | Use a single future-ready repository containing frontend, backend, workers, and shared packages. | Superseded by DEC-018 at the user's explicit direction. |
| DEC-016 | Accepted | Phase 0 uses a neutral, non-marketing placeholder at `/`; the supplied landing design is not approximated before the `LANDING` phase. | Keeps repository verification possible without pre-empting the authorized visual implementation phase. |
| DEC-017 | Accepted | The imported PRD and 25 landing PNGs are immutable source snapshots; interpretation lives in curated Markdown. | Preserves auditability and prevents accidental edits to source evidence. |
| DEC-018 | Accepted | Frontend and backend are independent Git repositories under a non-Git `vein-health` coordination folder. | Makes ownership, dependencies, history, CI, and deployment boundaries explicit. |
| DEC-019 | Accepted | Both repositories use the neutral branch name `main`; project branches must not contain tool or agent branding. | Keeps source-control naming product-owned and implementation-tool agnostic. |
| DEC-020 | Accepted | Phase prompts are not stored as a repository folder. | Keeps application repositories focused on product code and durable documentation. |
| DEC-021 | Accepted | Phase 1 uses safe in-page links and truthful disabled states for login, purchasing, app stores, legal pages, and other unavailable destinations. | Prevents fabricated routes, broken journeys, or false launch claims while preserving the supplied visual hierarchy. |
| DEC-022 | Accepted | Landing pricing is an explicitly illustrative preview calculated in integer cents; the supplied yearly direction is represented as a 15% design-reference discount. | Avoids floating-point display errors and prevents unapproved commercial terms from appearing final. |
| DEC-023 | Accepted | Mascot moments use the supplied mascot asset with original CSS motion, intersection-triggered activation, and a static reduced-motion state. | Preserves the brand cue without fabricating new character artwork or forcing motion. |
| DEC-024 | Accepted | Contour decoration is original SVG geometry informed by observed composition and motion principles, not copied source paths or third-party assets. | Retains an auditable, lightweight visual treatment while respecting the reference boundary. |

## Open decisions

| ID | Decision needed | Required input |
|---|---|---|
| OPEN-001 | Final pricing/currency/tax/plan terms, legal and policy destinations, launch claims, mobile-store availability, and source-asset rights confirmation | Product, legal, clinical, commercial, and design approval |
| OPEN-002 | Dashboard information architecture and visual design | Product/design direction |
| OPEN-003 | Authentication provider and session contract | Security/backend decision |
| OPEN-004 | First launch jurisdiction, data residency, and cross-border processing | Legal/privacy/regulatory review |
| OPEN-005 | Clinical claims and device classification | Regulatory/clinical review |
| OPEN-006 | Retention/deletion and backup-expiry rules | Legal/privacy/security review |
| OPEN-007 | Minimum patient age and guardian behavior | Product/legal/clinical review |
| OPEN-008 | Pilot notification channels | Product/operations decision |
