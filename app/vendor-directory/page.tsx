"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/vendors";
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaStar, FaSearch, FaPlus, FaTimes, FaArrowRight } from "react-icons/fa";
import VendorCardSlideshow from "@/components/VendorCardSlideshow";

interface Vendor {
  id: string; name: string; category: string; description: string;
  phone: string; email: string; website?: string; location: string;
  featured?: boolean; logo?: string; gallery?: string[];
}

export default function VendorDirectoryPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/api/vendors").then((r) => r.json()).then(setVendors);
  }, []);

  const filtered = vendors.filter((v) => {
    const matchCat = activeCategory === "All" || v.category === activeCategory;
    const matchSearch = search === "" ||
      [v.name, v.category, v.location].some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <>
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-gold-500 text-sm font-semibold uppercase tracking-widest">Trusted Partners</span>
          <h1 className="text-4xl font-serif font-bold mt-2">Vendor Directory</h1>
          <p className="text-white/70 mt-3 max-w-xl">
            A curated network of vetted professionals across DC, Maryland, and Virginia.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search vendors…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-900"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    activeCategory === cat ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="ml-auto flex items-center gap-2 bg-gold-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gold-600 transition-colors whitespace-nowrap"
            >
              <FaPlus /> List Your Business
            </button>
          </div>
        </div>
      </section>

      {/* Vendor grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-6">{filtered.length} vendor{filtered.length !== 1 ? "s" : ""} found</p>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400"><p>No vendors match your search.</p></div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v) => (
              <div key={v.id} className={`card p-0 relative overflow-hidden group ${v.featured ? "ring-2 ring-gold-400" : ""}`}>
                {/* Image slideshow — logo + gallery */}
                {(() => {
                  const slides = [
                    ...(v.logo ? [v.logo] : []),
                    ...(v.gallery ?? []).filter(Boolean),
                  ];
                  return slides.length > 0 ? (
                    <div className="relative">
                      <VendorCardSlideshow images={slides} name={v.name} />
                      {v.featured && (
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-gold-500 text-white text-xs font-semibold px-2 py-1 rounded shadow z-20">
                          <FaStar size={10} /> Featured
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-3 w-full bg-gradient-to-r from-navy-900 to-navy-700" />
                  );
                })()}

                <div className="p-6">
                  {v.featured && !v.logo && (
                    <div className="absolute top-6 right-4 flex items-center gap-1 text-gold-500 text-xs font-semibold">
                      <FaStar /> Featured
                    </div>
                  )}
                  <span className="text-xs font-semibold bg-navy-50 text-navy-700 px-2 py-1 rounded">{v.category}</span>
                  <h3 className="font-serif text-navy-900 text-lg font-semibold mt-3 mb-1 group-hover:text-gold-500 transition-colors">{v.name}</h3>
                  {v.location && (
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                      <FaMapMarkerAlt /> {v.location}
                    </div>
                  )}
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">{v.description}</p>

                  {/* Quick contacts — stop propagation so clicks don't bubble to the card link */}
                  <div className="space-y-2 text-sm border-t border-gray-100 pt-4 mb-4">
                    {v.phone && (
                      <a href={`tel:${v.phone.replace(/\D/g, "")}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 text-gray-600 hover:text-navy-900 transition-colors">
                        <FaPhone className="text-gold-500 text-xs shrink-0" /> {v.phone}
                      </a>
                    )}
                    {v.email && (
                      <a href={`mailto:${v.email}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 text-gray-600 hover:text-navy-900 transition-colors">
                        <FaEnvelope className="text-gold-500 text-xs shrink-0" /> {v.email}
                      </a>
                    )}
                    {v.website && (
                      <a href={v.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 text-gray-600 hover:text-navy-900 transition-colors">
                        <FaGlobe className="text-gold-500 text-xs shrink-0" /> Visit Website
                      </a>
                    )}
                  </div>

                  {/* View detail link */}
                  <Link
                    href={`/vendor-directory/${v.id}`}
                    className="flex items-center justify-center gap-2 w-full bg-navy-900 hover:bg-navy-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                  >
                    View Full Profile <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative max-h-screen overflow-y-auto">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <FaTimes size={20} />
            </button>
            <h2 className="text-2xl font-serif text-navy-900 font-bold mb-2">List Your Business</h2>
            <p className="text-gray-500 text-sm mb-6">Submit for review. Approved vendors are listed within 48 hours.</p>
            <form className="space-y-4" action="/api/vendor-submit" method="POST">
              <div><label className="text-sm font-medium text-gray-700 block mb-1">Business Name *</label><input type="text" name="name" required className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-navy-900" /></div>
              <div><label className="text-sm font-medium text-gray-700 block mb-1">Category *</label>
                <select name="category" className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-navy-900">
                  {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label className="text-sm font-medium text-gray-700 block mb-1">Location *</label><input type="text" name="location" required placeholder="e.g. Bethesda, MD" className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-navy-900" /></div>
              <div><label className="text-sm font-medium text-gray-700 block mb-1">Phone *</label><input type="tel" name="phone" required className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-navy-900" /></div>
              <div><label className="text-sm font-medium text-gray-700 block mb-1">Email *</label><input type="email" name="email" required className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-navy-900" /></div>
              <div><label className="text-sm font-medium text-gray-700 block mb-1">Description *</label><textarea name="description" rows={3} required className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-navy-900" /></div>
              <button type="submit" className="btn-primary w-full">Submit for Review</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
