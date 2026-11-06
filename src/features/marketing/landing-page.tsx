import { faqItems } from './data'
import { AppIntro } from './components/app-intro'
import { ContourField } from './components/contour-field'
import { CompanionGuide } from './components/companion-guide'
import { MotionOrchestrator } from './components/motion-orchestrator'
import { PublicFooter } from './components/public-footer'
import { PublicHeader } from './components/public-header'
import { ReferenceAccordion } from './components/reference-accordion'

const scanQuestions = [
  {
    id: 'documents',
    question: 'What documents can I upload?',
    answer: 'Start with a clear photo or supported file of a prescription, lab result, or health document. The original remains the source you check against.',
  },
  {
    id: 'extraction-accuracy',
    question: 'How accurate is the extraction?',
    answer: 'Extraction produces candidate details for you to review. Unclear fields stay marked for attention and nothing is treated as confirmed until you check it.',
  },
] as const

const reviewQuestions = [
  {
    id: 'wrong-detail',
    question: 'What happens if something is wrong?',
    answer: 'The detail stays marked for review. Compare it with the source, correct it, reject it, or use a clearer document before it supports anything important.',
  },
  {
    id: 'invent-data',
    question: 'Does Vein Health ever invent data?',
    answer: 'No. Missing details stay missing until they are found in a trusted source and checked. Vein Health does not fill in a dose, route, frequency, duration, or date by guessing.',
  },
] as const

const understandQuestions = [
  {
    id: 'lab-explanations',
    question: 'Can Vee explain my lab results?',
    answer: 'Vee can explain selected results in clearer language and point out topics to discuss with your doctor. An explanation is educational context, not a diagnosis.',
  },
  {
    id: 'result-questions',
    question: 'Can I ask questions about my results?',
    answer: 'The planned experience lets you ask about the information in a record while keeping the source visible. Questions about care decisions still belong with a qualified professional.',
  },
] as const

export function LandingPage() {
  return (
    <div className="landing-page" id="top">
      <ContourField />
      <AppIntro />
      <MotionOrchestrator />
      <PublicHeader />

      <main id="main-content">
        <HeroSection />
        <HowItWorksSection />
        <ReviewSection />
        <UnderstandSection />
        <ProductBridgeSection />
        <FeatureOverviewSection />
        <MedicationSection />
        <TimelineSection />
        <SafetySection />
        <BeatSection />
        <FaqSection />
        <ClosingCta />
      </main>

      <CompanionGuide />
      <PublicFooter />
    </div>
  )
}

function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="hero-section">
      <figure className="hero-art">
        <OptimizedImage
          alt="A family sharing a warm moment in a flower-filled meadow"
          height={941}
          loading="eager"
          src="/assets/landing/hero-family.png"
          width={1672}
        />
        <div className="hero-copy">
          <h1 id="hero-heading">Understanding your health shouldn't feel impossible.</h1>
          <p>Scan prescriptions and lab results, understand what they mean, and keep your health organized in one place.</p>
          <div className="hero-actions">
            <a className="button button--primary" href="/waitlist">Join waitlist</a>
          </div>
        </div>
      </figure>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section aria-labelledby="how-it-works-heading" className="landing-section" id="how-it-works">
      <CompanionWaypoint cloud="Let’s start with the original document." state="upload" />
      <SectionHeader id="how-it-works-heading" title="How Vein Health works" />
      <p className="section-lede">Upload your health information, review the details, and get clear explanations that help you stay organized.</p>
      <div className="split-section split-section--scan">
        <ReferenceMedia alt="A woman photographing a health document with her phone" src="/assets/landing/scan-documents.png" />
        <div className="split-section__copy">
          <SectionTitle title="Scan your health documents" />
          <p>Take a photo or upload a prescription, lab result, or health document. Vee pulls out the important details for you.</p>
          <ReferenceAccordion items={scanQuestions} />
        </div>
      </div>
    </section>
  )
}

function ReviewSection() {
  return (
    <section aria-labelledby="review-heading" className="landing-section landing-section--tight">
      <CompanionWaypoint cloud="Check the details before they become part of your record." state="verify" />
      <div className="split-section split-section--review">
        <div className="split-section__copy">
          <SectionTitle id="review-heading" title="Review and verify" />
          <p>See what Vee found and check anything that needs your attention. Nothing is saved until you confirm it.</p>
          <ReferenceAccordion items={reviewQuestions} />
        </div>
        <ReferenceMedia alt="A man reviewing health information on his phone" src="/assets/landing/review-verify.png" />
      </div>
    </section>
  )
}

