# Landing-page implementation contract

Status: audited; waiting for exact command `LANDING`, the complete phase prompt, and resolution of the blocking inputs recorded in `landing-page-audit.md`

## 1. Current evidence

The supplied public-page evidence is a set of 25 PNG files from:

`C:\Users\Divergent\Documents\AI_LOCKIN\MVP\pages\landing\assets`

Byte-identical repository snapshots live in `docs/source/design/landing/`. They include desktop section/full-page screenshots, photography/backgrounds, a mascot, and a header crop. No HTML, CSS, JavaScript, font files, design-tool source, or mobile reference was supplied. The native-resolution inspection and unresolved questions are recorded in `landing-page-audit.md`; filenames, dimensions, sizes, and SHA-256 identities are recorded in `docs/source/source-manifest.md`.

The implementation agent must use these snapshots as the public-page visual authority. It must not fabricate a substitute or treat unsupported responsive, commercial, legal, or clinical details as approved.

## 2. Scope

The first frontend build includes:

- The public route `/`
- The supplied landing-page sections, content, assets, and interactions
- Responsive behavior
- Accessible public navigation and calls to action
- Production-ready asset handling and metadata evidenced by the design/content
- A maintainable frontend foundation that does not force dashboard design decisions

It does not include:

- Designing the patient dashboard
- Authenticated health workflows
- Backend/API implementation
- OCR, AI, or medical logic
- Fabricated testimonials, clinical claims, certifications, partnerships, statistics, pricing, or legal promises
- Deployment unless the user separately authorizes it

## 3. Visual authority

Use the supplied design in this priority order:

1. Executable/source implementation, if supplied
2. Design file/export with inspectable properties
3. Full-resolution desktop and mobile screenshots
4. User-written behavior and content rules

If artifacts conflict, preserve the latest explicit user instruction and document the interpretation.

The implementation should extract maintainable tokens and components, but visual refactoring must not become a redesign.

## 4. Content boundary

Preserve approved wording. Do not strengthen medical claims.

Safe product framing includes:

- Continuity of care
- Verified health information
- Document grounding
- Plain-language understanding
- Organization, reminders, and longitudinal tracking
- Evidence-first and safety-conscious assistance

Do not present the product as diagnosing disease, prescribing medication, replacing clinicians, guaranteeing health outcomes, or providing emergency treatment.

If CTA destinations are not yet implemented, use behavior approved by the user. Do not create a fake registration flow or collect health information through a marketing form.

## 5. Component boundary

Prefer section-level components when the design supports them, for example:

```text
features/marketing/
|-- components/
|   |-- public-header.tsx
|   |-- hero-section.tsx
|   |-- trust-section.tsx
|   |-- workflow-section.tsx
|   |-- feature-section.tsx
|   |-- safety-section.tsx
|   |-- final-cta-section.tsx
|   `-- public-footer.tsx
|-- landing-page.tsx
|-- landing-page.test.tsx
`-- index.ts
```

This is an example, not a demand to split every visual block into a file. Components should represent meaningful repeated behavior or maintainable sections, not arbitrary markup fragments.

## 6. Implementation requirements

### Visual fidelity

- Match layout, typography, weight, color, spacing, radius, shadow, imagery, and visual hierarchy.
- Preserve intentional whitespace and section rhythm.
- Use supplied assets; do not replace distinctive brand imagery with generic stock content.
- Avoid absolute positioning for primary document flow unless the design genuinely requires it.

### Responsive behavior

- Implement mobile-first behavior.
- Match supplied mobile references where available.
- When only desktop reference exists, preserve reading order, hierarchy, and CTA prominence on narrow screens.
- Ensure navigation, cards, logos, diagrams, and footer content do not clip or create unintended horizontal scrolling.

### Accessibility

- Use one clear page-level heading and logical nested headings.
- Provide semantic header, navigation, main, sections, and footer.
- Make all interactions keyboard accessible with visible focus.
- Give meaningful images useful alternative text; mark decorative images appropriately.
- Label icon-only controls.
- Support reduced motion.
- Use accessible menu/dialog primitives when needed.
- Do not use color alone to communicate product safety or state.

### Performance

- Optimize and size images intentionally.
- Use responsive image sources where material.
- Lazy-load below-the-fold media while protecting layout stability.
- Avoid unnecessary JavaScript for static sections.
- Keep patient-app feature bundles out of the initial marketing-page load.

### Privacy and security

- Do not collect health data on the public page.
- Do not place sensitive information in analytics or error telemetry.
- Do not add third-party trackers without explicit approval.
- Sanitize/escape any future externally managed marketing content.
- Use safe external-link behavior.

## 7. CTA and navigation contract

Before wiring actions, identify each CTA as one of:

- In-page navigation
- Public informational route
- Authentication route
- Waitlist/contact route
- External approved destination
- Non-functional design artifact requiring user direction

Never silently map a CTA to a misleading or unfinished clinical workflow. Temporary behavior must be obvious in code and documentation, not deceptive to the user.

## 8. Test checklist

- `/` renders without authentication.
- Page title and metadata are appropriate to supplied content.
- Header navigation works with mouse, keyboard, and touch.
- Mobile navigation opens, traps/manages focus correctly if modal, closes, and restores focus.
- In-page links land at a sensible scroll position.
- CTA behavior matches its approved destination.
- Images have correct alt/decorative treatment and dimensions.
- No unintended horizontal overflow at representative narrow, tablet, laptop, and wide sizes.
- Reduced-motion preference is respected.
- No severe accessibility violations from automated checks.
- No console errors or failed asset requests.
- Production build succeeds.
- Basic Playwright smoke test passes.

## 9. Visual verification

After implementation:

1. Run the production build or preview.
2. Capture representative desktop and mobile screenshots.
3. Compare them against the supplied design, not memory.
4. Check section spacing, text wrapping, image crops, fold composition, navigation, and footer.
5. Correct visible deviations unless the change is a documented accessibility/responsive necessity.

## 10. Acceptance criteria

The landing-page milestone is complete only when:

- The real supplied design is implemented at `/`.
- Desktop and mobile layouts are visually faithful and usable.
- Semantic and keyboard requirements pass review.
- Tests, lint, type checking, and production build pass.
- Assets load from repository-controlled or explicitly approved sources.
- No unapproved medical or commercial claims were introduced.
- No dashboard or backend scope was smuggled into the milestone.
- `docs/project/state.md` and feature `MKT-001` are updated with evidence of completion.

