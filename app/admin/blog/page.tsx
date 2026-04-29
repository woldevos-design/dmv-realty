"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

interface Post { slug: string; title: string; date: string; category: string; readTime: string }

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  async function load() {
    const res = await fetch("/api/admin/blog");
    setPosts(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function remove(slug: string) {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/blog/${slug}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0f2b5b]">Blog Posts</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.length} posts · Markdown files in content/blog/</p>
        </div>
        <Link href="/admin/blog/new" className="flex items-center gap-2 bg-[#c9a84c] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#a88830] transition-colors">
          <FaPlus /> New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Read Time</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {posts.length === 0 && (
              <tr><td colSpan={5} className="text-center py-12 text-gray-400">No posts yet. <Link href="/admin/blog/new" className="text-[#c9a84c] underline">Create one.</Link></td></tr>
            )}
            {posts.map((p) => (
              <tr key={p.slug} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 font-medium text-gray-800 max-w-xs truncate">{p.title}</td>
                <td className="px-5 py-4 text-gray-500">
                  <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{p.category}</span>
                </td>
                <td className="px-5 py-4 text-gray-500">{p.date}</td>
                <td className="px-5 py-4 text-gray-500">{p.readTime}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <a href={`/blog/${p.slug}`} target="_blank" className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors" title="View"><FaEye /></a>
                    <Link href={`/admin/blog/${p.slug}`} className="p-1.5 text-gray-400 hover:text-[#0f2b5b] transition-colors" title="Edit"><FaEdit /></Link>
                    <button onClick={() => remove(p.slug)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors" title="Delete"><FaTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
