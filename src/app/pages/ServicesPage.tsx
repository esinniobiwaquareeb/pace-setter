import { useEffect } from "react";
import { Services } from "../landing/Services";
import { Process } from "../landing/Process";
import { FAQ } from "../landing/FAQ";
import { CTA } from "../landing/CTA";
import { SEO } from "../components/SEO";
import { RichContentBlock } from "../components/RichContentBlock";
import { useSiteContent } from "../landing/SiteContentContext";

export function ServicesPage() {
  const { services } = useSiteContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Cleaning Services" 
        description="Comprehensive cleaning solutions for residential, office, and commercial spaces. Tailored packages starting at competitive rates."
      />
      {/* Quick Overview Grid */}
      <Services />

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
                paragraphs: [service.description, "All our services come with a 100% satisfaction guarantee. We provide our own professional-grade equipment and eco-friendly products upon request."],
                image: service.image,
                imageAlt: service.title,
                features: ["Fully vetted & insured cleaners", "Flexible scheduling", "Satisfaction Guaranteed"]
              }}
            />
          ))}
        </div>
      </div>

      <Process />
      <FAQ />
      <CTA />
    </>
  );
}
