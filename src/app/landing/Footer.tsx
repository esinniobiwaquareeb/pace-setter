import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone, Twitter } from "lucide-react";
import { NAV_ITEMS } from "./content";
import { useSiteContent } from "./SiteContentContext";
import { Logo } from "./Logo";
import { scrollToSection } from "./utils";

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "X", href: "#", icon: Twitter },
];

export function Footer() {
  const { contact } = useSiteContent();

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

          <a className="button button--primary button--small" href={contact.whatsappPrimary} target="_blank" rel="noreferrer">
            Get a Free Quote
          </a>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2026 {contact.businessName}. All rights reserved.</p>
          <div className="footer-contact">
            <a href={`tel:${contact.phonePrimary.replace(/\s+/g, "")}`}>
              <Phone size={16} />
              {contact.phonePrimary}
            </a>
            <a href={`mailto:${contact.email}`}>
              <Mail size={16} />
              {contact.email}
            </a>
            <a href={contact.whatsappPrimary} target="_blank" rel="noreferrer">
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a href={contact.websiteUrl}>{contact.websiteUrl.replace("https://", "")}</a>
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
