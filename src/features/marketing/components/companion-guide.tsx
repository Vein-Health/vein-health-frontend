import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import { usePrefersReducedMotion } from '../hooks/use-prefers-reduced-motion'
import type { MascotState } from '../types'
import { CompanionAvatar } from './companion-avatar'

interface CompanionMessage {
  cloud: string
  state: MascotState
}

const firstMessage: CompanionMessage = {
  cloud: 'Let\u2019s start with your original health document.',
  state: 'intro',
}

function getClosestVisibleMarker(markers: readonly HTMLElement[]) {
  const viewportAnchor = window.innerHeight * 0.52

  return markers
    .map((marker) => {
      const host = marker.closest<HTMLElement>('article') ?? marker.closest<HTMLElement>('section')
      const hostRect = host?.getBoundingClientRect()
      const markerRect = marker.getBoundingClientRect()
      const isHostVisible = Boolean(
        hostRect && hostRect.bottom > window.innerHeight * 0.12 && hostRect.top < window.innerHeight * 0.88,
      )

      return {
        distance: Math.abs((hostRect?.top ?? markerRect.top) - viewportAnchor),
        isHostVisible,
        marker,
      }
    })
    .filter((candidate) => candidate.isHostVisible)
    .sort((a, b) => a.distance - b.distance)[0]?.marker
}

export function CompanionGuide() {
  const [message, setMessage] = useState<CompanionMessage>(firstMessage)
  const [isCloudOpen, setIsCloudOpen] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const guideRef = useRef<HTMLElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const [arrivalSequence, setArrivalSequence] = useState(0)
  const [hasLanded, setHasLanded] = useState(false)
  const idleTimerRef = useRef<number | null>(null)
  const landingTimerRef = useRef<number | null>(null)
  const firstArrivalRef = useRef(true)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const markers = Array.from(
      document.querySelectorAll<HTMLElement>('[data-companion-waypoint]'),
    )

    if (markers.length === 0) {
      return
    }

    const settleAtSection = () => {
      const viewportAnchor = window.innerHeight * 0.52
      const isInsideQuietZone = ['.hero', '.pricing', '.closing'].some((selector) => {
        const zone = document.querySelector<HTMLElement>(selector)
        const rect = zone?.getBoundingClientRect()
        return Boolean(rect && rect.top <= viewportAnchor && rect.bottom >= viewportAnchor)
      })

      if (isInsideQuietZone) {
        setIsVisible(false)
        return
      }

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
      setHasLanded(prefersReducedMotion)
      setIsVisible(true)
      setArrivalSequence((sequence) => sequence + 1)
    }

    const onScroll = () => {
      flushSync(() => {
        setIsVisible(false)
        setHasLanded(false)
      })
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current)
      }
      idleTimerRef.current = window.setTimeout(settleAtSection, 700)
    }

    settleAtSection()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', settleAtSection)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', settleAtSection)
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current)
      }
      if (landingTimerRef.current !== null) {
        window.clearTimeout(landingTimerRef.current)
      }
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!isVisible || arrivalSequence === 0) {
      return
    }

    if (prefersReducedMotion) {
      landingTimerRef.current = window.setTimeout(() => setHasLanded(true), 0)
      return () => {
        if (landingTimerRef.current !== null) {
          window.clearTimeout(landingTimerRef.current)
        }
      }
    }

    const guide = guideRef.current
    const button = guide?.querySelector<HTMLElement>('.companion-guide__button')
    const origin = document.querySelector<HTMLElement>('[data-companion-origin] .brand-mark')

    if (!guide || !button) {
      return
    }

    const guideRect = guide.getBoundingClientRect()
    const originRect = origin?.getBoundingClientRect()
    const startsAtLogo = firstArrivalRef.current && originRect
    const offsetX = startsAtLogo
      ? originRect.left + originRect.width / 2 - (guideRect.left + guideRect.width / 2)
      : message.state === 'upload' || message.state === 'understand' ? -72 : 72
    const offsetY = startsAtLogo
      ? originRect.top + originRect.height / 2 - (guideRect.top + guideRect.height / 2)
      : -118
    const duration = startsAtLogo ? 1250 : 980

    firstArrivalRef.current = false
    button.getAnimations().forEach((animation) => animation.cancel())
    button.animate(
      [
        { transform: `translate(${offsetX}px, ${offsetY}px) rotate(-7deg) scale(.72)` },
        { offset: 0.52, transform: 'translate(0, -28px) rotate(3deg) scale(.97)' },
        { offset: 0.68, transform: 'translate(0, 12px) rotate(0) scaleX(1.13) scaleY(.82)' },
        { offset: 0.82, transform: 'translate(0, -24px) rotate(-2deg) scaleX(.96) scaleY(1.07)' },
        { offset: 0.93, transform: 'translate(0, 5px) rotate(1deg) scaleX(1.04) scaleY(.96)' },
        { transform: 'translate(0, 0) rotate(0) scale(1)' },
      ],
      { duration, easing: 'cubic-bezier(.2,.76,.24,1)', fill: 'both' },
    )

    if (landingTimerRef.current !== null) {
      window.clearTimeout(landingTimerRef.current)
    }
    landingTimerRef.current = window.setTimeout(() => setHasLanded(true), duration - 120)
  }, [arrivalSequence, isVisible, message.state, prefersReducedMotion])

  return (
    <aside
      className="companion-guide"
      data-cloud-open={isCloudOpen ? 'true' : 'false'}
      data-landed={hasLanded ? 'true' : 'false'}
      data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
      data-state={message.state}
      data-visible={isVisible ? 'true' : 'false'}
      aria-hidden={!isVisible}
      ref={guideRef}
    >
      <button
        aria-label={`Vein Health companion: ${message.cloud}`}
        className="companion-guide__button"
        onClick={() => setIsCloudOpen((open) => !open)}
        tabIndex={isVisible ? 0 : -1}
        type="button"
      >
        <span className="companion-guide__cloud">
          <svg aria-hidden="true" className="companion-guide__cloud-shape" preserveAspectRatio="none" viewBox="0 0 240 112">
            <path d="M46 99C21 99 6 84 6 64c0-18 13-32 33-35C47 12 63 3 82 7c10-5 23-7 35-4 15 3 27 13 33 26 8-7 19-11 31-9 19 3 31 17 31 34 14 5 22 17 22 31 0 18-15 27-35 27H46Z" />
          </svg>
          <span className="companion-guide__cloud-text">{message.cloud}</span>
          <span aria-hidden="true" className="companion-guide__cloud-trail"><i /><i /></span>
        </span>
        <CompanionAvatar
          className="companion-guide__avatar"
          containerRef={avatarRef}
        />
      </button>
    </aside>
  )
}
