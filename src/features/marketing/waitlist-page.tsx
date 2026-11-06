import { useState, type FormEvent } from 'react'

import { ContourField } from './components/contour-field'
import { MotionOrchestrator } from './components/motion-orchestrator'
import { PublicFooter } from './components/public-footer'
import { PublicHeader } from './components/public-header'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT?.trim()

    if (!emailPattern.test(normalizedEmail)) {
      setSubmissionState('error')
      setErrorMessage('Enter a valid email address to join the waitlist.')
      return
    }

    if (!endpoint) {
      setSubmissionState('error')
      setErrorMessage('The waitlist is being connected. Please try again shortly.')
      return
    }

    setSubmissionState('submitting')
    setErrorMessage('')

    try {
      const frameName = `waitlist-submit-${Date.now()}`
      const iframe = document.createElement('iframe')
      const submissionForm = document.createElement('form')
      const emailInput = document.createElement('input')

      iframe.name = frameName
      iframe.title = 'Waitlist submission'
      iframe.hidden = true

      submissionForm.action = endpoint
      submissionForm.method = 'POST'
      submissionForm.target = frameName
      submissionForm.hidden = true

      emailInput.name = 'email'
      emailInput.type = 'email'
      emailInput.value = normalizedEmail

      submissionForm.append(emailInput)
      document.body.append(iframe, submissionForm)
      submissionForm.submit()
      window.setTimeout(() => {
        iframe.remove()
        submissionForm.remove()
      }, 10_000)
      setSubmissionState('success')
    } catch {
      setSubmissionState('error')
      setErrorMessage('We could not join you to the waitlist right now. Please try again.')
    }
  }

  return (
    <div className="waitlist-page" id="top">
      <ContourField />
      <MotionOrchestrator />
      <PublicHeader />

      <main className="waitlist-main" id="waitlist-main">
        <section aria-labelledby="waitlist-heading" className="waitlist-card">
          {submissionState === 'success' ? (
            <div aria-live="polite" className="waitlist-success">
              <div className="waitlist-success__icon">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                  <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 id="waitlist-heading">You’re on the waitlist.</h1>
              <p>We’ll email you with launch updates and your 10% discount when Vein Health launches.</p>
            </div>
          ) : (
            <>
              <p className="eyebrow">Coming soon</p>
              <h1 id="waitlist-heading">Be part of what comes next.</h1>
              <p>Join the Vein Health waitlist for launch updates and 10% off when your health companion is ready.</p>
              <span className="waitlist-perk">10% off upon launch</span>
              <form className="waitlist-form" onSubmit={handleSubmit}>
                <label htmlFor="waitlist-email">Email address</label>
                <input
                  autoComplete="email"
                  id="waitlist-email"
                  inputMode="email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={email}
                />
                <button className="button button--primary" disabled={submissionState === 'submitting'} type="submit">
                  {submissionState === 'submitting' ? 'Joining…' : 'Join waitlist'}
                </button>
              </form>
              {submissionState === 'error' ? <p className="waitlist-form__message" role="alert">{errorMessage}</p> : null}
            </>
          )}
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
