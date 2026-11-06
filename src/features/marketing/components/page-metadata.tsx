import { useEffect } from 'react'

interface PageMetadataProps {
  description: string
  path: string
  title: string
}

export function PageMetadata({ description, path, title }: PageMetadataProps) {
  useEffect(() => {
    document.title = title

    let descriptionElement = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!descriptionElement) {
      descriptionElement = document.createElement('meta')
      descriptionElement.name = 'description'
      document.head.append(descriptionElement)
    }
    descriptionElement.content = description

    let canonicalElement = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonicalElement) {
      canonicalElement = document.createElement('link')
      canonicalElement.rel = 'canonical'
      document.head.append(canonicalElement)
    }
    canonicalElement.href = `https://veinhealth.co${path}`
  }, [description, path, title])

  return null
}
