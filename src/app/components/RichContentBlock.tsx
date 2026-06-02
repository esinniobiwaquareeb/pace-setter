import { CheckCircle2 } from "lucide-react";
import type { RichTextData } from "../landing/types";

interface Props {
  data: RichTextData;
  reverse?: boolean;
}

export function RichContentBlock({ data, reverse = false }: Props) {
  return (
    <section className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className={`split-card ${reverse ? "split-card--reverse" : ""}`}>
          <div className="split-copy">
            <h2>{data.heading}</h2>
            {data.paragraphs.map((p, i) => (
              <p key={i} style={{ marginBottom: "16px" }}>
                {p}
              </p>
            ))}

            {data.features && data.features.length > 0 && (
              <div className="trust-list" style={{ marginTop: "24px" }}>
                {data.features.map((item) => (
                  <div key={item} className="trust-item">
                    <CheckCircle2 size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="split-media">
            <img src={data.image} alt={data.imageAlt} />
          </div>
        </div>
      </div>
    </section>
  );
}
