import { NextResponse } from "next/server";
import { fetchAllFeeds } from "@/lib/rss";

export const revalidate = 1800;

export async function GET() {
  try {
    const items = await fetchAllFeeds();
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [], error: "Failed to fetch feeds" }, { status: 500 });
  }
}
