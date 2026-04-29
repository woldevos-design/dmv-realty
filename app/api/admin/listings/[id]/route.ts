import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/data";

interface Listing { id: string; [key: string]: unknown }
type Params = Promise<{ id: string }>;

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const listings = readJSON<Listing[]>("listings.json");
  const body = await req.json();
  const idx = listings.findIndex((l) => l.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  listings[idx] = { ...body, id };
  writeJSON("listings.json", listings);
  return NextResponse.json(listings[idx]);
}

export async function DELETE(_: NextRequest, { params }: { params: Params }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const listings = readJSON<Listing[]>("listings.json");
  writeJSON("listings.json", listings.filter((l) => l.id !== id));
  return NextResponse.json({ ok: true });
}
