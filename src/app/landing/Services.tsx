import { useState } from "react";
import { useSiteContent } from "./SiteContentContext";

export function Services() {
  const { servicesIntro, services } = useSiteContent();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex] ?? services[0];

  return (
    <section id="services" className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <h2>{servicesIntro.heading}</h2>
          <p>{servicesIntro.body}</p>
        </div>

        {activeService && (
          <div className="services-showcase">
            <div className="services-showcase__media">
              <img src={activeService.image} alt={activeService.title} />
            </div>
            <div className="services-showcase__copy">
              <span>Featured service</span>
              <h3>{activeService.title}</h3>
              <p>{activeService.description}</p>
              <div className="services-showcase__controls" aria-label="Choose a featured cleaning service">
                {services.slice(0, 5).map((service, index) => (
                  <button
                    key={service.title}
                    type="button"
                    className={
                      index === activeIndex
                        ? "services-showcase__tab services-showcase__tab--active"
                        : "services-showcase__tab"
                    }
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={index === activeIndex}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

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
