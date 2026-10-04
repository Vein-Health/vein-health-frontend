import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react'

import { BrandMark } from './components/mascot-moment'
import { ContourField } from './components/contour-field'

interface LegalSection {
  bullets?: readonly string[]
  heading: string
  id: string
  paragraphs: readonly string[]
}

interface LegalPageProps {
  intro: string
  notice: string
  sections: readonly LegalSection[]
  title: string
}

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/cookies', label: 'Cookies' },
] as const

export function LegalPage({ intro, notice, sections, title }: LegalPageProps) {
  const currentYear = new Date().getFullYear()

  return (
    <div className="legal-page" id="top">
      <ContourField className="legal-contours legal-contours--top" />
      <ContourField className="legal-contours legal-contours--bottom" />
      <header className="legal-header">
        <a aria-label="Vein Health home" className="brand-lockup" href="/">
          <BrandMark eager size={34} />
          <span>Vein Health</span>
        </a>
        <a className="legal-header__back" href="/"><ArrowLeft aria-hidden="true" /> Back to home</a>
      </header>

      <main className="legal-main">
        <header className="legal-hero">
          <p className="eyebrow">Legal information</p>
          <h1>{title}</h1>
          <p className="legal-main__updated">Last updated October 4, 2026</p>
          <p className="legal-main__intro">{intro}</p>
          <div className="legal-notice">
            <ShieldCheck aria-hidden="true" />
            <p>{notice}</p>
          </div>
        </header>

        <div className="legal-layout">
          <aside className="legal-toc" aria-label={`${title} contents`}>
            <span>On this page</span>
            <nav>
              {sections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>
                  {section.heading}<ArrowRight aria-hidden="true" />
                </a>
              ))}
            </nav>
          </aside>

          <article className="legal-article">
            {sections.map((section, index) => (
              <section id={section.id} key={section.id}>
                <span className="legal-section-number">{String(index + 1).padStart(2, '0')}</span>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
        </div>
      </main>

      <footer className="legal-footer">
        <span>© {currentYear} Vein Health</span>
        <nav aria-label="Legal pages">
          {legalLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
        </nav>
      </footer>
    </div>
  )
}

const privacyPage = {
  title: 'Privacy Policy',
  intro: 'This policy explains what Vein Health may collect, why it is needed, how AI may process information, and the choices people have. It separates this public website from future account-based health features.',
  notice: 'Vein Health is being designed for continuity of care, not autonomous diagnosis or treatment. Source evidence and patient verification take priority over AI-generated text.',
  sections: [
    {
      id: 'scope',
      heading: 'What this policy covers',
      paragraphs: [
        'This policy covers the Vein Health public website. It also states the privacy rules that must govern planned account, document, reminder, timeline, journal, and explanation features before those features launch.',
        'The public landing page does not provide a health-document upload form and does not ask for medication details, symptoms, account credentials, or payment information. Please do not send health information through a general contact channel.',
      ],
    },
    {
      id: 'information',
      heading: 'Information we may handle',
      paragraphs: [
        'The public website may process limited technical information needed to deliver and protect the site, such as IP address, browser and device type, request time, language, and security events. This information must not be used to create a health profile.',
        'When account features launch, Vein Health may process information a person deliberately provides: account details, uploaded health documents, corrections and confirmations, reminders, patient-entered observations, sharing choices, support requests, and subscription records. A feature-specific notice will explain the exact fields before collection begins.',
      ],
      bullets: [
        'Health documents and extracted facts are sensitive information.',
        'Every structured health fact should keep a link to its source and verification status.',
        'Missing medication details stay missing until a trusted source supplies them.',
      ],
    },
    {
      id: 'purposes',
      heading: 'Why information is used',
      paragraphs: [
        'Information is used only for a clear product, safety, security, support, payment, or legal purpose. For health features, that means organizing a person’s own records, extracting candidate details for review, explaining verified information in plainer language, supporting approved reminders, and helping the person prepare for a conversation with a clinician or pharmacist.',
        'Vein Health must not sell health information, use it for behavioural advertising, or turn a private care record into a marketing profile. Sharing with a clinician, caregiver, or another recipient must follow a deliberate action that shows who will receive the information and what will be shared.',
      ],
    },
    {
      id: 'ai',
      heading: 'How AI is used — and where it can fail',
      paragraphs: [
        'AI can make false, incomplete, outdated, or biased statements. It can also sound confident when it is wrong. Optical character recognition can misread handwriting, numbers, dates, medicine names, or units. For example, confusing 0.5 mg with 5 mg can create a serious risk. An AI answer must never be treated as reliable simply because it sounds clear.',
        'Vein Health limits AI to narrow tasks. Models may help identify candidate text or explain facts that already exist, but they are not the source of truth for a medicine’s dose, frequency, route, duration, or prescription date. Source material wins when an AI response disagrees with it, and important fields must be reviewed before they can support an action.',
        'When an approved AI provider is needed, Vein Health should send only the minimum information required for that task, apply contractual and technical safeguards, and prevent private health information from being used to train a provider’s general-purpose models. AI inputs and outputs must not be copied into analytics, ordinary application logs, URLs, or advertising systems.',
      ],
      bullets: [
        'AI does not diagnose, prescribe, or change treatment.',
        'Medication actions cannot start from unverified extracted data.',
        'Deterministic emergency and safety rules cannot be overridden by a conversation.',
        'Text inside an uploaded document is treated as untrusted data, never as an instruction to the system.',
      ],
    },
    {
      id: 'sharing',
      heading: 'Providers, sharing, and transfers',
      paragraphs: [
        'Vein Health may use carefully selected service providers for secure hosting, storage, document processing, AI tasks, communications, payments, and abuse prevention. Providers should receive only what they need, act under written instructions, and protect information with safeguards appropriate to sensitive health data.',
        'Information may also be disclosed when a person directs Vein Health to share it, when required by applicable law, or when necessary to protect a person or the service from a serious and credible threat. Cross-border processing, data residency, and launch jurisdictions will be assessed before account-based health features become available, with required notices and transfer safeguards presented for the relevant region.',
      ],
    },
    {
      id: 'storage',
      heading: 'Storage, retention, and deletion',
      paragraphs: [
        'Sensitive health payloads must not be stored in localStorage, sessionStorage, IndexedDB, service-worker caches, analytics events, or browser-readable long-lived tokens. The application shell may be cached, but medical records should remain behind secure server-managed sessions.',
        'Information should be kept only while needed for the disclosed purpose, safety, legal obligations, fraud prevention, or backup recovery. Before launch, Vein Health will publish a retention schedule covering active records, deleted accounts, support data, audit events, and backups. Deletion requests must also address copies in backup systems within the stated recovery period.',
      ],
    },
    {
      id: 'security',
      heading: 'How information is protected',
      paragraphs: [
        'Planned controls include encryption in transit and at rest, short-lived access links, strict patient and tenant authorization, audit records, rate limits, monitored access, tested backups, and separation of sensitive data from logs. No security system can promise zero risk, so Vein Health must also maintain incident response and notification procedures appropriate to the applicable law.',
        'If you believe information has been exposed or an account is being misused, stop using the affected feature and contact the support or privacy channel shown in the product.',
      ],
    },
    {
      id: 'children',
      heading: 'Children and family use',
      paragraphs: [
        'The public information on this website can be read by families. Account-based features for a child require an age-appropriate experience, verified parent or guardian authority where required, and clear rules about consent, access, sharing, and deletion. Those controls must be approved before child health records are accepted.',
      ],
    },
    {
      id: 'rights',
      heading: 'Your choices and privacy rights',
      paragraphs: [
        'Depending on where you live and which service you use, you may have rights to be informed, access, correct, export, restrict, object to processing, withdraw consent, or request deletion. You may also have a right to complain to a data-protection authority. Vein Health may need to verify identity and authority before acting on a request.',
        'A request should not change a verified source document silently. Corrections should preserve an audit trail showing what changed, why it changed, and which source supports the corrected fact.',
      ],
    },
    {
      id: 'changes',
      heading: 'Policy updates and contact',
      paragraphs: [
        'This policy may change as the product, launch regions, providers, and legal requirements become final. Material changes affecting account-based health information should be explained before they take effect where required. The effective date at the top of this page will be updated whenever this policy changes.',
        'A dedicated privacy contact and the responsible legal entity will be published before Vein Health accepts account registrations or health documents.',
      ],
    },
  ],
} satisfies LegalPageProps

const termsPage = {
  title: 'Terms and Conditions',
  intro: 'These terms govern this public website and explain the boundaries of Vein Health. Account, upload, sharing, payment, and subscription features will have final service terms before they become available.',
  notice: 'Do not use Vein Health as an emergency service or as a substitute for a qualified clinician or pharmacist.',
  sections: [
    {
      id: 'purpose',
      heading: 'Purpose and clinical boundary',
      paragraphs: [
        'Vein Health is continuity-of-care software intended to help people organize, verify, and understand information after a consultation. It may help a person keep source documents, review extracted facts, prepare questions, and follow verified instructions.',
        'Vein Health is not a clinician, pharmacy, emergency service, or autonomous medical authority. It does not diagnose, prescribe, recommend a dosage change, or replace professional judgement. For urgent or life-threatening concerns, contact the appropriate local emergency service.',
      ],
    },
    {
      id: 'ai-boundary',
      heading: 'AI output is not medical advice',
      paragraphs: [
        'AI and document-reading systems can make mistakes, omit context, reproduce bias, or provide outdated information. A clear-sounding answer may still be wrong. Check important information against the original source and ask a qualified professional when something is unclear or does not match your instructions.',
        'Dose, frequency, route, duration, and prescription dates may only come from verified source information. Vein Health must not invent missing details, reconcile conflicting prescriptions automatically, or let a conversational response override a deterministic safety rule.',
      ],
    },
    {
      id: 'responsibilities',
      heading: 'Your responsibilities',
      paragraphs: [
        'Use the website lawfully and provide information you are authorized to use. Keep account credentials private when account features become available, review extracted details carefully, and do not represent an AI explanation as a clinician’s instruction.',
      ],
      bullets: [
        'Do not upload another person’s health record without lawful authority.',
        'Do not attempt to bypass access, verification, provenance, rate-limit, or safety controls.',
        'Do not submit malware, harmful code, false emergency reports, or instructions intended to manipulate document-processing systems.',
        'Do not use the service to harass, exploit, discriminate against, or impersonate another person.',
      ],
    },
    {
      id: 'content',
      heading: 'Documents and content',
      paragraphs: [
        'You keep ownership of documents and information you provide. You give Vein Health only the permission needed to process that content for the feature you choose, maintain security, support the service, and meet legal obligations.',
        'Uploaded content is treated as data, not as executable instruction text. A document cannot instruct Vein Health to reveal secrets, ignore safety rules, execute code, or access another person’s record.',
      ],
    },
    {
      id: 'plans',
      heading: 'Plans, pricing, and cancellation',
      paragraphs: [
        'Prices shown on the public website describe the intended offering and may change before checkout launches. Final currency, taxes, included usage, renewal timing, payment method, cancellation, and refund terms will be displayed before a purchase is accepted.',
        'A paid subscription should be cancellable before its next renewal. Cancellation does not automatically require immediate deletion of records; the account holder must be shown the applicable access and deletion choices.',
      ],
    },
    {
      id: 'availability',
      heading: 'Availability and product changes',
      paragraphs: [
        'Features may be improved, limited, suspended, or withdrawn for maintenance, safety, legal, security, or operational reasons. Vein Health may use a safer degraded experience when an AI or document-processing provider is unavailable.',
        'No website or AI service is guaranteed to be uninterrupted or error-free. Material changes that affect paid access or the handling of health information should be communicated as required by applicable law.',
      ],
    },
    {
      id: 'ownership',
      heading: 'Vein Health materials',
      paragraphs: [
        'The Vein Health name, design, software, illustrations, and original website content are protected by applicable intellectual-property law. You may use the public website for personal information, but may not copy, resell, reverse engineer, or misrepresent Vein Health materials except where the law allows it.',
      ],
    },
    {
      id: 'liability',
      heading: 'Responsibility and legal limits',
      paragraphs: [
        'Nothing in these terms excludes responsibility that cannot lawfully be excluded. To the extent permitted by law, Vein Health is not responsible for decisions made from information that was not verified, for use outside the stated product purpose, or for third-party services outside Vein Health’s control.',
        'Final account and subscription terms will identify the responsible legal entity, governing law, dispute process, and any region-specific consumer rights before those services launch.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to these terms',
      paragraphs: [
        'The date at the top shows when these public website terms last changed. If future changes materially affect an account or paid service, Vein Health will provide notice and, where required, a choice before the change takes effect.',
      ],
    },
  ],
} satisfies LegalPageProps

const cookiesPage = {
  title: 'Cookie Policy',
  intro: 'This policy explains cookies and similar browser technologies on the Vein Health public website, what they do, and how people can control optional uses.',
  notice: 'Browser storage must never be used to hold health documents, medication details, AI prompts, access tokens, or other sensitive health payloads.',
  sections: [
    {
      id: 'what-they-are',
      heading: 'What cookies are',
      paragraphs: [
        'Cookies are small pieces of data a website can ask a browser to store. Similar technologies include local browser storage, pixels, and device identifiers. Some are needed to deliver and secure a website; others can measure use or support advertising.',
      ],
    },
    {
      id: 'current-use',
      heading: 'What this public website uses',
      paragraphs: [
        'This public landing experience does not need advertising cookies and does not use cookies to build a health profile. Essential delivery and security technologies may be used by the website host to route traffic, prevent abuse, remember a privacy choice, or maintain a short-lived secure session.',
        'The site should work without optional analytics. If analytics is introduced, it should collect the least information necessary, avoid health-related event names and page data, and remain disabled until any consent required by law has been obtained.',
      ],
    },
    {
      id: 'categories',
      heading: 'Cookie categories',
      paragraphs: [
        'The categories below describe how Vein Health will label browser technologies if they are used. The public website will not silently move a technology into a less protective category.',
      ],
      bullets: [
        'Strictly necessary: security, traffic delivery, fraud prevention, accessibility, and consent settings.',
        'Functional: optional preferences that make the site easier to use without creating a health profile.',
        'Analytics: optional measurement of broad site performance and navigation patterns using privacy-protective settings.',
        'Advertising: not used on this public experience. Health information must never be used for targeted advertising.',
      ],
    },
    {
      id: 'health-data',
      heading: 'Health data does not belong in browser storage',
      paragraphs: [
        'The application shell may be cached so pages load reliably. Medical records must not be cached for offline use by default. Health documents, extracted facts, symptoms, medication schedules, model prompts and responses, and long-lived authentication secrets must remain outside localStorage, sessionStorage, IndexedDB, and service-worker caches.',
      ],
    },
    {
      id: 'controls',
      heading: 'Your controls',
      paragraphs: [
        'Where optional cookies are used, Vein Health will provide a clear choice to accept or reject them and a way to change that choice later. Rejecting optional cookies should not block the core public information on the site.',
        'You can also block or delete cookies in your browser. Blocking strictly necessary technologies may prevent secure sessions or parts of the site from working. Browser privacy signals will be considered in line with applicable law and the controls available in the product.',
      ],
    },
    {
      id: 'duration',
      heading: 'Duration and updates',
      paragraphs: [
        'Session technologies expire when the session ends. Persistent technologies should have a stated duration that matches their purpose and should be removed when no longer needed. This policy and any in-product cookie list will be updated when a provider, purpose, category, or duration changes.',
      ],
    },
  ],
} satisfies LegalPageProps

export function PrivacyPage() {
  return <LegalPage {...privacyPage} />
}

export function TermsPage() {
  return <LegalPage {...termsPage} />
}

export function CookiesPage() {
  return <LegalPage {...cookiesPage} />
}
