import { json } from "./_lib/http";
import { getSiteContent } from "./_lib/storage";

export async function GET() {
  const content = await getSiteContent();
  return json(content, {
    headers: {
      "cache-control": "no-store",
    },
  });
}
