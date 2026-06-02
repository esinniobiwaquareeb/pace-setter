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
            <h2>Cleaning Support for the Spaces That Need It Most</h2>
            <p>
              From homes and offices to rentals, retail spaces, and managed buildings, we shape the clean around the property type and schedule.
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
