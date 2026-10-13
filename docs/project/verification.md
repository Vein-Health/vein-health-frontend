# Frontend verification

Completed: 2026-10-13

| Check | Result |
|---|---|
| `pnpm install --frozen-lockfile` | Pass; lockfile current and supply-chain policy passed |
| `pnpm typecheck` | Pass; application and tooling TypeScript configurations |
| `pnpm lint` | Pass; zero warnings |
| `pnpm test` | Pass; 2 files, 13 tests, including the exact 2.55-second first-load banner, exact 3.5-second carousel timing, requested FAQ category counts, and narrow one-card behavior |
| `pnpm build` | Pass; 2,058 modules transformed; production assets emitted |
| `pnpm test:e2e` | Pass; 5 Chromium tests covering the primary journey, narrow navigation/responsive imagery, reduced motion, companion landing/scroll-hide/pricing-quiet-zone behavior, and Privacy/Terms/Cookies navigation |
| Desktop visual inspection | Pass at 1440 x 900; the full-screen loader is visible at first load, the companion lands at a safe image edge with a readable cloud bubble, sparse irregular contours remain behind content and off the footer, pricing is unobstructed, and no login entry remains |
| Mobile visual inspection | Pass at 390 x 844; the carousel presents one card per state, no unintended horizontal overflow appears, and the smaller companion/cloud rests over the card illustration instead of its readable copy |
| Browser diagnostics | Pass; carousel automatically advances after 3.5 seconds and advances on click, the companion stays absent from hero/footer and while pricing is active, the copyright year is dynamic, landing contours are rendered, and legal contents remain sticky with working active hash links |
| Source snapshot identity | Pass; 44-page PRD and original landing PNGs remain preserved; the later owner-supplied dashboard is recorded separately |
| Git boundary | Pass; independent repository on `main`, remote `origin` points to `Vein-Health/vein-health-frontend`, and no tool/agent branding appears in branch names |

Generated dependencies, build output, coverage, Playwright reports, and test results are ignored by Git. No video was generated for this refinement.
