import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone, Youtube } from "lucide-react";
import { Link } from "react-router";
import { useSiteContent } from "./SiteContentContext";
import { Logo } from "./Logo";

const Tiktok = (props: { size?: number }) => (
  <svg
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function Footer() {
  const { contact, services } = useSiteContent();

  const socialLinks = [
    { label: "Facebook", href: contact.facebook || "#", icon: Facebook },
    { label: "Instagram", href: contact.instagram || "#", icon: Instagram },
    { label: "LinkedIn", href: contact.linkedin || "#", icon: Linkedin },
    { label: "TikTok", href: contact.tiktok || "#", icon: Tiktok },
    { label: "YouTube", href: contact.youtube || "#", icon: Youtube },
  ];

  return (
    <footer className="site-footer section-card">
      <div className="shell footer-panel">
        <div className="footer-grid">
          {/* Column 1: Brand & Socials */}
          <div className="footer-col footer-brand-col">
            <Link to="/">
              <Logo />
            </Link>
            <p className="footer-brand-desc">
              Professional, reliable, and detail-focused cleaning services across London and Liverpool. Fully insured and satisfaction guaranteed.
            </p>
            <div className="footer-social" aria-label="Social links">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="footer-col">
            <h3>Our Services</h3>
            <ul className="footer-links-list">
              {services.map((service) => (
                <li key={service.title}>
                  <Link to="/services">{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Coverage & Addresses */}
          <div className="footer-col">
            <h3>Locations</h3>
            <p className="footer-coverage-title">Areas We Cover:</p>
            <div className="footer-coverage-cities">
              <span>London</span> • <span>Liverpool</span>
            </div>
            
            <div className="footer-office-addresses">
              <div className="footer-address">
                <strong>London (Head Office):</strong>
                <p>{contact.addressLondon}</p>
              </div>
              <div className="footer-address">
                <strong>Liverpool (Operations):</strong>
                <p>{contact.addressLiverpool}</p>
              </div>
            </div>
          </div>

          {/* Column 4: Contact info */}
          <div className="footer-col">
            <h3>Contact Us</h3>
            <div className="footer-contact-info">
              <a href={`tel:${contact.phonePrimary.replace(/\s+/g, "")}`}>
                <Phone size={16} />
                <span>{contact.phonePrimary}</span>
              </a>
              <a href={`tel:${contact.phoneSecondary.replace(/\s+/g, "")}`}>
                <Phone size={16} />
                <span>{contact.phoneSecondary}</span>
              </a>
              <a href={contact.whatsappPrimary} target="_blank" rel="noreferrer">
                <MessageCircle size={16} />
                <span>WhatsApp Line 1</span>
              </a>
              <a href={contact.whatsappSecondary} target="_blank" rel="noreferrer">
                <MessageCircle size={16} />
                <span>WhatsApp Line 2</span>
              </a>
              <a href={`mailto:${contact.email}`}>
                <Mail size={16} />
                <span>{contact.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>Copyright © 2026 {contact.businessName}. All rights reserved.</p>
          <div className="footer-legal" aria-label="Legal links">
            <a href="/privacy-policy.html">Privacy Policy</a>
            <a href="/terms-and-conditions.html">Terms & Conditions</a>
            <Link to="/careers">Careers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
