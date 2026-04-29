import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/data";

interface Source { id: string; name: string; url: string; active: boolean }

export async function GET() {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(readJSON("news-sources.json"));
}

export async function PUT(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sources = await req.json() as Source[];
  writeJSON("news-sources.json", sources);
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sources = readJSON<Source[]>("news-sources.json");
  const body = await req.json();
  const newSource = { ...body, id: Date.now().toString(), active: true };
  sources.push(newSource);
  writeJSON("news-sources.json", sources);
  return NextResponse.json(newSource, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  const sources = readJSON<Source[]>("news-sources.json");
  writeJSON("news-sources.json", sources.filter((s) => s.id !== id));
  return NextResponse.json({ ok: true });
}
