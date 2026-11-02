import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from '../hooks/use-prefers-reduced-motion'
import { BrandMark } from './brand-mark'

export function AppIntro() {
  const [isDone, setIsDone] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    document.body.dataset.intro = 'active'
    const timer = window.setTimeout(
      () => {
        setIsDone(true)
        delete document.body.dataset.intro
      },
      prefersReducedMotion ? 220 : 900,
    )

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
    </div>
  )
}
