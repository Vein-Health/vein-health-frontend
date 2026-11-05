import { useEffect, useRef, useState } from 'react'

import { usePrefersReducedMotion } from '../hooks/use-prefers-reduced-motion'
import type { MascotState } from '../types'
import { CompanionAvatar } from './companion-avatar'

interface CompanionMessage {
  cloud: string
  state: MascotState
}

const firstMessage: CompanionMessage = {
  cloud: 'I’ll help you make sense of each step.',
  state: 'intro',
}

function getClosestVisibleMarker(markers: readonly HTMLElement[]) {
  const viewportAnchor = window.innerHeight * 0.52

  return markers
    .map((marker) => {
      const host = marker.closest<HTMLElement>('section')
      const rect = host?.getBoundingClientRect()
      const isVisible = Boolean(rect && rect.bottom > window.innerHeight * 0.12 && rect.top < window.innerHeight * 0.88)

      return {
        distance: Math.abs((rect?.top ?? marker.getBoundingClientRect().top) - viewportAnchor),
        isVisible,
        marker,
      }
    })
    .filter((candidate) => candidate.isVisible)
    .sort((a, b) => a.distance - b.distance)[0]?.marker
}

export function CompanionGuide() {
  const [message, setMessage] = useState<CompanionMessage>(firstMessage)
  const [isCloudOpen, setIsCloudOpen] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [arrivalSequence, setArrivalSequence] = useState(0)
  const guideRef = useRef<HTMLElement>(null)
  const activeMarkerRef = useRef<HTMLElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const dismissTimerRef = useRef<number | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const markers = Array.from(document.querySelectorAll<HTMLElement>('[data-companion-waypoint]'))

    if (markers.length === 0) return

    const settleAtSection = () => {
      const selected = getClosestVisibleMarker(markers)

      if (selected === activeMarkerRef.current) {
        return
      }

      activeMarkerRef.current = selected ?? null

      if (!selected) {
        setIsVisible(false)
        return
      }

      setMessage({
        cloud: selected.dataset.companionCloud ?? firstMessage.cloud,
        state: (selected.dataset.companionState ?? firstMessage.state) as MascotState,
      })
      setIsCloudOpen(true)
      setIsVisible(true)
      setArrivalSequence((sequence) => sequence + 1)

      if (dismissTimerRef.current !== null) window.clearTimeout(dismissTimerRef.current)
      dismissTimerRef.current = window.setTimeout(() => setIsVisible(false), 3200)
    }

    const scheduleSettle = () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null
        settleAtSection()
      })
    }

    settleAtSection()
    window.addEventListener('scroll', scheduleSettle, { passive: true })
    window.addEventListener('resize', scheduleSettle)

    return () => {
      window.removeEventListener('scroll', scheduleSettle)
      window.removeEventListener('resize', scheduleSettle)
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
      if (dismissTimerRef.current !== null) window.clearTimeout(dismissTimerRef.current)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!isVisible || arrivalSequence === 0 || prefersReducedMotion) return

    const button = guideRef.current?.querySelector<HTMLElement>('.companion-guide__button')
    if (!button) return

    button.getAnimations().forEach((animation) => animation.cancel())
    button.animate(
      [
        { transform: 'translate3d(0, -14px, 0) scale(.94)' },
        { offset: 0.58, transform: 'translate3d(0, 4px, 0) scale(1.02)' },
        { transform: 'translate3d(0, 0, 0) scale(1)' },
      ],
      { duration: 520, easing: 'cubic-bezier(.2,.8,.25,1)', fill: 'both' },
    )
  }, [arrivalSequence, isVisible, message.state, prefersReducedMotion])

  return (
    <aside
      aria-hidden={!isVisible}
      className="companion-guide"
      data-cloud-open={isCloudOpen ? 'true' : 'false'}
      data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
      data-state={message.state}
      data-visible={isVisible ? 'true' : 'false'}
      ref={guideRef}
    >
      <button
        aria-label={`Vee, your health companion: ${message.cloud}`}
        className="companion-guide__button"
        onClick={() => setIsCloudOpen((open) => !open)}
        tabIndex={isVisible ? 0 : -1}
        type="button"
      >
        <span className="companion-guide__cloud">
          <svg aria-hidden="true" className="companion-guide__cloud-shape" preserveAspectRatio="none" viewBox="0 0 240 112">
            <path d="M28 84C12 79 6 68 11 56c4-10 15-17 28-18C37 26 48 16 62 16c7-8 18-12 29-7 9-9 22-14 35-9 12-7 28-4 36 8 8-4 17-3 24 2 8 5 12 12 13 21 15 2 26 12 27 25 2 13-8 24-22 28-7 2-13 2-19 1-7-1-11 5-18 8-11 5-18-3-28-2-11 1-16 9-27 9-12 0-16-8-27-9-10-1-16 7-27 4-8-2-11-10-19-11-5 0-9 0-11-1Z" />
          </svg>
          <span className="companion-guide__cloud-text">{message.cloud}</span>
          <span aria-hidden="true" className="companion-guide__cloud-trail"><i /><i /></span>
        </span>
        <CompanionAvatar className="companion-guide__avatar" />
      </button>
    </aside>
  )
}
