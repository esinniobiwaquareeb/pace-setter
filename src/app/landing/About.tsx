import { CheckCircle2 } from "lucide-react";
import { TRUST_POINTS, WHATSAPP_PRIMARY } from "./content";

export function About() {
  return (
    <section id="about" className="section-card">
      <div className="shell">
        <div className="split-card">
          <div className="split-copy">
            <h2>Trusted Cleaning Services With Professional Standards</h2>
            <p>
              Pace Setter Cleaning Services LTD provides reliable residential cleaning, office cleaning, and commercial cleaning with a strong focus on detail, presentation, and customer satisfaction. We help homes feel fresher, workplaces stay professional, and properties remain ready for visitors, clients, tenants, or handover.
            </p>

            <div className="trust-list">
              {TRUST_POINTS.map((item) => (
                <div key={item} className="trust-item">
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a className="button button--primary button--small" href={WHATSAPP_PRIMARY} target="_blank" rel="noreferrer">
              Get a Free Quote
            </a>

            <div className="member-strip">
              <div className="member-avatars" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div>
                <strong>Join 500+</strong>
                <p>Satisfied clients</p>
              </div>
            </div>
          </div>

          <div className="split-media">
            <img
              src="https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80"
              alt="Cleaning products and a gloved hand wiping a table"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
