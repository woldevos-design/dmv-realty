import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/data";

interface Vendor { id: string; [key: string]: unknown }
type Params = Promise<{ id: string }>;

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const vendors = readJSON<Vendor[]>("vendors.json");
  const body = await req.json();
  const idx = vendors.findIndex((v) => v.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  vendors[idx] = { ...body, id };
  writeJSON("vendors.json", vendors);
  return NextResponse.json(vendors[idx]);
}

export async function DELETE(_: NextRequest, { params }: { params: Params }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const vendors = readJSON<Vendor[]>("vendors.json");
  writeJSON("vendors.json", vendors.filter((v) => v.id !== id));
  return NextResponse.json({ ok: true });
}
