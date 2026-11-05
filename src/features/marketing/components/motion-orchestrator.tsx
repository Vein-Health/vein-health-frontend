import { useEffect } from 'react'

import { usePrefersReducedMotion } from '../hooks/use-prefers-reduced-motion'

const revealSelector = [
  '.landing-section__heading',
  '.split-section',
  '.reference-preview',
  '.feature-overview__row',
  '.feature-record-preview',
  '.section-lede',
  '.preview-disclaimer',
  '.preview-note',
  '.beat-section__media',
  '.beat-section__note',
  '.faq-list__item',
  '.closing-cta',
  '.public-footer',
  '.waitlist-card',
].join(',')

export function MotionOrchestrator() {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector))

    elements.forEach((element, index) => {
      element.classList.add('reveal-item')
      element.style.setProperty('--reveal-order', String(index % 3))
    })

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach((element) => { element.dataset.revealed = 'true' })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).dataset.revealed = 'true'
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -4% 0px', threshold: 0.08 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  return null
}
