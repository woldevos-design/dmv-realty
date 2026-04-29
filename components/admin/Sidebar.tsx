"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaTachometerAlt, FaHome, FaNewspaper, FaPen,
  FaUsers, FaRss, FaCog, FaSignOutAlt, FaFileAlt,
} from "react-icons/fa";

const nav = [
  { href: "/admin", label: "Dashboard", icon: FaTachometerAlt, exact: true },
  { href: "/admin/listings", label: "Listings", icon: FaHome },
  { href: "/admin/blog", label: "Blog Posts", icon: FaPen },
  { href: "/admin/vendors", label: "Vendors", icon: FaUsers },
  { href: "/admin/news-sources", label: "News Sources", icon: FaRss },
  { href: "/admin/pages", label: "Page Content", icon: FaFileAlt },
  { href: "/admin/settings", label: "Site Settings", icon: FaCog },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="w-64 bg-[#0f2b5b] text-white flex flex-col min-h-screen shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="text-[#c9a84c] font-serif text-lg font-bold leading-tight">Admin Panel</div>
        <div className="text-white/50 text-xs mt-0.5">DMV Realty</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {nav.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-[#c9a84c] text-white" : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="shrink-0" size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <FaSignOutAlt size={15} /> Sign Out
        </button>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors mt-1"
        >
          <FaNewspaper size={15} /> View Site ↗
        </Link>
      </div>
    </aside>
  );
}
