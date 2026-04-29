"use client";

import { useEffect, useState } from "react";
import { FaSave, FaCheck } from "react-icons/fa";

const FONT_OPTIONS = ["Inter", "Georgia", "Merriweather", "Playfair Display", "Lato", "Roboto", "Open Sans"];
const HEADING_OPTIONS = ["Georgia", "Merriweather", "Playfair Display", "Inter", "Roboto Slab"];

export default function SettingsPage() {
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then((d) => { setForm(d); setLoading(false); });
  }, []);

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  function setNested(section: string, key: string, value: unknown) {
    setForm((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as Record<string, unknown> || {}), [key]: value },
    }));
  }

  async function save() {
    await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (loading) return <div className="text-gray-400 text-sm">Loading…</div>;

  const colors = (form.colors as Record<string, string>) || {};
  const fonts = (form.fonts as Record<string, string>) || {};

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0f2b5b]">Site Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Control colors, fonts, branding, and contact details</p>
        </div>
        <button onClick={save} className="flex items-center gap-2 bg-[#0f2b5b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#163a7a] transition-colors">
          {saved ? <><FaCheck /> Saved!</> : <><FaSave /> Save Changes</>}
        </button>
      </div>

      <div className="space-y-6">
        {/* Branding */}
        <Section title="Branding">
          <Field label="Site Name"><Input value={form.siteName as string} onChange={(v) => set("siteName", v)} /></Field>
          <Field label="Tagline"><Input value={form.tagline as string} onChange={(v) => set("tagline", v)} /></Field>
          <Field label="Agent Name"><Input value={form.agentName as string} onChange={(v) => set("agentName", v)} /></Field>
          <Field label="Agent Title"><Input value={form.agentTitle as string} onChange={(v) => set("agentTitle", v)} /></Field>
          <Field label="Brokerage"><Input value={form.brokerage as string} onChange={(v) => set("brokerage", v)} /></Field>
          <Field label="License Number"><Input value={form.licenseNumber as string} onChange={(v) => set("licenseNumber", v)} /></Field>
        </Section>

        {/* Contact */}
        <Section title="Contact Information">
          <Field label="Phone"><Input value={form.phone as string} onChange={(v) => set("phone", v)} /></Field>
          <Field label="Email"><Input type="email" value={form.email as string} onChange={(v) => set("email", v)} /></Field>
          <Field label="Street Address"><Input value={form.address as string} onChange={(v) => set("address", v)} /></Field>
          <Field label="City, State ZIP"><Input value={form.city as string} onChange={(v) => set("city", v)} /></Field>
        </Section>

        {/* Social */}
        <Section title="Social Media">
          <Field label="Facebook URL"><Input value={form.facebook as string} onChange={(v) => set("facebook", v)} /></Field>
          <Field label="Instagram URL"><Input value={form.instagram as string} onChange={(v) => set("instagram", v)} /></Field>
          <Field label="LinkedIn URL"><Input value={form.linkedin as string} onChange={(v) => set("linkedin", v)} /></Field>
        </Section>

        {/* Colors */}
        <Section title="Colors">
          <Field label="Primary Color (Navy)">
            <div className="flex items-center gap-3">
              <input type="color" value={colors.primary || "#0f2b5b"} onChange={(e) => setNested("colors", "primary", e.target.value)} className="w-12 h-10 rounded cursor-pointer border border-gray-200" />
              <Input value={colors.primary || "#0f2b5b"} onChange={(v) => setNested("colors", "primary", v)} />
            </div>
          </Field>
          <Field label="Accent Color (Gold)">
            <div className="flex items-center gap-3">
              <input type="color" value={colors.accent || "#c9a84c"} onChange={(e) => setNested("colors", "accent", e.target.value)} className="w-12 h-10 rounded cursor-pointer border border-gray-200" />
              <Input value={colors.accent || "#c9a84c"} onChange={(v) => setNested("colors", "accent", v)} />
            </div>
          </Field>
          <Field label="Primary Hover Color">
            <div className="flex items-center gap-3">
              <input type="color" value={colors.primaryHover || "#163a7a"} onChange={(e) => setNested("colors", "primaryHover", e.target.value)} className="w-12 h-10 rounded cursor-pointer border border-gray-200" />
              <Input value={colors.primaryHover || "#163a7a"} onChange={(v) => setNested("colors", "primaryHover", v)} />
            </div>
          </Field>
          {/* Live preview */}
          <div className="mt-2 flex gap-3 col-span-2">
            <div className="flex-1 py-3 rounded-lg text-white text-center text-sm font-semibold" style={{ backgroundColor: colors.primary }}>Primary Button</div>
            <div className="flex-1 py-3 rounded-lg text-white text-center text-sm font-semibold" style={{ backgroundColor: colors.accent }}>Accent Button</div>
          </div>
        </Section>

        {/* Fonts */}
        <Section title="Typography">
          <Field label="Heading Font">
            <select value={fonts.heading} onChange={(e) => setNested("fonts", "heading", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5b]">
              {HEADING_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </Field>
          <Field label="Body Font">
            <select value={fonts.body} onChange={(e) => setNested("fonts", "body", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5b]">
              {FONT_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </Field>
          <div className="col-span-2 mt-2 p-4 border border-gray-100 rounded-lg">
            <div style={{ fontFamily: fonts.heading }} className="text-lg font-bold text-[#0f2b5b] mb-1">Heading preview — {fonts.heading}</div>
            <div style={{ fontFamily: fonts.body }} className="text-sm text-gray-600">Body text preview — {fonts.body}. The quick brown fox jumps over the lazy dog.</div>
          </div>
        </Section>

        {/* Hero content */}
        <Section title="Homepage Content">
          <Field label="Hero Title" className="col-span-2">
            <Input value={form.heroTitle as string} onChange={(v) => set("heroTitle", v)} />
          </Field>
          <Field label="Hero Subtitle" className="col-span-2">
            <textarea value={form.heroSubtitle as string} onChange={(e) => set("heroSubtitle", e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5b] resize-none" />
          </Field>
        </Section>

        {/* About bio */}
        <Section title="About Page Bio">
          <Field label="Agent Bio" className="col-span-2">
            <textarea value={form.aboutBio as string} onChange={(e) => set("aboutBio", e.target.value)} rows={6} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5b] resize-y" />
          </Field>
        </Section>
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={save} className="flex items-center gap-2 bg-[#0f2b5b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#163a7a] transition-colors">
          {saved ? <><FaCheck /> Saved!</> : <><FaSave /> Save All Changes</>}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h2 className="font-semibold text-gray-800 mb-5 pb-3 border-b border-gray-100">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, type = "text" }: { value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5b]"
    />
  );
}
