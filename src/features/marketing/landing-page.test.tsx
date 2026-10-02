import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { FeatureCarousel } from './components/feature-carousel'
import { LandingPage } from './landing-page'

function setReducedMotion(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      addEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
    })),
    writable: true,
  })
}

describe('Phase 1 landing page', () => {
  beforeEach(() => setReducedMotion(false))

  it('renders the public page with safe in-page actions', () => {
    render(<LandingPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /your care story/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'See how it works' })).toHaveAttribute(
      'href',
      '#how-it-works',
    )
    expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled()
    expect(screen.getAllByText('PLANNED PREVIEW')).toHaveLength(8)
  })

  it('moves through the feature states with controls and pagination', async () => {
    const user = userEvent.setup()
    render(<FeatureCarousel />)

    const firstDot = screen.getByRole('button', { name: 'Show feature pair 1' })
    const secondDot = screen.getByRole('button', { name: 'Show feature pair 2' })
    expect(firstDot).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: 'Show next feature pair' }))

    expect(secondDot).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(/Feature pair 2 of 4:/)).toHaveTextContent(
      'Plain-language explanations and Medication schedules',
    )

    await user.click(screen.getByRole('button', { name: 'Show feature pair 4' }))
    expect(screen.getByText(/Feature pair 4 of 4:/)).toHaveTextContent(
      'Health timeline and Safety escalation',
    )
  })

  it('shows exact yearly preview pricing and expands an FAQ answer', async () => {
    const user = userEvent.setup()
    render(<LandingPage />)

    await user.click(screen.getByRole('button', { name: /Yearly/ }))

    const pricing = screen.getByRole('heading', { name: 'Get access to Vein Health' })
      .closest('section')
    expect(pricing).not.toBeNull()
    expect(within(pricing!).getByText('$6.79')).toBeInTheDocument()
    expect(within(pricing!).getByText('$16.99')).toBeInTheDocument()
    expect(within(pricing!).getByText('$81.50 billed yearly · save $14.38')).toBeInTheDocument()
    expect(within(pricing!).getByText('$203.90 billed yearly · save $35.98')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'What is Vein Health?' }))
    expect(
      screen.getByText(/continuity-of-care software for organizing/i),
    ).toBeVisible()
  })

  it('opens the mobile navigation and closes it with Escape', async () => {
    const user = userEvent.setup()
    render(<LandingPage />)

    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' })
    await user.click(menuButton)
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).not.toHaveAttribute(
      'hidden',
    )

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('exposes a static reduced-motion state', () => {
    setReducedMotion(true)
    const { container } = render(<FeatureCarousel />)

    expect(container.querySelector('.features')).toHaveClass('features--reduced-motion')
    expect(container.querySelector('.mascot-moment')).toHaveAttribute(
      'data-reduced-motion',
      'true',
    )
  })
})
