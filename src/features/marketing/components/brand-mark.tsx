import type { CSSProperties } from 'react'

interface BrandMarkProps {
  eager?: boolean
  label?: string
  size?: number
}

export function BrandMark({ eager = false, label, size = 36 }: BrandMarkProps) {
  return (
    <span
      aria-label={label}
      className={`brand-mark${eager ? ' brand-mark--eager' : ''}`}
      role={label ? 'img' : undefined}
      style={{ '--brand-mark-size': `${size}px` } as CSSProperties}
    >
      <img
        alt=""
        decoding="async"
        height={size}
        src="/assets/landing/vee-bold.png"
        width={size}
      />
    </span>
  )
}
