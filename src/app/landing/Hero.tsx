import { useEffect, useState } from "react";
import { useSiteContent } from "./SiteContentContext";
import { scrollToSection } from "./utils";

export function Hero() {
  const { hero } = useSiteContent();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % hero.rotatingWords.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [hero.rotatingWords.length]);

  return (
    <section id="home" className="hero-section section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>
              {hero.headlinePrefix}{" "}
              <span key={hero.rotatingWords[wordIndex]} className="hero-rotating-word">
                {hero.rotatingWords[wordIndex]}
              </span>
            </h1>
            <p className="hero-text">{hero.body}</p>
            <a
              className="button button--primary hero-button"
              href="#book"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("#book");
              }}
            >
              {hero.ctaLabel}
            </a>
          </div>

          <div className="hero-image-wrap">
            <img src={hero.image} alt={hero.imageAlt} />
          </div>
        </div>
      </div>
    </section>
  );
}
