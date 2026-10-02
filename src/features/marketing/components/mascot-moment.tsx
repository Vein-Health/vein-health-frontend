import type { CSSProperties } from 'react'

import type { MascotState } from '../types'
import { useInView } from '../hooks/use-in-view'
import { usePrefersReducedMotion } from '../hooks/use-prefers-reduced-motion'

interface BrandMarkProps {
  eager?: boolean
  label?: string
  size?: number
}

interface MascotMomentProps {
  cloud: string
  state: MascotState
}

export function BrandMark({ eager = false, label, size = 52 }: BrandMarkProps) {
  return (
    <span
      aria-label={label}
      className={`brand-mark${eager ? ' brand-mark--intro' : ''}`}
      role={label ? 'img' : undefined}
      style={{ '--brand-mark-size': `${size}px` } as CSSProperties}
    >
      <picture>
        <source srcSet="/assets/landing/mascot.webp" type="image/webp" />
        <img
          alt=""
          height="52"
          src="/assets/landing/mascot.png"
          width="52"
        />
      </picture>
      <span aria-hidden="true" className="brand-mark__eyelids" />
    </span>
  )
}

export function MascotMoment({ cloud, state }: MascotMomentProps) {
  const { isInView, ref } = useInView<HTMLDivElement>()
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      className="mascot-moment"
      data-active={isInView ? 'true' : 'false'}
      data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
      data-state={state}
      ref={ref}
    >
      <span className="mascot-moment__cloud">{cloud}</span>
      <BrandMark label="Vein Health companion" size={64} />
    </div>
  )
}
