import { expect, test } from '@playwright/test'

test('the public landing page renders the corrected section flow', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Vein Health - verified information, understandable care')
  await expect(page.getByRole('heading', { level: 1, name: /Understanding your health/i })).toBeAttached()
  await expect(page.getByRole('heading', { name: 'How Vein Health works' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Feel more in control of your health' })).toBeAttached()
  await expect(page.getByRole('heading', { name: 'Share your health information with someone you trust.' })).toBeAttached()
  await expect(page.getByRole('heading', { name: 'Common questions' })).toBeAttached()
  await expect(page.locator('.companion-guide')).toHaveCount(0)
  await expect(page.locator('.feature-carousel')).toHaveCount(0)
  await expect(page.getByText('Starter')).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Login' })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Get App' }).first()).toHaveAttribute('href', /play\.google\.com/)
  await expect(page.locator('img[src="/assets/landing/phone-flow-full.png"]')).toHaveCount(1)
  await expect(page.locator('img[src="/assets/landing/vee-bold.png"]').first()).toBeVisible()

  await page.getByRole('button', { name: 'What documents can I upload?' }).click()
  await expect(page.getByRole('button', { name: 'What documents can I upload?' })).toHaveAttribute('aria-expanded', 'true')

  await page.getByRole('link', { name: 'Refund Policy' }).click()
  await expect(page).toHaveURL(/\/refund$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Refund Policy' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Support', exact: true })).toHaveAttribute('href', '/support')
})

test('the narrow layout provides an accessible menu and keeps the hero image loaded', async ({ page }) => {
  await page.setViewportSize({ height: 844, width: 390 })
  await page.goto('/')

  await expect(page.locator('.hero-art img')).toBeVisible()
  await expect
    .poll(() => page.locator('.hero-art img').evaluate((image) => image.naturalWidth), { timeout: 60_000 })
    .toBeGreaterThan(0)

  const menu = page.getByRole('button', { name: 'Open navigation menu' })
  await menu.click()
  const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' })
  await expect(mobileNavigation).toBeVisible()
  await mobileNavigation.getByRole('link', { name: 'Features' }).click()
  await expect(page.locator('.public-header__menu-button')).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('#features')).toBeInViewport()
})

test('reduced motion disables non-essential entrance movement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect(page.locator('.reveal-item').first()).toHaveAttribute('data-revealed', 'true')
  await expect(page.locator('.companion-guide')).toHaveCount(0)
  await expect(page.locator('.app-intro__loader--static')).toBeVisible()
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
    await expect(page.getByRole('link', { name: 'Vein Health home' }).first()).toHaveAttribute('href', '/')
    await expect(page.getByRole('link', { name: 'Refund Policy' })).toHaveAttribute('href', '/refund')
    await expect(page.getByRole('link', { name: 'Support', exact: true })).toHaveAttribute('href', '/support')
    await expect(page.getByRole('contentinfo').getByText('Medications')).toHaveCount(0)
    await expect(page.getByRole('contentinfo').getByText('Reminders')).toHaveCount(0)
    await expect(page.getByRole('contentinfo').getByText('Contact / Support')).toHaveCount(0)
  }

  await page.goto('/support')
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'support@veinhealth.co' })).toHaveAttribute('href', 'mailto:support@veinhealth.co')
  await expect(page.getByText(/do not send sensitive health documents/i)).toBeVisible()
})
