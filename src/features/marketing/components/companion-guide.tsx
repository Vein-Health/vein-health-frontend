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
  const idleTimerRef = useRef<number | null>(null)
  const firstArrivalRef = useRef(true)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const markers = Array.from(document.querySelectorAll<HTMLElement>('[data-companion-waypoint]'))

    if (markers.length === 0) return

    const settleAtSection = () => {
      const selected = getClosestVisibleMarker(markers)

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
    }

    const onScroll = () => {
      if (idleTimerRef.current !== null) window.clearTimeout(idleTimerRef.current)
      idleTimerRef.current = window.setTimeout(settleAtSection, prefersReducedMotion ? 0 : 180)
    }

    settleAtSection()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', settleAtSection)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', settleAtSection)
      if (idleTimerRef.current !== null) window.clearTimeout(idleTimerRef.current)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!isVisible || arrivalSequence === 0 || prefersReducedMotion) return

    const button = guideRef.current?.querySelector<HTMLElement>('.companion-guide__button')
    if (!button) return

    const origin = document.querySelector<HTMLElement>('[data-companion-origin] .brand-mark')
    const guideRect = guideRef.current?.getBoundingClientRect()
    const originRect = origin?.getBoundingClientRect()
    const startsAtLogo = firstArrivalRef.current && originRect && guideRect
    const offsetX = startsAtLogo ? originRect.left + originRect.width / 2 - (guideRect.left + guideRect.width / 2) : 0
    const offsetY = startsAtLogo ? originRect.top + originRect.height / 2 - (guideRect.top + guideRect.height / 2) : -34

    firstArrivalRef.current = false
    button.getAnimations().forEach((animation) => animation.cancel())
    button.animate(
      [
        { transform: `translate(${offsetX}px, ${offsetY}px) scale(.78)` },
        { offset: 0.58, transform: 'translate(0, 8px) scale(1.04)' },
        { transform: 'translate(0, 0) scale(1)' },
      ],
      { duration: startsAtLogo ? 920 : 680, easing: 'cubic-bezier(.2,.8,.25,1)', fill: 'both' },
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
            <path d="M45 100C20 100 5 86 5 65c0-18 13-32 34-35C46 13 63 4 82 8c11-5 23-7 35-4 15 3 27 13 33 26 8-7 19-11 31-9 19 3 31 17 31 34 14 5 22 17 22 31 0 18-15 27-35 27H45Z" />
          </svg>
          <span aria-hidden="true" className="companion-guide__cloud-lobes"><i /><i /><i /></span>
          <span className="companion-guide__cloud-text">{message.cloud}</span>
          <span aria-hidden="true" className="companion-guide__cloud-trail"><i /><i /></span>
        </span>
        <CompanionAvatar className="companion-guide__avatar" />
      </button>
    </aside>
  )
}
