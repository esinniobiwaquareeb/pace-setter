import { Star } from "lucide-react";
import { useSiteContent } from "./SiteContentContext";

export function Reviews() {
  const { reviewsIntro, reviews } = useSiteContent();

  return (
    <section id="reviews" className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <h2>{reviewsIntro.heading}</h2>
          <p>{reviewsIntro.body}</p>
        </div>

        <div className="reviews-scroller">
          {reviews.map((review) => (
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
