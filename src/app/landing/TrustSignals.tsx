import { CheckCircle2, ClipboardCheck, MapPin, MessageCircle } from "lucide-react";
import { useSiteContent } from "./SiteContentContext";

const icons = [MessageCircle, ClipboardCheck, CheckCircle2, MapPin];

export function TrustSignals() {
  const { trustIntro, expandedContent } = useSiteContent();

  return (
    <section className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <h2>{trustIntro.heading}</h2>
          <p>{trustIntro.body}</p>
        </div>

        <div className="trust-signal-grid">
          {expandedContent.trustSignals.map((signal, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article key={signal.title} className="trust-signal">
                <span className="trust-signal__icon">
                  <Icon size={22} />
                </span>
                <h3>{signal.title}</h3>
                <p>{signal.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
