import { useSiteContent } from "./SiteContentContext";

export function QuoteGuide() {
  const { quoteIntro, expandedContent } = useSiteContent();

  return (
    <section className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="quote-guide">
          <div className="quote-guide__intro">
            <h2>{quoteIntro.heading}</h2>
            <p>{quoteIntro.body}</p>
          </div>

          <div className="quote-guide__list">
            {expandedContent.quoteGuides.map((item) => (
              <article key={item.title} className="quote-guide__item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
