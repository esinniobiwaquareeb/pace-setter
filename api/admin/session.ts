import { isAuthenticated } from "../_lib/auth.js";
import { json } from "../_lib/http.js";

export async function GET(request: Request) {
  return json({ authenticated: isAuthenticated(request) });
}
