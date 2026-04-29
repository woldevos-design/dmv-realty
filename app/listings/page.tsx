import type { Metadata } from "next";
import { readJSON } from "@/lib/data";
import Image from "next/image";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaFilter } from "react-icons/fa";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Listings",
  description: "Browse current real estate listings in Washington DC, Maryland, and Virginia with Alex Johnson.",
};

interface Listing {
  id: string; price: string; address: string; city: string;
  beds: number; baths: number; sqft: string; type: string;
  status: string; description: string; features: string[]; image?: string;
}

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  "Under Contract": "bg-amber-100 text-amber-700",
  Sold: "bg-gray-100 text-gray-600",
  "Coming Soon": "bg-blue-100 text-blue-700",
};

export default function ListingsPage() {
  const listings = readJSON<Listing[]>("listings.json");

  return (
    <>
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-gold-500 text-sm font-semibold uppercase tracking-widest">Properties</span>
          <h1 className="text-4xl font-serif font-bold mt-2">Current Listings</h1>
          <p className="text-white/70 mt-3 max-w-xl">Hand-selected properties across Washington DC, Maryland, and Virginia. Updated regularly.</p>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 items-center">
            <FaFilter className="text-gray-400" />
            {["All", "DC", "Maryland", "Virginia", "Condo", "Single Family", "Townhouse"].map((f) => (
              <button key={f} className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 hover:bg-navy-900 hover:text-white transition-colors">{f}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-6">{listings.length} properties found</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((l) => (
              <div key={l.id} className="card group cursor-pointer">
                <div className="relative h-52 bg-gray-200 overflow-hidden">
                  {l.image ? (
                    <Image src={l.image} alt={l.address} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-navy-900 to-navy-700" />
                  )}
                  <div className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded bg-navy-900 text-white z-10">{l.type}</div>
                  <div className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded z-10 ${statusColors[l.status] || "bg-gray-100 text-gray-500"}`}>{l.status}</div>
                  <div className="absolute bottom-3 left-3 bg-gold-500 text-white text-base font-bold px-3 py-1 rounded font-serif z-10">{l.price}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-navy-900 font-semibold text-lg group-hover:text-gold-500 transition-colors">{l.address}</h3>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mt-1 mb-3"><FaMapMarkerAlt /> {l.city}</div>
                  <div className="flex gap-4 text-gray-600 text-sm mb-4">
                    <span className="flex items-center gap-1"><FaBed className="text-gold-500" /> {l.beds} bd</span>
                    <span className="flex items-center gap-1"><FaBath className="text-gold-500" /> {l.baths} ba</span>
                    <span className="flex items-center gap-1"><FaRulerCombined className="text-gold-500" /> {l.sqft} sqft</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{l.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {l.features.slice(0, 3).map((f) => <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{f}</span>)}
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <Link href="/about#contact" className="block w-full btn-primary text-center text-sm py-2.5">Schedule a Tour</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 bg-gray-50 rounded-2xl p-10 text-center">
            <h3 className="text-2xl font-serif text-navy-900 font-bold mb-3">Don't See What You're Looking For?</h3>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">I have access to off-market properties and can set up custom alerts for new listings that match your criteria.</p>
            <Link href="/about#contact" className="btn-gold inline-block">Tell Me What You Need</Link>
          </div>
        </div>
      </section>
    </>
  );
}
