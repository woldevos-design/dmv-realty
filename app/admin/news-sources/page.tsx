"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaToggleOn, FaToggleOff, FaSave, FaRss } from "react-icons/fa";

interface Source { id: string; name: string; url: string; active: boolean }

export default function NewsSourcesPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [saved, setSaved] = useState(false);
  const [adding, setAdding] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/news-sources");
    setSources(await res.json());
  }
  useEffect(() => { load(); }, []);

  function toggle(id: string) {
    setSources((prev) => prev.map((s) => s.id === id ? { ...s, active: !s.active } : s));
  }

  async function saveAll() {
    await fetch("/api/admin/news-sources", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sources) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function addSource() {
    if (!newName || !newUrl) return;
    setAdding(true);
    const res = await fetch("/api/admin/news-sources", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newName, url: newUrl }) });
    const added = await res.json();
    setSources((prev) => [...prev, added]);
    setNewName(""); setNewUrl("");
    setAdding(false);
  }

  async function remove(id: string) {
    if (!confirm("Remove this source?")) return;
    await fetch("/api/admin/news-sources", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setSources((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0f2b5b]">News Sources</h1>
          <p className="text-gray-500 text-sm mt-1">Manage RSS feeds shown on the Market News page</p>
        </div>
        <button onClick={saveAll} className="flex items-center gap-2 bg-[#0f2b5b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#163a7a] transition-colors">
          <FaSave /> {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Current sources */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Sources</div>
        {sources.length === 0 && <p className="text-center py-10 text-gray-400 text-sm">No sources configured.</p>}
        <ul className="divide-y divide-gray-50">
          {sources.map((s) => (
            <li key={s.id} className="flex items-center gap-4 px-5 py-4">
              <FaRss className={s.active ? "text-[#c9a84c]" : "text-gray-300"} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-800 text-sm">{s.name}</div>
                <div className="text-gray-400 text-xs truncate">{s.url}</div>
              </div>
              <button onClick={() => toggle(s.id)} className="shrink-0" title={s.active ? "Disable" : "Enable"}>
                {s.active
                  ? <FaToggleOn className="text-green-500" size={22} />
                  : <FaToggleOff className="text-gray-300" size={22} />}
              </button>
              <button onClick={() => remove(s.id)} className="shrink-0 text-gray-300 hover:text-red-500 transition-colors"><FaTrash /></button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add source */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 text-sm mb-4">Add New Source</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Source Name</label>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Inman News" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5b]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">RSS Feed URL</label>
            <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://example.com/feed.xml" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5b]" />
          </div>
          <button onClick={addSource} disabled={adding || !newName || !newUrl} className="flex items-center gap-2 bg-[#c9a84c] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#a88830] transition-colors disabled:opacity-50">
            <FaPlus /> {adding ? "Adding…" : "Add Source"}
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4">Toggle sources on/off then click <strong>Save Changes</strong> to apply. The Market News page refreshes every 30 minutes.</p>
    </div>
  );
}