function UnderstandSection() {
  return (
    <section aria-labelledby="understand-heading" className="landing-section landing-section--tight">
      <CompanionWaypoint cloud="Clear explanations can make the next conversation easier." state="understand" />
      <div className="split-section split-section--understand">
        <ReferenceMedia alt="A person reviewing a lab report beside a phone explanation preview" src="/assets/landing/understand-organized.png" />
        <div className="split-section__copy">
          <SectionTitle id="understand-heading" title="Understand and stay organized" />
          <p>Upload your health documents and get clear, easy-to-understand explanations of your results. Vee highlights important findings, explains what they mean, and helps you know what to discuss with your doctor.</p>
          <ReferenceAccordion items={understandQuestions} />
        </div>
      </div>
    </section>
  )
}

function ProductBridgeSection() {
  return (
    <section aria-labelledby="features-heading" className="landing-section landing-section--centered feature-section" id="product-preview">
      <CompanionWaypoint cloud="Scan it, understand it, keep it organized." state="carousel" />
      <SectionHeader centered id="features-heading" title="Feel more in control of your health" />
      <p className="section-lede">Scan it. Understand it. Keep it organized.</p>
      <ReferencePreview
        alt="Approved sample visual showing a lab report scanned on one phone and explained on another"
        className="reference-preview--phones"
        height={882}
        src="/assets/landing/phone-flow-full.png"
        width={1220}
      />
      <p className="preview-disclaimer">Sample product preview. Vein Health explains your records. It does not diagnose or treat.</p>
    </section>
  )
}

function FeatureOverviewSection() {
  return (
    <section aria-labelledby="features-overview-heading" className="landing-section landing-section--centered feature-section feature-overview" id="features">
      <CompanionWaypoint cloud="Everything important can stay together in one place." state="carousel" />
      <p className="eyebrow eyebrow--pill">Features</p>
      <SectionHeader centered id="features-overview-heading" title="Everything you need, in one place" />
      <p className="section-lede">Understand your health, remember what matters, and keep track of it without the stress.</p>
      <div className="feature-overview__row">
        <div className="split-section__copy">
          <SectionTitle title="Understand your health records" />
          <p>Keep prescriptions, lab results, medical records, and other health information together. Vee helps explain what they mean in plain language.</p>
        </div>
        <FeatureRecordsPreview />
      </div>
    </section>
  )
}

function FeatureRecordsPreview() {
  return (
    <div aria-label="Illustrative product preview showing a record being checked and explained" className="feature-record-preview">
      <div className="feature-record-preview__stack">
        <div className="feature-record-preview__card feature-record-preview__card--upload">
          <span className="feature-record-preview__icon">□</span>
          <span><strong>Prescription uploaded</strong><small>Illustrative sample · Oct 12</small></span>
          <b>Verified</b>
        </div>
        <span aria-hidden="true" className="feature-record-preview__arrow">↓</span>
        <div className="feature-record-preview__card feature-record-preview__card--found">
          <small>VEE FOUND</small>
          <span><strong>Panadol</strong><b>500mg</b></span>
          <span><strong>Frequency</strong><em>Twice daily</em></span>
          <span><strong>Duration</strong><em>30 days</em></span>
        </div>
        <span aria-hidden="true" className="feature-record-preview__arrow">↓</span>
        <div className="feature-record-preview__card feature-record-preview__card--explanation">
          <strong>● Vee</strong>
          <span>Illustrative explanation from a verified record. Always check the original source.</span>
        </div>
      </div>
    </div>
  )
}

function MedicationSection() {
  return (
    <section aria-labelledby="medications-heading" className="landing-section landing-section--tight feature-section" id="medications">
      <CompanionWaypoint cloud="A simple schedule helps you keep the routine visible." state="understand" />
      <div className="split-section split-section--medications">
        <ReferencePreview
          alt="Approved sample medication schedule visual"
          className="reference-preview--schedule"
          height={810}
          src="/assets/landing/medication-schedule-reference.png"
          width={1020}
        />
        <div className="split-section__copy">
          <SectionTitle id="medications-heading" title="Stay on top of your medications" />
          <p>Know what to take and when to take it. Use your medication tracker, medication schedule, pill reminders, and refill reminders to stay on track.</p>
          <span className="preview-note">Illustrative product-preview demonstration — not a user’s medication data.</span>
        </div>
      </div>
    </section>
  )
}

