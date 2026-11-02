export interface NavigationItem {
  href: string
  label: string
}

export interface FaqItem {
  answer: string
  id: string
  question: string
}

export type ReferenceAccordionItem = FaqItem
