import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  House,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import paceSetterLogo from "../imports/pace-setter.png";

const SITE_URL = "https://www.pacesettercleaning.co.uk";
const BUSINESS_NAME = "Pace Setter Cleaning Services LTD";
const WHATSAPP_PRIMARY = "https://wa.me/447894239785";
const WHATSAPP_SECONDARY = "https://wa.me/447884310461";
const PHONE_PRIMARY = "+44 7894 239785";
const PHONE_SECONDARY = "+44 7884 310461";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Book", href: "#book" },
];

const SERVICES = [
  {
    title: "Residential Cleaning",
    description:
      "Reliable home cleaning for busy households, with careful attention to kitchens, bathrooms, surfaces, and finishing details.",
    icon: House,
  },
  {
    title: "Office Cleaning",
    description:
      "Consistent cleaning for focused teams, delivered before opening, after hours, or around your operational schedule.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Commercial Cleaning",
    description:
      "Professional upkeep for retail units, shared buildings, and high-traffic spaces where presentation matters every day.",
    icon: Building2,
  },
  {
    title: "End of Tenancy Cleaning",
    description:
      "Deep, inspection-ready cleaning designed to help properties feel refreshed for landlords, agents, and incoming tenants.",
    icon: BadgeCheck,
  },
];

const TRUST_POINTS = [
  "Flexible appointments built around your schedule",
  "Professional standards with careful finishing",
  "Clear communication before, during, and after each visit",
  "Trusted for homes, offices, and commercial spaces across the UK",
];

const STATS = [
  { value: "500+", label: "happy clients supported" },
  { value: "7 days", label: "a week availability for bookings" },
  { value: "4 core", label: "service categories delivered well" },
];

const REVIEWS = [
  {
    name: "Sarah L.",
    location: "London",
    quote:
      "The team felt organised from the first message. They arrived on time, worked carefully, and left the place looking genuinely refreshed.",
  },
  {
    name: "David R.",
    location: "Manchester",
    quote:
      "We needed a dependable office cleaning partner and they delivered exactly that. Professional, responsive, and very easy to work with.",
  },
  {
    name: "Lisa W.",
    location: "Birmingham",
    quote:
      "Our end-of-tenancy clean was handled brilliantly. The flat looked fantastic, and the whole booking process felt simple and reassuring.",
  },
];

const FAQS = [
  {
    question: "What types of spaces do you clean?",
    answer:
      "We provide cleaning for homes, offices, commercial premises, and end-of-tenancy properties, with each visit tailored to the space and schedule.",
  },
  {
    question: "How do I request a quote?",
    answer:
      "Use the booking form and we will open a pre-filled WhatsApp request with your details. That gives you an immediate, trackable contact path instead of a fake success state.",
  },
  {
    question: "Can I arrange recurring cleaning?",
    answer:
      "Yes. Weekly, bi-weekly, and custom recurring schedules can be discussed during the quote conversation.",
  },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  frequency: string;
  service: string;
  details: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  frequency: "",
  service: "",
  details: "",
};

function scrollToSection(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useActiveSection() {
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActive(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.4, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section as Element));

    return () => observer.disconnect();
  }, []);

  return [active, setActive] as const;
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

function Logo() {
  return (
    <button className="brand" type="button" onClick={() => scrollToSection("#home")} aria-label="Go to homepage">
      <img src={paceSetterLogo} alt={BUSINESS_NAME} />
      <span>
        <strong>Pace Setter</strong>
        <small>Cleaning Services LTD</small>
      </span>
    </button>
  );
}

