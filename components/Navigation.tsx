"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaPhone } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/market-news", label: "Market News" },
  { href: "/blog", label: "Blog" },
  { href: "/vendor-directory", label: "Vendor Directory" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-navy-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-gold-500 font-serif text-xl font-bold leading-tight">
              Alex Johnson
            </span>
            <span className="hidden sm:block text-white/60 text-sm border-l border-white/20 pl-2 ml-1">
              DMV Real Estate
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-gold-500 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="tel:+12025550199"
            className="hidden md:flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
          >
            <FaPhone className="text-xs" />
            (202) 555-0199
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-900 border-t border-white/10 px-4 pb-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block py-2 px-3 rounded my-1 text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-gold-500 text-white"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="tel:+12025550199"
            className="flex items-center gap-2 mt-3 bg-gold-500 text-white px-4 py-2 rounded text-sm font-semibold"
          >
            <FaPhone className="text-xs" />
            (202) 555-0199
          </a>
        </div>
      )}
    </header>
  );
}
