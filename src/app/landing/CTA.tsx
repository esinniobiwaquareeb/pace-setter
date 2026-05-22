import { ArrowRight } from "lucide-react";
import { useSiteContent } from "./SiteContentContext";

export function CTA() {
  const { cta, contact } = useSiteContent();

  return (
    <section className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="cta-panel">
          <h2>{cta.heading}</h2>
          <p>{cta.body}</p>
          <a className="button button--primary button--small" href={contact.whatsappSecondary} target="_blank" rel="noreferrer">
            {cta.buttonLabel}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
