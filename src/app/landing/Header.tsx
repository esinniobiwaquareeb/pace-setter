import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_ITEMS } from "./content";
import { useSiteContent } from "./SiteContentContext";
import { useActiveSection, useScrolled } from "./hooks";
import { Logo } from "./Logo";
import { scrollToSection } from "./utils";

export function Header() {
  const { contact } = useSiteContent();
  const scrolled = useScrolled();
  const [active, setActive] = useActiveSection();
  const [open, setOpen] = useState(false);

  const navigate = (href: string) => {
    setActive(href);
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <div className="shell">
        <div className="topbar">
          <Logo />

          <nav className="nav-desktop" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                type="button"
                className={item.href === active ? "is-active" : ""}
                onClick={() => navigate(item.href)}
              >
                {item.label}
              </button>
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
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open ? (
          <nav className="nav-mobile" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <button key={item.href} type="button" onClick={() => navigate(item.href)}>
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
