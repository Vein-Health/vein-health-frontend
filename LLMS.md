# Vein Health frontend context

Last updated: 2026-10-02

This is the standalone patient-web repository. Its sibling `../backend` is a separate Git repository and deployable boundary. Do not place backend code in this repository or import source directly across repositories.

Vein Health helps patients verify, understand, organize, and follow information from post-consultation documents. It does not autonomously diagnose, prescribe, or change treatment.

The core journey is: upload -> extract -> verify -> organize -> explain -> create actions -> track over time. Verification is a hard safety boundary: medication schedules and reminders may originate only from verified structured fields. Missing clinical fields stay missing, source evidence wins, deterministic safety rules override model output, and every future health fact retains provenance.

The frontend stack is React 19.2, TypeScript, Vite, TanStack Router/Query/Form/Table, Zod, Radix/shadcn foundations, Tailwind CSS, Vitest, Testing Library, MSW, and Playwright. Query owns server data, Router owns URL state, Form plus Zod owns validated form state, and browser-persistent PHI is prohibited.

Phase 0 is complete. The landing references have been audited but not implemented. Do not invent the authenticated dashboard or implement backend, OCR, AI, medication, reminder, or clinical workflows without explicit scope.

Read `docs/frontend/landing-page-audit.md` before public-page work and `docs/project/state.md` for the current milestone.
