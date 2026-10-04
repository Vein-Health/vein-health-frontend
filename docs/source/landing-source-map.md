# Raw landing-page source map

Raw source root:

`C:\Users\Divergent\Documents\AI_LOCKIN\MVP\pages\landing`

## Source rule

This folder is a design/reference drop, not the application repository. Preserve it as supplied. Do not edit, rename, optimize, or delete the raw assets. The future application repository should copy or reference approved source material into its own `docs/source/design/landing/` area and record provenance.

## Current asset inventory

| File | Observed role | Source authority |
|---|---|---|
| `Landing Page v4-selection (2).png` | Narrow header/navigation reference with Vein Health mark, How it works, Features, Pricing, FAQ, and Login | Design reference |
| `Screenshot 2026-10-02 015521.png` | Hero/above-the-fold landing-page reference: family garden image, “Your AI Health Companion,” primary/secondary CTA | Design reference |
| `Screenshot 2026-10-02 015543.png` | “How I use Vein Health” / upload-documents section | Design reference |
| `Screenshot 2026-10-02 015607.png` | “I verify the details” section with phone/person visual and verification FAQ items | Design reference |
| `Screenshot 2026-10-02 015619.png` | “I understand my care” section with clinician/patient visual and explanation/medication/symptom themes | Design reference |
| `Screenshot 2026-10-02 015629.png` | “Your health, organized.” dashboard/product preview reference | Design reference; not dashboard authorization |
| `Screenshot 2026-10-02 015644.png` | Feature showcase with plain-language explanations and medication schedules | Design reference |
| `Screenshot 2026-10-02 015736.png` | Alternate/continued feature showcase state | Design reference |
| `Screenshot 2026-10-02 015745.png` | Pricing section, monthly/yearly selector, Starter and Pro cards | Design reference; commercial claims require approval |
| `Screenshot 2026-10-02 015801.png` | Pricing-card close/alternate state with plan features | Design reference; commercial claims require approval |
| `Screenshot 2026-10-02 015813.png` | FAQ section, first visible state | Design reference |
| `Screenshot 2026-10-02 015821.png` | FAQ section, continued questions/categories | Design reference |
| `Screenshot 2026-10-02 015829.png` | Blue “Start with one document.” CTA section | Design reference |
| `Screenshot 2026-10-02 015837.png` | Download/app CTA and transition to footer | Design reference |
| `Screenshot 2026-10-02 015847.png` | Footer reference over family/garden visual with navigation and store-badge area | Design reference |
| `Screenshot 2026-10-02 023514.png` | Feature-carousel state: `01 CAPTURE` / Document scanning and `02 VERIFY` / AI extraction & verification; first pagination indicator active | Design reference; newly added carousel state |
| `Screenshot 2026-10-02 023536.png` | Feature-carousel state: `03 UNDERSTAND` / Plain-language explanations and `04 ROUTINE` / Medication schedules; second pagination indicator active | Design reference; newly added carousel state |
| `Screenshot 2026-10-02 023555.png` | Feature-carousel state: `05 STAY ON TOP` / Smart reminders and `06 TRACK` / Symptom & side-effect journal; third pagination indicator active | Design reference; newly added carousel state |
| `Screenshot 2026-10-02 023607.png` | Feature-carousel state: `07 RECORD` / Health timeline and `08 SAFETY` / Safety escalation; fourth pagination indicator active | Design reference; newly added carousel state |
| `A Family Laughs in the Garden.png` | Hero/family lifestyle image | Supplied visual asset |
| `Golden Hour Meadow Sky.png` | Wide sky/background visual | Supplied visual asset |
| `Reconstructed Garden at Golden Hour.png` | Garden/environment background visual | Supplied visual asset |
| `Smiling Man Using Smartphone at Home.png` | Feature/verification lifestyle visual | Supplied visual asset |
| `Smiling Woman Scanning a Document.png` | Upload/scanning lifestyle visual | Supplied visual asset |
| `mascot.png` | Small Vein Health mascot/icon | Supplied visual asset |
| `new dashboard image/Screenshot 2026-10-03 005151.png` | Owner-supplied dashboard to replace the synthetic organized-care preview | Public marketing-preview authority; not authorization to build authenticated dashboard behavior |

## Design reading order to verify in the builder

The screenshot sequence suggests this public flow, but the builder must verify it against the full-resolution references before treating it as final:

1. Header/navigation
2. Hero: AI health companion positioning and primary CTA
3. How the patient uses Vein Health / upload documents
4. Verify the details
5. Understand care
6. Organize health information / product preview
7. Feature carousel: eight care capabilities across four two-card states — Capture, Verify, Understand, Routine, Stay on Top, Track, Record, and Safety
8. Pricing
9. Frequently asked questions
10. Start-with-one-document CTA
11. Download/app CTA
12. Footer and legal/navigation links

## Newly added carousel sequence

The four new screenshots complete a four-state, two-card carousel. The visible card copy and UI concepts are:

| Carousel state | Left card | Right card | Pagination |
|---|---|---|---|
| 1 | `01 CAPTURE` — **Document scanning**: snap or upload prescriptions, lab results, and discharge notes; AI reads them without retyping | `02 VERIFY` — **AI extraction & verification**: medications, doses, and lab values checked against the original document | First indicator active |
| 2 | `03 UNDERSTAND` — **Plain-language explanations**: technical terms translated into usable sentences | `04 ROUTINE` — **Medication schedules**: daily schedule from verified prescriptions | Second indicator active |
| 3 | `05 STAY ON TOP` — **Smart reminders**: dose, follow-up, and lab reminders in sync with the care plan | `06 TRACK` — **Symptom & side-effect journal**: weekly check-in that can become shareable appointment data | Third indicator active |
| 4 | `07 RECORD` — **Health timeline**: documents, doses, symptoms, and visits in one chronological record | `08 SAFETY` — **Safety escalation**: red-flag symptoms with clear urgent-care guidance | Fourth indicator active |

### Carousel implementation notes

- Treat the four new files as reference states of one feature carousel, not four unrelated sections.
- Preserve the two-card desktop composition, the active/inactive pagination treatment, the pale blue visual panels, the `LIVE` badges, and the numbered eyebrow labels.
- Verify the intended interaction from the source/design context: pagination, arrow controls, auto-advance, and responsive one-card stacking are not fully specified by these screenshots alone.
- The cards contain product-preview UI, medication examples, symptom data, and safety escalation examples. They are landing-page demonstrations, not authorization to build those patient workflows during the landing phase.
- The medication and safety wording must remain source-grounded and must not be strengthened into clinical promises.
- The `023514`–`023607` captures include browser chrome in the screenshot itself. Treat the browser chrome as capture context, not page content.

## What the builder must not infer

- The owner-supplied dashboard screenshot authorizes the public preview image only; it is not authorization to implement authenticated dashboard behavior.
- Pricing shown in a reference is not automatically approved production pricing.
- FAQ wording must be transcribed from the reference and checked for safety/legal claims.
- The landing page must not promise diagnosis, prescribing, guaranteed outcomes, emergency treatment, or clinician replacement.
- CTA destinations must be identified before wiring; do not create deceptive placeholder auth or payment flows.
