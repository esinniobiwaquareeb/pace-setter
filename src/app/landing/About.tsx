import { CheckCircle2 } from "lucide-react";
import { useSiteContent } from "./SiteContentContext";

export function About() {
  const { about, contact } = useSiteContent();

  return (
    <section id="about" className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="split-card">
          <div className="split-copy">
            <h2>{about.heading}</h2>
            <p>{about.body}</p>

            <div className="trust-list">
              {about.trustPoints.map((item) => (
                <div key={item} className="trust-item">
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a className="button button--primary button--small" href={contact.whatsappPrimary} target="_blank" rel="noreferrer">
              {about.ctaLabel}
            </a>

            <div className="member-strip">
              <div className="member-avatars" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div>
                <strong>{about.memberHeadline}</strong>
                <p>{about.memberLabel}</p>
              </div>
            </div>
          </div>

          <div className="split-media">
            <img src={about.image} alt={about.imageAlt} />
          </div>
        </div>
      </div>
    </section>
  );
}
