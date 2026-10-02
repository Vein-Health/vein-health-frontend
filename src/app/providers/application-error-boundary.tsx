import { Component, type PropsWithChildren } from 'react'

type ApplicationErrorBoundaryState = {
  hasError: boolean
}

export class ApplicationErrorBoundary extends Component<
  PropsWithChildren,
  ApplicationErrorBoundaryState
> {
  state: ApplicationErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ApplicationErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch() {
    // Do not log raw errors here. Future reporting must use a PHI-safe allowlist.
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="foundation-shell" role="alert">
          <h1>Vein Health could not start</h1>
          <p>Refresh the page. If the problem continues, contact support.</p>
        </main>
      )
    }

    return this.props.children
  }
}
