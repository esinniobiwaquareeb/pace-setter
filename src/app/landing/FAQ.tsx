import { FAQS } from "./content";

export function FAQ() {
  return (
    <section id="faq" className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <h2>Frequently Asked Questions</h2>
          <p>Helpful answers to the questions people usually ask before booking professional residential, office, or commercial cleaning services.</p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq) => (
            <article key={faq.question} className="faq-card">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
