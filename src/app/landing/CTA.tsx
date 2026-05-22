import { ArrowRight } from "lucide-react";
import { WHATSAPP_SECONDARY } from "./content";

export function CTA() {
  return (
    <section className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="cta-panel">
          <h2>Ready to Book Professional Cleaning Services?</h2>
          <p>Speak with Pace Setter Cleaning Services today for reliable residential cleaning, office cleaning, and commercial cleaning tailored to your schedule and property needs.</p>
          <a className="button button--primary button--small" href={WHATSAPP_SECONDARY} target="_blank" rel="noreferrer">
            Book a Cleaning Today
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
