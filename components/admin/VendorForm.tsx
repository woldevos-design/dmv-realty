"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import ImageUploader from "./ImageUploader";
import GalleryUploader from "./GalleryUploader";

const CATEGORIES = ["Mortgage & Lending","Home Inspection","Title & Settlement","Contractors & Renovation","Moving Services","Real Estate Attorney","Interior Design","Property Management","Other"];

interface VendorData {
  id?: string; name?: string; category?: string; description?: string;
  phone?: string; email?: string; website?: string; location?: string;
  featured?: boolean; logo?: string; gallery?: string[];
}

export default function VendorForm({ initial = {}, mode }: { initial?: VendorData; mode: "new" | "edit" }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initial.name || "",
    category: initial.category || "Mortgage & Lending",
    description: initial.description || "",
    phone: initial.phone || "",
    email: initial.email || "",
    website: initial.website || "",
    location: initial.location || "",
    featured: initial.featured || false,
    logo: initial.logo || "",
    gallery: initial.gallery || [],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(k: string, v: unknown) { setForm((p) => ({ ...p, [k]: v })); }

  async function save() {
    if (!form.name || !form.email) { setError("Name and email are required."); return; }
    setSaving(true); setError("");
    const url = mode === "edit" ? `/api/admin/vendors/${initial.id}` : "/api/admin/vendors";
    const method = mode === "edit" ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { router.push("/admin/vendors"); router.refresh(); }
    else { setError("Failed to save."); }
    setSaving(false);
  }

  const inp = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5b]";
  const lbl = "text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5";

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-700"><FaArrowLeft /></button>
        <h1 className="text-2xl font-serif font-bold text-[#0f2b5b] flex-1">
          {mode === "new" ? "Add Vendor" : "Edit Vendor"}
        </h1>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-[#0f2b5b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#163a7a] transition-colors disabled:opacity-60"
        >
          <FaSave /> {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">{error}</div>}

      <div className="space-y-5">
        {/* Logo */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <ImageUploader
            label="Business Logo / Photo"
            value={form.logo}
            onChange={(url) => set("logo", url)}
            folder="uploads/vendors"
          />
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <GalleryUploader
            images={form.gallery}
            onChange={(imgs) => set("gallery", imgs)}
            max={5}
            folder="uploads/vendors"
          />
        </div>

        {/* Business info */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100 text-sm">Business Info</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={lbl}>Business Name *</label>
              <input value={form.name} onChange={(e) => set("name", e.target.value)} className={inp} />
            </div>
            <div>
              <label className={lbl}>Category</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inp}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={lbl}>Location</label>
              <input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="City, State" className={inp} />
            </div>
            <div className="col-span-2">
              <label className={lbl}>Description</label>
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4} className={inp + " resize-none"} />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100 text-sm">Contact</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={lbl}>Phone</label><input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inp} /></div>
            <div><label className={lbl}>Email *</label><input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inp} /></div>
            <div className="col-span-2"><label className={lbl}>Website</label><input type="url" value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://" className={inp} /></div>
          </div>
        </div>

        {/* Featured toggle */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 accent-[#c9a84c]" />
            <div>
              <div className="text-sm font-semibold text-gray-800">Featured Vendor</div>
              <div className="text-xs text-gray-500">Featured vendors appear with a gold star and ring highlight on the directory.</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
