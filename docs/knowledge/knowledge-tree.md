# Vein Health AI knowledge tree

Last synchronized with the 44-page MVP PRD: 2026-10-02

## How to use this document

This is the durable navigation layer for the whole MVP. Use it to locate the correct product rule before designing, coding, testing, or making a trade-off. It deliberately distinguishes documented facts from working decisions and unresolved questions.

Evidence labels:

- **PRD** - explicitly required or recommended by the source PRD.
- **Decision** - accepted repository decision recorded in `docs/project/decisions.md`.
- **Working** - a reversible implementation direction that supports the PRD.
- **Open** - requires user, clinical, legal, regulatory, design, or provider input.

## The tree

```text
VEIN HEALTH AI
|
|-- 1. Product identity
|   |-- Patient-facing continuity of care
|   |-- Post-consultation health-information management
|   |-- Nigeria/Africa first direction, then global
|   `-- Assistance and understanding, not autonomous medicine
|
|-- 2. Core product hypothesis
|   `-- Patients repeatedly use Vein Health to convert fragmented
|       healthcare information into verified, understandable,
|       actionable information.
|
|-- 3. Patient journey
|   |-- Upload
|   |-- Extract
|   |-- Verify       <-- mandatory safety boundary
|   |-- Organize
|   |-- Explain
|   |-- Create Actions
|   `-- Track Over Time
|
|-- 4. Patient experience domains
|   |-- Public landing page
|   |-- Account and consent
|   |-- Document upload and processing
|   |-- Extraction review and verification
|   |-- Medication record and schedule
|   |-- Reminders and care actions
|   |-- Plain-language explanations
|   |-- Symptoms and side effects
|   |-- Longitudinal timeline
|   |-- Summaries and authorized sharing
|   |-- Safety escalation
|   `-- Access history and privacy controls
|
|-- 5. Safety system
|   |-- File and upload validation
|   |-- Confidence per critical field
|   |-- Source location and provenance
|   |-- Patient verification
|   |-- Deterministic medication rules
|   |-- Deterministic red-flag rules
|   |-- One-way conservative classifier
|   |-- Evidence-grounded generation
|   |-- Output safety validator
|   |-- Selective specialist/fallback routing
|   |-- Human/escalation path
|   `-- Audit, rollback, and kill switch
|
|-- 6. Data and provenance
|   |-- Identity and consent
|   |-- Source documents and pages
|   |-- Extraction runs and extracted fields
|   |-- Verified medications and instructions
|   |-- Observations, symptoms, and side effects
|   |-- Care actions, reminders, and timeline events
|   |-- AI runs, evidence links, and safety events
|   |-- Audit events
|   `-- Versioned educational knowledge sources
|
|-- 7. Technical platform
|   |-- React/TypeScript patient web application
|   |-- FastAPI modular monolith
|   |-- Asynchronous document/AI workers
|   |-- PostgreSQL plus pgvector
|   |-- Encrypted object storage
|   |-- Managed queue and scheduler
|   |-- Task-typed AI gateway
|   |-- OpenTelemetry-based observability
|   `-- Static hosting plus serverless containers
|
|-- 8. Quality system
|   |-- Unit, schema, and deterministic-rule tests
|   |-- Integration and contract tests
|   |-- AI evaluation set
|   |-- End-to-end and adversarial red-team tests
|   |-- Clinician review
|   |-- Document gold set
|   |-- Synthetic medication edge cases
|   |-- Prompt-injection suite
|   `-- Security and authorization suite
|
|-- 9. Delivery controls
|   |-- Scope and safety foundation
|   |-- Core platform
|   |-- Document and AI pipeline
|   |-- Care actions and timeline
|   |-- Validation and controlled pilot
|   `-- Formal pre-launch gates
|
`-- 10. Deferred or unresolved
    |-- Deferred clinical/product capabilities
    |-- Dashboard visual design
    |-- Launch jurisdiction and data residency
    |-- Medical-device classification and claims
    |-- Retention and deletion policy
    |-- Minimum patient age/guardian workflow
    |-- Clinical governance model
    |-- Vendor/provider selections
    `-- External integration requirements
