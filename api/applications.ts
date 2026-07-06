import { Resend } from "resend";
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
  await saveApplications([saved, ...applications].slice(0, 200));

  // ── 2. Send email via Resend ───────────────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  const recipientEmail =
    process.env.APPLICATIONS_EMAIL || "pacesettercleaning@gmail.com";

  if (resendKey) {
    const resend = new Resend(resendKey);

    const cvSection = saved.cvUrl
      ? `<tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;width:160px;vertical-align:top">CV</td>
          <td style="padding:8px 0;font-size:14px;vertical-align:top">
            <a href="${saved.cvUrl}" style="color:#16a34a;font-weight:600">Download CV ↗</a>
          </td>
        </tr>`
      : `<tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;width:160px">CV</td>
          <td style="padding:8px 0;font-size:14px;color:#9ca3af">Not provided</td>
        </tr>`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08)">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#166534,#15803d);padding:32px 40px">
            <p style="margin:0;color:rgba(255,255,255,0.7);font-size:13px;letter-spacing:0.08em;text-transform:uppercase">Pacesetter Cleaning Services</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700">New Job Application</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px">
            <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6">
              A new application has been submitted via the Pacesetter website.
            </p>

            <!-- Details table -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e7eb">
              <tr>
                <td style="padding:8px 0;color:#6b7280;font-size:14px;width:160px">Full Name</td>
                <td style="padding:8px 0;font-size:14px;font-weight:600;color:#111827">${saved.name}</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:8px 0;color:#6b7280;font-size:14px;width:160px">Email</td>
                <td style="padding:8px 0;font-size:14px"><a href="mailto:${saved.email}" style="color:#16a34a">${saved.email}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280;font-size:14px;width:160px">Phone</td>
                <td style="padding:8px 0;font-size:14px"><a href="tel:${saved.phone}" style="color:#16a34a">${saved.phone}</a></td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:8px 0;color:#6b7280;font-size:14px;width:160px">Availability</td>
                <td style="padding:8px 0;font-size:14px;color:#111827">${saved.availability}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280;font-size:14px;width:160px">Experience</td>
                <td style="padding:8px 0;font-size:14px;color:#111827">${saved.experience}</td>
              </tr>
              <tr style="background:#f9fafb">
                ${cvSection}
              </tr>
            </table>

            ${saved.notes ? `
            <!-- Cover note -->
            <div style="margin-top:24px;padding:16px 20px;background:#f0fdf4;border-left:3px solid #16a34a;border-radius:0 8px 8px 0">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:0.06em">Cover Note</p>
              <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap">${saved.notes}</p>
            </div>` : ""}

            <p style="margin:32px 0 0;font-size:13px;color:#9ca3af">
              Submitted: ${new Date(saved.createdAt).toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;background:#f9fafb;border-top:1px solid #e5e7eb">
            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center">
              Pacesetter Cleaning Services LTD · London &amp; Liverpool
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    try {
      await resend.emails.send({
        from: "Pacesetter Careers <onboarding@resend.dev>",
        to: [recipientEmail],
        replyTo: saved.email,
        subject: `Job Application: ${saved.name} — ${saved.email}`,
        html,
      });
    } catch (err) {
      console.error("[Resend] Failed to send application email:", err);
      // Non-fatal — application is still saved to storage
    }
  }

  return json({ ok: true });
}
