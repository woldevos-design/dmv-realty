"use client";

import { useEffect, useState } from "react";
import { FaSave, FaCheck } from "react-icons/fa";

export default function AdminPagesPage() {
  const [settings, setSettings] = useState<Record<string, unknown>>({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then((d) => { setSettings(d); setLoading(false); });
  }, []);

  function set(key: string, value: string) { setSettings((p) => ({ ...p, [key]: value })); }

  async function save() {
    await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (loading) return <div className="text-gray-400 text-sm">Loading…</div>;

  const inp = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5b]";
  const lbl = "text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5";
  const section = "bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4";

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0f2b5b]">Page Content</h1>
          <p className="text-gray-500 text-sm mt-1">Edit text content for the Home and About pages</p>
        </div>
        <button onClick={save} className="flex items-center gap-2 bg-[#0f2b5b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#163a7a] transition-colors">
          {saved ? <><FaCheck /> Saved!</> : <><FaSave /> Save Changes</>}
        </button>
      </div>

      <div className="space-y-6">
        {/* Home Page */}
        <div className={section}>
          <h2 className="font-semibold text-gray-800 pb-3 border-b border-gray-100">Home Page</h2>
          <div>
            <label className={lbl}>Hero Title</label>
            <input value={settings.heroTitle as string || ""} onChange={(e) => set("heroTitle", e.target.value)} className={inp} />
          </div>
          <div>
            <label className={lbl}>Hero Subtitle</label>
            <textarea value={settings.heroSubtitle as string || ""} onChange={(e) => set("heroSubtitle", e.target.value)} rows={3} className={inp + " resize-none"} />
          </div>
        </div>

        {/* About Page */}
        <div className={section}>
          <h2 className="font-semibold text-gray-800 pb-3 border-b border-gray-100">About Page</h2>
          <div>
            <label className={lbl}>Agent Name</label>
            <input value={settings.agentName as string || ""} onChange={(e) => set("agentName", e.target.value)} className={inp} />
          </div>
          <div>
            <label className={lbl}>Agent Title / Designation</label>
            <input value={settings.agentTitle as string || ""} onChange={(e) => set("agentTitle", e.target.value)} className={inp} />
          </div>
          <div>
            <label className={lbl}>Bio (supports line breaks)</label>
            <textarea value={settings.aboutBio as string || ""} onChange={(e) => set("aboutBio", e.target.value)} rows={8} className={inp + " resize-y font-mono text-xs"} />
          </div>
          <div>
            <label className={lbl}>Brokerage Name</label>
            <input value={settings.brokerage as string || ""} onChange={(e) => set("brokerage", e.target.value)} className={inp} />
          </div>
          <div>
            <label className={lbl}>License Number</label>
            <input value={settings.licenseNumber as string || ""} onChange={(e) => set("licenseNumber", e.target.value)} className={inp} />
          </div>
        </div>

        {/* Contact */}
        <div className={section}>
          <h2 className="font-semibold text-gray-800 pb-3 border-b border-gray-100">Contact Info (Footer &amp; About)</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={lbl}>Phone</label><input value={settings.phone as string || ""} onChange={(e) => set("phone", e.target.value)} className={inp} /></div>
            <div><label className={lbl}>Email</label><input type="email" value={settings.email as string || ""} onChange={(e) => set("email", e.target.value)} className={inp} /></div>
            <div><label className={lbl}>Address</label><input value={settings.address as string || ""} onChange={(e) => set("address", e.target.value)} className={inp} /></div>
            <div><label className={lbl}>City, State ZIP</label><input value={settings.city as string || ""} onChange={(e) => set("city", e.target.value)} className={inp} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