```

## 1. Product identity

### Mission

Vein Health helps patients continue care after a consultation by transforming fragmented documents into a verified longitudinal care journey. **PRD**

### Positioning boundary

The product is not intended to prove that AI can independently diagnose a patient or choose treatment. **PRD**

### Primary actors

- **Patient** - uploads, reviews, verifies, reads, records, schedules, and authorizes sharing. **PRD**
- **Clinical advisor/reviewer** - defines safety criteria and evaluates system behavior; not an always-online treating clinician in the MVP. **PRD**
- **Product/support operator** - monitors errors and follows defined escalation/support processes without unrestricted patient-data access. **Working**
- **System worker** - performs file validation, OCR, extraction, embeddings, model calls, and scheduled jobs under authorized server-side scope. **PRD**

Caregivers, clinic staff, treating-clinician messaging participants, insurers, and telemedicine providers are not first-MVP actors. **PRD**

## 2. Core patient journey

| Stage | Patient outcome | System responsibility | Hard boundary |
|---|---|---|---|
| Upload | A document enters the care journey | Validate type, size, malware risk, identity scope, and encrypted storage | No record before valid consent |
| Extract | Candidate fields become visible | OCR/layout parsing, schema extraction, confidence, bounding boxes, provenance | OCR is not clinical correctness |
| Verify | Critical information is confirmed or rejected | Highlight source, expose uncertainty, allow edit/retake/flag | No medication action before verification |
| Organize | Verified facts become longitudinal data | Normalize without inventing; retain raw text and origin | Every health fact has an origin |
| Explain | The patient receives plain-language context | Retrieve evidence, generate within task policy, validate output | No unsupported diagnosis/treatment |
| Create Actions | Verified facts become schedules or reminders | Deterministic schedule/action builder | Never infer missing medication fields |
| Track Over Time | Documents, actions, symptoms, and outcomes form a timeline | Preserve provenance, timestamps, status, and audit history | No cross-patient access |

## 3. MVP capability map

The detailed, implementation-facing register is `docs/product/feature-registry.md`.

### Required patient capabilities

- Registration, login, account recovery direction, consent version tracking, and future MFA capability. **PRD**
- Image/PDF upload for prescriptions, laboratory results, and discharge information. **PRD**
- Extracted names, medication fields, lab values, dates, and instructions. **PRD**
- Confidence per critical field and mandatory review of unsafe/low-confidence results. **PRD**
- Source-grounded plain-language explanations. **PRD**
- Deterministic schedules and reminders from verified information. **PRD**
- Patient-entered symptoms and possible side effects. **PRD**
- Timeline, summaries, safety escalation, and authorized export. **PRD**

### Explicit non-capabilities for V1

- Autonomous diagnosis or treatment decisions.
- Generated or adjusted medication doses.
- Personalized therapeutic recommendations.
- Broad undefined health insights.
- Caregiver/family permissions.
- Clinic dashboards or patient-clinician messaging.
- Full FHIR server or hospital integration.
- Telemedicine, insurance, or payment workflows.

All are **PRD** deferrals, not rejections of the long-term roadmap.

## 4. Medication safety model

Medication is the most constrained workflow.

```text
Prescription upload
  -> OCR
  -> Extract medication fields
  -> Normalize names/units without changing meaning
  -> Deterministic rule validation
  -> Are critical fields complete?
       no  -> patient review/edit/retake/flag
       yes -> show source highlight
  -> Does the patient confirm?
       no  -> edit/retake/flag
       yes -> verified medication record
  -> deterministic schedule/reminder creation
  -> optional plain-language explanation
  -> safety validation
  -> unsupported instruction?
       yes -> block/escalate
       no  -> display
```

Critical launch invariants:

- Zero medication actions from unverified extraction.
- Zero missing source evidence for extracted medication fields.
- Zero silently invented doses or frequencies.
- Zero automatic acceptance of low-confidence critical fields.
- `mg`/`mcg` and decimal ambiguity require manual confirmation.
- Conflicting prescriptions are displayed as a conflict; the system does not choose.
- Requests to adjust a prescribed dose are declined and redirected to a clinician or pharmacist.

## 5. Evidence and AI model

### Evidence hierarchy

1. Verified patient document and structured patient record
2. Approved, versioned clinical educational corpus
3. Model general knowledge only within a bounded task and with uncertainty

Educational material may contextualize but must not silently overwrite the patient's prescription or discharge instruction. **PRD**

### AI routing

```text
Rules and structured data
  -> deterministic answer available? -> yes: no LLM
  -> no: retrieve minimum evidence
  -> low-cost primary model
  -> deterministic safety validation
  -> acceptable risk/confidence? -> yes: respond
  -> no: selective checker, stronger fallback, or escalation
