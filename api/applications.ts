import { json, readJson } from "./_lib/http";
import { getApplications, saveApplications } from "./_lib/storage";
import type { SavedApplication } from "../src/app/landing/types";

export async function POST(request: Request) {
  const application = await readJson<SavedApplication>(request);

  // ── 1. Persist to storage ──────────────────────────────────────────────────
  const applications = await getApplications();
  const saved: SavedApplication = {
    ...application,
    createdAt: application.createdAt || new Date().toISOString(),
  };
  const next = [saved, ...applications].slice(0, 200);
  await saveApplications(next);

  // ── 2. Build email body ────────────────────────────────────────────────────
  const recipientEmail =
    process.env.APPLICATIONS_EMAIL || "pacesettercleaning@gmail.com";

  const cvLine = saved.cvUrl
    ? `CV Download: ${saved.cvUrl}`
    : "CV: Not provided";

  const emailLines = [
    "New job application received via the Pacesetter website.",
    "",
    `Full Name:        ${saved.name}`,
    `Email:            ${saved.email}`,
    `Phone:            ${saved.phone}`,
    `Preferred Role:   ${saved.role}`,
    `Location:         ${saved.location}`,
    `Availability:     ${saved.availability}`,
    `Experience:       ${saved.experience}`,
    cvLine,
    "",
    `Cover Note:`,
    saved.notes || "No cover note provided.",
    "",
    `Submitted at: ${saved.createdAt}`,
  ];

  const subject = encodeURIComponent(
    `Job Application: ${saved.name} — ${saved.role} (${saved.location})`
  );
  const body = encodeURIComponent(emailLines.join("\n"));

  // ── 3. Return the mailto link so the browser can open it ─────────────────
  //    (Server-side SMTP would require an email service SDK like Resend/SendGrid)
  return json({
    ok: true,
    mailtoHref: `mailto:${recipientEmail}?subject=${subject}&body=${body}`,
  });
}
