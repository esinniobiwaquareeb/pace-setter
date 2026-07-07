import { useEffect, useState, useMemo } from "react";
import { MapPin, Briefcase, Calendar, Award, Upload, CheckCircle, Loader } from "lucide-react";
import { useSiteContent } from "../landing/SiteContentContext";
import { SEO } from "../components/SEO";
import { Field } from "../landing/Field";
import type { JobApplication, SavedApplication } from "../landing/types";

type UploadState = "idle" | "uploading" | "done" | "error";

export function CareersPage() {
  const { contact } = useSiteContent();
  const [form, setForm] = useState<JobApplication>({
    name: "",
    email: "",
    phone: "",
    availability: "Flexible",
    experience: "Yes",
    notes: "",
    cvName: "",
    cvUrl: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof JobApplication, string>>>({});
  const [fileError, setFileError] = useState("");
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canSubmit = useMemo(() => {
    return (
      !submitting &&
      uploadState !== "uploading" &&
      form.name.trim() &&
      form.phone.trim() &&
      form.email.trim()
    );
  }, [form, submitting, uploadState]);

  const updateField = (key: keyof JobApplication, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  // ── CV upload: fires immediately on file select ──────────────────────────
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    if (file.type !== "application/pdf") {
      setFileError("Please upload a PDF file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size must be under 5 MB.");
      return;
    }

    setFileError("");
    setUploadState("uploading");

    // Read as base64 data-URL
    const fileBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }).catch(() => null);

    if (!fileBase64) {
      setFileError("Could not read the file. Please try again.");
      setUploadState("error");
      return;
    }

    try {
      const response = await fetch("/api/upload-cv", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileBase64 }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || data.error) {
        setFileError(data.error ?? "Upload failed. Please try again.");
        setUploadState("error");
        return;
      }

      setForm((current) => ({
        ...current,
        cvName: file.name,
        cvUrl: data.url ?? "",
      }));
      setUploadState("done");
    } catch {
      setFileError("Network error during upload. Please try again.");
      setUploadState("error");
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
    if (!form.cvUrl.trim()) {
      setFileError("Please upload your CV before submitting.");
    }
    setErrors(next);
    return Object.keys(next).length === 0 && !!form.cvUrl.trim();
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const savedApplication: SavedApplication = {
      ...form,
      createdAt: new Date().toISOString(),
    };

    // Persist locally
    try {
      const stored = window.localStorage.getItem("pace-setter-applications");
      const parsed = stored ? (JSON.parse(stored) as SavedApplication[]) : [];
      window.localStorage.setItem(
        "pace-setter-applications",
        JSON.stringify([savedApplication, ...parsed].slice(0, 200))
      );
    } catch {
      // Non-fatal
    }

    // Send to server — API saves to storage and sends email via Resend
    try {
      await fetch("/api/applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(savedApplication),
      });
    } catch {
      // Non-fatal — application is still saved locally
    }

    setSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <>
        <SEO
          title="Application Submitted | Careers"
          description="Thank you for applying to Pacesetter Cleaning Services."
        />
        <div style={{ paddingTop: "80px" }} />
        <section className="section-card reveal-section is-visible">
          <div className="shell">
            <div
              style={{
                maxWidth: "540px",
                margin: "0 auto",
                textAlign: "center",
                padding: "64px 24px",
              }}
            >
              <CheckCircle
                size={64}
                style={{ color: "var(--brand-green)", margin: "0 auto 24px" }}
              />
              <h2 style={{ marginBottom: "12px" }}>Application Received!</h2>
              <p style={{ color: "var(--brand-text-soft)", fontSize: "1.05rem", lineHeight: 1.65 }}>
                Thank you, <strong>{form.name}</strong>. Your application has been received and our team will be in touch shortly.
              </p>
              {form.cvUrl && (
                <p
                  style={{
                    marginTop: "16px",
                    fontSize: "0.9rem",
                    color: "var(--brand-green-dark)",
                    fontWeight: 600,
                  }}
                >
                  ✓ Your CV was uploaded successfully and is included in the email.
                </p>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }

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
                We are looking for reliable, professional, and detail-oriented cleaners to join our
                growing teams in London and Liverpool. Fill out your details below to apply.
              </p>

              <form className="booking-form" onSubmit={submit} noValidate>
                <div className="form-row form-row--double">
                  <Field label="Full Name" value={form.name} onChange={(value) => updateField("name", value)} error={errors.name} />
                  <Field label="Email" type="email" value={form.email} onChange={(value) => updateField("email", value)} error={errors.email} />
                </div>

                <div className="form-row form-row--double">
                  <Field label="Phone Number" type="tel" value={form.phone} onChange={(value) => updateField("phone", value)} error={errors.phone} />
                  <div className="field-group">
                    <label className="field-label">Availability</label>
                    <select
                      className="field-input select-input"
                      value={form.availability}
                      onChange={(e) => updateField("availability", e.target.value)}
                      style={{ width: "100%", height: "48px", borderRadius: "14px", border: "1px solid var(--brand-border)", padding: "0 16px", background: "#fdfdfb", color: "var(--brand-text)", fontFamily: "inherit", fontSize: "0.95rem" }}
                    >
                      <option value="Flexible">Flexible Hours</option>
                      <option value="Full-time">Full-Time (35+ hrs/week)</option>
                      <option value="Part-time">Part-Time (10–25 hrs/week)</option>
                      <option value="Weekends">Weekends Only</option>
                    </select>
                  </div>
                </div>

                <div className="form-row" style={{ display: "grid", gap: "8px" }}>
                  <label className="field-label" style={{ marginBottom: 0 }}>Do you have professional cleaning experience?</label>
                  <div style={{ display: "flex", gap: "24px", alignItems: "center", marginTop: "4px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "var(--brand-text-soft)" }}>
                      <input type="radio" name="experience" value="Yes" checked={form.experience === "Yes"} onChange={() => updateField("experience", "Yes")} style={{ accentColor: "var(--brand-green)" }} />
                      <span>Yes, I have experience</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "var(--brand-text-soft)" }}>
                      <input type="radio" name="experience" value="No" checked={form.experience === "No"} onChange={() => updateField("experience", "No")} style={{ accentColor: "var(--brand-green)" }} />
                      <span>No experience (training provided)</span>
                    </label>
                  </div>
                </div>

                {/* CV Upload — uploads to Cloudinary on file select */}
                <div className="form-row">
                  <div className="field-group" style={{ display: "grid", gap: "8px" }}>
                    <label className="field-label">
                      Upload CV (PDF, max 5 MB) <span style={{ color: "var(--destructive, #e53e3e)" }}>*</span>
                    </label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "14px 16px",
                        border: `2px dashed ${uploadState === "done" ? "var(--brand-green)" : uploadState === "error" ? "var(--destructive, #e53e3e)" : "var(--brand-border)"}`,
                        borderRadius: "14px",
                        background: uploadState === "done" ? "rgba(72,199,116,0.06)" : "#fdfdfb",
                        transition: "border-color 0.2s, background 0.2s",
                      }}
                    >
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        id="cv-file-input"
                        disabled={uploadState === "uploading"}
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor="cv-file-input"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          cursor: uploadState === "uploading" ? "not-allowed" : "pointer",
                          background: "var(--brand-green)",
                          color: "#fff",
                          padding: "8px 18px",
                          borderRadius: "10px",
                          fontWeight: 700,
                          fontSize: "0.88rem",
                          whiteSpace: "nowrap",
                          opacity: uploadState === "uploading" ? 0.7 : 1,
                          transition: "opacity 0.2s",
                        }}
                      >
                        {uploadState === "uploading" ? (
                          <Loader size={14} style={{ animation: "spin 1s linear infinite" }} />
                        ) : (
                          <Upload size={14} />
                        )}
                        {uploadState === "uploading" ? "Uploading…" : "Choose PDF"}
                      </label>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        {uploadState === "done" && form.cvName ? (
                          <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.88rem", color: "var(--brand-green-dark)", fontWeight: 600 }}>
                            <CheckCircle size={15} />
                            {form.cvName}
                          </span>
                        ) : uploadState === "uploading" ? (
                          <span style={{ fontSize: "0.85rem", color: "var(--brand-text-soft)" }}>Uploading your CV…</span>
                        ) : (
                          <span style={{ fontSize: "0.85rem", color: "var(--brand-text-soft)" }}>No file selected</span>
                        )}
                      </div>
                    </div>

                    {fileError && (
                      <p style={{ color: "var(--destructive, #e53e3e)", fontSize: "0.82rem", margin: "2px 0 0" }}>
                        {fileError}
                      </p>
                    )}
                    {uploadState === "done" && (
                      <p style={{ fontSize: "0.8rem", color: "var(--brand-text-soft)", margin: "2px 0 0" }}>
                        CV uploaded securely. A download link will be included in your application email.
                      </p>
                    )}
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
                  <button
                    className="button button--primary button--small"
                    type="submit"
                    disabled={!canSubmit}
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                  >
                    {submitting ? (
                      <><Loader size={15} style={{ animation: "spin 1s linear infinite" }} /> Submitting…</>
                    ) : (
                      "Submit Job Application"
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="booking-media">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=82"
                alt="Join Pacesetter Cleaning Services team"
                style={{ height: "240px", minHeight: "auto", objectFit: "cover" }}
              />
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
                    <span><strong>Reliable &amp; Punctual:</strong> Turning up on schedule and representing our brand professionally.</span>
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

      {/* Spinner keyframe — scoped inline so no global CSS change needed */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
