# Vein Health landing-page source audit

Status: Phase 0 evidence audit complete
Audited: 2026-10-02
Implementation status: not started; requires the exact next phase command `LANDING`

## 1. Evidence and authority

The audit covers every file in `MVP/pages/landing/assets`: 18 full-page/section captures, four additional feature-carousel state captures, five standalone photographic/background assets, one standalone header crop, and one mascot mark. Every source image was inspected at its native resolution. The source manifest records dimensions and SHA-256 identities.

The assets are desktop visual references only. The raw drop contains no HTML, CSS, JavaScript, font files, mobile/tablet screenshots, design-tool source, prototype behavior, or approved destination URLs. The screenshots show a page that was captured from a local HTML file, but that HTML file is not part of the raw source pack and is not an implementation artifact.

Authority within the landing source:

1. Full-resolution screenshots define the page hierarchy and visual result.
2. Standalone PNGs define reusable imagery where their content matches the screenshots.
3. The four later `023514`-`023607` captures complete the feature-carousel sequence.
4. Browser chrome, scrollbars, bookmarks, and capture artifacts are not page content.
5. Product, safety, legal, compliance, pricing, and availability claims remain subject to approval even when visible in a screenshot.

## 2. Complete observed page flow

1. Floating/sticky pill header
2. Hero media panel
3. Security/trust claim row
4. “How I use Vein Health” introduction
5. “I upload my documents” split section
6. “I verify the details” split section with two accordions
7. “I understand my care” split section with two accordions
8. “Your health, organized.” product/dashboard preview
9. “Everything your care needs” four-state feature carousel
10. Pricing section with monthly/yearly selector and Starter/Pro plans
11. “Common questions” categorized FAQ accordions
12. Blue “Start with one document.” CTA panel
13. Garden-backed footer/download area

There is no separate testimonial, partner-logo, press, clinician-endorsement, or contact-form section in the supplied sequence.

## 3. Visual system observed from screenshots

### Composition

- Desktop canvas: all complete section captures are 1920 pixels wide; the main content generally keeps 24-60 pixel outside gutters.
- The page uses very large vertical rhythm and near-full-viewport section compositions.
- Most surfaces are warm white/off-white. Cards use white or pale blue with thin blue-gray borders and restrained shadows.
- Primary sections use generous rounded corners, commonly in the visual range of 28-44 pixels. Pill controls and buttons are fully rounded.
- The main grid repeatedly uses balanced two-column compositions. Image/text order alternates through the explanation sequence.
- Decorative complexity is low. The page relies on typography, rounded geometry, photographic warmth, blue accents, and small mascot appearances.

### Color

The screenshots show these approximate visual families. Exact CSS values are unresolved because no source styles are present:

- Brand/action blue: approximately `#2362EA`, with brighter/lighter blue states around `#2D67EE` and `#6A95F0`.
- CTA panel blue: approximately `#2158E1` to `#245DE5`.
- Primary ink/navy: approximately `#10182B` to `#141B2E`.
- Body/slate: approximately `#4F5D75` to `#65758A`.
- Pale feature-panel blue: approximately `#E7F0FF` to `#D9E8FF`.
- Page/surface off-white: approximately `#FAF9F7` to `#F5F4F2`.
- Success green and urgent red appear only inside product-preview examples.

Phase 1 should sample the original PNGs and document the final token values rather than treating these audit estimates as CSS specifications.

### Typography

- The design uses a friendly geometric sans-serif with single-storey forms and rounded proportions; it appears Poppins-like.
- The exact family, font files, weights, license, and fallback stack are not supplied and remain unresolved.
- Display headings are very heavy (roughly 650-750), compact in line height, and range visually from about 56-80 pixels on the 1920-pixel references.
- Body copy is significantly larger than default web copy (roughly 24-30 pixels in the large desktop captures) with relaxed line height.
- Eyebrow labels use blue uppercase text, tracking, and medium/bold weight.
- Navigation, button, and card-title copy uses medium to bold weights.

### Imagery

