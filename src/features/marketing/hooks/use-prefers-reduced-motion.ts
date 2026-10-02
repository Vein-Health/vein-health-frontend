import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function readPreference() {
  return typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function'
    ? window.matchMedia(QUERY).matches
    : false
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(readPreference)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return undefined
    }

    const media = window.matchMedia(QUERY)
    const updatePreference = () => setPrefersReducedMotion(media.matches)

    updatePreference()
    media.addEventListener('change', updatePreference)

    return () => media.removeEventListener('change', updatePreference)
  }, [])

  return prefersReducedMotion
}

