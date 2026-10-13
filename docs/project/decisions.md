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
| DEC-014 | Superseded | Dashboard UI and visual language remain undefined until the user supplies direction. | Superseded for the public marketing preview by DEC-025 after the owner supplied a dashboard reference; the authenticated dashboard remains separately scoped. |
| DEC-015 | Superseded | Use a single future-ready repository containing frontend, backend, workers, and shared packages. | Superseded by DEC-018 at the user's explicit direction. |
| DEC-016 | Accepted | Phase 0 uses a neutral, non-marketing placeholder at `/`; the supplied landing design is not approximated before the `LANDING` phase. | Keeps repository verification possible without pre-empting the authorized visual implementation phase. |
| DEC-017 | Accepted | The imported PRD and 25 landing PNGs are immutable source snapshots; interpretation lives in curated Markdown. | Preserves auditability and prevents accidental edits to source evidence. |
| DEC-018 | Accepted | Frontend and backend are independent Git repositories under a non-Git `vein-health` coordination folder. | Makes ownership, dependencies, history, CI, and deployment boundaries explicit. |
| DEC-019 | Accepted | Both repositories use the neutral branch name `main`; project branches must not contain tool or agent branding. | Keeps source-control naming product-owned and implementation-tool agnostic. |
| DEC-020 | Accepted | Phase prompts are not stored as a repository folder. | Keeps application repositories focused on product code and durable documentation. |
| DEC-021 | Accepted | Phase 1 uses real public policy routes, in-page destinations for public CTAs, and a truthful disabled state only for authentication that is not implemented. | Prevents broken journeys while preserving the supplied visual hierarchy and keeping the protected-product boundary explicit. |
| DEC-022 | Accepted | Landing pricing is an explicitly illustrative preview calculated in integer cents; the supplied yearly direction is represented as a 15% design-reference discount. | Avoids floating-point display errors and prevents unapproved commercial terms from appearing final. |
| DEC-023 | Superseded | Mascot moments use the supplied mascot asset with original CSS motion, intersection-triggered activation, and a static reduced-motion state. | Superseded by DEC-026 after the owner explicitly authorized a new full-character companion while retaining the supplied asset as the logo. |
| DEC-024 | Accepted | Contour decoration is original SVG geometry informed by observed composition and motion principles, not copied source paths or third-party assets. | Retains an auditable, lightweight visual treatment while respecting the reference boundary. |
| DEC-025 | Accepted | The owner-supplied `dashboard-reference.png` is the visual authority for the public organized-care preview. | Replaces the synthetic dashboard mock without authorizing authenticated dashboard functionality or health-data logic. |
| DEC-026 | Superseded | The compact supplied owl remains the brand logo; a separately generated full-body owl is the interactive AI companion, animated through a CSS eye rig and deterministic page states. | Superseded by DEC-029 after owner feedback rejected the waving pose, pointer gaze, blinking overlay, and hero-sized mascot. |
| DEC-027 | Superseded | The public experience uses a short first-load companion intro plus intersection-driven section reveals and carousel transitions. | Superseded by DEC-029: the hero has no full mascot; the companion arrives from the navbar mark at the first workflow waypoint, hides while scrolling, and returns only at a section anchor. |
| DEC-028 | Superseded | Public Privacy, Terms and Conditions, Acceptable Use, and Cookie Policy pages are first-class routes whose text must receive legal review before production launch. | Superseded by DEC-030: the public footer links only Privacy, Terms, and Cookies; the policies are structured drafts requiring legal review before launch. |
| DEC-029 | Accepted | The interactive companion is a small, calm, wings-down character with natural eyes, no pointer-follow or blink rig, useful section-specific health guidance, a full cloud-shaped bubble, a bounce-and-settle arrival at every eligible waypoint, and no hero/footer presence. | Keeps the character supportive without obstructing reading, avoids anthropomorphic gaze distractions, and follows the owner’s requested first-workflow arrival, section-safe placement, and scroll-hide behavior. |
| DEC-030 | Accepted | Public legal content is organized into readable sections with a table of contents; Privacy explicitly documents AI failure modes, source-first verification, minimum-necessary processing, browser-storage restrictions, retention, sharing, and user rights. | Makes the policy pages understandable while keeping them clearly subject to legal, clinical, regulatory, and launch-jurisdiction review. |
| DEC-031 | Accepted | The public footer restores the supplied Explore, Support, Connect, and legal inventories; unavailable Blog, Contact, and social destinations are shown as pending text, while Health Data Policy and AI Safety deep-link to the relevant Privacy sections. | Preserves the design reference without inventing profiles, contact channels, or routes that do not exist. |
| DEC-032 | Accepted | The feature carousel advances every 3.5 seconds, presents the supplied two-card states on wider screens, and flattens those states into one-card slides below 720 pixels. | Preserves the desktop reference while preventing stacked cards and maintaining readable mobile pacing. |
| DEC-033 | Accepted | The public experience uses a 2.55-second first-load banner; legal policy pages use a sticky table of contents with hash links and active-location tracking that preserves a clicked destination through smooth scrolling; the public landing page has no login entry until authentication is separately authorized. | Makes initial loading and policy navigation legible without adding an external contact channel, invented product capability, or premature authentication path. |

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
