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
              onClick={() => setOpen((value) => !value)}
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
