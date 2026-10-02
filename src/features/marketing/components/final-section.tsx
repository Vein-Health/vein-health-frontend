import { ArrowUpRight, Smartphone } from 'lucide-react'

import { navigationItems } from '../data'
import { ContourField } from './contour-field'
import { BrandMark, MascotMoment } from './mascot-moment'

export function FinalSection() {
  return (
    <section aria-label="Vein Health closing information" className="closing">
      <picture className="closing__background">
        <source srcSet="/assets/landing/footer-garden-1600.webp" type="image/webp" />
        <img alt="" height="941" loading="lazy" src="/assets/landing/footer-garden.png" width="1672" />
      </picture>
      <div aria-hidden="true" className="closing__wash" />
      <ContourField className="closing__contours" />

      <div className="closing-cta">
        <p className="eyebrow eyebrow--light">Start with understanding</p>
        <h2>One document. One careful step at a time.</h2>
        <p>
          See how verification, source evidence, and plain language are planned
          to work together - before any health action is created.
        </p>
        <div className="button-row">
          <a className="button button--light" href="#how-it-works">See the journey</a>
          <a className="button button--glass" href="#features">Explore features</a>
        </div>
      </div>

      <footer className="public-footer">
        <div className="public-footer__top">
          <div>
            <a aria-label="Vein Health home" className="brand-lockup brand-lockup--footer" href="#top">
              <BrandMark size={44} />
              <span>Vein Health</span>
            </a>
            <p>Verified information. Understandable care. A continuous story between visits.</p>
            <MascotMoment cloud="I’ll be here when you’re ready" state="footer" />
          </div>
          <div className="app-status">
            <Smartphone aria-hidden="true" />
            <div>
              <span>MOBILE APPS</span>
              <strong>Listings are not available yet</strong>
              <p>Store links will appear only after official release approval.</p>
            </div>
          </div>
        </div>

        <div className="public-footer__links">
          <div>
            <h3>Explore</h3>
            {navigationItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
          </div>
          <div>
            <h3>Product status</h3>
            <span>Authentication - next phase</span>
            <span>Patient workflows - planned</span>
            <span>Mobile apps - planned</span>
          </div>
          <div>
            <h3>Important boundary</h3>
            <p>
              Vein Health is a companion, not a medical device or clinician. It
              does not diagnose, prescribe, or treat.
            </p>
          </div>
        </div>

        <div className="public-footer__bottom">
          <span>© 2026 Vein Health</span>
          <span>Legal, privacy, and health-data policy pages are pending approval.</span>
          <a href="#top">Back to top <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </footer>
    </section>
  )
}
