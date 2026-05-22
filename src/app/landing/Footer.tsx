import { MessageCircle, Phone } from "lucide-react";
import { NAV_ITEMS, PHONE_PRIMARY, SITE_URL, WHATSAPP_PRIMARY, BUSINESS_NAME } from "./content";
import { Logo } from "./Logo";
import { scrollToSection } from "./utils";

export function Footer() {
  return (
    <footer className="site-footer section-card">
      <div className="shell footer-panel">
        <div className="footer-top">
          <Logo />

          <nav className="footer-nav" aria-label="Footer">
            {NAV_ITEMS.map((item) => (
              <button key={item.href} type="button" onClick={() => scrollToSection(item.href)}>
                {item.label}
              </button>
            ))}
          </nav>

          <a className="button button--primary button--small" href={WHATSAPP_PRIMARY} target="_blank" rel="noreferrer">
            Get a Free Quote
          </a>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2026 {BUSINESS_NAME}. All rights reserved.</p>
          <div className="footer-contact">
            <a href={`tel:${PHONE_PRIMARY.replace(/\s+/g, "")}`}>
              <Phone size={16} />
              {PHONE_PRIMARY}
            </a>
            <a href={WHATSAPP_PRIMARY} target="_blank" rel="noreferrer">
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a href={SITE_URL}>{SITE_URL.replace("https://", "")}</a>
          </div>
          <div className="footer-legal" aria-label="Legal links">
            <a href="/privacy-policy.html">Privacy Policy</a>
            <a href="/terms-and-conditions.html">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
