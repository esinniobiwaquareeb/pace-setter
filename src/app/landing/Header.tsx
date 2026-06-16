import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { NAV_ITEMS } from "./content";
import { useSiteContent } from "./SiteContentContext";
import { useScrolled } from "./hooks";
import { Logo } from "./Logo";

export function Header() {
  const { contact } = useSiteContent();
  const scrolled = useScrolled();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigate = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      {/* Pronounced Top Bar for Contact Info */}
      <div className="top-bar-contact">
        <div className="shell top-bar-contact-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "16px", fontSize: "13px", fontWeight: "500", flexWrap: "wrap" }}>
            <span style={{ opacity: 0.85 }}>Call or WhatsApp:</span>
            <a href={`https://wa.me/${contact.phonePrimary.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <strong>{contact.phonePrimary}</strong>
            </a>
            <span style={{ opacity: 0.5 }}>|</span>
            <a href={`https://wa.me/${contact.phoneSecondary.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <strong>{contact.phoneSecondary}</strong>
            </a>
          </div>
          <div className="hide-on-mobile" style={{ display: "flex", gap: "16px", fontSize: "13px", alignItems: "center" }}>
            <a href={`mailto:${contact.email}`}>
              <span style={{ opacity: 0.85 }}>Email:</span> {contact.email}
            </a>
            <span style={{ opacity: 0.5 }}>|</span>
            <span style={{ opacity: 0.9 }}>London & Liverpool</span>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="topbar">
          <Link to="/" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="nav-desktop" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={item.href === location.pathname ? "is-active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="topbar-actions">
            <a className="button button--primary quote-button" href={contact.whatsappPrimary} target="_blank" rel="noreferrer">
              Get a Free Quote
            </a>

            <button
              type="button"
              className="menu-button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((value: any) => !value)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open ? (
          <nav className="nav-mobile" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                type="button"
                className={item.href === location.pathname ? "is-active" : ""}
                onClick={() => handleNavigate(item.href)}
              >
                {item.label}
              </button>
            ))}
            <a className="button button--primary" href={contact.whatsappPrimary} target="_blank" rel="noreferrer">
              Get a Free Quote
            </a>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
