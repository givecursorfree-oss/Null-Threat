const SITE_URL = String(process.env.VITE_SITE_URL || "https://null-threat.vercel.app").replace(
  /\/$/,
  ""
);

console.log("Google sitemap ping API is deprecated — use Search Console instead.\n");
console.log("1. GSC → Sitemaps → submit: sitemap.xml");
console.log(`   ${SITE_URL}/sitemap.xml\n`);
console.log("2. URL Inspection → Request indexing for each URL:\n");

for (const path of [
  "/",
  "/faq",
  "/download",
  "/compare",
  "/docs",
  "/about",
  "/blog/null-threat-vs-clamav",
]) {
  console.log(`   ${SITE_URL}${path === "/" ? "" : path}`);
}

console.log("\n3. View crawled page → HTML tab (not only Rendered)");
console.log("   Confirm title + H2s are present in raw HTML.");
