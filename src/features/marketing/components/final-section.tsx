import { navigationItems } from '../data'
import { BrandMark } from './mascot-moment'

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/privacy#information', label: 'Health Data Policy' },
  { href: '/privacy#ai', label: 'AI Safety' },
  { href: '/cookies', label: 'Cookies' },
] as const

function AppleStoreMark() {
  return (
    <svg aria-hidden="true" className="apple-store-mark" viewBox="0 0 24 24">
      <path
        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53-1.71-2.47-3.02-7.02-1.27-10.08.87-1.52 2.44-2.48 4.13-2.51 1.29-.02 2.53.87 3.31.87s2.24-1.07 3.78-.91c.64.03 2.44.26 3.59 1.77-.11.07-2.15 1.26-2.12 3.76.03 2.99 2.62 3.98 2.65 3.99-.03.07-.41 1.39-1.32 3.14ZM13 3.5C13.73 2.67 14.94 2.04 16 2c.14 1.17-.34 2.35-1.04 3.19-.69.85-1.84 1.51-2.96 1.42-.16-1.15.41-2.35 1-3.11Z"
        fill="currentColor"
      />
    </svg>
  )
}

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
                <AppleStoreMark />
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
            <span aria-label="Blog — coming soon" className="footer-link--pending">Blog</span>
          </div>
          <div>
            <h3>Support</h3>
            <a href="#features">Medications</a>
            <a href="#features">Reminders</a>
            <a href="#features">Example summary</a>
            <span aria-label="Contact — coming soon" className="footer-link--pending">Contact</span>
          </div>
          <div>
            <h3>Connect</h3>
            <span aria-label="Instagram — profile coming soon" className="footer-link--pending">Instagram</span>
            <span aria-label="LinkedIn — profile coming soon" className="footer-link--pending">LinkedIn</span>
            <span aria-label="X, formerly Twitter — profile coming soon" className="footer-link--pending">X (Twitter)</span>
          </div>
        </div>

        <div className="public-footer__bottom">
          <div>
            <p>© {currentYear} Vein Health</p>
            <p className="public-footer__disclaimer">
              Vein Health supports continuity of care. It does not diagnose,
              prescribe, change treatment, or replace a clinician. In an
              emergency, contact your local emergency service.
            </p>
          </div>
          <nav aria-label="Legal information" className="public-footer__legal">
            {legalLinks.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
          </nav>
        </div>
      </footer>
    </section>
  )
}
