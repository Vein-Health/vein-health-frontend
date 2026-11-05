import { useState } from 'react'
import type { RefObject } from 'react'

interface CompanionAvatarProps {
  className?: string
  containerRef?: RefObject<HTMLDivElement | null>
}

export function CompanionAvatar({ className = '', containerRef }: CompanionAvatarProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <span
      aria-hidden="true"
      className={`companion-avatar ${className}`}
      data-loaded={isLoaded ? 'true' : 'false'}
      ref={containerRef}
    >
      <img
        alt=""
        decoding="async"
        height="1375"
        onLoad={() => setIsLoaded(true)}
        src="/assets/landing/vee-companion-full.jpeg"
        width="1156"
      />
    </span>
  )
}
