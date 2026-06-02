import { useEffect } from "react";
import { Services } from "../landing/Services";
import { Process } from "../landing/Process";
import { FAQ } from "../landing/FAQ";
import { CTA } from "../landing/CTA";
import { SEO } from "../components/SEO";
import { RichContentBlock } from "../components/RichContentBlock";
import { useSiteContent } from "../landing/SiteContentContext";
import { QuoteGuide } from "../landing/QuoteGuide";
import { ServiceAreas } from "../landing/ServiceAreas";

export function ServicesPage() {
  const { services } = useSiteContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Cleaning Services" 
        description="Residential, office, commercial, deep, end-of-tenancy, and short-let cleaning services with clear quoting and flexible scheduling."
      />
      {/* Quick Overview Grid */}
      <Services />
      <QuoteGuide />

      {/* Deep Dives */}
      <div style={{ padding: "80px 0", background: "var(--brand-surface)" }}>
        <div className="shell">
          <h2 style={{ textAlign: "center", marginBottom: "64px" }}>Detailed Service Breakdown</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {services.map((service, index) => (
            <RichContentBlock
              key={service.title}
              reverse={index % 2 !== 0}
              data={{
                heading: service.title,
                paragraphs: [
                  service.description,
                  "We shape each clean around the property, access, timing, and finish you need, then confirm the details clearly before work begins.",
                ],
                image: service.image,
                imageAlt: service.title,
                features: ["Clear quote process", "Flexible scheduling", "Service scope agreed upfront"]
              }}
            />
          ))}
        </div>
      </div>

      <Process />
      <ServiceAreas />
      <FAQ />
      <CTA />
    </>
  );
}
