import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  Check,
  FileText,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'

import { featureCarouselStates } from '../data'
import type { FeatureCardData, FeatureVisual } from '../types'
import { usePrefersReducedMotion } from '../hooks/use-prefers-reduced-motion'
import { MascotMoment } from './mascot-moment'

function useSingleCardCarousel() {
  const [isSingleCard, setIsSingleCard] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 719px)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(max-width: 719px)')
    const update = () => setIsSingleCard(query.matches)

    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isSingleCard
}

function FeatureVisualMock({ type }: { type: FeatureVisual }) {
  if (type === 'capture') {
    return (
      <div className="feature-mock feature-mock--capture">
        <div className="mock-document mock-document--behind" />
        <div className="mock-document">
          <FileText aria-hidden="true" />
          <i /><i /><i />
          <span><Check aria-hidden="true" /> Ready for review</span>
        </div>
      </div>
    )
  }

  if (type === 'verify') {
    return (
      <div className="feature-mock feature-mock--verify">
        <div className="mock-source"><FileText aria-hidden="true" /><i /><i /><i /></div>
        <ArrowRight aria-hidden="true" />
        <div className="mock-fields"><span>Medicine name</span><span>Dose: needs review</span><span>Duration: not specified</span></div>
      </div>
    )
  }

  if (type === 'understand') {
    return (
      <div className="feature-mock feature-mock--understand">
        <span className="mock-result">Verified source fact</span>
        <ArrowRight aria-hidden="true" />
        <strong>Explained in simpler words</strong>
      </div>
    )
  }

  if (type === 'routine') {
    return (
      <div className="feature-mock feature-mock--list">
        <span><b>08:00</b> Verified instruction <Check aria-hidden="true" /></span>
        <span className="is-current"><b>14:00</b> Review before schedule <ShieldCheck aria-hidden="true" /></span>
        <span><b>Later</b> Not specified in source</span>
      </div>
    )
  }

  if (type === 'reminders') {
    return (
      <div className="feature-mock feature-mock--notification">
        <BellRing aria-hidden="true" />
        <div><span>VEIN HEALTH</span><strong>Verified care reminder</strong><p>Based on a confirmed instruction</p></div>
      </div>
    )
  }

  if (type === 'journal') {
    return (
      <div className="feature-mock feature-mock--chart">
        <div className="mock-chart__header"><span>THIS WEEK</span><strong>Patient-entered</strong></div>
        <div className="mock-chart__bars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="mock-chart__footer"><span>Observations</span><strong>No diagnosis inferred</strong></div>
      </div>
    )
  }

  if (type === 'timeline') {
    return (
      <div className="feature-mock feature-mock--timeline">
        <span><i />Today<strong>Document received</strong></span>
        <span><i />Sep 28<strong>Prescription verified</strong></span>
        <span><i />Sep 15<strong>Consultation summary</strong></span>
      </div>
    )
  }

  return (
    <div className="feature-mock feature-mock--safety">
      <ShieldAlert aria-hidden="true" />
      <div><span>SAFETY BOUNDARY</span><strong>Clear escalation, no diagnosis</strong><p>Exact guidance remains jurisdiction-specific.</p></div>
    </div>
  )
}

function FeatureCard({ card }: { card: FeatureCardData }) {
  return (
    <article className="feature-card">
      <div className="feature-card__visual">
        <span className="preview-chip preview-chip--floating">PRODUCT PREVIEW</span>
        <FeatureVisualMock type={card.visual} />
      </div>
      <div className="feature-card__body">
        <p className="feature-card__eyebrow"><b>{card.number}</b><span />{card.eyebrow}</p>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>
    </article>
  )
}

export function FeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const pointerStart = useRef<number | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const isSingleCard = useSingleCardCarousel()
  const slides = isSingleCard
    ? featureCarouselStates.flatMap((state) => state.cards.map((card) => ({
        cards: [card] as const,
        id: card.id,
        mascotCloud: state.mascotCloud,
      })))
    : featureCarouselStates
  const normalizedIndex = activeIndex % slides.length
  const activeState = slides[normalizedIndex]
  const itemLabel = isSingleCard ? 'feature' : 'feature pair'

  const showState = (index: number) => {
    const count = slides.length
    setActiveIndex((index + count) % count)
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) {
      return
    }

    const distance = event.clientX - pointerStart.current
    pointerStart.current = null

    if (Math.abs(distance) < 48) {
      return
    }

    showState(activeIndex + (distance < 0 ? 1 : -1))
  }

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length)
    }, 3500)

    return () => window.clearInterval(timer)
  }, [prefersReducedMotion, slides.length])

  return (
    <section
      aria-labelledby="features-heading"
      aria-roledescription="carousel"
      className={`features section${prefersReducedMotion ? ' features--reduced-motion' : ''}`}
      id="features"
    >
      <div className="feature-carousel__header">
        <div className="section-heading">
          <p className="eyebrow eyebrow--pill">Features</p>
          <h2 id="features-heading">Everything your care needs</h2>
          <p>
            Small, source-aware tools built to make health information easier
            to verify, understand, and keep in view.
          </p>
        </div>
        <MascotMoment cloud={activeState?.mascotCloud ?? ''} state="carousel" />
        <div className="carousel-controls">
          <button
            aria-label={`Show previous ${itemLabel}`}
            className="icon-button"
            onClick={() => showState(activeIndex - 1)}
            type="button"
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            aria-label={`Show next ${itemLabel}`}
            className="icon-button icon-button--primary"
            onClick={() => showState(activeIndex + 1)}
            type="button"
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {isSingleCard ? 'Feature' : 'Feature pair'} {normalizedIndex + 1} of {slides.length}:{' '}
        {activeState?.cards.map((card) => card.title).join(' and ')}
      </p>

      <div
        className="feature-carousel__viewport"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div
          className="feature-carousel__track"
          style={{ '--active-slide': normalizedIndex } as CSSProperties}
        >
          {slides.map((state, stateIndex) => (
            <div
              aria-hidden={stateIndex !== normalizedIndex}
              className="feature-carousel__slide"
              data-active={stateIndex === normalizedIndex ? 'true' : 'false'}
              key={state.id}
            >
              {state.cards.map((card) => <FeatureCard card={card} key={card.id} />)}
            </div>
          ))}
        </div>
      </div>

      <div aria-label={`Choose ${itemLabel}`} className="carousel-pagination" role="group">
        {slides.map((state, index) => (
          <button
            aria-label={`Show ${itemLabel} ${index + 1}`}
            aria-pressed={index === normalizedIndex}
            className="carousel-dot"
            key={state.id}
            onClick={() => showState(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  )
}
