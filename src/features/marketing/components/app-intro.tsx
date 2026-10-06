import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from '../hooks/use-prefers-reduced-motion'
import { CompanionAvatar } from './companion-avatar'

type IntroPhase = 'arriving' | 'holding' | 'leaving' | 'done'

export function AppIntro() {
  const [phase, setPhase] = useState<IntroPhase>('arriving')
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    document.body.dataset.intro = 'active'

    const holdTimer = window.setTimeout(
      () => setPhase('holding'),
      prefersReducedMotion ? 0 : 700,
    )
    const leaveTimer = window.setTimeout(
      () => setPhase('leaving'),
      prefersReducedMotion ? 650 : 2200,
    )
    const doneTimer = window.setTimeout(
      () => {
        setPhase('done')
        delete document.body.dataset.intro
      },
      prefersReducedMotion ? 850 : 2550,
    )

    return () => {
      window.clearTimeout(holdTimer)
      window.clearTimeout(leaveTimer)
      window.clearTimeout(doneTimer)
      delete document.body.dataset.intro
    }
  }, [prefersReducedMotion])

  if (phase === 'done') {
    return null
  }

  return (
    <div
      aria-label="Vein Health is loading"
      aria-live="polite"
      className="app-intro"
      data-phase={phase}
      role="status"
    >
      <span aria-hidden="true" className="app-intro__halo" />
      <div className="app-intro__stage">
        <CompanionAvatar className="app-intro__companion" />
        <strong className="app-intro__name">Vein Health</strong>
        <span className="app-intro__message">Your care, made clearer.</span>
        <span aria-hidden="true" className="app-intro__progress"><i /></span>
      </div>
    </div>
  )
}
