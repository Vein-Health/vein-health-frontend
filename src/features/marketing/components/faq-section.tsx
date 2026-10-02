import * as Accordion from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'

import { faqGroups } from '../data'
import { MascotMoment } from './mascot-moment'

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="faq section" id="faq">
      <div className="faq__intro">
        <div className="section-heading">
          <p className="eyebrow">Questions, answered carefully</p>
          <h2 id="faq-heading">Common questions</h2>
          <p>
            Clear boundaries now, before authentication, uploads, or care
            workflows are built.
          </p>
        </div>
        <MascotMoment cloud="A good question deserves a clear answer" state="faq" />
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

