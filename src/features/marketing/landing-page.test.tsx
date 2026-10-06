import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { FeatureCarousel } from './components/feature-carousel'
import { faqGroups } from './data'
import { LandingPage } from './landing-page'

function setMediaQueries({ narrow = false, reducedMotion = false } = {}) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      addEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches:
        (query === '(prefers-reduced-motion: reduce)' && reducedMotion)
        || (query === '(max-width: 719px)' && narrow),
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
    })),
    writable: true,
  })
}

describe('Phase 1 landing page', () => {
  beforeEach(() => setMediaQueries({ reducedMotion: true }))
  afterEach(() => vi.useRealTimers())

  it('renders the public page with safe in-page actions', () => {
    render(<LandingPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /meet your AI companion for clearer care/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Get Started' })).toHaveAttribute(
      'href',
      '#how-it-works',
    )
    expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled()
    expect(screen.getByRole('img', { name: /vein health dashboard/i })).toBeInTheDocument()
  })

  it('moves through the feature states with controls and pagination', () => {
    render(<FeatureCarousel />)

    const firstDot = screen.getByRole('button', { name: 'Show feature pair 1' })
    const secondDot = screen.getByRole('button', { name: 'Show feature pair 2' })
    expect(firstDot).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'Show next feature pair' }))

    expect(secondDot).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(/Feature pair 2 of 4:/)).toHaveTextContent(
      'Plain-language explanations and Medication schedules',
    )

    fireEvent.click(screen.getByRole('button', { name: 'Show feature pair 4' }))
    expect(screen.getByText(/Feature pair 4 of 4:/)).toHaveTextContent(
      'Health timeline and Safety escalation',
    )
  })

  it('shows one feature at a time in the narrow carousel', () => {
    setMediaQueries({ narrow: true, reducedMotion: true })
    render(<FeatureCarousel />)

    expect(screen.getByRole('button', { name: 'Show feature 1' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByText(/Feature 1 of 8:/)).toHaveTextContent('Document scanning')

    fireEvent.click(screen.getByRole('button', { name: 'Show next feature' }))

    expect(screen.getByRole('button', { name: 'Show feature 2' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByText(/Feature 2 of 8:/)).toHaveTextContent(
      'AI extraction & verification',
    )
  })

  it('advances the carousel at the reviewed 3.5-second cadence', () => {
    vi.useFakeTimers()
    setMediaQueries()
    render(<FeatureCarousel />)

    const firstDot = screen.getByRole('button', { name: 'Show feature pair 1' })
    const secondDot = screen.getByRole('button', { name: 'Show feature pair 2' })

    act(() => vi.advanceTimersByTime(3499))
    expect(firstDot).toHaveAttribute('aria-pressed', 'true')

    act(() => vi.advanceTimersByTime(1))
    expect(secondDot).toHaveAttribute('aria-pressed', 'true')
  })

  it('keeps the first-load banner visible before revealing the page', () => {
    vi.useFakeTimers()
    setMediaQueries()
    render(<LandingPage />)

    expect(screen.getByRole('status', { name: 'Vein Health is loading' })).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(2549))
    expect(screen.getByRole('status', { name: 'Vein Health is loading' })).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(1))
    expect(screen.queryByRole('status', { name: 'Vein Health is loading' })).not.toBeInTheDocument()
  })

  it('keeps the reviewed FAQ inventory in every requested category', () => {
    const countFor = (category: string) =>
      faqGroups.find((group) => group.category === category)?.items.length

    expect(countFor('Getting started')).toBe(5)
    expect(countFor('Privacy & security')).toBe(4)
    expect(countFor('Clinical')).toBe(5)
  })

  it('shows exact yearly pricing and expands an FAQ answer', () => {
    render(<LandingPage />)

    fireEvent.click(screen.getByRole('button', { name: /Yearly/ }))

    const pricing = screen.getByRole('heading', { name: 'Get access to Vein Health' })
      .closest('section')
    expect(pricing).not.toBeNull()
    expect(within(pricing!).getByText('$6.79')).toBeInTheDocument()
    expect(within(pricing!).getByText('$16.99')).toBeInTheDocument()
    expect(within(pricing!).getByText('$81.50 billed yearly · save $14.38')).toBeInTheDocument()
    expect(within(pricing!).getByText('$203.90 billed yearly · save $35.98')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'What is Vein Health?' }))
    expect(
      screen.getByText(/helps you keep the health information/i),
    ).toBeVisible()
  })

  it('opens the mobile navigation and closes it with Escape', () => {
    render(<LandingPage />)

    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' })
    fireEvent.click(menuButton)
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
    setMediaQueries({ reducedMotion: true })
    const { container } = render(<FeatureCarousel />)

    expect(container.querySelector('.features')).toHaveClass('features--reduced-motion')
    expect(container.querySelector('[data-companion-waypoint]')).toBeInTheDocument()
  })

  it('keeps the reviewed footer inventory and removes the dashboard caption', () => {
    render(<LandingPage />)

    expect(screen.queryByText('Your whole care picture, in one place')).not.toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('X (Twitter)')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Health Data Policy' })).toHaveAttribute(
      'href',
      '/privacy#information',
    )
  })
})
