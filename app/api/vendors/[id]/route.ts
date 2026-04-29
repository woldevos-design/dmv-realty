import { NextRequest, NextResponse } from "next/server";
import { readJSON } from "@/lib/data";

interface Vendor { id: string; [key: string]: unknown }

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vendors = readJSON<Vendor[]>("vendors.json");
  const vendor = vendors.find((v) => v.id === id);
  if (!vendor) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(vendor);
}
