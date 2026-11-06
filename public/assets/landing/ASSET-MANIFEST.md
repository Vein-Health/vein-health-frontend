# Landing asset provenance

These runtime assets were copied into the frontend repository on 2026-11-01 from the approved design drop and canonical mobile branding source. Raw reference files remain untouched in their source directories.

| Runtime file | Source | Use |
|---|---|---|
| `hero-family.webp` | Final approved hero source supplied on 2026-11-04 | Bright hero visual behind semantic DOM heading and CTA; no baked Meet Vee card |
| `scan-documents.webp` | Approved document-scanning visual from the design drop | Document-scanning section visual |
| `review-verify.webp` | Approved review visual from the design drop | Review-and-verify section visual |
| `understand-organized.webp` | Approved explanation visual from the design drop | Understand-and-stay-organized section visual |
| `share-with-doctor.webp` | Approved BEAT visual from the design drop | BEAT controlled-sharing visual |
| `vee-bold.webp` | Canonical head-only owl from the mobile branding source | Canonical owl for the header, section marks, favicon, and preload screen |
| `vein-health-favicon-192.png` | 192px transparent derivative of the canonical head-only owl | Google-compatible square favicon and Apple touch icon |
| `vee-companion-full.webp` | Transparent-background derivative of the supplied companion reference | Non-blocking section companion guide only; not used as the header mark or intro loader |
| `phone-flow-full.webp` | Stitched full-height visual from the approved screenshot sequence | Full two-phone scan-to-understand bridge visual; capture chrome and disclaimer excluded |
| `medication-schedule-reference.webp` | Approved medication schedule product-preview visual | Medication schedule product-preview visual; capture chrome excluded |
| `health-timeline-reference.webp` | Approved health timeline product-preview visual | Health timeline product-preview visual; capture chrome excluded |
| `safety-reference.webp` | Approved safety guidance product-preview visual | Safety guidance product-preview visual; capture chrome excluded |

The hero uses a clean image with semantic DOM text and controls, so the page does not depend on baked-in copy or the old Meet Vee card. Store links currently open official store searches until final app listing IDs are supplied.

## Local optimization test

On 2026-11-06, same-resolution `.webp` runtime assets were generated from the approved source images. The landing page now serves WebP directly with no runtime fallback image set. The WebP assets preserve RGBA transparency; `vee-bold.webp` remains lossless to protect the approved owl edges and transparent background.

The `phone-flow-full.webp` file is assembled from the supplied approved screenshot sequence so the complete phone illustration is visible. The raw reference files remain untouched in their source directories.
