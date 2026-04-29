import { NextResponse } from "next/server";
import { readJSON } from "@/lib/data";

export async function GET() {
  return NextResponse.json(readJSON("vendors.json"));
}
