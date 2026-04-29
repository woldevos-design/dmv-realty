import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, sessionCookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = await createSessionToken(username);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookieOptions(token));
  return res;
}
