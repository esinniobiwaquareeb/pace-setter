import { useEffect, useState } from "react";
import { DEFAULT_SITE_CONTENT, mergeSiteContent } from "../landing/site-content";
import type { SavedBooking, SiteContent, SavedApplication } from "../landing/types";

type DashboardStats = {
  totalBookings: number;
  totalServices: number;
  totalReviews: number;
  totalFaqs: number;
  totalApplications: number;
  lastBookingAt: string | null;
  lastApplicationAt: string | null;
  contentUpdatedAt: string;
};

type TabKey = "overview" | "bookings" | "applications" | "content";

function formatDate(value: string | null) {
  if (!value) return "No data yet";
  return new Date(value).toLocaleString();
}

export function AdminApp() {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<TabKey>("overview");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [bookings, setBookings] = useState<SavedBooking[]>([]);
  const [applications, setApplications] = useState<SavedApplication[]>([]);
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [jsonDrafts, setJsonDrafts] = useState({
    services: JSON.stringify(DEFAULT_SITE_CONTENT.services, null, 2),
    reviews: JSON.stringify(DEFAULT_SITE_CONTENT.reviews, null, 2),
    faqs: JSON.stringify(DEFAULT_SITE_CONTENT.faqs, null, 2),
    processSteps: JSON.stringify(DEFAULT_SITE_CONTENT.processSteps, null, 2),
    trustPoints: JSON.stringify(DEFAULT_SITE_CONTENT.about.trustPoints, null, 2),
    rotatingWords: JSON.stringify(DEFAULT_SITE_CONTENT.hero.rotatingWords, null, 2),
  });
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    void fetch("/api/admin/session")
      .then((response) => response.json())
      .then((data: { authenticated: boolean }) => {
        setAuthenticated(data.authenticated);
        setReady(true);
      })
      .catch(() => {
        setAuthenticated(window.localStorage.getItem("pace-setter-admin-auth") === "true");
        setReady(true);
      });
  }, []);

  useEffect(() => {
    if (!authenticated) return;

    void Promise.all([
      fetch("/api/admin/dashboard").then((response) => response.json()),
      fetch("/api/admin/content").then((response) => response.json()),
    ]).then(([dashboard, cms]) => {
      setStats(dashboard.stats as DashboardStats);
      setBookings((dashboard.bookings as SavedBooking[]) ?? []);
      setApplications((dashboard.applications as SavedApplication[]) ?? []);
      setContent(mergeSiteContent(cms as SiteContent));
    }).catch(() => {
      const storedContent = window.localStorage.getItem("pace-setter-site-content");
      const storedBookings = window.localStorage.getItem("pace-setter-bookings");
      const storedApplications = window.localStorage.getItem("pace-setter-applications");
      const mergedContent = mergeSiteContent(storedContent ? (JSON.parse(storedContent) as SiteContent) : DEFAULT_SITE_CONTENT);
      const localBookings = storedBookings ? (JSON.parse(storedBookings) as SavedBooking[]) : [];
      const localApplications = storedApplications ? (JSON.parse(storedApplications) as SavedApplication[]) : [];
      setContent(mergedContent);
      setBookings(localBookings);
      setApplications(localApplications);
      setStats({
        totalBookings: localBookings.length,
        totalServices: mergedContent.services.length,
        totalReviews: mergedContent.reviews.length,
        totalFaqs: mergedContent.faqs.length,
        totalApplications: localApplications.length,
        lastBookingAt: localBookings[0]?.createdAt ?? null,
        lastApplicationAt: localApplications[0]?.createdAt ?? null,
        contentUpdatedAt: mergedContent.updatedAt,
      });
    });
  }, [authenticated]);

  useEffect(() => {
    setJsonDrafts({
      services: JSON.stringify(content.services, null, 2),
      reviews: JSON.stringify(content.reviews, null, 2),
      faqs: JSON.stringify(content.faqs, null, 2),
      processSteps: JSON.stringify(content.processSteps, null, 2),
      trustPoints: JSON.stringify(content.about.trustPoints, null, 2),
      rotatingWords: JSON.stringify(content.hero.rotatingWords, null, 2),
    });
  }, [content]);

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setLoginError("Incorrect password.");
        return;
      }
    } catch {
      if (password !== "change-me") {
        setLoginError("Incorrect password.");
        return;
      }
      window.localStorage.setItem("pace-setter-admin-auth", "true");
    }

    setAuthenticated(true);
    setPassword("");
  };

  const logout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    window.localStorage.removeItem("pace-setter-admin-auth");
    window.location.href = "/";
  };

  const updateContent = (path: string, value: string) => {
    setSaveStatus("");
    setContent((current) => {
      const next = structuredClone(current);
      const keys = path.split(".");
      let target: Record<string, unknown> = next as unknown as Record<string, unknown>;
      for (let index = 0; index < keys.length - 1; index += 1) {
        target = target[keys[index]] as Record<string, unknown>;
      }
      target[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const updateJsonField = (field: "services" | "reviews" | "faqs" | "processSteps" | "trustPoints" | "rotatingWords", raw: string) => {
    setSaveStatus("");
    setJsonDrafts((current) => ({ ...current, [field]: raw }));
    try {
      const parsed = JSON.parse(raw);
      setContent((current) => {
        const next = structuredClone(current);
        if (field === "trustPoints") {
          next.about.trustPoints = parsed;
        } else if (field === "rotatingWords") {
          next.hero.rotatingWords = parsed;
        } else {
          (next as unknown as Record<string, unknown>)[field] = parsed;
        }
        return next;
      });
    } catch {
      setSaveStatus(`Invalid JSON in ${field}.`);
    }
  };

  const saveContent = async () => {
    setSaveStatus("Saving...");
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        setSaveStatus("Save failed. Check your JSON fields and try again.");
        return;
      }

      const saved = (await response.json()) as SiteContent;
      setContent(mergeSiteContent(saved));
      setSaveStatus("Content saved.");
    } catch {
      const saved = mergeSiteContent({ ...content, updatedAt: new Date().toISOString() });
      window.localStorage.setItem("pace-setter-site-content", JSON.stringify(saved));
      setContent(saved);
      setSaveStatus("Content saved locally for preview.");
    }
  };

  const downloadCv = (base64Data: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = base64Data;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!ready) {
    return <div className="admin-shell"><div className="admin-card"><p>Loading admin...</p></div></div>;
  }

  if (!authenticated) {
    return (
      <div className="admin-shell">
        <div className="admin-card admin-login">
          <div>
            <p className="admin-kicker">Admin</p>
            <h1>Pacesetter dashboard</h1>
            <p>Use your admin password to view bookings, site stats, and update the live website content.</p>
          </div>

          <form className="admin-form" onSubmit={login}>
            <label className="admin-field">
              <span>Password</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <button className="button button--primary" type="submit">Log In</button>
            {loginError ? <p className="admin-error">{loginError}</p> : null}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <div className="admin-frame">
        <div className="admin-topbar">
          <div>
            <p className="admin-kicker">Pacesetter Admin</p>
            <h1>Dashboard</h1>
          </div>
          <div className="admin-topbar__actions">
            <a className="button" href="/" target="_blank" rel="noreferrer">View site</a>
            <button className="button button--primary" type="button" onClick={logout}>Log Out</button>
          </div>
        </div>

        <div className="admin-tabs">
          {(["overview", "bookings", "applications", "content"] as TabKey[]).map((item) => (
            <button key={item} type="button" className={tab === item ? "is-active" : ""} onClick={() => setTab(item)}>
              {item === "overview" ? "Overview" : item === "bookings" ? "Bookings" : item === "applications" ? "Applicants" : "CMS"}
            </button>
          ))}
        </div>

        {tab === "overview" ? (
          <section className="admin-grid">
            <article className="admin-stat">
              <span>Total bookings</span>
              <strong>{stats?.totalBookings ?? 0}</strong>
            </article>
            <article className="admin-stat">
              <span>Applicants</span>
              <strong>{stats?.totalApplications ?? 0}</strong>
            </article>
            <article className="admin-stat">
              <span>Services</span>
              <strong>{stats?.totalServices ?? 0}</strong>
            </article>
            <article className="admin-stat">
              <span>Reviews</span>
              <strong>{stats?.totalReviews ?? 0}</strong>
            </article>
            <article className="admin-panel">
              <h2>Latest activity</h2>
              <p>Last booking: {formatDate(stats?.lastBookingAt ?? null)}</p>
              <p>Last application: {formatDate(stats?.lastApplicationAt ?? null)}</p>
              <p>Content updated: {formatDate(stats?.contentUpdatedAt ?? null)}</p>
            </article>
          </section>
        ) : null}

        {tab === "bookings" ? (
          <section className="admin-panel">
            <h2>Bookings</h2>
            <div className="admin-bookings">
              {bookings.length === 0 ? <p>No bookings saved yet.</p> : null}
              {bookings.map((booking) => (
                <article key={booking.createdAt} className="admin-booking">
                  <div className="admin-booking__row">
                    <strong>{booking.name}</strong>
                    <span>{formatDate(booking.createdAt)}</span>
                  </div>
                  <p>{booking.phone} {booking.email ? `• ${booking.email}` : ""}</p>
                  <p>{booking.address || "No address provided"}</p>
                  <p>{booking.frequency || "No frequency provided"}</p>
                  <p>{booking.details || "No extra note"}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {tab === "applications" ? (
          <section className="admin-panel">
            <h2>Job Applications</h2>
            <div className="admin-bookings">
              {applications.length === 0 ? <p>No applications received yet.</p> : null}
              {applications.map((app) => (
                <article key={app.createdAt} className="admin-booking">
                  <div className="admin-booking__row">
                    <strong>{app.name}</strong>
                    <span>{formatDate(app.createdAt)}</span>
                  </div>
                  <p>{app.phone} • {app.email}</p>
                  <p><strong>Position:</strong> {app.role}</p>
                  <p><strong>Preferred Location:</strong> {app.location}</p>
                  <p><strong>Availability:</strong> {app.availability}</p>
                  <p><strong>Prior Experience:</strong> {app.experience}</p>
                  <p><strong>Cover Note:</strong> {app.notes || "No cover note provided"}</p>
                  {app.cvName && app.cvBase64 ? (
                    <div style={{ marginTop: "12px" }}>
                      <button
                        type="button"
                        className="button button--secondary button--small"
                        onClick={() => downloadCv(app.cvBase64!, app.cvName!)}
                        style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                      >
                        Download CV ({app.cvName})
                      </button>
                    </div>
                  ) : (
                    <p style={{ fontStyle: "italic", fontSize: "0.85rem", color: "var(--brand-text-soft)", marginTop: "12px" }}>
                      No CV file uploaded.
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {tab === "content" ? (
          <section className="admin-panel admin-panel--content">
            <div className="admin-panel__header">
              <div>
                <h2>Website content</h2>
                <p>Update text, contact details, and reusable content blocks without redeploying.</p>
              </div>
              <button className="button button--primary" type="button" onClick={saveContent}>Save Content</button>
            </div>

            <div className="admin-content-grid">
              <label className="admin-field"><span>Hero eyebrow</span><input value={content.hero.eyebrow} onChange={(e) => updateContent("hero.eyebrow", e.target.value)} /></label>
              <label className="admin-field"><span>Hero headline prefix</span><input value={content.hero.headlinePrefix} onChange={(e) => updateContent("hero.headlinePrefix", e.target.value)} /></label>
              <label className="admin-field admin-field--full"><span>Hero body</span><textarea value={content.hero.body} onChange={(e) => updateContent("hero.body", e.target.value)} /></label>
              <label className="admin-field admin-field--full"><span>Hero rotating words JSON</span><textarea value={jsonDrafts.rotatingWords} onChange={(e) => updateJsonField("rotatingWords", e.target.value)} /></label>

              <label className="admin-field"><span>About heading</span><input value={content.about.heading} onChange={(e) => updateContent("about.heading", e.target.value)} /></label>
              <label className="admin-field"><span>About CTA label</span><input value={content.about.ctaLabel} onChange={(e) => updateContent("about.ctaLabel", e.target.value)} /></label>
              <label className="admin-field admin-field--full"><span>About body</span><textarea value={content.about.body} onChange={(e) => updateContent("about.body", e.target.value)} /></label>
              <label className="admin-field admin-field--full"><span>Trust points JSON</span><textarea value={jsonDrafts.trustPoints} onChange={(e) => updateJsonField("trustPoints", e.target.value)} /></label>

              <label className="admin-field"><span>Services heading</span><input value={content.servicesIntro.heading} onChange={(e) => updateContent("servicesIntro.heading", e.target.value)} /></label>
              <label className="admin-field admin-field--full"><span>Services intro</span><textarea value={content.servicesIntro.body} onChange={(e) => updateContent("servicesIntro.body", e.target.value)} /></label>
              <label className="admin-field admin-field--full"><span>Services JSON</span><textarea value={jsonDrafts.services} onChange={(e) => updateJsonField("services", e.target.value)} /></label>

              <label className="admin-field"><span>Reviews heading</span><input value={content.reviewsIntro.heading} onChange={(e) => updateContent("reviewsIntro.heading", e.target.value)} /></label>
              <label className="admin-field admin-field--full"><span>Reviews intro</span><textarea value={content.reviewsIntro.body} onChange={(e) => updateContent("reviewsIntro.body", e.target.value)} /></label>
              <label className="admin-field admin-field--full"><span>Reviews JSON</span><textarea value={jsonDrafts.reviews} onChange={(e) => updateJsonField("reviews", e.target.value)} /></label>

              <label className="admin-field"><span>How booking works heading</span><input value={content.processIntro.heading} onChange={(e) => updateContent("processIntro.heading", e.target.value)} /></label>
              <label className="admin-field admin-field--full"><span>Process intro</span><textarea value={content.processIntro.body} onChange={(e) => updateContent("processIntro.body", e.target.value)} /></label>
              <label className="admin-field admin-field--full"><span>Booking steps JSON</span><textarea value={jsonDrafts.processSteps} onChange={(e) => updateJsonField("processSteps", e.target.value)} /></label>

              <label className="admin-field"><span>FAQ heading</span><input value={content.faqIntro.heading} onChange={(e) => updateContent("faqIntro.heading", e.target.value)} /></label>
              <label className="admin-field admin-field--full"><span>FAQ intro</span><textarea value={content.faqIntro.body} onChange={(e) => updateContent("faqIntro.body", e.target.value)} /></label>
              <label className="admin-field admin-field--full"><span>FAQ JSON</span><textarea value={jsonDrafts.faqs} onChange={(e) => updateJsonField("faqs", e.target.value)} /></label>

              <label className="admin-field"><span>Booking heading</span><input value={content.booking.heading} onChange={(e) => updateContent("booking.heading", e.target.value)} /></label>
              <label className="admin-field admin-field--full"><span>Booking body</span><textarea value={content.booking.body} onChange={(e) => updateContent("booking.body", e.target.value)} /></label>

              <label className="admin-field"><span>CTA heading</span><input value={content.cta.heading} onChange={(e) => updateContent("cta.heading", e.target.value)} /></label>
              <label className="admin-field admin-field--full"><span>CTA body</span><textarea value={content.cta.body} onChange={(e) => updateContent("cta.body", e.target.value)} /></label>

              <label className="admin-field"><span>Business name</span><input value={content.contact.businessName} onChange={(e) => updateContent("contact.businessName", e.target.value)} /></label>
              <label className="admin-field"><span>Primary phone</span><input value={content.contact.phonePrimary} onChange={(e) => updateContent("contact.phonePrimary", e.target.value)} /></label>
              <label className="admin-field"><span>Email</span><input value={content.contact.email} onChange={(e) => updateContent("contact.email", e.target.value)} /></label>
              <label className="admin-field"><span>Website URL</span><input value={content.contact.websiteUrl} onChange={(e) => updateContent("contact.websiteUrl", e.target.value)} /></label>
              <label className="admin-field"><span>Primary WhatsApp</span><input value={content.contact.whatsappPrimary} onChange={(e) => updateContent("contact.whatsappPrimary", e.target.value)} /></label>
              <label className="admin-field"><span>Secondary WhatsApp</span><input value={content.contact.whatsappSecondary} onChange={(e) => updateContent("contact.whatsappSecondary", e.target.value)} /></label>
            </div>

            {saveStatus ? <p className="admin-status">{saveStatus}</p> : null}
          </section>
        ) : null}
      </div>
    </div>
  );
}
