import { BOOKING_STEPS } from "./content";

export function Process() {
  return (
    <section className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <h2>How Booking Works</h2>
          <p>A simple three-step process that helps visitors understand what happens next and makes enquiries feel lower-risk.</p>
        </div>

        <div className="process-grid">
          {BOOKING_STEPS.map((step, index) => (
            <article key={step.title} className="process-card">
              <span>{`0${index + 1}`}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
