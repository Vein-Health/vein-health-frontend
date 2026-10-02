import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ApplicationErrorBoundary } from './app/providers/application-error-boundary'
import { AppProviders } from './app/providers/app-providers'
import { router } from './app/router/router'
import './styles/index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Application root element is missing')
}

createRoot(rootElement).render(
  <StrictMode>
    <ApplicationErrorBoundary>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </ApplicationErrorBoundary>
  </StrictMode>,
)

