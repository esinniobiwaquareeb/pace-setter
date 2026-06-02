import type { CSSProperties } from "react";
import { useSiteContent } from "./SiteContentContext";

type MeterStyle = CSSProperties & {
  "--meter-index": number;
};

export function QuoteGuide() {
  const { quoteIntro, expandedContent } = useSiteContent();
  const factors = ["Size", "Condition", "Access", "Frequency"];

  return (
    <section className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="quote-guide">
          <div className="quote-guide__intro">
            <h2>{quoteIntro.heading}</h2>
            <p>{quoteIntro.body}</p>
            <div className="quote-meter" aria-label="Quote factors">
              {factors.map((factor, index) => (
                <span key={factor} style={{ "--meter-index": index } as MeterStyle}>
                  {factor}
                </span>
              ))}
            </div>
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