- `A Family Laughs in the Garden.png` is the hero image and places the family on the right, leaving negative space on the left for the gradient and hero copy.
- `Smiling Woman Scanning a Document.png` is the upload-section image.
- `Smiling Man Using Smartphone at Home.png` is the verification-section image.
- `Reconstructed Garden at Golden Hour.png` and `Golden Hour Meadow Sky.png` support the garden-backed footer composition.
- `mascot.png` is a 52x52 transparent blue owl-like mark used as the logo icon and as a decorative heading suffix.
- The clinician/patient photograph in “I understand my care” has no standalone source asset. It exists only inside a screenshot and must not be extracted from the screenshot for production use.
- Dashboard and feature-card visuals are screenshot evidence, not reusable image assets. They should be recreated as semantic, non-interactive marketing illustrations only in the authorized landing phase.

Image licensing/usage rights are not documented in the drop and require confirmation before public deployment.

## 4. Section-by-section audit

### Header

- A centered, white, elevated pill floats near the top of the viewport and remains visible throughout scrolled captures, indicating sticky behavior.
- Left: mascot plus “Vein Health”.
- Center/right links: “How it works”, “Features”, “Pricing”, “FAQ”.
- Rightmost dark navy pill: “Login”.
- The standalone `Landing Page v4-selection (2).png` is an older/narrower crop that omits “FAQ”; the complete screenshots consistently include it, so the full screenshot sequence is the stronger authority.
- Intended destinations appear to be in-page anchors for the four text links and an authentication route for Login, but no targets are supplied.

### Hero

- Large rounded garden/family photograph panel with a dark blue-gray gradient overlay on the left.
- Heading: “Your AI Health Companion”.
- Supporting copy: “Simply upload your health documents, verify the details, and get plain-language explanations you can act on.”
- Primary CTA: “Get Started”; secondary outlined CTA: “Learn more”.
- Neither destination is supplied. “Get Started” must not enter a fabricated registration/upload/payment flow.

### Trust row

Four muted icon/text claims appear in one centered row:

- “AES-256 Encrypted”
- “HIPAA-Ready”
- “Evidence-First AI”
- “Zero Invented Doses”

All four are content requiring approval. Encryption and HIPAA wording depend on deployed systems and contracts; the absolute medication claim depends on implemented and validated safety controls.

### “How I use Vein Health” introduction

Heading: “How I use Vein Health” plus mascot.
Copy: “Vein Health helps people take control of their healthcare information — from prescriptions and lab results to medication schedules and reminders.”

The design then moves through three large narrative steps.

### Upload step

- Left: supplied portrait of a woman photographing a paper document in a rounded frame.
- Overlay pill: “AI reads every detail in seconds”.
- Right heading: “I upload my documents”.
- Body: “Prescriptions, lab results, discharge notes — I just take a photo or upload a PDF. Vein Health’s AI reads and extracts every medication name, dosage, frequency, and result.”
- The absolute “every detail/every” wording and timing claim are not approved and conflict with the product’s uncertainty model unless qualified.

### Verification step

- Left heading: “I verify the details”.
- Body: “Nothing goes into my health record without my confirmation. Low-confidence fields are flagged, and I review every medication name, dosage, and frequency before anything is saved.”
- Closed accordion questions: “What happens if something is wrong?” and “Does Vein Health ever invent data?”
- Right: supplied smartphone image with overlay pills “Review flagged fields before saving” and “Nothing saved without your confirmation”.
- This section aligns with the PRD’s verification boundary, but the product has not been built; wording must not imply present availability before launch.

### Understanding-care step

- Left: clinician/patient photograph embedded only in the screenshot.
- Overlay pills: “Automatic medication schedules” and “Symptom & side-effect tracking”.
- Right heading: “I understand my care”.
- Body: “Plain-language explanations of what my doctor prescribed and what my lab results mean. Automatic medication schedules, reminders, symptom tracking, and a complete health timeline.”
- Closed accordion questions: “Does it replace my doctor?” and “What about emergency situations?”
- Accordion answers are not visible anywhere in the source pack.

### Organized-health preview

