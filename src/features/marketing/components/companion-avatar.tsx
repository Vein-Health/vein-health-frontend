import { useState } from 'react'
import type { RefObject } from 'react'

interface CompanionAvatarProps {
  className?: string
  containerRef?: RefObject<HTMLDivElement | null>
  label?: string
}

export function CompanionAvatar({
  className = '',
  containerRef,
  label,
}: CompanionAvatarProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      aria-label={label}
      className={`companion-avatar ${className}`}
      data-loaded={isLoaded ? 'true' : 'false'}
      ref={containerRef}
      role={label ? 'img' : undefined}
    >
      <img
        alt=""
        decoding="async"
        height="1374"
        onLoad={() => setIsLoaded(true)}
        src="/assets/landing/vein-companion-calm.png"
        width="1374"
      />
    </div>
  )
}
