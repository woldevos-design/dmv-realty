import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const fields = Object.fromEntries(
    ["name", "category", "location", "phone", "email", "website", "description"].map((k) => [
      k,
      data.get(k)?.toString() ?? "",
    ])
  );

  if (!fields.name || !fields.category || !fields.phone || !fields.email || !fields.description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // In production: save to database or send notification email to agent
  // For now, log and return success
  console.log("Vendor submission:", fields);

  return NextResponse.redirect(new URL("/vendor-directory?submitted=1", req.url));
}
