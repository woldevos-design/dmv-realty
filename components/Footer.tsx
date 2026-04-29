import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-gold-500 font-serif text-2xl font-bold mb-3">Alex Johnson</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Your trusted real estate partner in Washington DC, Maryland, and Virginia.
              Helping families find their dream homes across the DMV area since 2010.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="bg-white/10 hover:bg-gold-500 p-2 rounded transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gold-500 p-2 rounded transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gold-500 p-2 rounded transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {[
                { href: "/listings", label: "Current Listings" },
                { href: "/market-news", label: "Market News" },
                { href: "/blog", label: "Blog" },
                { href: "/vendor-directory", label: "Vendor Directory" },
                { href: "/about", label: "About Alex" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-gold-500 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-gold-500 shrink-0" />
                1234 K Street NW, Suite 500<br />Washington, DC 20005
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-gold-500 shrink-0" />
                <a href="tel:+12025550199" className="hover:text-gold-500 transition-colors">(202) 555-0199</a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-gold-500 shrink-0" />
                <a href="mailto:alex@dmvpremierrealty.com" className="hover:text-gold-500 transition-colors">
                  alex@dmvpremierrealty.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Alex Johnson · DMV Premier Realty. All rights reserved.</p>
          <p>Licensed in DC, MD &amp; VA · License #AB123456</p>
        </div>
      </div>
    </footer>
  );
}
