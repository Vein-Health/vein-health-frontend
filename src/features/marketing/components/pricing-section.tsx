import { Check } from 'lucide-react'
import { useState } from 'react'

import { pricingPlans } from '../data'
import {
  formatUsd,
  getAnnualPriceCents,
  getAnnualSavingCents,
  getDisplayedMonthlyCents,
} from '../pricing'
import type { BillingCadence } from '../pricing'
import { ContourField } from './contour-field'

export function PricingSection() {
  const [cadence, setCadence] = useState<BillingCadence>('monthly')

  return (
    <section aria-labelledby="pricing-heading" className="pricing section" id="pricing">
      <ContourField className="section-contours section-contours--pricing" />
      <div className="section-heading section-heading--centered">
        <p className="eyebrow eyebrow--pill">Pricing</p>
        <h2 id="pricing-heading">Get access to Vein Health</h2>
        <p>
          Choose the level of support that fits how you want to understand and
          organize your care.
        </p>
      </div>

      <div aria-label="Billing period" className="billing-toggle" role="group">
        <button
          aria-pressed={cadence === 'monthly'}
          onClick={() => setCadence('monthly')}
          type="button"
        >
          Monthly
        </button>
        <button
          aria-pressed={cadence === 'yearly'}
          onClick={() => setCadence('yearly')}
          type="button"
        >
          Yearly <span>Save 15%</span>
        </button>
      </div>

      <div className="pricing-grid">
        {pricingPlans.map((plan) => {
          const monthlyDisplay = getDisplayedMonthlyCents(plan, cadence)
          const annualPrice = getAnnualPriceCents(plan)
          const annualSaving = getAnnualSavingCents(plan)

          return (
            <article className="pricing-card" data-popular={plan.popular ? 'true' : 'false'} key={plan.id}>
              <div className="pricing-card__header">
                <div>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                </div>
                {plan.popular ? <span className="pricing-card__popular">Popular</span> : null}
              </div>
              <div className="pricing-card__price">
                <strong>{formatUsd(monthlyDisplay)}</strong>
                <span>per month</span>
              </div>
              {cadence === 'yearly' ? (
                <p className="pricing-card__billing-note">
                  {formatUsd(annualPrice)} billed yearly · save {formatUsd(annualSaving)}
                </p>
              ) : (
                <p className="pricing-card__billing-note">Billed monthly</p>
              )}
              <a className="button button--primary button--full" href="#how-it-works">
                Get started
              </a>
              <ul className="pricing-card__features">
                {plan.features.map((feature) => (
                  <li key={feature}><Check aria-hidden="true" />{feature}</li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}
