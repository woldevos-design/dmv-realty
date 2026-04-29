import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { readJSON } from "@/lib/data";
import {
  FaArrowLeft, FaPhone, FaEnvelope, FaGlobe,
  FaMapMarkerAlt, FaStar, FaTag,
} from "react-icons/fa";
import VendorSlideshow from "@/components/VendorSlideshow";

interface Vendor {
  id: string; name: string; category: string; description: string;
  phone: string; email: string; website?: string; location: string;
  featured?: boolean; logo?: string; gallery?: string[];
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const vendors = readJSON<Vendor[]>("vendors.json");
  const vendor = vendors.find((v) => v.id === id);
  if (!vendor) return {};
  return {
    title: `${vendor.name} | Vendor Directory`,
    description: vendor.description,
  };
}

export default async function VendorDetailPage({ params }: Props) {
  const { id } = await params;
  const vendors = readJSON<Vendor[]>("vendors.json");
  const vendor = vendors.find((v) => v.id === id);
  if (!vendor) notFound();

  // Related vendors in the same category (exclude current)
  const related = vendors
    .filter((v) => v.category === vendor.category && v.id !== vendor.id)
    .slice(0, 3);

  return (
    <>
      {/* Header */}
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/vendor-directory"
            className="inline-flex items-center gap-2 text-gold-500 text-sm mb-6 hover:underline"
          >
            <FaArrowLeft /> Back to Directory
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Logo */}
            {vendor.logo ? (
              <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-white/20 shrink-0 bg-white">
                <Image src={vendor.logo} alt={vendor.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-xl bg-white/10 border-2 border-white/20 flex items-center justify-center shrink-0">
                <span className="text-gold-500 font-serif text-3xl font-bold">
                  {vendor.name.charAt(0)}
                </span>
              </div>
            )}

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="flex items-center gap-1 text-xs font-semibold bg-white/10 text-white/80 px-3 py-1 rounded-full">
                  <FaTag className="text-gold-500" /> {vendor.category}
                </span>
                {vendor.featured && (
                  <span className="flex items-center gap-1 text-xs font-semibold bg-gold-500 text-white px-3 py-1 rounded-full">
                    <FaStar /> Featured Partner
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-2">{vendor.name}</h1>
              {vendor.location && (
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <FaMapMarkerAlt className="text-gold-500" /> {vendor.location}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-bold text-navy-900 mb-4">About {vendor.name}</h2>
              <div className="prose prose-gray max-w-none">
                {vendor.description.split("\n").map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
                ))}
              </div>

              {/* Photo slideshow — logo + up to 5 gallery images */}
              {(() => {
                const slides = [
                  ...(vendor.logo ? [vendor.logo] : []),
                  ...(vendor.gallery ?? []).filter(Boolean),
                ];
                return slides.length > 0 ? (
                  <VendorSlideshow images={slides} vendorName={vendor.name} />
                ) : null;
              })()}

              {/* CTA box */}
              <div className="mt-10 bg-navy-900 rounded-xl p-8 text-white">
                <h3 className="text-xl font-serif text-gold-500 mb-2">Referred by Alex Johnson</h3>
                <p className="text-white/70 text-sm mb-5">
                  All vendors in this directory have been personally vetted by Alex. Mention his name when you reach out.
                </p>
                <div className="flex flex-wrap gap-3">
                  {vendor.phone && (
                    <a
                      href={`tel:${vendor.phone.replace(/\D/g, "")}`}
                      className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <FaPhone /> Call Now
                    </a>
                  )}
                  {vendor.email && (
                    <a
                      href={`mailto:${vendor.email}`}
                      className="flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <FaEnvelope /> Send Email
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Contact sidebar */}
            <div className="space-y-5">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-serif font-bold text-navy-900 text-lg mb-5">Contact Info</h3>
                <ul className="space-y-4">
                  {vendor.phone && (
                    <li>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</div>
                      <a href={`tel:${vendor.phone.replace(/\D/g, "")}`} className="flex items-center gap-2 text-navy-900 font-medium hover:text-gold-500 transition-colors text-sm">
                        <FaPhone className="text-gold-500 shrink-0" /> {vendor.phone}
                      </a>
                    </li>
                  )}
                  {vendor.email && (
                    <li>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</div>
                      <a href={`mailto:${vendor.email}`} className="flex items-center gap-2 text-navy-900 font-medium hover:text-gold-500 transition-colors text-sm break-all">
                        <FaEnvelope className="text-gold-500 shrink-0" /> {vendor.email}
                      </a>
                    </li>
                  )}
                  {vendor.location && (
                    <li>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Location</div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <FaMapMarkerAlt className="text-gold-500 shrink-0" /> {vendor.location}
                      </div>
                    </li>
                  )}
                  {vendor.website && (
                    <li>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Website</div>
                      <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-navy-900 font-medium hover:text-gold-500 transition-colors text-sm">
                        <FaGlobe className="text-gold-500 shrink-0" /> Visit Website ↗
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {/* Category badge */}
              <div className="bg-gray-50 rounded-xl border border-gray-100 p-5">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Service Type</div>
                <div className="inline-flex items-center gap-2 bg-navy-900 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                  <FaTag className="text-gold-500 text-xs" /> {vendor.category}
                </div>
              </div>

              {/* Back button */}
              <Link
                href="/vendor-directory"
                className="flex items-center justify-center gap-2 w-full border border-gray-200 text-gray-600 px-4 py-3 rounded-lg text-sm font-medium hover:border-navy-900 hover:text-navy-900 transition-colors"
              >
                <FaArrowLeft /> Back to All Vendors
              </Link>
            </div>
          </div>

          {/* Related vendors */}
          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">
                More {vendor.category} Vendors
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((v) => (
                  <Link
                    key={v.id}
                    href={`/vendor-directory/${v.id}`}
                    className="card p-5 group block hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {v.logo ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                          <Image src={v.logo} alt={v.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-navy-900 flex items-center justify-center shrink-0">
                          <span className="text-gold-500 font-serif text-xl font-bold">{v.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <div className="font-serif font-semibold text-navy-900 group-hover:text-gold-500 transition-colors text-sm leading-snug">{v.name}</div>
                        {v.location && <div className="text-xs text-gray-400">{v.location}</div>}
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{v.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
