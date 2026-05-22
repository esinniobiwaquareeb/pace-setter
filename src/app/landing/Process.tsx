import { useSiteContent } from "./SiteContentContext";

export function Process() {
  const { processIntro, processSteps } = useSiteContent();

  return (
    <section className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <h2>{processIntro.heading}</h2>
          <p>{processIntro.body}</p>
        </div>

        <div className="process-flow" aria-label="Booking process">
          {processSteps.map((step, index) => (
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
