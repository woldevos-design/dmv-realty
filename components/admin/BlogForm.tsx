"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaArrowLeft, FaEye, FaEdit } from "react-icons/fa";
import ImageUploader from "./ImageUploader";

const CATEGORIES = ["Market Update", "Buyer Guide", "Seller Guide", "Investing", "Neighborhood Spotlight", "Mortgage & Finance", "General"];

interface Props {
  initial?: {
    title?: string; date?: string; excerpt?: string;
    category?: string; readTime?: string; rawContent?: string;
    slug?: string; featuredImage?: string;
  };
  mode: "new" | "edit";
}

export default function BlogForm({ initial = {}, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initial.title || "",
    date: initial.date || new Date().toISOString().slice(0, 10),
    excerpt: initial.excerpt || "",
    category: initial.category || "General",
    readTime: initial.readTime || "5 min read",
    content: initial.rawContent || "",
    slug: initial.slug || "",
    featuredImage: initial.featuredImage || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);

  function set(k: string, v: string) { setForm((p) => ({ ...p, [k]: v })); }

  async function save() {
    if (!form.title || !form.content) { setError("Title and content are required."); return; }
    setSaving(true); setError("");
    const url = mode === "edit" ? `/api/admin/blog/${initial.slug}` : "/api/admin/blog";
    const method = mode === "edit" ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { router.push("/admin/blog"); router.refresh(); }
    else { setError("Failed to save post."); }
    setSaving(false);
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-700 transition-colors"><FaArrowLeft /></button>
        <h1 className="text-2xl font-serif font-bold text-[#0f2b5b] flex-1">
          {mode === "new" ? "New Blog Post" : "Edit Post"}
        </h1>
        <button
          onClick={() => setPreview(!preview)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {preview ? <><FaEdit /> Editor</> : <><FaEye /> Preview</>}
        </button>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-[#0f2b5b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#163a7a] transition-colors disabled:opacity-60"
        >
          <FaSave /> {saving ? "Saving…" : "Save Post"}
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">{error}</div>}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Title *</label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Post title…"
              className="w-full text-xl font-serif text-[#0f2b5b] border-0 outline-none placeholder-gray-300"
            />
          </div>

          {/* Featured image */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <ImageUploader
              label="Featured Image"
              value={form.featuredImage}
              onChange={(url) => set("featuredImage", url)}
              folder="uploads/blog"
            />
          </div>

          {/* Content editor */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Content (Markdown) *</label>
              <span className="text-xs text-gray-400">{form.content.length} chars</span>
            </div>
            {preview ? (
              <div className="min-h-64 bg-gray-50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                  {form.content || <span className="text-gray-400">Nothing to preview yet.</span>}
                </pre>
              </div>
            ) : (
              <textarea
                value={form.content}
                onChange={(e) => set("content", e.target.value)}
                placeholder={"Write your post in Markdown…\n\n## Heading\n\nParagraph text here."}
                rows={22}
                className="w-full font-mono text-sm border-0 outline-none resize-y text-gray-700 placeholder-gray-300 leading-relaxed"
              />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm">Post Details</h3>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Category</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5b]">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Publish Date</label>
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5b]" />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Read Time</label>
              <input value={form.readTime} onChange={(e) => set("readTime", e.target.value)} placeholder="5 min read" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5b]" />
            </div>

            {mode === "new" && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">URL Slug (optional)</label>
                <input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto-generated-from-title" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5b]" />
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Excerpt / Summary</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={4}
              placeholder="Short description shown on the blog list page…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5b] resize-none"
            />
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-700 space-y-0.5">
            <p className="font-semibold mb-1">Markdown Tips</p>
            <p>## Heading 2 &nbsp;·&nbsp; ### Heading 3</p>
            <p>**bold** &nbsp;·&nbsp; *italic*</p>
            <p>- bullet item</p>
            <p>[Link text](https://url.com)</p>
            <p>![Alt](image-url)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
