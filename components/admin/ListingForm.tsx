"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import ImageUploader from "./ImageUploader";

const TYPES = ["Single Family", "Townhouse", "Condo", "Multi-Family", "Land", "Commercial"];
const STATUSES = ["Active", "Under Contract", "Sold", "Coming Soon"];

interface ListingData {
  id?: string; price?: string; address?: string; city?: string;
  beds?: number; baths?: number; sqft?: string; type?: string;
  status?: string; description?: string; features?: string[]; image?: string;
}

export default function ListingForm({ initial = {}, mode }: { initial?: ListingData; mode: "new" | "edit" }) {
  const router = useRouter();
  const [form, setForm] = useState({
    price: initial.price || "",
    address: initial.address || "",
    city: initial.city || "",
    beds: initial.beds || 3,
    baths: initial.baths || 2,
    sqft: initial.sqft || "",
    type: initial.type || "Single Family",
    status: initial.status || "Active",
    description: initial.description || "",
    features: (initial.features || []).join(", "),
    image: initial.image || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(k: string, v: unknown) { setForm((p) => ({ ...p, [k]: v })); }

  async function save() {
    if (!form.address || !form.price) { setError("Address and price are required."); return; }
    setSaving(true); setError("");
    const payload = {
      ...form,
      features: form.features.split(",").map((s) => s.trim()).filter(Boolean),
      beds: Number(form.beds),
      baths: Number(form.baths),
    };
    const url = mode === "edit" ? `/api/admin/listings/${initial.id}` : "/api/admin/listings";
    const res = await fetch(url, {
      method: mode === "edit" ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) { router.push("/admin/listings"); router.refresh(); }
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
          {mode === "new" ? "Add Listing" : "Edit Listing"}
        </h1>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-[#0f2b5b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#163a7a] transition-colors disabled:opacity-60">
          <FaSave /> {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">{error}</div>}

      <div className="space-y-5">
        {/* Listing image */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <ImageUploader
            label="Listing Photo"
            value={form.image}
            onChange={(url) => set("image", url)}
            folder="uploads/listings"
          />
        </div>

        {/* Location & price */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100 text-sm">Location & Price</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="col-span-2"><label className={lbl}>Street Address *</label><input value={form.address} onChange={(e) => set("address", e.target.value)} className={inp} /></div>
            <div><label className={lbl}>City, State *</label><input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Bethesda, MD" className={inp} /></div>
            <div><label className={lbl}>Price *</label><input value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="$750,000" className={inp} /></div>
            <div><label className={lbl}>Square Footage</label><input value={form.sqft} onChange={(e) => set("sqft", e.target.value)} placeholder="2,000" className={inp} /></div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100 text-sm">Property Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={lbl}>Property Type</label>
              <select value={form.type} onChange={(e) => set("type", e.target.value)} className={inp}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div><label className={lbl}>Status</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inp}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div><label className={lbl}>Bedrooms</label><input type="number" value={form.beds} onChange={(e) => set("beds", e.target.value)} className={inp} /></div>
            <div><label className={lbl}>Bathrooms</label><input type="number" step="0.5" value={form.baths} onChange={(e) => set("baths", e.target.value)} className={inp} /></div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100 text-sm">Description & Features</h3>
          <div className="space-y-4">
            <div><label className={lbl}>Description</label><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4} className={inp + " resize-y"} /></div>
            <div><label className={lbl}>Features (comma-separated)</label><input value={form.features} onChange={(e) => set("features", e.target.value)} placeholder="Pool, Garage, Updated kitchen" className={inp} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
