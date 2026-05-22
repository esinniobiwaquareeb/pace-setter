import { useEffect, useMemo, useState } from "react";
import { BUSINESS_NAME, INFO_EMAIL, INITIAL_FORM, WHATSAPP_PRIMARY } from "./content";
import { Field } from "./Field";
import type { FormState, SavedBooking } from "./types";

export function Booking() {
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
            <p>Your home and workplace deserve the best cleaning care. Fill out the form and we&apos;ll get back to you with a personalized plan.</p>

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
                {status ? <p>{status}</p> : null}
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
