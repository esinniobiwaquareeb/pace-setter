import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "pace_setter_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function base64Url(input: string) {
  return Buffer.from(input).toString("base64url");
}

function sign(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET || "pace-setter-dev-secret";
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function createToken() {
  const payload = JSON.stringify({
    exp: Date.now() + SESSION_TTL_MS,
  });
  const encoded = base64Url(payload);
  return `${encoded}.${sign(encoded)}`;
}

function verifyToken(token: string | undefined) {
  if (!token) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;

  const expected = sign(encoded);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (sigBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(sigBuffer, expectedBuffer)) return false;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf-8")) as { exp?: number };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

function parseCookies(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      }),
  );
}

export function isAuthenticated(request: Request) {
  const cookies = parseCookies(request);
  return verifyToken(cookies[COOKIE_NAME]);
}

export function requireAuth(request: Request) {
  return isAuthenticated(request)
    ? null
    : new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
}

export function createSessionHeaders() {
  const headers = new Headers();
  headers.append(
    "set-cookie",
    `${COOKIE_NAME}=${createToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_MS / 1000}; Secure`,
  );
  return headers;
}

export function clearSessionHeaders() {
  const headers = new Headers();
  headers.append("set-cookie", `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure`);
  return headers;
}

export function validatePassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "change-me";
  return password === expected;
}
