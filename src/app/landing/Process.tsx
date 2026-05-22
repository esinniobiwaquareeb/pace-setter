import { BOOKING_STEPS } from "./content";

export function Process() {
  return (
    <section className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <h2>How Booking Works</h2>
          <p>A simple three-step process that helps visitors understand what happens next and makes enquiries feel lower-risk.</p>
        </div>

        <div className="process-flow" aria-label="Booking process">
          {BOOKING_STEPS.map((step, index) => (
            <article key={step.title} className="process-stage">
              <div className="process-stage__top">
                <span>{`0${index + 1}`}</span>
                <div className="process-stage__line" aria-hidden="true" />
              </div>

              <div className="process-stage__body">
                <p className="process-stage__eyebrow">{index === 0 ? "Start here" : index === 1 ? "Fast follow-up" : "Booked in"}</p>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
