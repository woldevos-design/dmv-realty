import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/data";

export async function GET() {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const settings = readJSON("settings.json");
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  writeJSON("settings.json", body);
  return NextResponse.json({ ok: true });
}
