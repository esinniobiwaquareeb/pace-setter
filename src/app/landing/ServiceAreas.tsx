import { MapPin, Building } from "lucide-react";
import { useSiteContent } from "./SiteContentContext";

export function ServiceAreas() {
  const { expandedContent, contact } = useSiteContent();

  return (
    <section className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="service-areas-layout">
          {/* Areas We Cover & Offices column */}
          <div className="service-areas-left">
            <p className="admin-kicker">Our Coverage</p>
            <h2>Areas We Cover</h2>
            <p className="coverage-intro">
              Providing premium residential, commercial, and contract cleaning services across major UK regions.
            </p>

            <div className="coverage-cities">
              <span className="coverage-city">London</span>
              <span className="coverage-city">Liverpool</span>
            </div>

            <div className="office-locations">
              <div className="office-card">
                <div className="office-card__header">
                  <Building size={18} className="office-icon" />
                  <h3>Head Office (London)</h3>
                </div>
                <p>{contact.addressLondon || "Flat 15 St. Matthews House, Phelp Street, London, England, SE17 2PJ"}</p>
              </div>

              <div className="office-card">
                <div className="office-card__header">
                  <Building size={18} className="office-icon" />
                  <h3>Operations (Liverpool)</h3>
                </div>
                <p>{contact.addressLiverpool || "75 Gentwood Road, Liverpool, Merseyside, L36 2QJ"}</p>
              </div>
            </div>
          </div>

          {/* Environments column */}
          <div className="service-areas-right">
            <p className="admin-kicker">Environments</p>
            <h2>Cleaning Support for Spaces That Need It Most</h2>
            <p>
              From corporate offices to serviced apartments, we shape the clean around the property type and schedule.
            </p>

            <div className="service-area-list">
              {expandedContent.serviceAreas.map((area) => (
                <span key={area} className="environment-pill">
                  <MapPin size={15} />
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
