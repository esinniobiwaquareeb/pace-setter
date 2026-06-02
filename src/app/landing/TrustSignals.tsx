import { CheckCircle2, ClipboardCheck, MapPin, MessageCircle, Sparkles } from "lucide-react";
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

        <div className="trust-showcase">
          <div className="trust-showcase__visual" aria-hidden="true">
            <div className="clean-orbit">
              <span><Sparkles size={24} /></span>
              <strong>Clean</strong>
              <small>quoted, scheduled, delivered</small>
            </div>
          </div>

          <div className="trust-signal-grid">
            {expandedContent.trustSignals.map((signal, index) => {
              const Icon = icons[index % icons.length];
              return (
                <article key={signal.title} className="trust-signal">
                  <span className="trust-signal__icon">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3>{signal.title}</h3>
                    <p>{signal.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
