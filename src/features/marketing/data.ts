import type {
  FaqGroup,
  FeatureCarouselState,
  NavigationItem,
  PricingPlan,
} from './types'

export const navigationItems: readonly NavigationItem[] = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export const featureCarouselStates: readonly FeatureCarouselState[] = [
  {
    id: 'capture-and-verify',
    mascotCloud: 'From source to review',
    cards: [
      {
        id: 'document-scanning',
        number: '01',
        eyebrow: 'CAPTURE',
        title: 'Document scanning',
        description:
          'Photograph or select a prescription, lab result, or discharge note without retyping every line.',
        visual: 'capture',
      },
      {
        id: 'extraction-verification',
        number: '02',
        eyebrow: 'VERIFY',
        title: 'AI extraction & verification',
        description:
          'Candidate fields stay tied to the original document so uncertain details can be reviewed before use.',
        visual: 'verify',
      },
    ],
  },
  {
    id: 'understand-and-routine',
    mascotCloud: 'Clarity after confirmation',
    cards: [
      {
        id: 'plain-language',
        number: '03',
        eyebrow: 'UNDERSTAND',
        title: 'Plain-language explanations',
        description:
          'Verified information can be explained in clearer language while keeping the source close at hand.',
        visual: 'understand',
      },
      {
        id: 'medication-schedules',
        number: '04',
        eyebrow: 'ROUTINE',
        title: 'Medication schedules',
        description:
          'Planned schedules originate only from complete, verified prescription fields - never a guessed dose.',
        visual: 'routine',
      },
    ],
  },
  {
    id: 'reminders-and-journal',
    mascotCloud: 'Care, kept in view',
    cards: [
      {
        id: 'smart-reminders',
        number: '05',
        eyebrow: 'STAY ON TOP',
        title: 'Care reminders',
        description:
          'Planned dose, follow-up, and lab reminders remain connected to verified care information.',
        visual: 'reminders',
      },
      {
        id: 'symptom-journal',
        number: '06',
        eyebrow: 'TRACK',
        title: 'Symptom & side-effect journal',
        description:
          'A simple planned check-in can help patients prepare observations for a future appointment.',
        visual: 'journal',
      },
    ],
  },
  {
    id: 'timeline-and-safety',
    mascotCloud: 'Context, not guesswork',
    cards: [
      {
        id: 'health-timeline',
        number: '07',
        eyebrow: 'RECORD',
        title: 'Health timeline',
        description:
          'Documents, verified facts, observations, and care actions can form one provenance-aware chronology.',
        visual: 'timeline',
      },
      {
        id: 'safety-escalation',
        number: '08',
        eyebrow: 'SAFETY',
        title: 'Safety escalation',
        description:
          'Planned deterministic safety rules surface an appropriate escalation path without offering a diagnosis.',
        visual: 'safety',
      },
    ],
  },
]

export const pricingPlans: readonly PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description:
      'A design preview for understanding documents and keeping a simple care record.',
    monthlyCents: 799,
    annualDiscountBasisPoints: 1500,
    features: [
      'Up to 10 documents a month',
      'Extraction review and verification',
      'Plain-language explanations',
      'Basic verified schedule view',
      'Health timeline',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description:
      'A design preview for a fuller continuity-of-care experience.',
    monthlyCents: 1999,
    annualDiscountBasisPoints: 1500,
    popular: true,
    features: [
      'Everything in Starter',
      'Expanded document allowance',
      'Verified schedules and reminders',
      'Symptom and side-effect journal',
      'Export and share summaries',
      'Priority support direction',
    ],
  },
]

export const faqGroups: readonly FaqGroup[] = [
  {
    category: 'Getting started',
    items: [
      {
        id: 'what-is-vein-health',
        question: 'What is Vein Health?',
        answer:
          'Vein Health is planned continuity-of-care software for organizing, verifying, and understanding information from post-consultation documents. It is not a diagnosis or treatment service.',
      },
      {
        id: 'how-to-upload',
        question: 'How do I upload documents?',
        answer:
          'Document upload is not available on this public page. It belongs to a later authenticated product phase with consent, file validation, and privacy controls.',
      },
    ],
  },
  {
    category: 'Privacy & security',
    items: [
      {
        id: 'data-protection',
        question: 'Is my data protected?',
        answer:
          'This public page does not collect health documents or health details. Production security, storage, retention, and provider controls must be approved before the patient product launches.',
      },
      {
        id: 'data-sharing',
        question: 'Does Vein Health share my data with anyone?',
        answer:
          'No health data is collected or shared by this landing page. Future sharing features require explicit patient authorization and approved backend controls.',
      },
    ],
  },
  {
    category: 'Clinical',
    items: [
      {
        id: 'replace-doctor',
        question: 'Does Vein Health replace my doctor?',
        answer:
          'No. Vein Health is intended to help patients continue and understand care after a consultation, not replace a clinician or pharmacist.',
      },
      {
        id: 'diagnose-prescribe',
        question: 'Can Vein Health diagnose or prescribe?',
        answer:
          'No. Vein Health does not diagnose, prescribe, or change treatment. Medication facts must come from verified source information.',
      },
    ],
  },
  {
    category: 'Pricing',
    items: [
      {
        id: 'pricing-status',
        question: 'How much does Vein Health cost?',
        answer:
          'The amounts shown above reproduce the supplied design direction for review. Launch pricing, currency, taxes, limits, and eligibility are not yet approved.',
      },
      {
        id: 'cancellation',
        question: 'Can I cancel anytime?',
        answer:
          'Billing is not available yet, so cancellation and refund terms have not been set. Approved commercial terms will be published before checkout exists.',
      },
    ],
  },
]

