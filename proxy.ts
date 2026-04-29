import { NextRequest, NextResponse } from "next/server";

const COOKIE = "dmv_admin_session";

async function verifyToken(token: string, secret: string): Promise<boolean> {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;

  const b64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  let payload: string;
  try {
    payload = atob(b64);
  } catch {
    return false;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signedBytes = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  const expectedSig = Array.from(new Uint8Array(signedBytes)).map((b) => b.toString(16).padStart(2, "0")).join("");

  return sig === expectedSig;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = req.cookies.get(COOKIE)?.value;
    const secret = process.env.SESSION_SECRET || "fallback-dev-secret-32-chars-ok";

    if (!token || !(await verifyToken(token, secret))) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
