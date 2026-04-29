import Parser from "rss-parser";
import fs from "fs";
import path from "path";

export interface FeedItem {
  title: string; link: string; pubDate: string;
  contentSnippet: string; source: string;
}

interface Source { id: string; name: string; url: string; active: boolean }

function getActiveSources(): Source[] {
  try {
    const filePath = path.join(process.cwd(), "data/news-sources.json");
    const sources: Source[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return sources.filter((s) => s.active);
  } catch {
    return [];
  }
}

export async function fetchAllFeeds(): Promise<FeedItem[]> {
  const sources = getActiveSources();
  const parser = new Parser({ timeout: 8000, headers: { "User-Agent": "DMVRealty/1.0" } });

  const results = await Promise.allSettled(
    sources.map(async ({ url, name }) => {
      const feed = await parser.parseURL(url);
      return (feed.items ?? []).slice(0, 6).map((item) => ({
        title: item.title ?? "",
        link: item.link ?? "#",
        pubDate: item.pubDate ?? item.isoDate ?? "",
        contentSnippet: item.contentSnippet ?? item.summary ?? "",
        source: name,
      }));
    })
  );

  const items: FeedItem[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") items.push(...r.value);
  }
  return items.sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1));
}