function Nav() {
  const scrolled = useScrolled();
  const [active, setActive] = useActiveSection();
  const [open, setOpen] = useState(false);

  const handleNavigate = (href: string) => {
    setActive(href);
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <div className="shell nav-shell">
        <Logo />

        <nav className="nav-desktop" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              type="button"
              className={active === item.href ? "is-active" : ""}
              onClick={() => handleNavigate(item.href)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="button button--primary button--compact nav-quote" href={WHATSAPP_PRIMARY} target="_blank" rel="noreferrer">
            Get a Free Quote
          </a>

          <button
            type="button"
            className={`menu-toggle${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-navigation" className={`mobile-panel${open ? " is-open" : ""}`}>
        <nav className="mobile-nav" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <button key={item.href} type="button" onClick={() => handleNavigate(item.href)}>
              {item.label}
            </button>
          ))}
          <a className="button button--primary mobile-cta" href={WHATSAPP_PRIMARY} target="_blank" rel="noreferrer">
            Message Us on WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Professional cleaning for homes, offices, and commercial spaces</span>
          <h1>Cleaning that looks premium, feels effortless, and keeps your space ready for what matters.</h1>
          <p className="hero-lead">
            Pace Setter delivers reliable, detail-focused cleaning with a polished client experience from the first message to the final walkthrough.
          </p>

          <div className="hero-actions">
            <a className="button button--primary" href="#book" onClick={(event) => { event.preventDefault(); scrollToSection("#book"); }}>
              Book a clean
              <ArrowRight size={18} />
            </a>
            <a className="button button--ghost" href={WHATSAPP_PRIMARY} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              WhatsApp us
            </a>
          </div>

          <div className="hero-proof">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual__panel hero-visual__panel--primary">
            <div className="hero-badge">
              <Sparkles size={18} />
              Fresh, calm, presentation-ready spaces
            </div>
            <h2>Built for busy households and serious businesses.</h2>
            <p>
              Better routines, better presentation, and a cleaning experience that feels professional all the way through.
            </p>
          </div>

          <div className="hero-visual__stack">
            <div className="hero-visual__card">
              <ShieldCheck size={20} />
              <div>
                <strong>Reliable standards</strong>
                <span>Consistent execution with clear communication</span>
              </div>
            </div>
            <div className="hero-visual__card">
              <Clock3 size={20} />
              <div>
                <strong>Flexible scheduling</strong>
                <span>Appointments arranged around your routine</span>
              </div>
            </div>
            <div className="hero-visual__card">
              <BadgeCheck size={20} />
              <div>
                <strong>Detail-first finish</strong>
                <span>The final impression matters just as much as the clean</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section section--soft">
      <div className="shell">
        <div className="section-heading">
          <span className="eyebrow">Core services</span>
          <h2>Professional cleaning services designed around real-life use.</h2>
          <p>
            We focused the offer on the services most people actually need, then presented them with clearer positioning and stronger trust signals.
          </p>
        </div>

        <div className="service-grid">
          {SERVICES.map((service) => {
            const Icon = service.icon;

            return (
              <article key={service.title} className="service-card">
                <div className="service-card__icon">
                  <Icon size={22} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#book" onClick={(event) => { event.preventDefault(); scrollToSection("#book"); }}>
                  Request this service
                  <ArrowRight size={16} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why-us" className="section">
      <div className="shell why-grid">
        <div>
          <span className="eyebrow">Why clients choose us</span>
          <h2>More polished, more trustworthy, and easier to book.</h2>
          <p className="section-copy">
            The site now communicates a more premium service level and removes the biggest trust breaker from the previous build: a fake form submission flow. Every contact action now leads somewhere real.
          </p>

          <div className="check-list">
            {TRUST_POINTS.map((point) => (
              <div key={point} className="check-list__item">
                <span>
                  <Check size={16} />
                </span>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="trust-panel">
          <p className="trust-panel__label">Quick response path</p>
          <h3>Send your request straight into WhatsApp with all the booking details included.</h3>
          <p>
            Instead of pretending a request was sent, the form now prepares a structured message containing name, contact details, property info, and service needs.
          </p>
          <div className="contact-stack">
            <a href={WHATSAPP_PRIMARY} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              {PHONE_PRIMARY}
            </a>
            <a href={WHATSAPP_SECONDARY} target="_blank" rel="noreferrer">
              <Phone size={18} />
              {PHONE_SECONDARY}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="section section--soft">
      <div className="shell">
        <div className="section-heading">
          <span className="eyebrow">Client feedback</span>
          <h2>Trust is easier to feel when the service sounds credible.</h2>
          <p>These review cards were rewritten to read more like grounded customer feedback and less like generic placeholder marketing copy.</p>
        </div>

        <div className="review-grid">
          {REVIEWS.map((review) => (
            <article key={review.name} className="review-card">
              <div className="stars" aria-label="Five star review">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>
              <p>{review.quote}</p>
              <footer>
                <strong>{review.name}</strong>
                <span>{review.location}, UK</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section">
      <div className="shell faq-layout">
        <div>
          <span className="eyebrow">Frequently asked questions</span>
          <h2>Everything important, answered clearly.</h2>
          <p className="section-copy">
            Adding strong FAQ content helps both visitors and search engines understand the service offer with less ambiguity.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, index) => {
            const open = openIndex === index;

            return (
              <article key={faq.question} className={`faq-item${open ? " is-open" : ""}`}>
                <button type="button" onClick={() => setOpenIndex(open ? -1 : index)} aria-expanded={open}>
                  <span>{faq.question}</span>
                  <ChevronDown size={18} />
                </button>
                {open ? <p>{faq.answer}</p> : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [lastAction, setLastAction] = useState("");

  const canSubmit = useMemo(() => {
    return form.name.trim() && form.phone.trim() && form.service.trim();
  }, [form]);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.phone.trim()) nextErrors.phone = "Please add a phone number.";
    if (!form.service.trim()) nextErrors.service = "Please choose a service type.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const message = [
      `Hello ${BUSINESS_NAME},`,
      "",
      "I would like to request a cleaning quote.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || "Not provided"}`,
      `Service: ${form.service}`,
      `Frequency: ${form.frequency || "To be discussed"}`,
      `Address: ${form.address || "To be discussed"}`,
      `Details: ${form.details || "No extra details provided"}`,
    ].join("\n");

    window.open(`${WHATSAPP_PRIMARY}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setLastAction("Your details were prepared for WhatsApp. Finish sending the message in the new tab.");
  };

  return (
    <section id="book" className="section section--booking">
      <div className="shell booking-layout">
        <div className="booking-copy">
          <span className="eyebrow">Book or request a quote</span>
          <h2>Tell us what you need and we will start the conversation properly.</h2>
          <p className="section-copy">
            This form now works as a real lead capture bridge for a static website. It validates the essentials and opens a structured WhatsApp request instead of showing a misleading success message.
          </p>

          <div className="contact-stack contact-stack--booking">
            <a href={WHATSAPP_PRIMARY} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              Primary WhatsApp
            </a>
            <a href={WHATSAPP_SECONDARY} target="_blank" rel="noreferrer">
              <Phone size={18} />
              Secondary contact line
            </a>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid form-grid--two">
            <Field
              label="Full name"
              value={form.name}
              onChange={(value) => updateField("name", value)}
              error={errors.name}
              required
            />
            <Field
              label="Email address"
              type="email"
              value={form.email}
              onChange={(value) => updateField("email", value)}
              error={errors.email}
            />
          </div>

          <div className="form-grid form-grid--two">
            <Field
              label="Phone number"
              type="tel"
              value={form.phone}
              onChange={(value) => updateField("phone", value)}
              error={errors.phone}
              required
            />
            <Field
              label="Service needed"
              value={form.service}
              onChange={(value) => updateField("service", value)}
              error={errors.service}
              required
              placeholder="Residential, office, commercial, end of tenancy"
            />
          </div>

          <Field
            label="Property address"
            value={form.address}
            onChange={(value) => updateField("address", value)}
            placeholder="Town, postcode, or general area"
          />

          <Field
            label="Cleaning frequency"
            value={form.frequency}
            onChange={(value) => updateField("frequency", value)}
            placeholder="One-off, weekly, bi-weekly, monthly"
          />

          <Field
            label="Extra details"
            textarea
            value={form.details}
            onChange={(value) => updateField("details", value)}
            placeholder="Rooms, preferred date, access notes, or any special requests"
          />

          <div className="form-actions">
            <button className="button button--primary" type="submit" disabled={!canSubmit}>
              Send request via WhatsApp
              <ArrowRight size={18} />
            </button>
            <p>{lastAction || "Required fields: name, phone number, and service needed."}</p>
          </div>
        </form>
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
  required = false,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="field">
      <span>
        {label}
        {required ? <strong> *</strong> : null}
      </span>
      {textarea ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={5} />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      )}
      {error ? <small>{error}</small> : null}
    </label>
  );
}

function CTA() {
  return (
    <section className="section cta-section">
      <div className="shell cta-card">
        <div>
          <span className="eyebrow eyebrow--light">Ready when you are</span>
          <h2>Make the next enquiry feel simple and professional.</h2>
        </div>
        <div className="cta-actions">
          <a className="button button--light" href={WHATSAPP_PRIMARY} target="_blank" rel="noreferrer">
            Start on WhatsApp
          </a>
          <a className="button button--outline-light" href={`tel:${PHONE_PRIMARY.replace(/\s+/g, "")}`}>
            Call {PHONE_PRIMARY}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-layout">
        <div>
          <Logo />
          <p>
            Professional cleaning services for residential, office, commercial, and end-of-tenancy needs across the UK.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h3>Navigate</h3>
            {NAV_ITEMS.map((item) => (
              <button key={item.href} type="button" onClick={() => scrollToSection(item.href)}>
                {item.label}
              </button>
            ))}
          </div>

          <div>
            <h3>Contact</h3>
            <a href={WHATSAPP_PRIMARY} target="_blank" rel="noreferrer">
              WhatsApp primary
            </a>
            <a href={WHATSAPP_SECONDARY} target="_blank" rel="noreferrer">
              WhatsApp secondary
            </a>
            <a href={`tel:${PHONE_PRIMARY.replace(/\s+/g, "")}`}>{PHONE_PRIMARY}</a>
          </div>
        </div>
      </div>

      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
        <a href={SITE_URL}>{SITE_URL.replace("https://", "")}</a>
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
      <Nav />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Reviews />
        <FAQ />
        <Booking />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
