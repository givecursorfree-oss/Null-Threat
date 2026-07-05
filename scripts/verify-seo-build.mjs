import fs from "node:fs";
import path from "node:path";

const distIndex = path.resolve("dist/index.html");
const html = fs.readFileSync(distIndex, "utf8");

const failures = [];

if (html.includes("%STATIC_SEO_HTML%") || html.includes("%STRUCTURED_DATA_JSON%") || html.includes("%SITE_BRAND_HEAD%")) {
  failures.push("unreplaced SEO placeholders");
}
if (html.includes('name="keywords"')) {
  failures.push('deprecated meta keywords tag present');
}
if (!html.includes("<title>Null Threat | Free Offline Malware Scanner</title>")) {
  failures.push("expected title tag missing");
}
if (!html.includes('property="og:site_name" content="Null Threat"')) {
  failures.push("og:site_name Null Threat missing");
}
if (!html.includes('application/ld+json')) {
  failures.push("JSON-LD block missing");
}
if (!html.includes('SoftwareApplication')) {
  failures.push("SoftwareApplication schema missing");
}

const h2Count = (html.match(/<h2[\s>]/g) ?? []).length;
if (h2Count < 8) {
  failures.push(`expected at least 8 <h2> tags, found ${h2Count}`);
}

const rootBlock = html.match(/<div id="root">([\s\S]*?)<\/div>/);
if (!rootBlock?.[1]?.includes("<h2")) {
  failures.push("#root does not contain static <h2> content");
}

const text = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ");
const wordCount = text.split(/\s+/).filter(Boolean).length;
if (wordCount < 400) {
  failures.push(`expected at least 400 words in built HTML, found ${wordCount}`);
}

for (const slug of [
  "download",
  "faq",
  "compare",
  "docs",
  "about",
  "blog/null-threat-vs-clamav",
]) {
  const pagePath = path.resolve(`dist/${slug}/index.html`);
  if (!fs.existsSync(pagePath)) {
    failures.push(`missing static subpage: /${slug}`);
  }
}

if (failures.length) {
  console.error("SEO build verification failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log(`SEO build OK: ${h2Count} h2 tags, ~${wordCount} words, subpages present.`);
