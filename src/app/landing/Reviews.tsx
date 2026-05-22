import { Star } from "lucide-react";
import { REVIEWS } from "./content";

export function Reviews() {
  return (
    <section id="reviews" className="section-card">
      <div className="shell">
        <div className="section-heading">
          <h2>What Our Clients Say</h2>
          <p>Read what our happy clients have to say about us.</p>
        </div>

        <div className="reviews-scroller">
          {REVIEWS.map((review) => (
            <article key={review.name} className="review-card">
              <div className="review-stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" />
                ))}
              </div>
              <p>{review.text}</p>
              <div className="review-meta">
                <strong>{review.name}</strong>
                <span>{review.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