- Centered heading: “Your health, organized.” with italic emphasis on “organized.”
- Supporting copy: “Everything in one place: documents, medications, schedules, reminders, and a complete timeline of your care.”
- A large dashboard mock shows “Good morning, Sarah”, date, navigation, “Today’s doses”, “Adherence”, “To verify”, schedule rows, and recent documents.
- This is a marketing preview only. It does not authorize the authenticated dashboard, its information architecture, health metrics, adherence percentage, or medication-taking controls.

### Feature carousel

Heading block:

- Eyebrow pill: “Features”
- Heading: “Everything your care needs” plus mascot
- Copy: “Little things that help you understand your health, remember your medicines, and feel looked after — every day.”

Interaction evidence:

- Previous/next circular arrow buttons appear at the upper right.
- Four pagination positions appear below; the active state is a longer blue pill and inactive states are pale dots.
- Two large cards are shown per desktop state.
- The `LIVE` chip appears inside visual preview areas.
- Auto-advance, looping, swipe, keyboard bindings, transition timing, reduced-motion behavior, and narrow-screen behavior are not specified.

Observed states:

| State | Left card | Right card |
|---:|---|---|
| 1 | `01 CAPTURE` — **Document scanning**. “Snap or upload prescriptions, lab results, and discharge notes — AI reads them for you, no retyping.” | `02 VERIFY` — **AI extraction & verification**. “Medications, doses and lab values pulled out and checked against the original document.” |
| 2 | `03 UNDERSTAND` — **Plain-language explanations**. “Technical terms translated into real sentences you can use with your doctor and your family.” | `04 ROUTINE` — **Medication schedules**. “A daily schedule built from your verified prescriptions — the right dose at the right time.” |
| 3 | `05 STAY ON TOP` — **Smart reminders**. “Dose, follow-up and lab reminders in sync with your real care plan — never guessed.” | `06 TRACK` — **Symptom & side-effect journal**. “A simple weekly check-in that turns into real data you can share at your next appointment.” |
| 4 | `07 RECORD` — **Health timeline**. “Every document, dose, symptom and visit in one chronological record — nothing lost between visits.” | `08 SAFETY` — **Safety escalation**. “Red-flag symptoms are flagged with clear guidance on when to seek urgent care — never guesswork.” |

The feature previews use synthetic names and medication examples, but several clinical/commercial statements need review before publication. The red safety card shows “URGENT CARE”, “Seek help now”, “Call emergency”, and a chest-tightness/shortness-of-breath example. Emergency wording and destination must be jurisdiction-aware.

### Pricing

- Eyebrow pill: “Pricing”.
- Heading: “Get access to Vein Health” plus mascot.
- Copy: “Choose how you want to manage your health with Vein Health.”
- Segmented control: “Monthly” selected; “Yearly” with “Save 15%”. No yearly totals are shown.
- Starter: `$7.99 per month`, CTA “Get Started”, up to 10 documents/month, AI extraction and verification, plain-language explanations, basic medication schedule, health timeline.
- Pro: `$19.99 per month`, “Popular”, CTA “Get Started”, everything in Starter plus unlimited documents, full medication schedules and reminders, symptom and side-effect journal, export/share summaries, priority support.

Currency, tax, billing interval semantics, yearly prices, eligibility, plan limits, cancellation/refund terms, payment provider, and launch availability are unresolved. Pricing must not be published or wired to payment without explicit approval.

### FAQ

Heading: “Common questions” plus mascot. All rows are closed; no answer copy is supplied.

| Category | Questions visible |
|---|---|
| Getting started | What is Vein Health?; How do I upload documents? |
| Privacy & security | Is my data protected?; Does Vein Health share my data with anyone? |
| Clinical | Does Vein Health replace my doctor?; Can Vein Health diagnose or prescribe? |
| Pricing | How much does Vein Health cost?; Can I cancel anytime? |

FAQ answers, disclosure animation, whether multiple items may remain open, and deep-link behavior are unresolved.

### Final CTA

- Full-width bright blue rounded panel.
- Heading: “Start with one document.”
- Copy: “Upload your first prescription or lab result. See what verified, understandable healthcare feels like.”
- Buttons: “Get Started” and “Learn More”.
- Destinations are unresolved and must not collect health data on the public page.

### Footer/download area

