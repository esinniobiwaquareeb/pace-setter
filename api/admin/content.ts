import { requireAuth } from "../_lib/auth";
import { json, readJson } from "../_lib/http";
import { getSiteContent, saveSiteContent } from "../_lib/storage";
import { mergeSiteContent } from "../../src/app/landing/site-content";
import type { SiteContent } from "../../src/app/landing/types";

export async function GET(request: Request) {
  const unauthorized = requireAuth(request);
  if (unauthorized) return unauthorized;

  const content = await getSiteContent();
  return json(content);
}

export async function PUT(request: Request) {
  const unauthorized = requireAuth(request);
  if (unauthorized) return unauthorized;

  const payload = await readJson<{ content?: SiteContent }>(request);
  if (!payload.content) {
    return json({ error: "Missing content payload" }, { status: 400 });
  }

  const saved = await saveSiteContent(mergeSiteContent(payload.content));
  return json(saved);
}
