import { json, readJson } from "./_lib/http";
import { getApplications, saveApplications } from "./_lib/storage";
import type { SavedApplication } from "../src/app/landing/types";

export async function POST(request: Request) {
  const application = await readJson<SavedApplication>(request);
  const applications = await getApplications();
  const next = [
    { ...application, createdAt: application.createdAt || new Date().toISOString() },
    ...applications,
  ].slice(0, 200);
  await saveApplications(next);
  return json({ ok: true });
}
