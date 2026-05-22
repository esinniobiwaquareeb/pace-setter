import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Menu, MessageCircle, Phone, Star, X } from "lucide-react";
import paceSetterLogo from "../imports/pace-setter.png";

const SITE_URL = "https://www.pacesettercleaning.co.uk";
const BUSINESS_NAME = "Pace Setter Cleaning Services LTD";
const WHATSAPP_PRIMARY = "https://wa.me/447894239785";
const WHATSAPP_SECONDARY = "https://wa.me/447884310461";
const PHONE_PRIMARY = "+44 7894 239785";
const INFO_EMAIL = "info@pacesettercleaning.co.uk";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Book", href: "#book" },
];

const SERVICES = [
  {
    title: "Residential Cleaning",
    description: "Keep your home fresh with our regular cleaning, covering kitchens, bathrooms, floors, and surfaces.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Office Cleaning",
    description: "Structured cleaning for workspaces to maintain a professional, organized environment with minimal disruption.",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Commercial Cleaning",
    description: "Reliable cleaning for retail and shared buildings to ensure a welcoming experience for staff and visitors.",
    image:
      "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=900&q=80",
  },

];

const REVIEWS = [
  {
    name: "Sarah J.",
    role: "Homeowner",
    text: "Quick, efficient, and genuinely easy to deal with. The team paid attention to details.",
  },
  {
    name: "David R.",
    role: "Small Business Owner",
    text: "Professional team, on time, and very thorough. They handled our office space perfectly.",
  },
  {
    name: "Liya W.",
    role: "Property Manager",
    text: "They went above and beyond to clean every corner. The property looked much better for handover.",
  },
  {
    name: "Mariam T.",
    role: "Tenant",
    text: "Booking was straightforward and communication was clear from start to finish.",
  },
  {
    name: "James K.",
    role: "Facilities Coordinator",
    text: "Reliable support for a busy commercial environment. Clean results, punctual visits.",
  },
  {
    name: "Helen O.",
    role: "Landlord",
    text: "The end-of-tenancy clean made a strong difference. The space looked brighter and fresher.",
  },
];

const TRUST_POINTS = [
  "Affordable packages",
  "100% satisfaction guarantee",
  "Flexible scheduling for homes and workplaces",
  "Clear communication from quote to completion",
];

type FormState = {
  name: string;
  email: string;
  address: string;
  frequency: string;
  phone: string;
  details: string;
};

type SavedBooking = FormState & { createdAt: string };

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  address: "",
  frequency: "",
  phone: "",
  details: "",
};

function scrollToSection(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useScrolled(offset = 12) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}

function useActiveSection() {
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const match = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (match?.target.id) setActive(`#${match.target.id}`);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    sections.forEach((section) => observer.observe(section as Element));
    return () => observer.disconnect();
  }, []);

  return [active, setActive] as const;
}

function Logo() {
  return (
    <button className="brand" type="button" onClick={() => scrollToSection("#home")} aria-label="Go to homepage">
      <img src={paceSetterLogo} alt={BUSINESS_NAME} />
      <span>Pace Setter</span>
    </button>
  );
}

