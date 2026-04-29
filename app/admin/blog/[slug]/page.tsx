import BlogForm from "@/components/admin/BlogForm";
import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit Post" };

export default async function EditBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return <BlogForm mode="edit" initial={post} />;
}
