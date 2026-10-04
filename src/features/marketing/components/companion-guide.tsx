import { useEffect, useRef, useState } from 'react'

import { usePrefersReducedMotion } from '../hooks/use-prefers-reduced-motion'
import type { MascotState } from '../types'
import { CompanionAvatar } from './companion-avatar'

interface CompanionMessage {
  cloud: string
  state: MascotState
}

const firstMessage: CompanionMessage = {
  cloud: 'One clear step at a time.',
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
        distance: Math.abs(markerRect.top - viewportAnchor),
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
  const firstArrivalRef = useRef(false)
  const idleTimerRef = useRef<number | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const markers = Array.from(
      document.querySelectorAll<HTMLElement>('[data-companion-waypoint]'),
    )

    if (markers.length === 0) {
      return
    }

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
    }

    const onScroll = () => {
      setIsVisible(false)
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current)
      }
      idleTimerRef.current = window.setTimeout(settleAtSection, 190)
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
    }
  }, [])

  useEffect(() => {
    if (!isVisible || firstArrivalRef.current) {
      return
    }

    firstArrivalRef.current = true

    if (prefersReducedMotion) {
      return
    }

    const guide = guideRef.current
    const origin = document.querySelector<HTMLElement>('[data-companion-origin] .brand-mark')

    if (!guide || !origin) {
      return
    }

    const guideRect = guide.getBoundingClientRect()
    const originRect = origin.getBoundingClientRect()
    const offsetX = originRect.left + originRect.width / 2 - (guideRect.left + guideRect.width / 2)
    const offsetY = originRect.top + originRect.height / 2 - (guideRect.top + guideRect.height / 2)

    guide.animate(
      [
        { opacity: 0, transform: `translate(${offsetX}px, ${offsetY}px) scale(.22)` },
        { opacity: 1, offset: 0.58, transform: `translate(${offsetX * 0.42}px, ${offsetY * 0.42 - 34}px) scale(.68)` },
        { opacity: 1, offset: 0.86, transform: 'translate(0, 6px) scale(1.02)' },
        { opacity: 1, transform: 'translate(0, 0) scale(1)' },
      ],
      { duration: 760, easing: 'cubic-bezier(.22,.82,.28,1)' },
    )
  }, [isVisible, prefersReducedMotion])

  return (
    <aside
      className="companion-guide"
      data-cloud-open={isCloudOpen ? 'true' : 'false'}
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
        <span className="companion-guide__cloud">{message.cloud}</span>
        <CompanionAvatar
          className="companion-guide__avatar"
          containerRef={avatarRef}
        />
      </button>
    </aside>
  )
}
