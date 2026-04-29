import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { format } from "date-fns";
import { FaCalendar, FaClock, FaTag } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Blog",
  description: "Real estate insights, market tips, and DMV homeowner guides from Alex Johnson.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-gold-500 text-sm font-semibold uppercase tracking-widest">Insights & Advice</span>
          <h1 className="text-4xl font-serif font-bold mt-2">Real Estate Blog</h1>
          <p className="text-white/70 mt-3 max-w-xl">Market updates, home-buying guides, investment strategies, and DMV neighborhood spotlights.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="card group block">
                  {/* Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center">
                        <span className="text-gold-500 font-serif text-4xl font-bold opacity-30">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-gold-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                        <FaTag className="text-xs" /> {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="font-serif text-navy-900 text-lg font-semibold group-hover:text-gold-500 transition-colors leading-snug mb-3">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-gray-100 pt-4">
                      <span className="flex items-center gap-1">
                        <FaCalendar />
                        {post.date ? format(new Date(post.date), "MMM d, yyyy") : ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock /> {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