- Garden background with a large warm-white rounded footer surface.
- Left: mascot, “Vein Health”, and “Your AI health companion. Every document understood, every dose on time.”
- Right/top: “DOWNLOAD VEIN HEALTH” with App Store and Google Play badges.
- Explore: How it works, Features, Pricing, FAQ, Blog.
- Support: Medications, Reminders, Example summary, Contact.
- Connect: Instagram, LinkedIn, X (Twitter).
- Bottom legal: Privacy, Terms, Health Data Policy, AI Safety, Cookies.
- Copyright: “© 2026 Vein Health”.
- Disclaimer: “Vein Health is a companion, not a medical device or clinician. It does not diagnose, prescribe, or treat. If you are in crisis, contact your local emergency number.”

No footer link, store listing, social profile, contact destination, legal document, or cookie behavior is supplied. App-store badges must not imply availability until listings exist.

## 5. Interaction and responsive audit

### Interactions visibly implied

- Sticky/floating header
- Smooth in-page navigation
- Hero and final CTA buttons
- Four accordion groups across the narrative/FAQ areas
- Feature-carousel arrows and pagination
- Monthly/yearly segmented pricing control
- Login/authentication link
- Footer/navigation/social/legal/store links

No interaction contract or source code is present. Phase 1 must choose accessible behavior without inventing product destinations.

### Responsive evidence

No mobile or tablet reference is supplied. The following are conservative implementation hypotheses, not approved design facts:

- Replace desktop navigation with an accessible menu on narrow screens.
- Stack each alternating image/text section while preserving reading order.
- Show one feature card per carousel viewport or stack cards if interaction clarity is better.
- Stack pricing cards and footer columns.
- Keep CTA pairs reachable and full-width where appropriate.
- Preserve safe crops for all people and text overlays.

The user/design owner should approve representative mobile and tablet interpretations before Phase 1 is accepted.

## 6. Accessibility requirements for the future landing phase

- One page-level heading; logical section hierarchy.
- Header, navigation, main, sections, and footer landmarks.
- Skip link and visible focus treatment.
- Sticky navigation must not cover anchor targets.
- Carousel must expose labeled previous/next controls, current position, keyboard operation, and reduced-motion behavior; auto-advance should be avoided unless explicitly approved and pausable.
- Accordions must use real buttons with `aria-expanded` and controlled panels.
- Pricing toggle must expose selected state without relying on color.
- Photographic content needs meaningful alt text; dashboard/feature previews need concise descriptions or correctly decorative treatment.
- Blue/gray and pale text combinations require contrast measurement from final CSS values.
- Touch targets and focus order must remain usable after the mobile layout is defined.

## 7. Blocking content and product decisions

These items are unresolved and must be decided before or during the `LANDING` phase:

1. Exact destinations for Login, Get Started, Learn More, navigation, footer, social, legal, contact, and store badges.
2. Whether pricing is real; currency, plan limits, yearly prices, “Save 15%”, billing/cancellation/refund terms, and payment availability.
3. Whether “AES-256 Encrypted”, “HIPAA-Ready”, “Zero Invented Doses”, and related trust claims are legally and technically substantiated.
4. Approval or revision of absolute extraction claims such as “every detail in seconds” and “every medication name, dosage, frequency, and result”.
5. Clinical review of the cholesterol/diet example, emergency example, medication reminders, “right dose at the right time”, “never guessed”, and other feature-preview wording.
6. Complete FAQ answers.
7. Final legal/privacy/health-data/AI-safety/cookie documents and cookie-consent requirements.
8. App Store/Google Play availability and destination URLs.
9. Approved standalone replacement/source for the clinician/patient image.
10. Image/font usage rights and the exact typeface.
11. Mobile/tablet layouts, menu pattern, carousel behavior, accordion behavior, and reduced-motion policy.
12. Whether the dashboard preview remains as a static marketing illustration and which synthetic values are approved.
13. First-launch jurisdiction and correct emergency-language localization.

## 8. Phase boundary

Phase 0 records the design and unresolved decisions only. It does not authorize writing the landing markup, recreating the product previews, wiring authentication/payment/upload flows, or building any authenticated dashboard feature. The next implementation phase must be prompted with `LANDING`.
