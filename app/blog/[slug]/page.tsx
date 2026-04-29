import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { format } from "date-fns";
import { FaArrowLeft, FaCalendar, FaClock, FaTag } from "react-icons/fa";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="flex items-center gap-2 text-gold-500 text-sm mb-6 hover:underline">
            <FaArrowLeft /> Back to Blog
          </Link>
          <div className="flex items-center gap-2 text-xs text-gold-500 font-semibold mb-3">
            <FaTag /> {post.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1"><FaCalendar />{post.date ? format(new Date(post.date), "MMMM d, yyyy") : ""}</span>
            <span className="flex items-center gap-1"><FaClock />{post.readTime}</span>
            <span>By {post.author}</span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.featuredImage && (
            <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden mb-10 shadow-md">
              <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <div
            className="prose prose-lg prose-headings:font-serif prose-headings:text-navy-900 prose-a:text-gold-500 prose-strong:text-navy-900 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
          />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-navy-900 text-white rounded-xl p-8 text-center">
              <h3 className="text-xl font-serif text-gold-500 mb-2">Have Questions?</h3>
              <p className="text-white/70 text-sm mb-4">I'm always happy to discuss the DMV market. Reach out anytime.</p>
              <Link href="/about#contact" className="btn-gold inline-block">Contact Alex</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
