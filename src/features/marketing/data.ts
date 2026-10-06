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
    mascotCloud: 'A clear photo makes every detail easier to check.',
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
    mascotCloud: 'Check your instructions before setting a reminder.',
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
    mascotCloud: 'Write down how you feel to discuss with your doctor.',
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
    mascotCloud: 'If you feel seriously unwell, get medical help now.',
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
      {
        id: 'supported-documents',
        question: 'Which documents can I use?',
        answer:
          'The planned service is for common care documents such as prescriptions, lab results, and discharge notes. The upload screen will show the accepted file types and sizes before you choose a document.',
      },
      {
        id: 'unclear-photo',
        question: 'What if my photo is blurry or incomplete?',
        answer:
          'Take another photo in good light, keep the whole page inside the frame, and make sure names and numbers are readable. An unclear detail should stay marked for review instead of being guessed.',
      },
      {
        id: 'account-status',
        question: 'Do I need an account to use Vein Health?',
        answer:
          'You can read this public website without an account. Future document and care-record features will require a secure account and clear consent before health information is accepted.',
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
      {
        id: 'delete-information',
        question: 'Can I ask for my information to be deleted?',
        answer:
          'When account features launch, you will be able to request deletion. Vein Health will explain what can be removed, what must be kept for legal or security reasons, and when protected backup copies will expire.',
      },
      {
        id: 'ai-training',
        question: 'Is my health information used to train AI?',
        answer:
          'Vein Health is designed so private health information is not used to train a provider’s general-purpose AI models. Any approved AI service should receive only the minimum information needed for the task and must follow written privacy safeguards.',
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
      {
        id: 'feeling-unwell',
        question: 'What should I do if I feel unwell?',
        answer:
          'Contact a doctor, pharmacist, or other qualified health professional. If your symptoms are severe, sudden, worsening, or feel like an emergency, contact your local emergency service immediately instead of waiting for Vein Health.',
      },
      {
        id: 'change-medicine',
        question: 'Can I change my medicine after reading an explanation?',
        answer:
          'No. Do not start, stop, skip, or change a medicine or dose because of an AI explanation. Speak with the doctor or pharmacist responsible for your care before changing treatment.',
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
