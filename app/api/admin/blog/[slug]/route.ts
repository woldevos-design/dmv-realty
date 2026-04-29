import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getPostBySlug } from "@/lib/blog";
import fs from "fs";
import path from "path";

const postsDir = path.join(process.cwd(), "content/blog");

function findFile(slug: string) {
  return [
    path.join(postsDir, `${slug}.md`),
    path.join(postsDir, `${slug}.mdx`),
  ].find(fs.existsSync);
}

type Params = Promise<{ slug: string }>;

export async function GET(_: NextRequest, { params }: { params: Params }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const { title, date, excerpt, category, readTime, content, featuredImage } = await req.json();
  const filePath = findFile(slug) || path.join(postsDir, `${slug}.md`);
  const fm = [
    `---`,
    `title: "${title}"`,
    `date: "${date}"`,
    `excerpt: "${excerpt}"`,
    `category: "${category}"`,
    `author: "Alex Johnson"`,
    `readTime: "${readTime}"`,
    featuredImage ? `featuredImage: "${featuredImage}"` : "",
    `---`,
  ].filter(Boolean).join("\n");
  fs.writeFileSync(filePath, `${fm}\n\n${content}`, "utf-8");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: Params }) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const filePath = findFile(slug);
  if (filePath) fs.unlinkSync(filePath);
  return NextResponse.json({ ok: true });
}
