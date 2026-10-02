import { Check, Clock3, FileCheck2, FileText, ShieldCheck } from 'lucide-react'

import { MascotMoment } from './mascot-moment'

export function OrganizedPreview() {
  return (
    <section aria-labelledby="organized-heading" className="organized section">
      <div className="section-heading section-heading--centered">
        <p className="eyebrow">Illustrative product preview</p>
        <h2 id="organized-heading">
          Your health, <em>organized.</em>
        </h2>
        <p>
          A future home for documents, verified facts, reminders, and a
          provenance-aware timeline. This is a static marketing illustration,
          not an implemented dashboard.
        </p>
        <MascotMoment cloud="Everything has an origin" state="understand" />
      </div>

      <div aria-label="Static Vein Health product preview" className="dashboard-preview" role="img">
        <aside className="dashboard-preview__rail">
          <div className="brand-lockup brand-lockup--small">
            <FileCheck2 aria-hidden="true" />
            <span>Vein Health</span>
          </div>
          <span className="dashboard-preview__nav dashboard-preview__nav--active">Overview</span>
          <span className="dashboard-preview__nav">Documents</span>
          <span className="dashboard-preview__nav">Verified facts</span>
          <span className="dashboard-preview__nav">Timeline</span>
        </aside>
        <div className="dashboard-preview__main">
          <div className="dashboard-preview__welcome">
            <div>
              <span>YOUR CARE JOURNEY</span>
              <strong>Good morning</strong>
            </div>
            <span className="preview-chip">Preview only</span>
          </div>
          <div className="dashboard-preview__stats">
            <div><FileText aria-hidden="true" /><span>Documents</span><strong>3</strong></div>
            <div><ShieldCheck aria-hidden="true" /><span>Needs review</span><strong>1</strong></div>
            <div><Check aria-hidden="true" /><span>Verified items</span><strong>8</strong></div>
          </div>
          <div className="dashboard-preview__panels">
            <div className="preview-panel">
              <div className="preview-panel__heading"><strong>Care timeline</strong><span>Source-linked</span></div>
              <div className="timeline-row"><span className="timeline-dot" /><div><strong>Lab result added</strong><span>Today · awaiting review</span></div></div>
              <div className="timeline-row"><span className="timeline-dot timeline-dot--verified" /><div><strong>Prescription verified</strong><span>Sep 28 · source confirmed</span></div></div>
              <div className="timeline-row"><span className="timeline-dot" /><div><strong>Consultation summary</strong><span>Sep 15 · document record</span></div></div>
            </div>
            <div className="preview-panel preview-panel--reminder">
              <Clock3 aria-hidden="true" />
              <span>NEXT STEP</span>
              <strong>Review one flagged field</strong>
              <p>No care action is created until the source detail is confirmed.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
