import { useEffect, useState } from "react";
import { HERO_ROTATING_WORDS } from "./content";
import { scrollToSection } from "./utils";

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % HERO_ROTATING_WORDS.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero-section section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">Professional cleaning services for homes, offices, and commercial spaces</p>
            <h1>
              We Don&apos;t Just Clean,{" "}
              <span key={HERO_ROTATING_WORDS[wordIndex]} className="hero-rotating-word">
                {HERO_ROTATING_WORDS[wordIndex]}
              </span>
            </h1>
            <p className="hero-text">
              Pace Setter Cleaning Services delivers residential cleaning, office cleaning, and commercial cleaning that helps your property look sharper, feel healthier, and stay ready for everyday life or business.
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
