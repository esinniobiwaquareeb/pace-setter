import { clearSessionHeaders } from "../_lib/auth";
import { json } from "../_lib/http";

export async function POST() {
  return json(
    { ok: true },
    {
      headers: clearSessionHeaders(),
    },
  );
}
