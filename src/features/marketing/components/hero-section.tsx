import {
  ArrowDown,
  CheckCircle2,
  HeartHandshake,
  ScanLine,
  ShieldCheck,
} from 'lucide-react'

import { ContourField } from './contour-field'

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
        <ContourField className="hero__contours" />
        <div className="hero__content">
          <p className="eyebrow eyebrow--light">Your AI continuity-of-care companion</p>
          <h1 id="hero-heading">
            Your AI companion{' '}
            <span>for clearer care.</span>
          </h1>
          <p className="hero__lede">
            Vein Health helps you verify health documents, understand the
            details, and keep your care organized between visits.
          </p>
          <div className="button-row">
            <a className="button button--primary" href="#how-it-works">
              See how it works
              <ArrowDown aria-hidden="true" size={18} />
            </a>
            <a className="button button--glass" href="#how-it-works">
              Learn more
            </a>
          </div>
          <p className="hero__status">Public preview - no document upload on this page</p>
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
