"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface Listing { id: string; address: string; city: string; price: string; beds: number; baths: number; type: string; status: string }

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  "Under Contract": "bg-amber-100 text-amber-700",
  Sold: "bg-gray-100 text-gray-500",
};

export default function AdminListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);

  async function load() {
    const res = await fetch("/api/admin/listings");
    setListings(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm("Delete this listing?")) return;
    await fetch(`/api/admin/listings/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0f2b5b]">Listings</h1>
          <p className="text-gray-500 text-sm mt-1">{listings.length} properties</p>
        </div>
        <Link href="/admin/listings/new" className="flex items-center gap-2 bg-[#c9a84c] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#a88830] transition-colors">
          <FaPlus /> Add Listing
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Beds/Baths</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {listings.length === 0 && (
              <tr><td colSpan={6} className="text-center py-12 text-gray-400">No listings yet. <Link href="/admin/listings/new" className="text-[#c9a84c] underline">Add one.</Link></td></tr>
            )}
            {listings.map((l) => (
              <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-800">{l.address}</div>
                  <div className="text-gray-400 text-xs">{l.city}</div>
                </td>
                <td className="px-5 py-4 font-semibold text-[#0f2b5b]">{l.price}</td>
                <td className="px-5 py-4 text-gray-500">{l.type}</td>
                <td className="px-5 py-4 text-gray-500">{l.beds}bd · {l.baths}ba</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[l.status] || "bg-gray-100 text-gray-500"}`}>{l.status}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/admin/listings/${l.id}`} className="p-1.5 text-gray-400 hover:text-[#0f2b5b] transition-colors"><FaEdit /></Link>
                    <button onClick={() => remove(l.id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"><FaTrash /></button>
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
