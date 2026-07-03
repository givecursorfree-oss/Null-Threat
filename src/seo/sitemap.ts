import { SITE_URL } from "./config";

const paths = ["/", "/download", "/compare", "/faq", "/docs"] as const;

export function buildSitemapXml(): string {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${SITE_URL}${path === "/" ? "/" : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === "/" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
