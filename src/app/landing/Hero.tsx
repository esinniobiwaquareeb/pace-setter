import { WHATSAPP_PRIMARY } from "./content";
import { scrollToSection } from "./utils";

export function Hero() {
  return (
    <section id="home" className="hero-section section-card">
      <div className="shell">
        <div className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">Clean Without Compromise</p>
            <h1>
              We Don&apos;t Just Clean, <span>We Care</span>
            </h1>
            <p className="hero-text">
              From sparkling homes to spotless workplaces, we provide professional cleaning services that
              keep your environment fresh, healthy, and welcoming.
            </p>
            <a
              className="button button--primary hero-button"
              href="#book"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("#book");
              }}
            >
              Book a Cleaning Today
            </a>
          </div>

          <div className="hero-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80"
              alt="Professional cleaners working in a bright office"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
