import { isAuthenticated } from "../_lib/auth";
import { json } from "../_lib/http";

export async function GET(request: Request) {
  return json({ authenticated: isAuthenticated(request) });
}
