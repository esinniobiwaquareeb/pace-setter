import { AREAS } from "./content";

export function Areas() {
  return (
    <section id="areas" className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <h2>Spaces We Commonly Clean</h2>
          <p>We support homes, workplaces, and commercial environments that need dependable cleaning, better presentation, and healthier day-to-day upkeep.</p>
        </div>

        <div className="areas-grid">
          {AREAS.map((area) => (
            <article key={area.title} className="area-card">
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
