import { ArrowRight } from "lucide-react";
import { WHATSAPP_SECONDARY } from "./content";

export function CTA() {
  return (
    <section className="section-card">
      <div className="shell">
        <div className="cta-panel">
          <h2>Ready for a cleaner space?</h2>
          <p>Let us transform your environment into a spotless, stress-free space today.</p>
          <a className="button button--primary button--small" href={WHATSAPP_SECONDARY} target="_blank" rel="noreferrer">
            Book a Cleaning Today
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
