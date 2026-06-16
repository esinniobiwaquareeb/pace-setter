import { Briefcase, Hotel, Home, Sparkles, Shield, Key, Building2, School, Heart, ShoppingBag } from "lucide-react";

const INDUSTRIES = [
  { name: "Offices", icon: Briefcase, desc: "Corporate workspaces, boardrooms, and administrative offices." },
  { name: "Hotels", icon: Hotel, desc: "Guest rooms, lobbies, dining areas, and full hotel venues." },
  { name: "Serviced Apartments", icon: Home, desc: "High-spec cleaning for corporate and leisure guest stays." },
  { name: "Airbnb Hosts", icon: Sparkles, desc: "Fast-turnaround guest prep, linens, and cleaning care." },
  { name: "Property Managers", icon: Shield, desc: "Block management, stairwells, and communal maintenance." },
  { name: "Estate Agents", icon: Key, desc: "Pre-tenancy checks, move-outs, and inspection cleans." },
  { name: "Housing Associations", icon: Building2, desc: "Communal area cleaning and social housing handovers." },
  { name: "Schools", icon: School, desc: "Classrooms, play areas, and staff rooms kept hygienic." },
  { name: "Healthcare Facilities", icon: Heart, desc: "Clinical and outpatient rooms cleaned to clinical standards." },
  { name: "Retail Stores", icon: ShoppingBag, desc: "Shops, showrooms, checkout areas, and storerooms." },
];

export function Industries() {
  return (
    <section id="industries" className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <p className="admin-kicker">Who We Work With</p>
          <h2>Industries We Serve</h2>
          <p>
            From boutique retail spaces to corporate headquarters, we deliver high-standard commercial and contract cleaning.
          </p>
        </div>

        <div className="industries-grid">
          {INDUSTRIES.map((industry) => {
            const Icon = industry.icon;
            return (
              <article key={industry.name} className="industry-card">
                <span className="industry-card__icon">
                  <Icon size={24} />
                </span>
                <h3>{industry.name}</h3>
                <p>{industry.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
