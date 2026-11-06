import { expect, test } from '@playwright/test'

test('the public landing page renders the corrected section flow', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Vein Health | AI Companion to Understand & Organize Your Care')
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/assets/landing/vein-health-favicon-192.png')
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('sizes', '192x192')
  await expect(page.getByText('Start with 3 days free.')).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1, name: /Understanding your health/i })).toBeAttached()
  await expect(page.getByRole('heading', { name: 'How Vein Health works' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Feel more in control of your health' })).toBeAttached()
  await expect(page.getByRole('heading', { name: 'Share your health information with someone you trust.' })).toBeAttached()
  await expect(page.getByRole('heading', { name: 'Common questions' })).toBeAttached()
  await expect(page.locator('.companion-guide')).toHaveCount(1)
  await expect(page.locator('.companion-guide img[src="/assets/landing/vee-companion-full.webp"]')).toHaveCount(1)
  await page.locator('#how-it-works').scrollIntoViewIfNeeded()
  await page.locator('#review-heading').scrollIntoViewIfNeeded()
  await page.locator('#how-it-works').scrollIntoViewIfNeeded()
  await expect(page.locator('.companion-guide')).toHaveAttribute('data-visible', 'true', { timeout: 2500 })
  await expect(page.locator('.companion-guide')).toHaveCSS('position', 'fixed')
  await expect(page.locator('.feature-carousel')).toHaveCount(0)
  await expect(page.getByText('Starter')).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Login' })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'See how it works' })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Join waitlist' }).first()).toHaveAttribute('href', '/waitlist')
  await expect(page.locator('img[src="/assets/landing/phone-flow-full.webp"]')).toHaveCount(1)
  await expect(page.locator('img[src="/assets/landing/vee-bold.webp"]').first()).toBeVisible()
  await expect(page.locator('.contour-field')).toHaveCount(1)
  await expect(page.locator('#features .landing-section__heading')).toHaveClass(/landing-section__heading--centered/)

  await page.getByRole('button', { name: 'What documents can I upload?' }).click()
  await expect(page.getByRole('button', { name: 'What documents can I upload?' })).toHaveAttribute('aria-expanded', 'true')

  await page.getByRole('link', { name: 'Refund Policy' }).click()
  await expect(page).toHaveURL(/\/refund$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Refund Policy' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Support', exact: true })).toHaveAttribute('href', 'mailto:support@veinhealth.co')
})

test('the narrow layout provides an accessible menu and keeps the hero image loaded', async ({ page }) => {
  await page.setViewportSize({ height: 844, width: 390 })
  await page.goto('/')

  await expect(page.locator('.hero-art img')).toBeVisible()
  await expect(page.locator('.public-header')).toHaveCSS('position', 'sticky')
  await expect
    .poll(() => page.locator('.hero-art img').evaluate((image) => image.naturalWidth), { timeout: 60_000 })
    .toBeGreaterThan(0)

  await page.evaluate(() => window.scrollTo(0, 500))
  await expect
    .poll(() => page.locator('.public-header').evaluate((header) => header.getBoundingClientRect().top), { timeout: 5_000 })
    .toBeLessThan(30)

  const menu = page.getByRole('button', { name: 'Open navigation menu' })
  await menu.click()
  const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' })
  await expect(mobileNavigation).toBeVisible()
  await mobileNavigation.getByRole('link', { name: 'Features' }).click()
  await expect(page.locator('.public-header__menu-button')).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('#features')).toBeInViewport()

  for (const selector of ['.split-section--scan', '.split-section--review', '.split-section--understand', '.split-section--medications', '.split-section--timeline', '.split-section--safety', '.feature-overview__row']) {
    const mobileOrder = await page.locator(selector).evaluate((element) => Array.from(element.children)
      .sort((first, second) => Number.parseInt(getComputedStyle(first).order) - Number.parseInt(getComputedStyle(second).order))
      .map((child) => String(child.className)))
    expect(mobileOrder[0]).toMatch(/reference-media|reference-preview|feature-record-preview/)
    expect(mobileOrder[1]).toContain('split-section__copy')
  }
})

test('reduced motion disables non-essential entrance movement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await expect.poll(() => page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true)
  await expect(page.locator('#main-content')).toBeAttached()
  await expect.poll(() => page.locator('.reveal-item').count()).toBeGreaterThan(0)
  await expect(page.locator('.reveal-item').first()).toHaveAttribute('data-revealed', 'true')
  await expect(page.locator('.companion-guide')).toHaveCount(1)
})

test('public legal and support routes share the footer', async ({ page }) => {
  for (const [route, heading] of [
    ['/privacy', 'Privacy Policy'],
    ['/terms', 'Terms and Conditions'],
    ['/cookies', 'Cookie Policy'],
    ['/refund', 'Refund Policy'],
    ['/support', 'Support'],
  ] as const) {
    await page.goto(route)
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
    await expect(page.locator('meta[name="description"]')).not.toHaveAttribute('content', /personal AI health companion/i)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://veinhealth.co${route}`)
    await expect(page.getByRole('link', { name: 'Vein Health home' }).first()).toHaveAttribute('href', '/')
    await expect(page.getByRole('link', { name: 'Refund Policy' })).toHaveAttribute('href', '/refund')
    await expect(page.getByRole('link', { name: 'Support', exact: true })).toHaveAttribute('href', 'mailto:support@veinhealth.co')
    await expect(page.getByRole('contentinfo').getByText('Medications')).toHaveCount(0)
    await expect(page.getByRole('contentinfo').getByText('Reminders')).toHaveCount(0)
    await expect(page.getByRole('contentinfo').getByText('Contact / Support')).toHaveCount(0)
  }

  await page.goto('/support')
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Support', exact: true })).toHaveAttribute('href', 'mailto:support@veinhealth.co')
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'support@veinhealth.co' })).toHaveCount(0)
  await expect(page.getByText(/do not send sensitive health documents/i)).toBeVisible()

  await page.goto('/privacy')
  await expect(page.getByRole('heading', { name: 'Google account data and OAuth' })).toBeVisible()
  await expect(page.getByText(/not sell.*Google user data/i)).toBeVisible()

  await page.goto('/terms')
  await expect(page.getByRole('heading', { name: 'Google authentication and Google user data' })).toBeVisible()
})

test('waitlist route uses the public shell and accepts only an email field', async ({ page }) => {
  await page.goto('/waitlist')

  await expect(page.getByRole('heading', { name: 'Be part of what comes next.' })).toBeVisible()
  await expect(page.getByText('10% off upon launch')).toBeVisible()
  await expect(page.getByLabel('Email address')).toHaveAttribute('type', 'email')
  await expect(page.getByRole('textbox')).toHaveCount(1)
  await expect(page.getByRole('contentinfo')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Join waitlist' }).first()).toHaveAttribute('href', '/waitlist')
})
