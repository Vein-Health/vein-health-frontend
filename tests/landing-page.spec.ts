import { expect, test } from '@playwright/test'

test('the public landing page supports its primary interactions', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Vein Health - verified information, understandable care')
  await expect(
    page.getByRole('heading', { level: 1, name: /Meet your AI companion for clearer care/i }),
  ).toBeVisible()
  await expect(page.locator('#top').getByRole('link', { name: 'Get Started' })).toHaveAttribute(
    'href',
    '#how-it-works',
  )
  await expect(page.getByRole('button', { name: 'Login' })).toBeDisabled()

  const activeSlide = page.locator('.feature-carousel__slide[aria-hidden="false"]')
  await page.getByRole('button', { name: 'Show feature pair 1' }).click()
  await expect(activeSlide).toContainText('Document scanning')
  await page.getByRole('button', { name: 'Show feature pair 2' }).click()
  await expect(activeSlide).toContainText('Plain-language explanations')
  await expect(page.getByRole('button', { name: 'Show feature pair 2' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )

  await page.getByRole('button', { name: /Yearly/ }).click()
  await expect(page.getByText('$81.50 billed yearly · save $14.38')).toBeVisible()
  await expect(page.getByText('$203.90 billed yearly · save $35.98')).toBeVisible()

  await page.getByRole('button', { name: 'What is Vein Health?' }).click()
  await expect(page.getByText(/helps you keep the health information/i)).toBeVisible()

  await page.evaluate(() => window.scrollTo(0, 500))
  await expect(page.locator('.public-header')).toHaveAttribute('data-scrolled', 'true')
})

test('the narrow layout provides an accessible menu', async ({ page }) => {
  await page.setViewportSize({ height: 844, width: 390 })
  await page.goto('/')

  const heroImage = page.locator('.hero__media img')
  await expect(heroImage).toBeVisible()
  await expect
    .poll(() => heroImage.evaluate((image) => image.naturalWidth))
    .toBeGreaterThan(0)

  const menu = page.getByRole('button', { name: 'Open navigation menu' })
  await menu.click()
  const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' })
  await expect(mobileNavigation).toBeVisible()
  await mobileNavigation.getByRole('link', { name: 'Features' }).click()
  await expect(page.locator('.public-header__menu-button')).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  await expect(page.locator('#features')).toBeInViewport()
})

test('reduced-motion preference produces a static component state', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect(page.locator('.features')).toHaveClass(/features--reduced-motion/)
  await expect(page.locator('.companion-guide')).toHaveAttribute(
    'data-reduced-motion',
    'true',
  )
})

test('public legal pages are reachable from the footer', async ({ page }) => {
  await page.goto('/')

  const routes = [
    ['/privacy', 'Privacy Policy'],
    ['/terms', 'Terms and Conditions'],
    ['/cookies', 'Cookie Policy'],
  ] as const

  for (const [route, heading] of routes) {
    await page.goto(route)
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Vein Health home' })).toHaveAttribute('href', '/')
  }
})
