import { useEffect, useRef, useState } from 'react'

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return undefined
    }

    if (typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-8% 0px -8% 0px', threshold: 0.15 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { isInView, ref }
}
