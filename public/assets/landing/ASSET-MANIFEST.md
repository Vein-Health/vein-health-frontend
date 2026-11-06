# Landing asset provenance

These runtime assets were copied into the frontend repository on 2026-11-01 from the approved design drop and canonical mobile branding source. Raw reference files remain untouched in their source directories.

| Runtime file | Source | Use |
|---|---|---|
| `hero-family.png` | `C:\Users\Divergent\Downloads\hero-family.png` supplied as the final approved hero source on 2026-11-04 | Bright hero visual behind semantic DOM heading and CTA; no baked Meet Vee card |
| `scan-documents.png` | `C:\Users\Divergent\Documents\AI_LOCKIN\MVP\new\image assets\2.png` | Document-scanning section visual |
| `review-verify.png` | `C:\Users\Divergent\Documents\AI_LOCKIN\MVP\new\image assets\3.png` | Review-and-verify section visual |
| `understand-organized.png` | `C:\Users\Divergent\Documents\AI_LOCKIN\MVP\new\image assets\4.png` | Understand-and-stay-organized section visual |
| `share-with-doctor.png` | `C:\Users\Divergent\Documents\AI_LOCKIN\MVP\new\image assets\SHARE WITH YOUR DOCTOR.png` | BEAT controlled-sharing visual |
| `vee-bold.png` | `C:\VH\mobile\assets\branding\vee-bold.png` | Canonical head-only owl for the header, section marks, and preload screen |
| `vee-companion-full.png` | Transparent-background derivative of `C:\Users\Divergent\Downloads\WhatsApp Image 2026-11-04 at 17.46.35.jpeg`, preserving the supplied full-body owl on 2026-11-05 | Non-blocking section companion guide only; not used as the header mark or intro loader |
| `phone-flow-full.png` | Stitched full-height visual from adjacent approved captures `Screenshot 2026-11-01 175340.png` and `Screenshot 2026-11-01 175355.png` | Full two-phone scan-to-understand bridge visual; capture chrome and disclaimer excluded |
| `medication-schedule-reference.png` | Clean crop from `C:\Users\Divergent\Documents\AI_LOCKIN\MVP\new\reference\Screenshot 2026-11-01 175431.png` | Approved medication schedule product-preview visual; capture chrome excluded |
| `health-timeline-reference.png` | Clean crop from `C:\Users\Divergent\Documents\AI_LOCKIN\MVP\new\reference\Screenshot 2026-11-01 175450.png` | Approved health timeline product-preview visual; capture chrome excluded |
| `safety-reference.png` | Clean crop from `C:\Users\Divergent\Documents\AI_LOCKIN\MVP\new\reference\Screenshot 2026-11-01 175505.png` | Approved safety guidance product-preview visual; capture chrome excluded |

The hero uses a clean image with semantic DOM text and controls, so the page does not depend on baked-in copy or the old Meet Vee card. Store links currently open official store searches until final app listing IDs are supplied.

## Local optimization test

On 2026-11-06, same-resolution `.webp` copies were generated beside the approved PNG sources using `scripts/optimize-landing-images.py`. The landing page prefers WebP through `<picture>` with the original PNG as a fallback. The PNGs are intentionally retained during visual review so this change can be reverted without recovering source assets. The WebP copies preserve RGBA transparency; `vee-bold.webp` remains lossless to protect the approved owl edges and transparent background.

The `phone-flow-full.png` file is assembled from the supplied approved screenshot sequence so the complete phone illustration is visible. The raw screenshots in `new\reference` remain untouched.
