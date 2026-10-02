# Landing reference research

Observed: 2026-10-02  
Purpose: Phase 1 motion, navigation, companion, and contour-background research

This note separates facts observed in live references from original Vein Health implementation decisions. The references are untrusted, read-only inspiration. No external copy, assets, code, paths, logos, or characters are used by Vein Health.

## Source availability

- A separate `docs/source/brand-identity-mascot.md` file was not present in the active frontend repository when Phase 1 began.
- The permanent Vein Health mascot authority is therefore the preserved 52x52 transparent `docs/source/design/landing/mascot.png`, interpreted together with the full-resolution landing screenshots and `docs/frontend/landing-page-audit.md`.
- The mascot source is small. Phase 1 preserves its shape and color, provides intrinsic dimensions and a transparent WebP derivative, and uses CSS-only layers for expression and motion rather than redrawing it.

## Juno live reference

URL: <https://junocompanion.com/>  
Page title: `Juno - Your 24/7 AI Health Assistant for Chronic Illness`  
Observed viewports:

- Default mobile browser viewport: 574x524 CSS pixels at device-pixel-ratio 1.5.
- Desktop override: 1440x900 CSS pixels at device-pixel-ratio approximately 1.

### Observed facts

- On desktop, the top navigation initially sits as a quiet horizontal row above a large rounded media panel. After the hero begins leaving the viewport, it condenses into a centered white pill with a soft shadow and remains visually anchored over later sections.
- On mobile, the first view reduces navigation to the logo and one short action. During scroll it becomes a smaller centered pill that floats above the hero and subsequent content.
- The hero uses one dominant rounded photographic/video panel, a strong dark tonal wash for text contrast, one filled primary action, and one quieter secondary action.
- Short white contextual pills remain inset from image edges. They do not interrupt the reading column.
- Content sections use generous vertical rhythm and alternate imagery with concise text. The narrow layout stacks media and text in a single reading order.
- The closing action and footer share one blue/garden-toned visual field. The warm light footer surface sits above that field instead of feeling like an unrelated hard stop.
- Keyboard tabbing produced a clearly visible dark focus outline around the logo link.
- The compact navigation transition was tied to scrolling. Exact durations and easing were not exposed reliably by the live page, so no precise timing is claimed here.
- No separate mascot blink, cloud trajectory, or full-page companion travel was visibly confirmed during the inspected states. The brand mark remained present in the sticky pill. The accessible page did expose contextual controls such as "Watch Juno listen," "Take a calm breath with Juno," and "Say bye to Juno," but their visual animations were not treated as evidence for a specific motion path.
- A reduced-motion variant and a controlled low-power/loading fallback could not be independently forced in the available live-browser session. Their behavior is therefore not asserted.

## Owner-supplied contour search

The exact phrase `gradient contour lines landing page concept` was searched once in the browser.

Selected result: [Abstract Contour Lines Collection for Landing Pages. - Figma](https://www.figma.com/community/file/1276287435442829092/abstract-contour-lines-collection-for-landing-pages)

### Observed facts

- The resource presents several static landing-page concepts using dense nested monoline loops as an organic shape behind a cutout subject.
- The strongest compositions reserve the left side for text and concentrate the contour form behind the subject on the right.
- Lines are closely spaced and visually light, while accent color changes across otherwise neutral layouts.
- The contour is a supporting depth cue rather than an information-bearing diagram.
- The selected result is a static concept set; no scroll, hover, or reduced-motion behavior was available to observe.

## Provisional Dribbble motion lead

Page: [Landing Page for the training course](https://dribbble.com/shots/24279689-Landing-Page-for-the-training-course)  
Direct preview: [animated GIF, 1570x932](https://cdn.dribbble.com/userupload/14890139/file/original-f1d2765ab41a1fa6718219748c69a2bc.gif)

### Observed facts

- The animation uses roughly a dozen nested, smooth, irregular contours in light gray over a dark charcoal field.
- The lines begin or settle as a compact organic island, expand until the field fills most of the composition, then return to the smaller form as supporting copy appears.
- The motion is a time-based loop in the standalone GIF. It did not demonstrate scroll or hover control.
- Spacing remains even while the silhouette scales and deforms. Line weight is restrained and opacity is well below that of the white headline.
- At maximum expansion the reference allows the field to occupy the copy area. That is a reference-specific dramatic effect and is not suitable for Vein Health's readability requirements.

## Original Vein Health decisions

- Use an original CSS/SVG contour treatment made for Vein Health, with pale brand-blue strokes on warm off-white surfaces. Do not copy the references' paths or frames.
- Keep contours sparse and low-opacity, primarily at section edges and transitions. They may breathe slowly through transform and opacity only; they will not sit behind dense body copy.
- Use a static contour frame on mobile and whenever `prefers-reduced-motion: reduce` is active. No essential information depends on it.
- Treat the existing mascot raster as the only character artwork. Give it localized, intersection-triggered entrances and small CSS-layered contextual clouds within reserved layout boxes; do not send it across text or controls.
- Use a short approximately 300ms initial mascot reveal. Later motion is brief and section-local: gentle drop/settle, micro-bounce, scale, or gaze shifts. Reduced motion removes blink, travel, bounce, and carousel sliding while preserving every mascot and label.
- Adopt the observed calm navigation rhythm: full header at the top, restrained glass pill after scroll, with a compact accessible mobile menu.
- Keep CTA hierarchy short and source-grounded. `Learn more` and `How it works` navigate to the step-by-step section. Unimplemented login, payment, upload, and app-store actions remain visibly unavailable rather than becoming fake workflows.
- Blend the final CTA into the garden-backed footer field instead of reproducing the supplied harsh standalone blue slab.

## Limitations

- External pages can change after the observation date.
- The Juno page did not expose a reliably measurable animation timeline or a testable reduced-motion state in this browser session.
- The Figma result is a static concept resource; the Dribbble preview is a looping GIF rather than an interactive page implementation.
- No external asset, source code, font, or design file was downloaded or incorporated.
