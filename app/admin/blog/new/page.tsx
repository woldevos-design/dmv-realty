import BlogForm from "@/components/admin/BlogForm";
export const metadata = { title: "New Post" };
export default function NewBlogPostPage() {
  return <BlogForm mode="new" />;
}
