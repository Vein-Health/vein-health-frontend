import type { PricingPlan } from './types'

export type BillingCadence = 'monthly' | 'yearly'

const BASIS_POINTS = 10_000

export function getAnnualPriceCents(plan: PricingPlan): number {
  const undiscountedAnnualCents = plan.monthlyCents * 12
  const payableBasisPoints = BASIS_POINTS - plan.annualDiscountBasisPoints

  return Math.round(
    (undiscountedAnnualCents * payableBasisPoints) / BASIS_POINTS,
  )
}

export function getDisplayedMonthlyCents(
  plan: PricingPlan,
  cadence: BillingCadence,
): number {
  if (cadence === 'monthly') {
    return plan.monthlyCents
  }

  return Math.round(getAnnualPriceCents(plan) / 12)
}

export function getAnnualSavingCents(plan: PricingPlan): number {
  return plan.monthlyCents * 12 - getAnnualPriceCents(plan)
}

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

