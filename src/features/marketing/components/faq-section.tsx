import * as Accordion from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'

import { faqGroups } from '../data'
import { MascotMoment } from './mascot-moment'
import { ContourField } from './contour-field'

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="faq section" id="faq">
      <ContourField className="section-contours section-contours--faq" />
      <div className="faq__intro">
        <div className="section-heading">
          <p className="eyebrow">Questions, answered carefully</p>
          <h2 id="faq-heading">Common questions</h2>
          <p>
            Straight answers about how Vein Health handles your care, your
            information, and the limits of an AI companion.
          </p>
        </div>
        <MascotMoment cloud="No health question is silly." state="faq" />
      </div>

      <Accordion.Root className="faq-accordion" collapsible type="single">
        {faqGroups.flatMap((group) => [
          <h3 className="faq-accordion__category" key={`${group.category}-heading`}>
            {group.category}
          </h3>,
          ...group.items.map((item) => (
            <Accordion.Item className="faq-accordion__item" key={item.id} value={item.id}>
              <Accordion.Header>
                <Accordion.Trigger className="faq-accordion__trigger">
                  <span>{item.question}</span>
                  <Plus aria-hidden="true" className="faq-accordion__icon" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="faq-accordion__content">
                <p>{item.answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          )),
        ])}
      </Accordion.Root>
    </section>
  )
}
