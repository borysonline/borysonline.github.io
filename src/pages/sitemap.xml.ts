import { getCollection } from "astro:content";
import type { APIContext } from "astro";

type SitemapItem = {
  path: string;
  lastmod?: string;
};

function toIsoDate(value: Date): string {
  return value.toISOString().split("T")[0];
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL("https://borysonline.com");

  const [apps, blog, appTerms, appPrivacy] = await Promise.all([
    getCollection("apps"),
    getCollection("blog"),
    getCollection("app-terms"),
    getCollection("app-privacy"),
  ]);

  const items: SitemapItem[] = [
    { path: "/" },
    { path: "/apps/" },
    { path: "/blog/" },
    { path: "/privacy/" },
    { path: "/terms/" },
    { path: "/context-log-bot/" },
    { path: "/feed.xml" },
  ];

  for (const app of apps) {
    const appId = app.id;
    const appReleaseDate = toIsoDate(app.data.releaseDate);

    const terms = appTerms.find((entry) => entry.data.appId === appId);
    const privacy = appPrivacy.find((entry) => entry.data.appId === appId);

    items.push({ path: `/apps/${appId}/`, lastmod: appReleaseDate });
    items.push({
      path: `/apps/${appId}/terms/`,
      lastmod: terms ? toIsoDate(terms.data.lastUpdated) : appReleaseDate,
    });
    items.push({
      path: `/apps/${appId}/privacy/`,
      lastmod: privacy ? toIsoDate(privacy.data.lastUpdated) : appReleaseDate,
    });
  }

  for (const post of blog) {
    if (post.data.draft) continue;
    items.push({
      path: `/blog/${post.id}/`,
      lastmod: toIsoDate(post.data.pubDate),
    });
  }

  const uniqueItems = Array.from(
    new Map(items.map((item) => [item.path, item])).values(),
  );

  const xmlItems = uniqueItems
    .map((item) => {
      const loc = escapeXml(new URL(item.path, site).toString());
      const lastmod = item.lastmod
        ? `<lastmod>${escapeXml(item.lastmod)}</lastmod>`
        : "";

      return `<url><loc>${loc}</loc>${lastmod}</url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    `${xmlItems}` +
    `</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}