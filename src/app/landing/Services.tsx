import { SERVICES } from "./content";

export function Services() {
  return (
    <section id="services" className="section-card">
      <div className="shell">
        <div className="section-heading">
          <h2>Our Services</h2>
          <p>Professional cleaning for any space or occasion.</p>
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
