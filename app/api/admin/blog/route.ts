import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getAllPosts } from "@/lib/blog";
import fs from "fs";
import path from "path";

const postsDir = path.join(process.cwd(), "content/blog");

export async function GET() {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getAllPosts());
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, date, excerpt, category, readTime, content, slug } = await req.json();
  const fileName = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const filePath = path.join(postsDir, `${fileName}.md`);
  const frontmatter = `---\ntitle: "${title}"\ndate: "${date}"\nexcerpt: "${excerpt}"\ncategory: "${category}"\nauthor: "Alex Johnson"\nreadTime: "${readTime}"\n---\n\n${content}`;
  fs.writeFileSync(filePath, frontmatter, "utf-8");
  return NextResponse.json({ slug: fileName }, { status: 201 });
}
