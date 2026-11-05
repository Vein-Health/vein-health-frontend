import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import { LandingPage } from '../../features/marketing'
import { WaitlistPage } from '../../features/marketing/waitlist-page'
import {
  CookiesPage,
  PrivacyPage,
  RefundPage,
  SupportPage,
  TermsPage,
} from '../../features/marketing/legal-page'

const rootRoute = createRootRoute({
  component: Outlet,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
})

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyPage,
})

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsPage,
})

const cookiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cookies',
  component: CookiesPage,
})

const refundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/refund',
  component: RefundPage,
})

const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/support',
  component: SupportPage,
})

const waitlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/waitlist',
  component: WaitlistPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  privacyRoute,
  termsRoute,
  cookiesRoute,
  refundRoute,
  supportRoute,
  waitlistRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
