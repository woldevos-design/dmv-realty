"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaStar } from "react-icons/fa";

interface Vendor { id: string; name: string; category: string; location: string; phone: string; featured: boolean }

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  async function load() {
    const res = await fetch("/api/admin/vendors");
    setVendors(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm("Delete this vendor?")) return;
    await fetch(`/api/admin/vendors/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0f2b5b]">Vendor Directory</h1>
          <p className="text-gray-500 text-sm mt-1">{vendors.length} vendors</p>
        </div>
        <Link href="/admin/vendors/new" className="flex items-center gap-2 bg-[#c9a84c] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#a88830] transition-colors">
          <FaPlus /> Add Vendor
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Featured</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {vendors.length === 0 && (
              <tr><td colSpan={6} className="text-center py-12 text-gray-400">No vendors yet. <Link href="/admin/vendors/new" className="text-[#c9a84c] underline">Add one.</Link></td></tr>
            )}
            {vendors.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 font-medium text-gray-800">{v.name}</td>
                <td className="px-5 py-4 text-gray-500">
                  <span className="bg-purple-50 text-purple-700 text-xs px-2 py-0.5 rounded-full">{v.category}</span>
                </td>
                <td className="px-5 py-4 text-gray-500">{v.location}</td>
                <td className="px-5 py-4 text-gray-500">{v.phone}</td>
                <td className="px-5 py-4">
                  {v.featured && <FaStar className="text-amber-400" title="Featured" />}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/admin/vendors/${v.id}`} className="p-1.5 text-gray-400 hover:text-[#0f2b5b] transition-colors"><FaEdit /></Link>
                    <button onClick={() => remove(v.id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"><FaTrash /></button>
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
