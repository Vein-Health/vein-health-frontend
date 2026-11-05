import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { WaitlistPage } from './waitlist-page'

describe('waitlist page', () => {
  it('uses the shared public shell and only asks for an email address', () => {
    render(<WaitlistPage />)

    expect(screen.getByRole('heading', { name: 'Be part of what comes next.' })).toBeInTheDocument()
    expect(screen.getByText('10% off upon launch')).toBeInTheDocument()
    expect(screen.getByLabelText('Email address')).toHaveAttribute('type', 'email')
    expect(screen.getAllByRole('textbox')).toHaveLength(1)
    expect(screen.getAllByRole('link', { name: 'Vein Health home' })).toHaveLength(2)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('rejects an invalid email before contacting the waitlist service', () => {
    render(<WaitlistPage />)

    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'not-an-email' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Join waitlist' }).closest('form') as HTMLFormElement)

    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email address')
  })
})
