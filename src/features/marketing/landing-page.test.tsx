import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LandingPage } from './landing-page'

function setMediaQueries(reducedMotion = false) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      addEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches: query === '(prefers-reduced-motion: reduce)' && reducedMotion,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
    })),
    writable: true,
  })
}

describe('new landing page', () => {
  beforeEach(() => setMediaQueries(true))
  afterEach(() => vi.useRealTimers())

  const renderLanding = () => render(<LandingPage />)

  it('renders every new section in the requested order without stale pricing or mascot behavior', () => {
    const { container } = renderLanding()

    expect(screen.getByRole('heading', { level: 1, name: /understanding your health/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'How Vein Health works' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Review and verify' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Understand and stay organized' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Feel more in control of your health' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Stay on top of your medications' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'See your health journey clearly' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Know when something needs attention' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Common questions' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Your health, easier to understand.' })).toBeInTheDocument()
    expect(screen.queryByText('Starter')).not.toBeInTheDocument()
    expect(screen.queryByText('Pro')).not.toBeInTheDocument()
    expect(container.querySelector('.companion-guide')).not.toBeInTheDocument()
    expect(container.querySelector('.feature-carousel')).not.toBeInTheDocument()
    expect(container.querySelector('img[src*="vein-companion"]')).not.toBeInTheDocument()
    expect(container.querySelector('.phone-frame')).not.toBeInTheDocument()
    expect(container.querySelector('.medication-preview')).not.toBeInTheDocument()
    expect(container.querySelector('.timeline-preview')).not.toBeInTheDocument()
    expect(container.querySelector('.safety-preview')).not.toBeInTheDocument()
    expect(container.querySelector('img[src="/assets/landing/phone-flow-reference.png"]')).toBeInTheDocument()
    expect(container.querySelector('img[src="/assets/landing/medication-schedule-reference.png"]')).toBeInTheDocument()
    expect(container.querySelector('img[src="/assets/landing/health-timeline-reference.png"]')).toBeInTheDocument()
    expect(container.querySelector('img[src="/assets/landing/safety-reference.png"]')).toBeInTheDocument()
    expect(container.querySelector('img[src="/assets/landing/vee-bold.png"]')).toBeInTheDocument()
  })

  it('uses measured, truthful accordion controls for workflow and FAQ questions', () => {
    renderLanding()

    const uploadQuestion = screen.getByRole('button', { name: 'What documents can I upload?' })
    expect(uploadQuestion).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(uploadQuestion)
    expect(uploadQuestion).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/start with a clear photo or supported file/i)).toBeInTheDocument()

    const faqQuestion = screen.getByRole('button', { name: 'What is Vein Health?' })
    fireEvent.click(faqQuestion)
    expect(faqQuestion).toHaveAttribute('aria-expanded', 'true')
  })

  it('keeps the header keyboard accessible and omits Pricing from navigation', () => {
    renderLanding()

    expect(screen.queryByRole('link', { name: 'Pricing' })).not.toBeInTheDocument()
    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' })
    fireEvent.click(menuButton)
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).not.toHaveAttribute('hidden')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('keeps reduced motion static and renders the shared footer inventory', () => {
    const { container } = renderLanding()

    expect(container.querySelector('.reveal-item[data-revealed="true"]')).toBeInTheDocument()
    expect(screen.getByText('Private by design')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Refund Policy' })).toHaveAttribute('href', '/refund')
    expect(screen.getByRole('link', { name: 'Support' })).toHaveAttribute('href', '/support')
    expect(screen.getByRole('link', { name: 'Contact / Support' })).toHaveAttribute('href', '/support')
    expect(screen.getByRole('link', { name: 'support@veinhealth.co' })).toHaveAttribute(
      'href',
      'mailto:support@veinhealth.co',
    )
  })
})
