import * as Accordion from '@radix-ui/react-accordion'
import { Check, FileText, LineChart, Plus, ShieldCheck } from 'lucide-react'

import { MascotMoment } from './mascot-moment'
import { ContourField } from './contour-field'

interface InlineQuestion {
  answer: string
  id: string
  question: string
}

const verificationQuestions: readonly InlineQuestion[] = [
  {
    id: 'wrong-detail',
    question: 'What happens if something is wrong?',
    answer:
      'The detail stays marked for review. You can compare it with the document, correct it, reject it, or take a clearer photo before it is used for anything important.',
  },
  {
    id: 'invent-data',
    question: 'Does Vein Health ever fill in missing medication data?',
    answer:
      'No. A missing dose, route, frequency, duration, or date stays missing until it is found in a trusted source and checked.',
  },
]

const understandingQuestions: readonly InlineQuestion[] = [
  {
    id: 'doctor-boundary',
    question: 'Does it replace my doctor?',
    answer:
      'No. It helps you understand and keep track of information after a visit. A qualified clinician or pharmacist still makes medical decisions.',
  },
  {
    id: 'emergency-boundary',
    question: 'What about emergency situations?',
    answer:
      'Vein Health is not an emergency service. If you think you may be in danger, contact your local emergency service or seek urgent professional care instead of waiting for the app.',
  },
]

function QuestionList({ items }: { items: readonly InlineQuestion[] }) {
  return (
    <Accordion.Root className="inline-accordion" collapsible type="single">
      {items.map((item) => (
        <Accordion.Item className="inline-accordion__item" key={item.id} value={item.id}>
          <Accordion.Header>
            <Accordion.Trigger className="inline-accordion__trigger">
              <span>{item.question}</span>
              <Plus aria-hidden="true" className="inline-accordion__icon" size={18} />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="inline-accordion__content">
            <p>{item.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export function WorkflowSection() {
  return (
    <section aria-labelledby="workflow-heading" className="workflow section" id="how-it-works">
      <ContourField className="section-contours section-contours--workflow" />
      <div className="section-heading section-heading--split">
        <div>
          <p className="eyebrow">How it works</p>
          <h2 id="workflow-heading">How I use Vein Health</h2>
          <p>
            A simple path from a scattered document to information I have
            reviewed and can understand.
          </p>
        </div>
        <MascotMoment
          cloud="Let’s start with your original health document."
          state="intro"
        />
      </div>

      <article className="story story--media-first">
        <div className="story__media story__media--portrait">
          <picture>
            <source srcSet="/assets/landing/upload-document-900.webp" type="image/webp" />
            <img
              alt="A woman photographing a paper document with her phone"
              height="1402"
              loading="lazy"
              src="/assets/landing/upload-document.png"
              width="1122"
            />
          </picture>
          <span className="media-pill">
            <FileText aria-hidden="true" size={18} />
            Documents stay connected to their source
          </span>
        </div>
        <div className="story__content">
          <span className="step-number">01</span>
          <h3>I upload my documents</h3>
          <p>
            Prescriptions, lab results, and discharge notes often live in
            different places. Add a photo or PDF and review every extracted
            detail beside its source before it becomes part of your record.
          </p>
          <ul className="story__points">
            <li><Check aria-hidden="true" /> Photo and PDF direction</li>
            <li><Check aria-hidden="true" /> Source-aware extraction preview</li>
          </ul>
          <MascotMoment
            cloud="Take a clear photo of the whole page."
            state="upload"
          />
        </div>
      </article>

      <article className="story story--content-first">
        <div className="story__content">
          <span className="step-number">02</span>
          <h3>I verify the details</h3>
          <p>
            Verification is the safety boundary. Low-confidence or incomplete
            fields stay visible, and medication actions cannot originate from
            unverified extraction.
          </p>
          <QuestionList items={verificationQuestions} />
          <MascotMoment
            cloud="Check the name, dose, and instructions carefully."
            state="verify"
          />
        </div>
        <div className="story__media">
          <picture>
            <source srcSet="/assets/landing/verify-details-1200.webp" type="image/webp" />
            <img
              alt="A man reviewing information on his phone at home"
              height="941"
              loading="lazy"
              src="/assets/landing/verify-details.png"
              width="1672"
            />
          </picture>
          <div className="media-pill-stack">
            <span className="media-pill">
              <ShieldCheck aria-hidden="true" size={18} /> Review before use
            </span>
            <span className="media-pill">
              <Check aria-hidden="true" size={18} /> Source evidence stays visible
            </span>
          </div>
        </div>
      </article>

      <article className="story story--media-first">
        <div aria-label="Illustrative explanation preview" className="understand-visual" role="img">
          <div className="understand-visual__source">
            <span>VERIFIED SOURCE</span>
            <strong>Follow-up instruction</strong>
            <i />
            <i />
            <i />
          </div>
          <div className="understand-visual__arrow">→</div>
          <div className="understand-visual__explanation">
            <LineChart aria-hidden="true" />
            <span>PLAIN LANGUAGE</span>
            <strong>What this means for your next step</strong>
            <p>Source context and uncertainty remain visible.</p>
          </div>
        </div>
        <div className="story__content">
          <span className="step-number">03</span>
          <h3>I understand my care</h3>
          <p>
            Plain-language explanations help make verified instructions
            easier to discuss with a clinician, pharmacist, or family member.
            They do not create a diagnosis or change treatment.
          </p>
          <QuestionList items={understandingQuestions} />
          <MascotMoment
            cloud="Not sure what it means? Ask your doctor."
            state="understand"
          />
        </div>
      </article>
    </section>
  )
}
