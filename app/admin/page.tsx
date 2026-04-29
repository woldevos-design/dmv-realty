import { readJSON } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { FaHome, FaPen, FaUsers, FaRss, FaArrowRight, FaCog } from "react-icons/fa";

export const metadata = { title: "Dashboard" };

export default function AdminDashboard() {
  const listings = readJSON<unknown[]>("listings.json");
  const vendors = readJSON<unknown[]>("vendors.json");
  const sources = readJSON<unknown[]>("news-sources.json");
  const posts = getAllPosts();

  const cards = [
    { label: "Listings", value: listings.length, icon: FaHome, href: "/admin/listings", color: "bg-blue-50 text-blue-700" },
    { label: "Blog Posts", value: posts.length, icon: FaPen, href: "/admin/blog", color: "bg-green-50 text-green-700" },
    { label: "Vendors", value: vendors.length, icon: FaUsers, href: "/admin/vendors", color: "bg-purple-50 text-purple-700" },
    { label: "News Sources", value: sources.length, icon: FaRss, href: "/admin/news-sources", color: "bg-amber-50 text-amber-700" },
  ];

  const quickActions = [
    { label: "Add Listing", href: "/admin/listings/new", icon: FaHome },
    { label: "New Blog Post", href: "/admin/blog/new", icon: FaPen },
    { label: "Add Vendor", href: "/admin/vendors/new", icon: FaUsers },
    { label: "Site Settings", href: "/admin/settings", icon: FaCog },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-[#0f2b5b]">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back. Here's an overview of your site.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow group">
            <div className={`inline-flex p-2.5 rounded-lg ${color} mb-3`}>
              <Icon size={18} />
            </div>
            <div className="text-3xl font-bold font-serif text-[#0f2b5b]">{value}</div>
            <div className="text-gray-500 text-sm mt-1 flex items-center justify-between">
              {label} <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-xs" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-[#c9a84c] hover:bg-amber-50 transition-colors text-sm font-medium text-gray-700"
              >
                <Icon className="text-[#c9a84c]" size={14} /> {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Recent Blog Posts</h2>
            <Link href="/admin/blog" className="text-xs text-[#c9a84c] hover:underline">View all</Link>
          </div>
          {posts.length === 0 ? (
            <p className="text-gray-400 text-sm">No posts yet.</p>
          ) : (
            <ul className="space-y-3">
              {posts.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link href={`/admin/blog/${p.slug}`} className="block group">
                    <div className="text-sm font-medium text-gray-800 group-hover:text-[#0f2b5b] leading-snug">{p.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{p.date} · {p.category}</div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
