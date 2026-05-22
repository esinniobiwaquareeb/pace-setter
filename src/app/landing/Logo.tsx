import { useSiteContent } from "./SiteContentContext";
import { scrollToSection } from "./utils";

export function Logo() {
  const { contact } = useSiteContent();

  return (
    <button className="brand" type="button" onClick={() => scrollToSection("#home")} aria-label="Go to homepage">
      <img src="/pace-setter-logo.png" alt={contact.businessName} />
      <span className="brand-text">
        <strong>
          <span className="brand-text__pace">Pace</span>{" "}
          <span className="brand-text__setter">Setter</span>
        </strong>
        <small>Cleaning Service</small>
      </span>
    </button>
  );
}
