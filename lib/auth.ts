import { cookies } from "next/headers";

const COOKIE = "dmv_admin_session";
const SECRET = () => process.env.SESSION_SECRET || "fallback-dev-secret-32-chars-ok";

async function hmac(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const bytes = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(bytes)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSessionToken(username: string): Promise<string> {
  const payload = `${username}:${Date.now()}`;
  const b64 = btoa(payload);
  const sig = await hmac(payload);
  return `${b64}.${sig}`;
}

async function verifyToken(token: string): Promise<string | null> {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;
  const b64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let payload: string;
  try { payload = atob(b64); } catch { return null; }
  const expected = await hmac(payload);
  if (sig !== expected) return null;
  const [username] = payload.split(":");
  return username || null;
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 8,
    path: "/",
  };
}

export function clearCookieOptions() {
  return { name: COOKIE, value: "", maxAge: 0, path: "/" };
}
