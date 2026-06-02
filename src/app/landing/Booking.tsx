import { Phone, Mail, Globe } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { INITIAL_FORM } from "./content";
import { Field } from "./Field";
import { useSiteContent } from "./SiteContentContext";
import type { FormState, SavedBooking } from "./types";

export function Booking() {
  const { booking, contact } = useSiteContent();
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

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      `Hello ${contact.businessName},`,
      "",
      "I would like to request a cleaning quote.",
      `Full Name: ${form.name}`,
      `Email: ${form.email || "Not provided"}`,
      `Property Address: ${form.address || "Not provided"}`,
      `Frequency of Cleaning: ${form.frequency || "Not provided"}`,
      `Phone Number: ${form.phone}`,
      `Comment: ${form.details || "No extra comment"}`,
    ].join("\n");

    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(savedBooking),
      });
    } catch {
      // Keep the outbound contact flow working even if the API is unavailable.
    }

    const emailSubject = encodeURIComponent(`Cleaning quote request from ${form.name}`);
    const emailBody = encodeURIComponent(message);

    window.open(`${contact.whatsappPrimary}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    window.location.href = `mailto:${contact.email}?subject=${emailSubject}&body=${emailBody}`;
    setStatus(booking.successMessage);
  };

  return (
    <section id="book" className="section-card reveal-section" data-reveal>
      <div className="shell">
        <div className="booking-card">
          <div className="booking-copy">
            <h2>{booking.heading}</h2>
            <p>{booking.body}</p>

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
                  {booking.submitLabel}
                </button>
                {status ? <p>{status}</p> : null}
              </div>
            </form>

            {savedBookings.length > 0 ? (
              <div className="saved-bookings">
                <strong>{booking.recentLabel}</strong>
                <div className="saved-bookings__list">
                  {savedBookings.map((savedBooking) => (
                    <article key={savedBooking.createdAt} className="saved-booking">
                      <span>{savedBooking.name}</span>
                      <small>{savedBooking.address || savedBooking.frequency || savedBooking.details || savedBooking.phone || booking.fallbackRecentText}</small>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="booking-media">
            <img src={booking.image} alt={booking.imageAlt} />
            <div className="contact-info-block">
              <h3>Get In Touch</h3>
              <p>Prefer to speak to someone directly? Reach out through any of these channels:</p>
              <div className="contact-info-items">
                <a href={`tel:${contact.phonePrimary.replace(/\s+/g, '')}`} className="contact-info-item">
                  <Phone size={20} />
                  <span>{contact.phonePrimary}</span>
                </a>
                <a href={`mailto:${contact.email}`} className="contact-info-item">
                  <Mail size={20} />
                  <span>{contact.email}</span>
                </a>
                <a href={contact.websiteUrl} className="contact-info-item" target="_blank" rel="noreferrer">
                  <Globe size={20} />
                  <span>pacesettercleaning.co.uk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
