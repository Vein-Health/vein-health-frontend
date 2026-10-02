export type MascotState =
  | 'intro'
  | 'upload'
  | 'verify'
  | 'understand'
  | 'carousel'
  | 'pricing'
  | 'faq'
  | 'footer'

export type FeatureVisual =
  | 'capture'
  | 'verify'
  | 'understand'
  | 'routine'
  | 'reminders'
  | 'journal'
  | 'timeline'
  | 'safety'

export interface NavigationItem {
  href: `#${string}`
  label: string
}

export interface FeatureCardData {
  description: string
  eyebrow: string
  id: string
  number: string
  title: string
  visual: FeatureVisual
}

export interface FeatureCarouselState {
  cards: readonly [FeatureCardData, FeatureCardData]
  id: string
  mascotCloud: string
}

export interface PricingPlan {
  annualDiscountBasisPoints: number
  description: string
  features: readonly string[]
  id: string
  monthlyCents: number
  name: string
  popular?: boolean
}

export interface FaqItem {
  answer: string
  id: string
  question: string
}

export interface FaqGroup {
  category: string
  items: readonly FaqItem[]
}

