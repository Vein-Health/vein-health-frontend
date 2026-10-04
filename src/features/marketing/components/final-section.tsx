import { Apple } from 'lucide-react'

import { navigationItems } from '../data'
import { BrandMark } from './mascot-moment'

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/cookies', label: 'Cookies' },
] as const

function GooglePlayMark() {
  return (
    <svg aria-hidden="true" className="google-play-mark" viewBox="0 0 32 36">
      <path d="M2 2.7 18.8 18 2 33.3c-.7-.8-1-1.9-1-3V5.7c0-1.1.3-2.2 1-3Z" fill="#00d2ff" />
      <path d="m18.8 18 5.1-4.7 6.1 3.5c1.4.8 1.4 1.6 0 2.4l-6.2 3.5-5-4.7Z" fill="#ffca28" />
      <path d="M2 2.7c.9-.9 2.1-1 3.4-.2l18.5 10.8-5.1 4.7L2 2.7Z" fill="#00f076" />
      <path d="m2 33.3 16.8-15.3 5 4.7L5.4 33.5c-1.3.8-2.5.7-3.4-.2Z" fill="#ff4965" />
    </svg>
  )
}

export function FinalSection() {
  const currentYear = new Date().getFullYear()

  return (
    <section aria-label="Vein Health closing information" className="closing">
      <picture className="closing__background">
        <source srcSet="/assets/landing/footer-garden-1600.webp" type="image/webp" />
        <img alt="" height="941" loading="lazy" src="/assets/landing/footer-garden.png" width="1672" />
      </picture>
      <div aria-hidden="true" className="closing__wash" />

      <footer className="public-footer">
        <div className="public-footer__top">
          <div>
            <a aria-label="Vein Health home" className="brand-lockup brand-lockup--footer" href="#top">
              <BrandMark size={44} />
              <span>Vein Health</span>
            </a>
            <h2>Your care story should stay with you.</h2>
            <p>
              Keep verified documents, plain-language explanations, and the next
              step in one calm place.
            </p>
          </div>
          <div className="store-area">
            <span className="store-area__label">Mobile apps coming soon</span>
            <div className="store-badges" aria-label="Planned Vein Health mobile applications">
              <span className="store-badge">
                <Apple aria-hidden="true" strokeWidth={2.1} />
                <span><small>COMING SOON TO THE</small><strong>App Store</strong></span>
              </span>
              <span className="store-badge">
                <GooglePlayMark />
                <span><small>COMING SOON TO</small><strong>Google Play</strong></span>
              </span>
            </div>
          </div>
        </div>

        <div className="public-footer__links">
          <div>
            <h3>Explore</h3>
            {navigationItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
          </div>
          <div>
            <h3>Support</h3>
            <a href="#how-it-works">Using documents</a>
            <a href="#features">Care tools</a>
            <a href="#faq">Common questions</a>
          </div>
          <div>
            <h3>Important</h3>
            <p>
              Vein Health supports continuity of care. It does not diagnose,
              prescribe, change treatment, or replace a clinician.
            </p>
          </div>
        </div>

        <div className="public-footer__bottom">
          <p>© {currentYear} Vein Health. In an emergency, contact your local emergency service.</p>
          <nav aria-label="Legal information" className="public-footer__legal">
            {legalLinks.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
          </nav>
        </div>
      </footer>
    </section>
  )
}
