import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "content/blog");

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  featuredImage?: string;
  content?: string;
  rawContent?: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const { data } = matter(fs.readFileSync(path.join(postsDir, filename), "utf-8"));
      return {
        slug,
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        category: data.category ?? "General",
        author: data.author ?? "Alex Johnson",
        readTime: data.readTime ?? "5 min read",
        featuredImage: data.featuredImage ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = [
    path.join(postsDir, `${slug}.md`),
    path.join(postsDir, `${slug}.mdx`),
  ].find(fs.existsSync);
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);

  return {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    category: data.category ?? "General",
    author: data.author ?? "Alex Johnson",
    readTime: data.readTime ?? "5 min read",
    featuredImage: data.featuredImage ?? "",
    content: processed.toString(),
    rawContent: content,
  };
}
