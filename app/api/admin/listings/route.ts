import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/data";

interface Listing { id: string; [key: string]: unknown }

export async function GET() {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(readJSON("listings.json"));
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const listings = readJSON<Listing[]>("listings.json");
  const body = await req.json();
  const newItem = { ...body, id: Date.now().toString() };
  listings.push(newItem);
  writeJSON("listings.json", listings);
  return NextResponse.json(newItem, { status: 201 });
}
