import { useInView } from '../hooks/use-in-view'
import { ContourField } from './contour-field'
import { MascotMoment } from './mascot-moment'

export function OrganizedPreview() {
  const { isInView, ref } = useInView<HTMLElement>()

  return (
    <section aria-labelledby="organized-heading" className="organized section" ref={ref}>
      <ContourField className="section-contours section-contours--organized" />
      <div className="section-heading section-heading--centered">
        <p className="eyebrow">One continuous picture</p>
        <h2 id="organized-heading">
          Your health, <em>organized.</em>
        </h2>
        <p>
          Documents, medications, reminders, and your care timeline, organized
          around what has been verified and what still needs your attention.
        </p>
        <MascotMoment
          cloud="Keep your documents and reminders together."
          state="understand"
        />
      </div>

      <figure className="dashboard-reference" data-active={isInView ? 'true' : 'false'}>
        <div className="dashboard-reference__viewport">
          <picture>
            <source
              srcSet="/assets/landing/dashboard-reference-1600.webp"
              type="image/webp"
            />
            <img
              alt="Vein Health dashboard showing documents, medications, reminders, adherence, today's schedule, and recent documents"
              height="1057"
              loading="lazy"
              src="/assets/landing/dashboard-reference.png"
              width="1902"
            />
          </picture>
          <span aria-hidden="true" className="dashboard-reference__glow" />
        </div>
      </figure>
    </section>
  )
}
