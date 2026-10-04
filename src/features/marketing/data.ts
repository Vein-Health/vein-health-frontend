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
    mascotCloud: 'Start with the source.',
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
    mascotCloud: 'Clear words after a careful check.',
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
          'Schedules originate only from complete, verified prescription fields—never a guessed dose.',
        visual: 'routine',
      },
    ],
  },
  {
    id: 'reminders-and-journal',
    mascotCloud: 'Small reminders. Less to remember.',
    cards: [
      {
        id: 'smart-reminders',
        number: '05',
        eyebrow: 'STAY ON TOP',
        title: 'Care reminders',
        description:
          'Dose, follow-up, and lab reminders remain connected to verified care information.',
        visual: 'reminders',
      },
      {
        id: 'symptom-journal',
        number: '06',
        eyebrow: 'TRACK',
        title: 'Symptom & side-effect journal',
        description:
          'A simple check-in helps patients prepare their own observations for a future appointment.',
        visual: 'journal',
      },
    ],
  },
  {
    id: 'timeline-and-safety',
    mascotCloud: 'Your history tells the story.',
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
          'Deterministic safety rules surface an appropriate escalation path without offering a diagnosis.',
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
      'Understand your documents and keep a simple, verified care record.',
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
      'A fuller continuity-of-care experience for ongoing treatment and tracking.',
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
          'Vein Health helps you keep the health information you receive after an appointment in one place. It turns documents into details you can check, explains verified information in clearer words, and helps you remember the next step. It does not diagnose or choose treatment.',
      },
      {
        id: 'how-to-upload',
        question: 'How do I upload documents?',
        answer:
          'Choose Upload document, take a clear photo or select a PDF, then compare each detected detail with the original document. Anything unclear stays marked for review instead of being quietly guessed.',
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
          'Vein Health is designed to encrypt health information, limit who can access it, and keep a record of important access and changes. Health documents must not be placed in browser storage, advertising systems, URLs, or ordinary logs. No online service can promise zero risk, so security and deletion controls must be tested before launch.',
      },
      {
        id: 'data-sharing',
        question: 'Does Vein Health share my data with anyone?',
        answer:
          'Vein Health will not sell health information or use it for advertising. A trusted service provider may process only the information needed to run a feature. Sharing a care record with a clinician or family member must be your deliberate choice and must show who will receive it.',
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
          'No. It helps you keep track of what happened after a visit and prepare better questions. A doctor or pharmacist is still the right person to diagnose, prescribe, explain a change, or answer a concern about your treatment.',
      },
      {
        id: 'diagnose-prescribe',
        question: 'Can Vein Health diagnose or prescribe?',
        answer:
          'No. It cannot diagnose you, write a prescription, change a dose, or fill in a missing instruction. Medicine details must come from a source you can check, such as a prescription, and must be verified before they can support a reminder or schedule.',
      },
      {
        id: 'ai-wrong',
        question: 'What if the AI gets something wrong?',
        answer:
          'AI can misread a document or give an incomplete explanation. Vein Health keeps the original source close, marks uncertain details, and requires important medication information to be checked. If the source and the AI disagree, the source wins.',
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
          'The planned Starter price is $7.99 a month and Pro is $19.99 a month. The yearly option shown above applies a 15% saving. Final currency, taxes, included usage, and renewal details will appear before any payment is accepted.',
      },
      {
        id: 'cancellation',
        question: 'Can I cancel anytime?',
        answer:
          'Yes. You will be able to cancel before the next renewal. Checkout will show the renewal date, what happens to access after cancellation, and any refund terms before you pay.',
      },
    ],
  },
]
