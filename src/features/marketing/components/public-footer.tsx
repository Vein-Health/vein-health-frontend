import type { ReactNode } from 'react'

import { navigationItems } from '../data'
import { BrandMark } from './brand-mark'

const legalLinks = [
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/cookies', label: 'Cookies' },
  { to: '/refund', label: 'Refund Policy' },
  { to: '/support', label: 'Support' },
] as const

function AppleStoreMark() {
  return (
    <svg aria-hidden="true" className="store-badge__mark" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53-1.71-2.47-3.02-7.02-1.27-10.08.87-1.52 2.44-2.48 4.13-2.51 1.29-.02 2.53.87 3.31.87s2.24-1.07 3.78-.91c.64.03 2.44.26 3.59 1.77-.11.07-2.15 1.26-2.12 3.76.03 2.99 2.62 3.98 2.65 3.99-.03.07-.41 1.39-1.32 3.14ZM13 3.5C13.73 2.67 14.94 2.04 16 2c.14 1.17-.34 2.35-1.04 3.19-.69.85-1.84 1.51-2.96 1.42-.16-1.15.41-2.35 1-3.11Z" fill="currentColor" />
    </svg>
  )
}

function GooglePlayMark() {
  return (
    <svg aria-hidden="true" className="store-badge__mark" viewBox="0 0 32 36">
      <path d="M2 2.7 18.8 18 2 33.3c-.7-.8-1-1.9-1-3V5.7c0-1.1.3-2.2 1-3Z" fill="#00d2ff" />
      <path d="m18.8 18 5.1-4.7 6.1 3.5c1.4.8 1.4 1.6 0 2.4l-6.2 3.5-5-4.7Z" fill="#ffca28" />
      <path d="M2 2.7c.9-.9 2.1-1 3.4-.2l18.5 10.8-5.1 4.7L2 2.7Z" fill="#00f076" />
      <path d="m2 33.3 16.8-15.3 5 4.7L5.4 33.5c-1.3.8-2.5.7-3.4-.2Z" fill="#ff4965" />
    </svg>
  )
}

function StoreBadge({ kind, label }: { kind: 'apple' | 'google'; label: string }) {
  return (
    <span aria-disabled="true" className="store-badge store-badge--disabled" role="img">
      {kind === 'apple' ? <AppleStoreMark /> : <GooglePlayMark />}
      <span><small>COMING SOON</small><strong>{label}</strong></span>
    </span>
  )
}

export function PublicFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="public-footer">
      <div className="public-footer__download" id="download">
        <div>
          <h2>Private by design</h2>
          <p>Your information is protected. We do not sell your health data, and you control what you share.</p>
        </div>
        <div aria-label="Vein Health app downloads" className="store-badges">
          <StoreBadge kind="apple" label="App Store" />
          <StoreBadge kind="google" label="Google Play" />
        </div>
      </div>

      <div className="public-footer__content">
        <div className="public-footer__brand">
          <a aria-label="Vein Health home" className="brand-lockup" href="/">
            <BrandMark size={40} />
            <span>Vein Health</span>
          </a>
          <p>Your health companion.</p>
        </div>

        <FooterColumn title="Explore">
          {navigationItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </FooterColumn>
        <FooterColumn title="Support">
          <a href="/#medications">Medications</a>
          <a href="/#medications">Reminders</a>
          <a href="/support">Contact / Support</a>
          <a href="mailto:support@veinhealth.co">support@veinhealth.co</a>
        </FooterColumn>
        <FooterColumn title="Connect">
          <a href="https://www.instagram.com/" rel="noreferrer" target="_blank">Instagram</a>
          <a href="https://www.linkedin.com/" rel="noreferrer" target="_blank">LinkedIn</a>
          <a href="https://x.com/" rel="noreferrer" target="_blank">X (Twitter)</a>
        </FooterColumn>
      </div>

      <div className="public-footer__bottom">
        <div>
          <p>© {currentYear} Vein Health</p>
          <p>Vein Health helps people understand and organize health information; it does not replace professional medical care.</p>
        </div>
        <nav aria-label="Legal information" className="public-footer__legal">
          {legalLinks.map((item) => <a href={item.to} key={item.to}>{item.label}</a>)}
        </nav>
      </div>
    </footer>
  )
}

function FooterColumn({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="public-footer__column">
      <h3>{title}</h3>
      {children}
    </div>
  )
}
