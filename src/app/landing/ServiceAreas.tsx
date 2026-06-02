import { MapPin } from "lucide-react";
import { useSiteContent } from "./SiteContentContext";

export function ServiceAreas() {
  const { expandedContent } = useSiteContent();

  return (
    <section className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="service-areas">
          <div>
            <p className="admin-kicker">Service Areas</p>
            <h2>Cleaning Support Across Key UK Locations</h2>
            <p>
              Cleaning is a local service, so Pace Setter should keep tightening this list around the exact areas it serves best. These locations are CMS-managed and can be narrowed as the business grows.
            </p>
          </div>

          <div className="service-area-list">
            {expandedContent.serviceAreas.map((area) => (
              <span key={area}>
                <MapPin size={15} />
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
