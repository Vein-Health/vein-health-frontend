import type { ReactNode } from 'react'

import { navigationItems } from '../data'
import { BrandMark } from './brand-mark'

const legalLinks = [
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/cookies', label: 'Cookies' },
  { to: '/refund', label: 'Refund Policy' },
  { to: 'mailto:support@veinhealth.co', label: 'Support' },
] as const

export function PublicFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="public-footer">
      <div className="public-footer__waitlist" id="waitlist">
        <div>
          <h2>Be first to know</h2>
          <p>Join the waitlist for launch updates and 10% off when Vein Health launches.</p>
        </div>
        <a className="button button--primary" href="/waitlist">Join waitlist</a>
      </div>

      <div className="public-footer__content">
        <div className="public-footer__brand">
          <a aria-label="Vein Health home" className="brand-lockup" href="/">
            <BrandMark size={40} />
            <span>Vein Health</span>
          </a>
        </div>

        <FooterColumn title="Explore">
          {navigationItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </FooterColumn>
        <FooterColumn title="Connect">
          <a href="https://www.instagram.com/vein_healthai/" rel="noreferrer" target="_blank">Instagram</a>
          <a href="https://www.tiktok.com/@vein_healthai?is_from_webapp=1&amp;sender_device=pc" rel="noreferrer" target="_blank">TikTok</a>
          <a href="https://www.facebook.com/veinhealthai" rel="noreferrer" target="_blank">Facebook</a>
          <a href="https://x.com/vein_healthai" rel="noreferrer" target="_blank">X</a>
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
