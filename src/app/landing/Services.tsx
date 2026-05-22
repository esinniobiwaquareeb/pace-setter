import { SERVICES } from "./content";

export function Services() {
  return (
    <section id="services" className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <h2>Residential, Office, and Commercial Cleaning Services</h2>
          <p>Explore professional cleaning services designed for homes, workplaces, shared buildings, and customer-facing spaces that need to stay clean, healthy, and presentable.</p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <article key={service.title} className="service-card">
              <img src={service.image} alt={service.title} />
              <div className="service-card__body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
