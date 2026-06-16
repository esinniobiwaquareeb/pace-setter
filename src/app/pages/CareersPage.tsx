import { useEffect, useState, useMemo } from "react";
import { Phone, Mail, MapPin, Briefcase, Calendar, Award } from "lucide-react";
import { useSiteContent } from "../landing/SiteContentContext";
import { SEO } from "../components/SEO";
import { Field } from "../landing/Field";
import type { JobApplication } from "../landing/types";

export function CareersPage() {
  const { contact } = useSiteContent();
  const [form, setForm] = useState<JobApplication>({
    name: "",
    email: "",
    phone: "",
    role: "Residential Cleaner",
    location: "London",
    availability: "Flexible",
    experience: "Yes",
    notes: "",
    cvName: "",
    cvBase64: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof JobApplication, string>>>({});
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canSubmit = useMemo(() => {
    return form.name.trim() && form.phone.trim() && form.email.trim();
  }, [form]);

  const updateField = (key: keyof JobApplication, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setFileError("Please upload a PDF file.");
        setForm((current) => ({ ...current, cvName: "", cvBase64: "" }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setFileError("File size must be under 2MB.");
        setForm((current) => ({ ...current, cvName: "", cvBase64: "" }));
        return;
      }
      setFileError("");
      const reader = new FileReader();
      reader.onload = () => {
        setForm((current) => ({
          ...current,
          cvName: file.name,
          cvBase64: reader.result as string,
        }));
      };
      reader.onerror = () => {
        setFileError("Error reading file. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const next: Partial<Record<keyof JobApplication, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!form.phone.trim()) next.phone = "Please enter your phone number.";
    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const savedApplication = {
      ...form,
      createdAt: new Date().toISOString(),
    };

    const message = [
      `Hello ${contact.businessName},`,
      "",
      "I would like to apply to join your team.",
      `Full Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone Number: ${form.phone}`,
      `Preferred Role: ${form.role}`,
      `Preferred Location: ${form.location}`,
      `Availability: ${form.availability}`,
      `Previous Cleaning Experience: ${form.experience}`,
      form.cvName ? `Attached CV Filename: ${form.cvName}` : "CV: Not provided via portal",
      "",
      `Cover Note: ${form.notes || "No cover note provided."}`,
      "",
      "Note: Candidate's CV file was logged. Please check for attachments in this email.",
    ].join("\n");

    try {
      await fetch("/api/applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(savedApplication),
      });
    } catch {
      // Outbound mail works even if database log fails
    }

    const emailSubject = encodeURIComponent(`Job Application: ${form.name} - ${form.role} (${form.location})`);
    const emailBody = encodeURIComponent(message);

    // Redirect to draft email client
    window.location.href = `mailto:${contact.email}?subject=${emailSubject}&body=${emailBody}`;
    setStatus("Thank you! Your application has been logged. We have opened your email client—please attach your PDF CV to the draft before hitting send!");
  };

  return (
    <>
      <SEO
        title="Join Our Team | Careers"
        description="Apply to work with Pacesetter Cleaning Services LTD. We are hiring professional cleaners in London and Liverpool."
      />
      <div style={{ paddingTop: "80px" }} />
      <section id="careers" className="section-card reveal-section is-visible">
        <div className="shell">
          <div className="booking-card">
            <div className="booking-copy">
              <p className="admin-kicker">Careers</p>
              <h2>Work With Pacesetter</h2>
              <p>
                We are looking for reliable, professional, and detail-oriented cleaners to join our growing teams in London and Liverpool. Fill out your details below to apply.
              </p>

              <form className="booking-form" onSubmit={submit} noValidate>
                <div className="form-row form-row--double">
                  <Field label="Full Name" value={form.name} onChange={(value) => updateField("name", value)} error={errors.name} />
                  <Field label="Email" type="email" value={form.email} onChange={(value) => updateField("email", value)} error={errors.email} />
                </div>

                <div className="form-row form-row--double">
                  <Field label="Phone Number" type="tel" value={form.phone} onChange={(value) => updateField("phone", value)} error={errors.phone} />
                  <div className="field-group">
                    <label className="field-label">Preferred Location</label>
                    <select
                      className="field-input select-input"
                      value={form.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      style={{
                        width: "100%",
                        height: "48px",
                        borderRadius: "14px",
                        border: "1px solid var(--brand-border)",
                        padding: "0 16px",
                        background: "#fdfdfb",
                        color: "var(--brand-text)",
                        fontFamily: "inherit",
                        fontSize: "0.95rem"
                      }}
                    >
                      <option value="London">London</option>
                      <option value="Liverpool">Liverpool</option>
                    </select>
                  </div>
                </div>

                <div className="form-row form-row--double">
                  <div className="field-group">
                    <label className="field-label">Position / Role</label>
                    <select
                      className="field-input select-input"
                      value={form.role}
                      onChange={(e) => updateField("role", e.target.value)}
                      style={{
                        width: "100%",
                        height: "48px",
                        borderRadius: "14px",
                        border: "1px solid var(--brand-border)",
                        padding: "0 16px",
                        background: "#fdfdfb",
                        color: "var(--brand-text)",
                        fontFamily: "inherit",
                        fontSize: "0.95rem"
                      }}
                    >
                      <option value="Residential Cleaner">Residential Cleaner</option>
                      <option value="Commercial Cleaner">Commercial Cleaner</option>
                      <option value="Airbnb Maid / Turnover Cleaner">Airbnb Maid / Turnover Cleaner</option>
                      <option value="Communal Area Cleaner">Communal Area Cleaner</option>
                      <option value="Carpet & Floor Technician">Carpet & Floor Technician</option>
                      <option value="Window Cleaner">Window Cleaner</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Availability</label>
                    <select
                      className="field-input select-input"
                      value={form.availability}
                      onChange={(e) => updateField("availability", e.target.value)}
                      style={{
                        width: "100%",
                        height: "48px",
                        borderRadius: "14px",
                        border: "1px solid var(--brand-border)",
                        padding: "0 16px",
                        background: "#fdfdfb",
                        color: "var(--brand-text)",
                        fontFamily: "inherit",
                        fontSize: "0.95rem"
                      }}
                    >
                      <option value="Flexible">Flexible Hours</option>
                      <option value="Full-time">Full-Time (35+ hrs/week)</option>
                      <option value="Part-time">Part-Time (10-25 hrs/week)</option>
                      <option value="Weekends">Weekends Only</option>
                    </select>
                  </div>
                </div>

                <div className="form-row" style={{ display: "grid", gap: "8px" }}>
                  <label className="field-label" style={{ marginBottom: 0 }}>Do you have professional cleaning experience?</label>
                  <div style={{ display: "flex", gap: "24px", alignItems: "center", marginTop: "4px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "var(--brand-text-soft)" }}>
                      <input
                        type="radio"
                        name="experience"
                        value="Yes"
                        checked={form.experience === "Yes"}
                        onChange={() => updateField("experience", "Yes")}
                        style={{ accentColor: "var(--brand-green)" }}
                      />
                      <span>Yes, I have experience</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "var(--brand-text-soft)" }}>
                      <input
                        type="radio"
                        name="experience"
                        value="No"
                        checked={form.experience === "No"}
                        onChange={() => updateField("experience", "No")}
                        style={{ accentColor: "var(--brand-green)" }}
                      />
                      <span>No experience (training provided)</span>
                    </label>
                  </div>
                </div>

                {/* CV File Upload Field */}
                <div className="form-row">
                  <div className="field-group" style={{ display: "grid", gap: "6px" }}>
                    <label className="field-label">Upload CV (PDF format, max 2MB)</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        id="cv-file-input"
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor="cv-file-input"
                        className="button button--secondary button--small"
                        style={{
                          margin: 0,
                          cursor: "pointer",
                          backgroundColor: "#f4f7fb",
                          border: "1px solid var(--brand-border)",
                          color: "var(--brand-text)",
                          padding: "8px 20px",
                          borderRadius: "14px",
                          fontWeight: "600",
                          fontSize: "0.9rem"
                        }}
                      >
                        Choose PDF file
                      </label>
                      {form.cvName ? (
                        <span style={{ fontSize: "0.88rem", color: "var(--brand-green-dark)", fontWeight: "600" }}>
                          ✓ {form.cvName}
                        </span>
                      ) : (
                        <span style={{ fontSize: "0.88rem", color: "var(--brand-text-soft)" }}>
                          No file selected
                        </span>
                      )}
                    </div>
                    {fileError ? (
                      <p style={{ color: "var(--destructive)", fontSize: "0.82rem", margin: "4px 0 0" }}>
                        {fileError}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="form-row">
                  <Field
                    label="Tell us about yourself / Previous roles..."
                    textarea
                    value={form.notes}
                    onChange={(value) => updateField("notes", value)}
                  />
                </div>

                <div className="booking-actions">
                  <button className="button button--primary button--small" type="submit" disabled={!canSubmit}>
                    Submit Job Application
                  </button>
                  {status ? <p style={{ color: "var(--brand-green-dark)", fontWeight: "600", fontSize: "0.95rem", margin: "8px 0 0" }}>{status}</p> : null}
                </div>
              </form>
            </div>

            <div className="booking-media">
              <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=82" alt="Join Pacesetter Cleaning Services team" />
              <div className="contact-info-block">
                <h3>Our Hiring Standards</h3>
                <p>What we look for in our team members:</p>
                <div className="contact-info-items" style={{ display: "grid", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "var(--brand-text-soft)", fontSize: "0.9rem" }}>
                    <Award size={18} style={{ color: "var(--brand-green)", flexShrink: 0, marginTop: "2px" }} />
                    <span><strong>Detail Focused:</strong> A commitment to thorough cleaning standards on every property.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "var(--brand-text-soft)", fontSize: "0.9rem" }}>
                    <Briefcase size={18} style={{ color: "var(--brand-green)", flexShrink: 0, marginTop: "2px" }} />
                    <span><strong>Reliable & Punctual:</strong> Turning up on schedule and representing our brand professionally.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "var(--brand-text-soft)", fontSize: "0.9rem" }}>
                    <Calendar size={18} style={{ color: "var(--brand-green)", flexShrink: 0, marginTop: "2px" }} />
                    <span><strong>Flexible Hours:</strong> Shifts structured around your availability and cleaning bookings.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "var(--brand-text-soft)", fontSize: "0.9rem" }}>
                    <MapPin size={18} style={{ color: "var(--brand-green)", flexShrink: 0, marginTop: "2px" }} />
                    <span><strong>Local Teams:</strong> Serving residential and commercial client hubs across London and Liverpool.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
