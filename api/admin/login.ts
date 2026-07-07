import { createSessionHeaders, validatePassword } from "../_lib/auth.js";
import { json, readJson } from "../_lib/http.js";

export async function POST(request: Request) {
  const { password } = await readJson<{ password?: string }>(request);
  if (!password || !validatePassword(password)) {
    return json({ error: "Invalid password" }, { status: 401 });
  }

  return json(
    { ok: true },
    {
      headers: createSessionHeaders(),
    },
  );
}
