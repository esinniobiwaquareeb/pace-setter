import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FAQS } from "./content";

export function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(0);

  return (
    <section id="faq" className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <h2>Frequently Asked Questions</h2>
          <p>Helpful answers to the questions people usually ask before booking professional residential, office, or commercial cleaning services.</p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <article key={faq.question} className={`faq-card${openQuestion === index ? " is-open" : ""}`}>
              <button
                type="button"
                className="faq-trigger"
                aria-expanded={openQuestion === index}
                onClick={() => setOpenQuestion((current) => (current === index ? -1 : index))}
              >
                <span>{faq.question}</span>
                <ChevronDown size={18} />
              </button>

              <div className="faq-answer" hidden={openQuestion !== index}>
                <p>{faq.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
