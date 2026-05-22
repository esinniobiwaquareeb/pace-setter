import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone, Twitter } from "lucide-react";
import { NAV_ITEMS, PHONE_PRIMARY, SITE_URL, WHATSAPP_PRIMARY, BUSINESS_NAME, INFO_EMAIL } from "./content";
import { Logo } from "./Logo";
import { scrollToSection } from "./utils";

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "X", href: "#", icon: Twitter },
];

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
            <a href={`mailto:${INFO_EMAIL}`}>
              <Mail size={16} />
              {INFO_EMAIL}
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
          <div className="footer-social" aria-label="Social links">
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.label} href={item.href} aria-label={item.label}>
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
