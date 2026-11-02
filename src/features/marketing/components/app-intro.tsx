import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from '../hooks/use-prefers-reduced-motion'
import { BrandMark } from './brand-mark'

const INTRO_DURATION_MS = 3000

export function AppIntro() {
  const [isDone, setIsDone] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    document.body.dataset.intro = 'active'
    const timer = window.setTimeout(() => {
      setIsDone(true)
      delete document.body.dataset.intro
    }, INTRO_DURATION_MS)

    return () => {
      window.clearTimeout(timer)
      delete document.body.dataset.intro
    }
  }, [prefersReducedMotion])

  if (isDone) return null

  return (
    <div aria-label="Vein Health is loading" aria-live="polite" className="app-intro" role="status">
      <BrandMark eager size={74} />
      <strong>Vein Health</strong>
      <div aria-hidden="true" className={`app-intro__loader${prefersReducedMotion ? ' app-intro__loader--static' : ''}`}>
        <span />
      </div>
    </div>
  )
}
