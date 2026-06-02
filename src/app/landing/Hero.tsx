import { useEffect, useState } from "react";
import { useSiteContent } from "./SiteContentContext";
import { scrollToSection } from "./utils";

export function Hero() {
  const { hero } = useSiteContent();
  const [wordIndex, setWordIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const gallery = hero.gallery?.length ? hero.gallery : [
    {
      label: "Professional cleaning",
      title: "Clean spaces, ready for life and work",
      image: hero.image,
      imageAlt: hero.imageAlt,
    },
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % hero.rotatingWords.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [hero.rotatingWords.length]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setGalleryIndex((current) => (current + 1) % gallery.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [gallery.length]);

  const activeGalleryItem = gallery[galleryIndex];

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
            <div className="hero-actions">
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
              <a className="hero-link" href="tel:+447894239785">
                Call for a quick quote
              </a>
            </div>
            <div className="hero-proof" aria-label="Cleaning service options">
              <span>Residential</span>
              <span>Office</span>
              <span>Commercial</span>
              <span>End of tenancy</span>
            </div>
          </div>

          <div className="hero-gallery" aria-label="Cleaning service highlights">
            <div className="hero-gallery__main">
              <img src={activeGalleryItem.image} alt={activeGalleryItem.imageAlt} />
              <div className="hero-gallery__caption">
                <span>{activeGalleryItem.label}</span>
                <strong>{activeGalleryItem.title}</strong>
              </div>
            </div>

            <div className="hero-gallery__side" aria-label="Select cleaning highlight">
              {gallery.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={index === galleryIndex ? "hero-thumb hero-thumb--active" : "hero-thumb"}
                  onClick={() => setGalleryIndex(index)}
                  aria-pressed={index === galleryIndex}
                >
                  <img src={item.image} alt="" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