function TimelineSection() {
  return (
    <section aria-labelledby="timeline-heading" className="landing-section landing-section--tight feature-section">
      <CompanionWaypoint cloud="Your health story is easier to follow when it is together." state="carousel" />
      <div className="split-section split-section--timeline">
        <div className="split-section__copy">
          <SectionTitle id="timeline-heading" title="See your health journey clearly" />
          <p>Your health records, medications, symptoms, notes, and important updates come together in one simple timeline. When you need it, create a doctor-ready health report or medical summary.</p>
        </div>
        <ReferencePreview
          alt="Approved sample health timeline visual"
          className="reference-preview--timeline"
          height={800}
          src="/assets/landing/health-timeline-reference.png"
          width={1030}
        />
      </div>
    </section>
  )
}

function SafetySection() {
  return (
    <section aria-labelledby="safety-heading" className="landing-section landing-section--tight feature-section">
      <CompanionWaypoint cloud="If something needs attention, I’ll help make the next step clearer." state="verify" />
      <div className="split-section split-section--safety">
        <ReferencePreview
          alt="Approved sample safety guidance visual"
          className="reference-preview--safety"
          height={760}
          src="/assets/landing/safety-reference.png"
          width={1030}
        />
        <div className="split-section__copy">
          <SectionTitle id="safety-heading" title="Know when something needs attention" />
          <p>If something you add may need urgent care, Vein gives you clear guidance on what to do next. Vein does not diagnose or replace your doctor.</p>
        </div>
      </div>
    </section>
  )
}

function BeatSection() {
  return (
    <section aria-labelledby="beat-heading" className="landing-section landing-section--centered beat-section" id="beat">
      <CompanionWaypoint cloud="You choose what to share and can change that choice." state="understand" />
      <p className="eyebrow eyebrow--pill">BEAT</p>
      <SectionHeader id="beat-heading" title="Share your health information with someone you trust." />
      <p className="section-lede">Choose what they can see. Stay connected without explaining everything.</p>
      <div className="beat-section__media">
        <OptimizedImage alt="BEAT demonstration showing selected health items shared with a trusted person" height={1086} loading="lazy" src="/assets/landing/share-with-doctor.png" width={1448} />
      </div>
      <p className="beat-section__note">You choose the items shared. Sharing is controlled and revocable; a full account is not copied automatically.</p>
    </section>
  )
}

function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="landing-section landing-section--faq" id="faq">
      <CompanionWaypoint cloud="Let’s clear up the common questions." state="faq" />
      <SectionHeader centered id="faq-heading" title="Common questions" />
      <div className="faq-list">
        {faqItems.map((item) => <FaqRow item={item} key={item.id} />)}
      </div>
    </section>
  )
}

function FaqRow({ item }: { item: (typeof faqItems)[number] }) {
  return (
    <div className="faq-list__item">
      <ReferenceAccordion items={[item]} />
    </div>
  )
}

function ClosingCta() {
  return (
    <section aria-labelledby="closing-heading" className="closing-cta">
      <h2 id="closing-heading">Your health, easier to understand.</h2>
      <p>Scan your health information, stay organized, and keep track of what matters.</p>
      <a className="button button--primary" href="/waitlist">Join waitlist</a>
      <span>Start with <strong>3 days free.</strong></span>
    </section>
  )
}

function SectionHeader({ centered = false, id, title }: { centered?: boolean; id: string; title: string }) {
  return (
    <div className={`landing-section__heading${centered ? ' landing-section__heading--centered' : ''}`}>
      <h2 id={id}>{title}</h2>
    </div>
  )
}

function SectionTitle({ id, title }: { id?: string; title: string }) {
  return <h3 id={id}>{title}</h3>
}

function CompanionWaypoint({ cloud, state }: { cloud: string; state: import('./types').MascotState }) {
  return <span aria-hidden="true" className="companion-waypoint" data-companion-cloud={cloud} data-companion-state={state} data-companion-waypoint />
}

function ReferenceMedia({ alt, src }: { alt: string; src: string }) {
  return (
    <figure className="reference-media">
      <OptimizedImage alt={alt} height={1040} loading="lazy" src={src} width={1014} />
    </figure>
  )
}

function ReferencePreview({ alt, className, height, src, width }: { alt: string; className: string; height: number; src: string; width: number }) {
  return (
    <figure className={`reference-preview ${className}`}>
      <OptimizedImage alt={alt} height={height} loading="lazy" src={src} width={width} />
    </figure>
  )
}

function OptimizedImage({ alt, height, loading, src, width }: { alt: string; height: number; loading: 'eager' | 'lazy'; src: string; width: number }) {
  const webpSrc = src.replace(/\.png$/i, '.webp')

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img alt={alt} decoding="async" height={height} loading={loading} src={src} width={width} />
    </picture>
  )
}
