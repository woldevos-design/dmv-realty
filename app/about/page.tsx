import type { Metadata } from "next";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaAward, FaUsers, FaHome } from "react-icons/fa";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Alex Johnson, your trusted DMV real estate agent with 14 years of experience in DC, Maryland, and Virginia.",
};

const credentials = [
  "Licensed in DC, Maryland & Virginia",
  "Certified Residential Specialist (CRS)",
  "Accredited Buyer's Representative (ABR)",
  "Graduate, REALTOR® Institute (GRI)",
  "Member – Greater Capital Area Association of REALTORS®",
  "Top Producer 2019–2024",
];

const milestones = [
  { icon: <FaHome size={24} className="text-gold-500" />, label: "Homes Sold", value: "500+" },
  { icon: <FaUsers size={24} className="text-gold-500" />, label: "Happy Clients", value: "450+" },
  { icon: <FaAward size={24} className="text-gold-500" />, label: "Years Experience", value: "14" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-gold-500 text-sm font-semibold uppercase tracking-widest">Meet Your Agent</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mt-2 mb-4">Alex Johnson</h1>
          <p className="text-white/70 text-lg max-w-xl">
            DMV's trusted real estate partner — serving Washington DC, Maryland, and Virginia since 2010.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-start">
          {/* Photo placeholder */}
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center text-gray-400 text-sm">
            [Agent Photo]
          </div>

          <div>
            <h2 className="section-title">My Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                A lifelong DMV resident, I grew up watching the region transform into one of the most
                dynamic real estate markets in the country. After earning a degree in Business
                Administration from the University of Maryland, I discovered my passion for helping
                people navigate one of the biggest decisions of their lives.
              </p>
              <p>
                Over the past 14 years, I've closed more than 500 transactions — from cozy Capitol Hill
                condos and Bethesda single-families to Northern Virginia investment properties. Each deal
                has deepened my understanding of the DMV's unique micro-markets and what it takes to win
                in a competitive environment.
              </p>
              <p>
                I'm known for my straight-talking approach, obsessive market research, and fierce
                advocacy for my clients. Whether you're buying your first home or your fifth investment
                property, I'll give you the same attention and dedication.
              </p>
            </div>

            {/* Milestones */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {milestones.map(({ icon, label, value }) => (
                <div key={label} className="text-center bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-center mb-2">{icon}</div>
                  <div className="text-2xl font-bold font-serif text-navy-900">{value}</div>
                  <div className="text-gray-500 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Credentials &amp; Designations</h2>
          <p className="section-subtitle text-center">Committed to ongoing education and excellence</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {credentials.map((c) => (
              <div key={c} className="bg-white border border-gray-100 rounded-lg px-5 py-4 text-sm text-gray-700 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Areas I Serve</h2>
          <p className="section-subtitle text-center">Deep local expertise across all DMV submarkets</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                region: "Washington, DC",
                areas: ["Capitol Hill", "Georgetown", "Logan Circle", "Dupont Circle", "Adams Morgan", "Navy Yard", "Shaw", "Petworth"],
              },
              {
                region: "Maryland",
                areas: ["Bethesda", "Chevy Chase", "Silver Spring", "Rockville", "Gaithersburg", "College Park", "Bowie", "Annapolis"],
              },
              {
                region: "Northern Virginia",
                areas: ["Arlington", "Alexandria", "McLean", "Vienna", "Reston", "Herndon", "Falls Church", "Fairfax"],
              },
            ].map(({ region, areas }) => (
              <div key={region} className="card p-6">
                <h3 className="font-serif text-navy-900 text-xl font-semibold mb-4 pb-3 border-b border-gray-100">
                  {region}
                </h3>
                <ul className="space-y-2">
                  {areas.map((a) => (
                    <li key={a} className="text-gray-600 text-sm flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gold-500 shrink-0 text-xs" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact" className="py-20 bg-navy-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-gold-500 mb-2 text-center">Get in Touch</h2>
          <p className="text-white/60 text-center mb-10">Ready to start your real estate journey? Let's talk.</p>

          <form className="space-y-5" action="/api/contact" method="POST">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-white/70 text-sm block mb-1">First Name</label>
                <input name="firstName" type="text" required className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold-500" placeholder="Jane" />
              </div>
              <div>
                <label className="text-white/70 text-sm block mb-1">Last Name</label>
                <input name="lastName" type="text" required className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold-500" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="text-white/70 text-sm block mb-1">Email</label>
              <input name="email" type="email" required className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold-500" placeholder="jane@example.com" />
            </div>
            <div>
              <label className="text-white/70 text-sm block mb-1">Phone</label>
              <input name="phone" type="tel" className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold-500" placeholder="(202) 555-0100" />
            </div>
            <div>
              <label className="text-white/70 text-sm block mb-1">I'm interested in...</label>
              <select name="interest" className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white focus:outline-none focus:border-gold-500">
                <option value="buying" className="text-gray-800">Buying a Home</option>
                <option value="selling" className="text-gray-800">Selling a Home</option>
                <option value="investing" className="text-gray-800">Investing</option>
                <option value="other" className="text-gray-800">General Inquiry</option>
              </select>
            </div>
            <div>
              <label className="text-white/70 text-sm block mb-1">Message</label>
              <textarea name="message" rows={4} className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold-500" placeholder="Tell me about your real estate goals..." />
            </div>
            <button type="submit" className="btn-gold w-full text-center">
              Send Message
            </button>
          </form>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-white/60">
            <a href="tel:+12025550199" className="flex items-center gap-2 hover:text-gold-500 transition-colors">
              <FaPhone /> (202) 555-0199
            </a>
            <a href="mailto:alex@dmvpremierrealty.com" className="flex items-center gap-2 hover:text-gold-500 transition-colors">
              <FaEnvelope /> alex@dmvpremierrealty.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
