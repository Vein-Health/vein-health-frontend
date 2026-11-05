export interface NavigationItem {
  href: string
  label: string
}

export type MascotState = 'intro' | 'upload' | 'verify' | 'understand' | 'carousel' | 'faq' | 'footer'

export interface FaqItem {
  answer: string
  id: string
  question: string
}

export type ReferenceAccordionItem = FaqItem