```

The model is an explanation layer inside a safety system; it is not the safety system. **PRD**

### Task boundary

The client and API communicate through typed tasks such as document explanation, lab-result explanation, care-journey summarization, and medication-instruction explanation. An arbitrary prompt endpoint is out of scope. **PRD**

## 6. Data and provenance model

Core entity groups:

- Identity: `users`, `patients`, `consents`
- Documents: `documents`, `document_pages`, `extractions`, `extracted_fields`
- Health record: `medications`, `medication_instructions`, `observations`
- Journals: `symptom_entries`, `side_effect_entries`
- Actions: `care_actions`, `reminders`, `timeline_events`
- AI/audit: `ai_runs`, `evidence_links`, `safety_events`, `audit_events`
- Knowledge: `knowledge_sources`, `knowledge_chunks`

Each material health value needs its raw source text, normalized representation where applicable, confidence, document/page/source location, verification state, timestamps, and supersession context. **PRD**

The model is FHIR-inspired, not a standards-complete FHIR server. Future mappings include Patient, DocumentReference, Observation, MedicationStatement/MedicationRequest, CarePlan, Appointment, Task, Provenance, and AuditEvent. **PRD**

## 7. Security and privacy tree

```text
Identity
|-- Managed OIDC/OAuth direction
|-- Secure recovery
`-- MFA capability

Authorization
|-- Patient ownership on every request
|-- Tenant/patient scope enforced server-side
`-- Cross-patient suite must have zero known failures

Data protection
|-- TLS in transit
|-- Database/object encryption
|-- Short-lived file URLs
|-- Managed secrets
|-- Encrypted backups and restore tests
`-- Defined retention/deletion workflow

Observability
|-- Structured allowlisted logs
|-- PHI scrubbing
|-- Append-only audit/security events
`-- Error, latency, cost, and safety monitoring

AI privacy
|-- Minimum necessary context
|-- Approved providers and acceptable data terms
|-- No complete history by default
`-- No raw documents in queue messages
```

Frontend-specific privacy rules are in `docs/frontend/system.md`.

## 8. Quality and release model

### Test pyramid

1. Unit, schema, and deterministic-rule tests
2. Integration and API-contract tests
3. AI evaluation set
4. Red-team and end-to-end tests
5. Clinician review

Every model, prompt, retrieval corpus, and safety-rule change must run the same regression suite. **PRD**

### Pre-launch gate groups

- Clinical scope and claims
- Data-flow/privacy review
- Regulatory position
- Medication provenance and verification
- Severe-harm and red-flag gold sets
- Prompt-injection resistance
- Cross-patient authorization
- Backup restore and deletion
- Rate and AI cost limits
- Pinned models and operational rollback
- Safety kill switch
- Monitoring and pilot support

The full gate list remains canonical in the PRD and should become executable release criteria as implementation begins.

## 9. Delivery sequence

The PRD proposes a 10-13 week two-engineer MVP with part-time clinical, design, security, and QA support:

1. Clinical/product foundation
2. Core platform
3. Document and AI pipeline
4. Care actions and timeline
5. Validation and controlled pilot

This repository is currently before phase 1 implementation. The immediate work is the frontend foundation and public landing page. **Decision**

## 10. Open-decision bank

Do not bury these questions inside implementation details:

| Decision | Owner needed | Why it matters |
|---|---|---|
| Landing-page source/design artifact | Product/design | Required for faithful implementation |
| Dashboard design and navigation | Product/design | UI must not be invented by engineering |
| Launch jurisdiction and data residency | Legal/privacy/product | Determines processing, transfer, and claims controls |
| Clinical claims and classification | Regulatory/clinical/product | Defines regulated-product exposure |
| Retention and deletion schedule | Legal/privacy/security | Required for data lifecycle and backups |
| Minimum age and guardian workflow | Product/legal/clinical | Changes consent and authorization |
| Clinical governance/escalation ownership | Clinical/operations | Required before pilot support |
| OIDC/provider choice | Security/engineering | Changes session and recovery implementation |
| Hosting/database/model providers | Security/privacy/engineering | Requires acceptable health-data terms and regional capability |
| Notification channels | Product/operations | SMS cost, consent, and reliability differ from push/email |

## 11. PRD page index

| Pages | Knowledge area |
|---|---|
| 1-4 | Identity, contents, executive commitments |
| 5-6 | Executive decisions, economics, regulatory uncertainty |
| 7-10 | Objective, MVP scope, deferrals, acceptance, metrics |
| 11-16 | Target architecture, frontend/backend stack, routes, typed AI tasks |
| 17-25 | AI routing, model roles/cost, document processing, risk, RAG, safety rules |
| 26-32 | Data model, provenance/FHIR, database, infrastructure, security, regulation |
| 33-36 | Delivery phases, calendar, team, budget, purchase priorities |
| 37-44 | Failure modes, medication safety, QA, change control, gates, final stack |

