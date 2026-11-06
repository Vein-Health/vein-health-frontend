import { ArrowRight, HeartPulse, ShieldCheck } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import { cookiesPage, privacyPage, refundPage, termsPage, type LegalPageContent } from './legal-content'
import { ContourField } from './components/contour-field'
import { PageMetadata } from './components/page-metadata'
import { PublicFooter } from './components/public-footer'
import { PublicHeader } from './components/public-header'

export function LegalPage({ intro, notice, path, sections, seoDescription, seoTitle, title, updated }: LegalPageContent) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '')
  const navigationTargetRef = useRef('')
  const navigationTargetReachedRef = useRef(false)

  useEffect(() => {
    let frame = 0
    const updateFromHash = () => {
      const id = window.location.hash.slice(1)
      if (sections.some((section) => section.id === id)) {
        navigationTargetRef.current = id
        navigationTargetReachedRef.current = false
        setActiveSection(id)
      }
    }
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node))

    const updateFromScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const navigationTarget = nodes.find((node) => node.id === navigationTargetRef.current)
        const targetRect = navigationTarget?.getBoundingClientRect()
        if (navigationTarget && targetRect && targetRect.top < window.innerHeight && targetRect.bottom > 0) {
          navigationTargetReachedRef.current = true
          setActiveSection(navigationTarget.id)
          return
        }
        if (navigationTarget && !navigationTargetReachedRef.current) {
          setActiveSection(navigationTarget.id)
          return
        }
        navigationTargetRef.current = ''
        navigationTargetReachedRef.current = false

        const isAtPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 32
        if (isAtPageEnd) {
          setActiveSection(nodes.at(-1)?.id ?? '')
          return
        }

        const readingLine = window.innerHeight * 0.3
        const current = nodes.reduce<HTMLElement | undefined>((match, node) => (
          node.getBoundingClientRect().top <= readingLine ? node : match
        ), nodes[0])
        if (current?.id) setActiveSection(current.id)
      })
    }

    updateFromHash()
    updateFromScroll()
    window.addEventListener('hashchange', updateFromHash)
    window.addEventListener('resize', updateFromScroll)
    window.addEventListener('scroll', updateFromScroll, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', updateFromHash)
      window.removeEventListener('resize', updateFromScroll)
      window.removeEventListener('scroll', updateFromScroll)
    }
  }, [sections])

  return (
    <div className="legal-page" id="top">
      <PageMetadata description={seoDescription} path={path} title={seoTitle} />
      <ContourField />
      <PublicHeader />

      <main className="legal-main" id="legal-main">
        <header className="legal-hero">
          <p className="eyebrow">Legal information</p>
          <h1>{title}</h1>
          <p className="legal-main__updated">Last updated {updated}</p>
          <p className="legal-main__intro">{intro}</p>
          <div className="legal-notice">
            <ShieldCheck aria-hidden="true" />
            <p>{notice}</p>
          </div>
          <div className="legal-care-note">
            <HeartPulse aria-hidden="true" />
            <div>
              <strong>Worried about your health?</strong>
              <p>Speak with a doctor, pharmacist, or another qualified health professional. For severe or urgent symptoms, contact your local emergency service now.</p>
            </div>
          </div>
        </header>

        <div className="legal-layout">
          <aside className="legal-toc" aria-label={`${title} contents`}>
            <span>On this page</span>
            <nav>
              {sections.map((section) => (
                <a
                  aria-current={activeSection === section.id ? 'location' : undefined}
                  data-active={activeSection === section.id ? 'true' : 'false'}
                  href={`#${section.id}`}
                  key={section.id}
                  onClick={() => {
                    navigationTargetRef.current = section.id
                    navigationTargetReachedRef.current = false
                    setActiveSection(section.id)
                  }}
                >
                  {section.heading}<ArrowRight aria-hidden="true" />
                </a>
              ))}
            </nav>
          </aside>

          <article className="legal-article">
            {sections.map((section, index) => (
              <section id={section.id} key={section.id}>
                <span className="legal-section-number">{String(index + 1).padStart(2, '0')}</span>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
              </section>
            ))}
          </article>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}

export function PrivacyPage() {
  return <LegalPage {...privacyPage} />
}

export function TermsPage() {
  return <LegalPage {...termsPage} />
}

export function CookiesPage() {
  return <LegalPage {...cookiesPage} />
}

interface DeferredPageProps {
  children: ReactNode
  id?: string
  metadata?: {
    description: string
    path: string
    title: string
  }
  title: string
}

function DeferredPage({ children, id, metadata, title }: DeferredPageProps) {
  return (
    <div className="legal-page" id="top">
      {metadata ? <PageMetadata {...metadata} /> : null}
      <ContourField />
      <PublicHeader />
      <main className="deferred-page" id="deferred-main">
        <p className="eyebrow">Public page shell</p>
        <h1>{title}</h1>
        <p className="deferred-page__intro">This page is intentionally deferred until the final owner and legal-approved visual/content design is supplied.</p>
        <section className="deferred-page__notice" id={id}>
          <h2>Content pending final owner/legal approval</h2>
          {children}
        </section>
      </main>
      <PublicFooter />
    </div>
  )
}

export function RefundPage() {
  return <LegalPage {...refundPage} />
}

export function SupportPage() {
  return (
    <DeferredPage
      metadata={{
        description: 'Get support for Vein Health, find the official support email, and learn what information not to send through general email.',
        path: '/support',
        title: 'Support | Vein Health',
      }}
      title="Support"
    >
      <p>For general support questions, email <a href="mailto:support@veinhealth.co">support@veinhealth.co</a>.</p>
      <p>Do not send sensitive health documents, medication details, symptoms, identity documents, passwords, or payment information through a general email until the final support workflow is published.</p>
      <p>Store listing IDs will replace the current official store-search destinations when the approved listings are published.</p>
    </DeferredPage>
  )
}
