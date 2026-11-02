import { faqItems } from './data'
import { AppIntro } from './components/app-intro'
import { BrandMark } from './components/brand-mark'
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
      <AppIntro />
      <MotionOrchestrator />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <PublicHeader />

      <main id="main-content">
        <HeroSection />
        <HowItWorksSection />
        <ReviewSection />
        <UnderstandSection />
        <ProductBridgeSection />
        <MedicationSection />
        <TimelineSection />
        <SafetySection />
        <BeatSection />
        <FaqSection />
        <ClosingCta />
      </main>

      <PublicFooter />
    </div>
  )
}

function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="hero-section">
      <figure className="hero-art">
        <img
          alt="A family sharing a warm moment in a flower-filled meadow"
          height="1200"
          loading="eager"
          src="/assets/landing/hero.png"
          width="2138"
        />
        <h1 className="sr-only" id="hero-heading">Understanding your health shouldn't feel impossible.</h1>
        <a aria-label="Download Vein Health. Store links are coming soon." className="hero-hotspot hero-hotspot--download" href="#download">
          <span className="sr-only">Download Vein Health</span>
        </a>
        <a aria-label="See how Vein Health works" className="hero-hotspot hero-hotspot--how" href="#how-it-works">
          <span className="sr-only">See how it works</span>
        </a>
      </figure>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section aria-labelledby="how-it-works-heading" className="landing-section" id="how-it-works">
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
    <section aria-labelledby="features-heading" className="landing-section landing-section--centered" id="features">
      <SectionHeader id="features-heading" title="Feel more in control of your health" />
      <p className="section-lede">Scan it. Understand it. Keep it organized.</p>
      <ReferencePreview
        alt="Approved sample visual showing a lab report scanned on one phone and explained on another"
        className="reference-preview--phones"
        src="/assets/landing/phone-flow-reference.png"
      />
      <p className="preview-disclaimer">Sample product preview. Vein Health explains your records. It does not diagnose or treat.</p>
    </section>
  )
}

function MedicationSection() {
  return (
    <section aria-labelledby="medications-heading" className="landing-section landing-section--tight" id="medications">
      <div className="split-section split-section--medications">
        <ReferencePreview
          alt="Approved sample medication schedule visual"
          className="reference-preview--schedule"
          src="/assets/landing/medication-schedule-reference.png"
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
    <section aria-labelledby="timeline-heading" className="landing-section landing-section--tight">
      <div className="split-section split-section--timeline">
        <div className="split-section__copy">
          <SectionTitle id="timeline-heading" title="See your health journey clearly" />
          <p>Your health records, medications, symptoms, notes, and important updates come together in one simple timeline. When you need it, create a doctor-ready health report or medical summary.</p>
        </div>
        <ReferencePreview
          alt="Approved sample health timeline visual"
          className="reference-preview--timeline"
          src="/assets/landing/health-timeline-reference.png"
        />
      </div>
    </section>
  )
}

function SafetySection() {
  return (
    <section aria-labelledby="safety-heading" className="landing-section landing-section--tight">
      <div className="split-section split-section--safety">
        <ReferencePreview
          alt="Approved sample safety guidance visual"
          className="reference-preview--safety"
          src="/assets/landing/safety-reference.png"
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
      <p className="eyebrow eyebrow--pill">BEAT</p>
      <SectionHeader id="beat-heading" title="Share your health information with someone you trust." />
      <p className="section-lede">Choose what they can see. Stay connected without explaining everything.</p>
      <div className="beat-section__media">
        <img alt="BEAT demonstration showing selected health items shared with a trusted person" height="1086" src="/assets/landing/share-with-doctor.png" width="1448" />
      </div>
      <p className="beat-section__note">You choose the items shared. Sharing is controlled and revocable; a full account is not copied automatically.</p>
    </section>
  )
}

function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="landing-section landing-section--faq" id="faq">
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
      <a className="button button--primary" href="#download">Download Vein Health</a>
      <span>Start with <strong>3 days free.</strong></span>
    </section>
  )
}

function SectionHeader({ centered = false, id, title }: { centered?: boolean; id: string; title: string }) {
  return (
    <div className={`landing-section__heading${centered ? ' landing-section__heading--centered' : ''}`}>
      <h2 id={id}>{title} <BrandMark size={40} /></h2>
    </div>
  )
}

function SectionTitle({ id, title }: { id?: string; title: string }) {
  return <h3 id={id}>{title} <BrandMark size={35} /></h3>
}

function ReferenceMedia({ alt, src }: { alt: string; src: string }) {
  return (
    <figure className="reference-media">
      <img alt={alt} height="1040" loading="lazy" src={src} width="1014" />
    </figure>
  )
}

function ReferencePreview({ alt, className, src }: { alt: string; className: string; src: string }) {
  return (
    <figure className={`reference-preview ${className}`}>
      <img alt={alt} height="800" loading="lazy" src={src} width="1030" />
    </figure>
  )
}
