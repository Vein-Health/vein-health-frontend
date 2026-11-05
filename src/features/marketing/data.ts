import type { FaqItem, NavigationItem } from './types'

export const navigationItems: readonly NavigationItem[] = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#features', label: 'Features' },
  { href: '/#beat', label: 'BEAT' },
  { href: '/#faq', label: 'FAQ' },
]

export const faqItems: readonly FaqItem[] = [
  {
    id: 'what-is-vein-health',
    question: 'What is Vein Health?',
    answer:
      'Vein Health helps you understand and organize health information from prescriptions, lab results, and other records. It keeps source information close, explains verified details in clearer words, and helps you keep track of what matters. It does not diagnose or choose treatment.',
  },
  {
    id: 'what-can-i-upload',
    question: 'What can I upload?',
    answer:
      'You can scan or upload prescriptions, lab results, and supported health documents. Vein Health presents extracted details for your review instead of treating a document-reading result as final without your confirmation.',
  },
  {
    id: 'information-protected',
    question: 'Is my information protected?',
    answer:
      'Vein Health is designed so your health information is protected and you stay in control of what you choose to share and who you share it with. Review the Privacy Policy for the public-site boundary and the safeguards that must be in place before account features launch.',
  },
  {
    id: 'understand-lab-results',
    question: 'Can Vein help me understand lab results?',
    answer:
      'Yes. Vein can explain selected lab-result information in simpler words and highlight what may be worth discussing with your doctor. It provides educational context, not a diagnosis or a treatment decision.',
  },
  {
    id: 'track-medications',
    question: 'Can I track my medications?',
    answer:
      'The planned experience includes medication tracking, schedules, pill reminders, and refill reminders. Medication details must come from verified structured information; Vein Health should never guess a missing dose, unit, route, frequency, or duration.',
  },
  {
    id: 'track-symptoms',
    question: 'Can I track symptoms?',
    answer:
      'The planned experience includes a symptom tracker and health journal so you can keep observations together over time and prepare for a conversation with a professional. Tracking symptoms does not diagnose a condition.',
  },
  {
    id: 'replace-doctor',
    question: 'Does Vein Health replace my doctor?',
    answer:
      'No. Vein Health helps you understand and organize your health information, but it does not replace professional medical care. A doctor or pharmacist remains the right person to diagnose, prescribe, or advise on treatment.',
  },
  {
    id: 'diagnose-prescribe',
    question: 'Can Vein Health diagnose or prescribe treatment?',
    answer:
      'No. Vein Health does not diagnose conditions, prescribe treatment, change a dose, or decide what care you need. If something concerns you, speak with a qualified health professional.',
  },
  {
    id: 'free-trial',
    question: 'Is there a free trial?',
    answer:
      'Yes. You can start a 3-day free trial by adding a valid payment card. Paid access begins after the trial unless you cancel beforehand; without a card, the trial cannot be activated.',
  },
  {
    id: 'cancel-anytime',
    question: 'Can I cancel anytime?',
    answer:
      'Yes. You can cancel at any time through your Google Play or App Store subscription settings. Cancel before the 3-day trial ends to avoid the first charge; after billing begins, cancellation stops the next renewal.',
  },
  {
    id: 'what-is-beat',
    question: 'What is BEAT?',
    answer:
      'BEAT lets you share selected health information with someone you trust. You choose the items, sharing is controlled and revocable, and a full account is not copied automatically.',
  },
]
