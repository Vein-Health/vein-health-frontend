import { useEffect, useId, useRef, useState } from 'react'

import type { ReferenceAccordionItem } from '../types'

interface ReferenceAccordionProps {
  items: readonly ReferenceAccordionItem[]
}

export function ReferenceAccordion({ items }: ReferenceAccordionProps) {
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="reference-accordion">
      {items.map((item) => {
        const isOpen = openId === item.id
        const contentId = `${baseId}-${item.id}`

        return (
          <AccordionRow
            isOpen={isOpen}
            item={item}
            key={item.id}
            onToggle={() => setOpenId(isOpen ? null : item.id)}
            contentId={contentId}
          />
        )
      })}
    </div>
  )
}

interface AccordionRowProps {
  contentId: string
  isOpen: boolean
  item: ReferenceAccordionItem
  onToggle: () => void
}

function AccordionRow({ contentId, isOpen, item, onToggle }: AccordionRowProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    content.style.height = isOpen ? `${content.scrollHeight}px` : '0px'
  }, [isOpen])

  return (
    <div className="reference-accordion__item" data-open={isOpen ? 'true' : 'false'}>
      <button
        aria-controls={contentId}
        aria-expanded={isOpen}
        className="reference-accordion__trigger"
        onClick={onToggle}
        type="button"
      >
        <span>{item.question}</span>
        <span aria-hidden="true" className="reference-accordion__icon">+</span>
      </button>
      <div
        aria-hidden={!isOpen}
        className="reference-accordion__content"
        id={contentId}
        ref={contentRef}
        role="region"
      >
        <p>{item.answer}</p>
      </div>
    </div>
  )
}
