import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/data";

interface Vendor { id: string; [key: string]: unknown }

export async function GET() {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(readJSON("vendors.json"));
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const vendors = readJSON<Vendor[]>("vendors.json");
  const body = await req.json();
  const newItem = { ...body, id: Date.now().toString() };
  vendors.push(newItem);
  writeJSON("vendors.json", vendors);
  return NextResponse.json(newItem, { status: 201 });
}
