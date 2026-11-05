import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { navigationItems } from '../data'
import { BrandMark } from './brand-mark'

export function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className="public-header"
      data-menu-open={isMenuOpen ? 'true' : 'false'}
      data-scrolled={isScrolled ? 'true' : 'false'}
    >
      <div className="public-header__bar">
          <a aria-label="Vein Health home" className="brand-lockup" data-companion-origin href="/" onClick={closeMenu}>
          <BrandMark eager size={31} />
          <span>Vein Health</span>
        </a>

        <nav aria-label="Primary navigation" className="public-header__desktop-nav">
          {navigationItems.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="public-header__actions">
          <a className="public-header__waitlist" href="/waitlist">Join waitlist</a>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="public-header__menu-button"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="public-header__mobile-nav"
        hidden={!isMenuOpen}
        id="mobile-navigation"
      >
        {navigationItems.map((item) => (
          <a href={item.href} key={item.href} onClick={closeMenu}>{item.label}</a>
        ))}
        <a className="public-header__mobile-waitlist" href="/waitlist" onClick={closeMenu}>
          Join waitlist
        </a>
      </nav>
    </header>
  )
}