function Header() {
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
            <a className="button button--primary quote-button" href={WHATSAPP_PRIMARY} target="_blank" rel="noreferrer">
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
            <a className="button button--primary" href={WHATSAPP_PRIMARY} target="_blank" rel="noreferrer">
              Get a Free Quote
            </a>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-section section-card">
      <div className="shell">
        <div className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">Clean Without Compromise</p>
            <h1>
              We Don&apos;t Just Clean, <span>We Care</span>
            </h1>
            <p className="hero-text">
              From sparkling homes to spotless workplaces, we provide professional cleaning services that
              keep your environment fresh, healthy, and welcoming.
            </p>
            <a className="button button--primary hero-button" href="#book" onClick={(event) => { event.preventDefault(); scrollToSection("#book"); }}>
              Book a Cleaning Today
            </a>
          </div>

          <div className="hero-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80"
              alt="Professional cleaners working in a bright office"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-card">
      <div className="shell">
        <div className="split-card">
          <div className="split-copy">
            <h2>Why Customers Trust Us</h2>
            <p>
              We provide reliable, affordable, and detail-oriented cleaning. Your satisfaction is our priority.
            </p>

            <div className="trust-list">
              {TRUST_POINTS.map((item) => (
                <div key={item} className="trust-item">
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a className="button button--primary button--small" href={WHATSAPP_PRIMARY} target="_blank" rel="noreferrer">
              Get a Free Quote
            </a>

            <div className="member-strip">
              <div className="member-avatars" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div>
                <strong>Join 500+</strong>
                <p>Satisfied customers</p>
              </div>
            </div>
          </div>

          <div className="split-media">
            <img
              src="https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80"
              alt="Cleaning products and a gloved hand wiping a table"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section-card">
      <div className="shell">
        <div className="section-heading">
          <h2>Our Services</h2>
          <p>Professional cleaning for any space or occasion.</p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <article key={service.title} className="service-card">
              <img src={service.image} alt={service.title} />
              <div className="service-card__body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="section-card">
      <div className="shell">
        <div className="section-heading">
          <h2>What Our Clients Say</h2>
          <p>Read what our happy clients have to say about us.</p>
        </div>

        <div className="reviews-scroller">
          {REVIEWS.map((review) => (
            <article key={review.name} className="review-card">
              <div className="review-stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" />
                ))}
              </div>
              <p>{review.text}</p>
              <div className="review-meta">
                <strong>{review.name}</strong>
                <span>{review.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState("");
  const [savedBookings, setSavedBookings] = useState<SavedBooking[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("pace-setter-bookings");
      if (stored) {
        const parsed = JSON.parse(stored) as SavedBooking[];
        setSavedBookings(parsed.slice(0, 3));
      }
    } catch {
      setSavedBookings([]);
    }
  }, []);

  const canSubmit = useMemo(() => {
    return form.name.trim() && form.phone.trim();
  }, [form]);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!form.phone.trim()) next.phone = "Please enter your phone number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const savedBooking: SavedBooking = {
      ...form,
      createdAt: new Date().toISOString(),
    };

    try {
      const stored = window.localStorage.getItem("pace-setter-bookings");
      const parsed = stored ? (JSON.parse(stored) as SavedBooking[]) : [];
      const next = [savedBooking, ...parsed].slice(0, 20);
      window.localStorage.setItem("pace-setter-bookings", JSON.stringify(next));
      setSavedBookings(next.slice(0, 3));
    } catch {
      // Keep contact flow working even if storage is unavailable.
    }

    const message = [
      `Hello ${BUSINESS_NAME},`,
      "",
      "I would like to request a cleaning quote.",
      `Full Name: ${form.name}`,
      `Email: ${form.email || "Not provided"}`,
      `Property Address: ${form.address || "Not provided"}`,
      `Frequency of Cleaning: ${form.frequency || "Not provided"}`,
      `Phone Number: ${form.phone}`,
      `Comment: ${form.details || "No extra comment"}`,
    ].join("\n");

    const emailSubject = encodeURIComponent(`Cleaning quote request from ${form.name}`);
    const emailBody = encodeURIComponent(message);

    window.open(`${WHATSAPP_PRIMARY}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    window.location.href = `mailto:${INFO_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
    setStatus("Your booking was saved on this device and opened in both WhatsApp and your email app.");
  };

  return (
    <section id="book" className="section-card">
      <div className="shell">
        <div className="booking-card">
          <div className="booking-copy">
            <h2>Let&apos;s Get Started Discuss</h2>
            <p>Fill out the form below and we&apos;ll get back to you with a personalized plan.</p>

            <form className="booking-form" onSubmit={submit} noValidate>
              <div className="form-row form-row--double">
                <Field label="Full Name" value={form.name} onChange={(value) => updateField("name", value)} error={errors.name} />
                <Field label="Email" type="email" value={form.email} onChange={(value) => updateField("email", value)} error={errors.email} />
              </div>

              <div className="form-row">
                <Field label="Property Address" value={form.address} onChange={(value) => updateField("address", value)} />
              </div>

              <div className="form-row form-row--double">
                <Field label="Frequency of Cleaning" value={form.frequency} onChange={(value) => updateField("frequency", value)} />
                <Field label="Phone Number" type="tel" value={form.phone} onChange={(value) => updateField("phone", value)} error={errors.phone} />
              </div>

              <div className="form-row">
                <Field label="Your Comment..." textarea value={form.details} onChange={(value) => updateField("details", value)} />
              </div>

              <div className="booking-actions">
                <button className="button button--primary button--small" type="submit" disabled={!canSubmit}>
                  Submit Your Request
                </button>
                <p>{status || "Submitting saves the booking locally, opens WhatsApp, and drafts an email to info@pacesettercleaning.co.uk."}</p>
              </div>
            </form>

            {savedBookings.length > 0 ? (
              <div className="saved-bookings">
                <strong>Recent saved enquiries</strong>
                <div className="saved-bookings__list">
                  {savedBookings.map((booking) => (
                    <article key={booking.createdAt} className="saved-booking">
                      <span>{booking.name}</span>
                      <small>{booking.address || booking.frequency || "Cleaning request saved locally"}</small>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="booking-media">
            <img
              src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80"
              alt="Cleaner mopping a bright floor near a window"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="field">
      {textarea ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={label} rows={5} />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={label} />
      )}
      {error ? <small>{error}</small> : null}
    </label>
  );
}

function CTA() {
  return (
    <section className="section-card">
      <div className="shell">
        <div className="cta-panel">
          <h2>Ready for a cleaner space?</h2>
          <p>Let us transform your environment into a spotless, stress-free space today.</p>
          <a className="button button--primary button--small" href={WHATSAPP_SECONDARY} target="_blank" rel="noreferrer">
            Book a Cleaning Today
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
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
          <p>Copyright © 2026 {BUSINESS_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.title = "Pace Setter Cleaning Services LTD | Professional Cleaning Across the UK";
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Reviews />
        <Booking />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
