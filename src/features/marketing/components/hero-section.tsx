import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  ScanLine,
  ShieldCheck,
} from 'lucide-react'

const trustItems = [
  { icon: ScanLine, label: 'Source-linked information' },
  { icon: CheckCircle2, label: 'Verification before action' },
  { icon: ShieldCheck, label: 'No health data collected here' },
  { icon: HeartHandshake, label: 'A companion, not a clinician' },
] as const

export function HeroSection() {
  return (
    <>
      <section aria-labelledby="hero-heading" className="hero" id="top">
        <picture className="hero__media">
          <source
            media="(min-width: 900px)"
            srcSet="/assets/landing/hero-family-1600.webp"
            type="image/webp"
          />
          <source
            srcSet="/assets/landing/hero-family-960.webp"
            type="image/webp"
          />
          <img
            alt="A family laughing together in a sunny garden"
            fetchPriority="high"
            height="941"
            src="/assets/landing/hero-family.png"
            width="1672"
          />
        </picture>
        <div aria-hidden="true" className="hero__wash" />
        <div className="hero__content">
          <p className="eyebrow eyebrow--light">Care does not stop when the appointment ends</p>
          <h1 id="hero-heading">
            Meet your AI companion{' '}
            <span>for clearer care.</span>
          </h1>
          <p className="hero__lede">
            Upload a prescription, lab result, or discharge note. Vein Health
            helps you verify the facts, understand them in plain language, and
            keep the next step close.
          </p>
          <div className="button-row">
            <a className="button button--primary" href="#how-it-works">
              Get Started
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a className="button button--glass" href="#how-it-works">
              Learn more
            </a>
          </div>
        </div>
      </section>

      <ul aria-label="Product principles" className="trust-row">
        {trustItems.map(({ icon: Icon, label }) => (
          <li key={label}>
            <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </>
  )
}
