import { json } from "./_lib/http.js";
import { getSiteContent } from "./_lib/storage.js";

export async function GET() {
  const content = await getSiteContent();
  return json(content, {
    headers: {
      "cache-control": "no-store",
    },
  });
}
