import { describe, expect, it } from 'vitest'

import { pricingPlans } from './data'
import {
  formatUsd,
  getAnnualPriceCents,
  getAnnualSavingCents,
  getDisplayedMonthlyCents,
} from './pricing'

describe('pricing calculations', () => {
  it.each([
    {
      annualCents: 8150,
      monthlyCents: 679,
      planIndex: 0,
      savingCents: 1438,
    },
    {
      annualCents: 20390,
      monthlyCents: 1699,
      planIndex: 1,
      savingCents: 3598,
    },
  ])(
    'keeps annual pricing in integer cents for plan $planIndex',
    ({ annualCents, monthlyCents, planIndex, savingCents }) => {
      const plan = pricingPlans[planIndex]

      expect(plan).toBeDefined()
      expect(getAnnualPriceCents(plan!)).toBe(annualCents)
      expect(getDisplayedMonthlyCents(plan!, 'yearly')).toBe(monthlyCents)
      expect(getAnnualSavingCents(plan!)).toBe(savingCents)
    },
  )

  it('formats cents as USD without floating-point display leakage', () => {
    expect(formatUsd(8150)).toBe('$81.50')
    expect(formatUsd(20390)).toBe('$203.90')
  })
})
