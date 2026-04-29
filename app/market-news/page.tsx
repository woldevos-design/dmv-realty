import type { Metadata } from "next";
import { fetchAllFeeds, FeedItem } from "@/lib/rss";
import { format, parseISO, isValid } from "date-fns";
import { FaExternalLinkAlt, FaNewspaper, FaRss } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Market News",
  description: "Live DMV real estate market news aggregated from Mortgage News Daily, HousingWire, NAR, and more.",
};

export const revalidate = 1800; // refresh every 30 minutes

const sourceColors: Record<string, string> = {
  "Mortgage News Daily": "bg-blue-100 text-blue-700",
  "HousingWire": "bg-green-100 text-green-700",
  "U.S. News Real Estate": "bg-purple-100 text-purple-700",
  "NAR Research": "bg-amber-100 text-amber-700",
};

function formatDate(dateStr: string) {
  try {
    const d = parseISO(dateStr);
    if (isValid(d)) return format(d, "MMM d, yyyy · h:mm a");
  } catch {}
  try {
    const d = new Date(dateStr);
    if (isValid(d)) return format(d, "MMM d, yyyy · h:mm a");
  } catch {}
  return dateStr;
}

export default async function MarketNewsPage() {
  let items: FeedItem[] = [];
  let error = false;

  try {
    items = await fetchAllFeeds();
  } catch {
    error = true;
  }

  const sources = ["All", "Mortgage News Daily", "HousingWire", "U.S. News Real Estate", "NAR Research"];

  return (
    <>
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <FaRss className="text-gold-500" />
            <span className="text-gold-500 text-sm font-semibold uppercase tracking-widest">Live Feed</span>
          </div>
          <h1 className="text-4xl font-serif font-bold">Market News</h1>
          <p className="text-white/70 mt-3 max-w-2xl">
            Real-time real estate and mortgage news from top industry sources — curated for DMV buyers, sellers, and investors.
          </p>
        </div>
      </section>

      {/* DMV Market snapshot */}
      <section className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-serif text-navy-900 font-semibold mb-6">DMV Market at a Glance</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "30-Yr Fixed Rate", value: "6.87%", note: "National avg · update weekly" },
              { label: "DC Median Price", value: "$699K", note: "↑ 3.2% YoY" },
              { label: "MD Median Price", value: "$485K", note: "↑ 4.1% YoY" },
              { label: "NoVA Median Price", value: "$620K", note: "↑ 5.8% YoY" },
            ].map(({ label, value, note }) => (
              <div key={label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="text-sm text-gray-500 mb-1">{label}</div>
                <div className="text-2xl font-bold font-serif text-navy-900">{value}</div>
                <div className="text-xs text-gray-400 mt-1">{note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Feed */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="section-title mb-0">Latest Headlines</h2>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <FaNewspaper /> Aggregated from {sources.length - 1} trusted sources
            </div>
          </div>

          {error && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-lg p-4 mb-8 text-sm">
              Some feeds could not be loaded at this time. Please check back shortly.
            </div>
          )}

          {items.length === 0 && !error && (
            <div className="text-center py-20 text-gray-400">
              <FaRss className="mx-auto text-4xl mb-4 opacity-30" />
              <p>No news items available. Feed sources may be temporarily unavailable.</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-6 block group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${sourceColors[item.source] ?? "bg-gray-100 text-gray-600"}`}>
                    {item.source}
                  </span>
                  <FaExternalLinkAlt className="text-gray-300 group-hover:text-gold-500 transition-colors text-sm shrink-0 mt-1" />
                </div>
                <h3 className="font-serif text-navy-900 font-semibold leading-snug group-hover:text-gold-500 transition-colors mb-2">
                  {item.title}
                </h3>
                {item.contentSnippet && (
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-3">
                    {item.contentSnippet}
                  </p>
                )}
                {item.pubDate && (
                  <div className="text-xs text-gray-400">{formatDate(item.pubDate)}</div>
                )}
              </a>
            ))}
          </div>

          {/* Source attribution */}
          <div className="mt-12 bg-gray-50 rounded-xl p-6 text-sm text-gray-500">
            <p className="font-semibold text-gray-700 mb-2">News Sources</p>
            <p>
              Headlines are aggregated from{" "}
              <a href="https://www.mortgagenewsdaily.com" target="_blank" rel="noopener noreferrer" className="text-navy-900 hover:text-gold-500 underline">Mortgage News Daily</a>,{" "}
              <a href="https://www.housingwire.com" target="_blank" rel="noopener noreferrer" className="text-navy-900 hover:text-gold-500 underline">HousingWire</a>,{" "}
              <a href="https://realestate.usnews.com" target="_blank" rel="noopener noreferrer" className="text-navy-900 hover:text-gold-500 underline">U.S. News Real Estate</a>, and{" "}
              <a href="https://www.nar.realtor" target="_blank" rel="noopener noreferrer" className="text-navy-900 hover:text-gold-500 underline">NAR Research</a>.
              All content belongs to its respective publisher. Updated every 30 minutes.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
