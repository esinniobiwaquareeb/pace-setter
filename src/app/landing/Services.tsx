import { useSiteContent } from "./SiteContentContext";

export function Services() {
  const { servicesIntro, services } = useSiteContent();

  return (
    <section id="services" className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <h2>{servicesIntro.heading}</h2>
          <p>{servicesIntro.body}</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
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
