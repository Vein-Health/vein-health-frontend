import { AppIntro } from './components/app-intro'
import { CompanionGuide } from './components/companion-guide'
import { FaqSection } from './components/faq-section'
import { FeatureCarousel } from './components/feature-carousel'
import { FinalSection } from './components/final-section'
import { HeroSection } from './components/hero-section'
import { MotionOrchestrator } from './components/motion-orchestrator'
import { OrganizedPreview } from './components/organized-preview'
import { PricingSection } from './components/pricing-section'
import { PublicHeader } from './components/public-header'
import { WorkflowSection } from './components/workflow-section'

export function LandingPage() {
  return (
    <div className="landing-page">
      <AppIntro />
      <MotionOrchestrator />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <PublicHeader />
      <main id="main-content">
        <HeroSection />
        <WorkflowSection />
        <OrganizedPreview />
        <FeatureCarousel />
        <PricingSection />
        <FaqSection />
      </main>
      <FinalSection />
      <CompanionGuide />
    </div>
  )
}
