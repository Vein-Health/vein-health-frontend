import type { CSSProperties } from 'react'

import type { MascotState } from '../types'

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
    </span>
  )
}

export function MascotMoment({ cloud, state }: MascotMomentProps) {
  return (
    <span
      aria-hidden="true"
      className="companion-waypoint"
      data-companion-cloud={cloud}
      data-companion-state={state}
      data-companion-waypoint
    />
  )
}
