import Link from "next/link";
import Image from "next/image";
import { FaHome, FaChartLine, FaHandshake, FaStar, FaArrowRight } from "react-icons/fa";

const stats = [
  { label: "Homes Sold", value: "500+" },
  { label: "Years Experience", value: "14" },
  { label: "5-Star Reviews", value: "200+" },
  { label: "DMV Markets", value: "DC, MD & VA" },
];

const services = [
  {
    icon: <FaHome size={28} className="text-gold-500" />,
    title: "Buying",
    desc: "Navigate the DMV market with confidence. From first-time buyers to luxury estates, we guide you every step of the way.",
  },
  {
    icon: <FaChartLine size={28} className="text-gold-500" />,
    title: "Selling",
    desc: "Maximize your home's value with strategic pricing, professional staging, and targeted marketing across DC, MD, and VA.",
  },
  {
    icon: <FaHandshake size={28} className="text-gold-500" />,
    title: "Investing",
    desc: "Identify high-yield investment properties and capitalize on DMV's strong rental market and appreciation trends.",
  },
];

const testimonials = [
  {
    name: "Sarah & Michael T.",
    location: "Bethesda, MD",
    text: "Alex made our first home purchase stress-free. His knowledge of the DMV market is unmatched.",
  },
  {
    name: "James R.",
    location: "Arlington, VA",
    text: "Sold our home in 8 days above asking price. Alex's marketing strategy was brilliant.",
  },
  {
    name: "Priya K.",
    location: "Washington, DC",
    text: "Incredibly professional and responsive. Alex found us the perfect condo in Capitol Hill.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-900 text-white min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-900/95 to-navy-700" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
              Washington DC · Maryland · Virginia
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Find Your Perfect Home in the DMV Area
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              With 14 years of expertise across the DMV market, Alex Johnson delivers
              results-driven real estate services tailored to your goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/listings" className="btn-gold">
                Browse Listings
              </Link>
              <Link
                href="/about"
                className="border border-white/30 text-white px-6 py-3 rounded hover:bg-white/10 transition-colors font-semibold"
              >
                Meet Alex
              </Link>
            </div>
          </div>

          {/* Stats card */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ label, value }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10"
              >
                <div className="text-gold-500 text-3xl font-bold font-serif">{value}</div>
                <div className="text-white/70 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title">How I Can Help You</h2>
          <p className="section-subtitle">Full-service real estate across the entire DMV region</p>
          <div className="grid md:grid-cols-3 gap-8 mt-4">
            {services.map(({ icon, title, desc }) => (
              <div key={title} className="card p-8 text-left group">
                <div className="mb-4">{icon}</div>
                <h3 className="text-xl font-serif text-navy-900 font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="section-title">Featured Listings</h2>
              <p className="text-gray-500">Hand-picked properties across the DMV</p>
            </div>
            <Link href="/listings" className="flex items-center gap-2 text-navy-900 font-semibold hover:text-gold-500 transition-colors mt-4 sm:mt-0">
              View All Listings <FaArrowRight />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { price: "$875,000", beds: 4, baths: 3, sqft: "2,450", location: "Bethesda, MD", type: "Single Family" },
              { price: "$649,000", beds: 3, baths: 2, sqft: "1,850", location: "Arlington, VA", type: "Townhouse" },
              { price: "$525,000", beds: 2, baths: 2, sqft: "1,200", location: "Capitol Hill, DC", type: "Condo" },
            ].map((listing) => (
              <div key={listing.location} className="card group cursor-pointer">
                <div className="bg-gray-200 h-52 relative">
                  <div className="absolute top-3 left-3 bg-gold-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {listing.type}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-navy-900 text-white text-sm font-bold px-3 py-1 rounded">
                    {listing.price}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-navy-900 font-semibold text-lg">{listing.location}</h3>
                  <div className="flex gap-4 text-gray-500 text-sm mt-2">
                    <span>{listing.beds} bed</span>
                    <span>{listing.baths} bath</span>
                    <span>{listing.sqft} sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market snapshot */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif text-gold-500 mb-2">DMV Market Snapshot</h2>
          <p className="text-white/60 mb-10">Current real estate conditions across the region</p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              { region: "Washington, DC", median: "$699K", dom: "18 days", trend: "+3.2%" },
              { region: "Maryland", median: "$485K", dom: "22 days", trend: "+4.1%" },
              { region: "Northern Virginia", median: "$620K", dom: "14 days", trend: "+5.8%" },
            ].map((m) => (
              <div key={m.region} className="bg-white/10 rounded-xl p-6 border border-white/10">
                <h4 className="text-gold-500 font-semibold mb-3">{m.region}</h4>
                <div className="text-2xl font-bold mb-1">{m.median}</div>
                <div className="text-white/60 text-sm">Median Price</div>
                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-white/60">Avg Days on Market</span>
                  <span>{m.dom}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-white/60">YoY Change</span>
                  <span className="text-green-400">{m.trend}</span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/market-news" className="btn-gold inline-block">
            Full Market Report
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title">What Clients Say</h2>
          <p className="section-subtitle">Real experiences from real DMV homeowners</p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(({ name, location, text }) => (
              <div key={name} className="card p-8 text-left">
                <div className="flex gap-1 text-gold-500 mb-4">
                  {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{text}"</p>
                <div>
                  <div className="font-semibold text-navy-900">{name}</div>
                  <div className="text-gray-400 text-sm">{location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gold-500 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Make a Move?</h2>
          <p className="text-white/80 mb-8">
            Whether buying, selling, or investing in the DMV — let's talk strategy.
          </p>
          <Link href="/about#contact" className="bg-navy-900 text-white px-8 py-4 rounded font-semibold hover:bg-navy-700 transition-colors inline-block">
            Schedule a Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
