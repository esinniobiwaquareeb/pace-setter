import paceSetterLogo from "../../imports/pace-setter.png";
import { BUSINESS_NAME } from "./content";
import { scrollToSection } from "./utils";

export function Logo() {
  return (
    <button className="brand" type="button" onClick={() => scrollToSection("#home")} aria-label="Go to homepage">
      <img src={paceSetterLogo} alt={BUSINESS_NAME} />
      <span>Pace Setter</span>
    </button>
  );
}
