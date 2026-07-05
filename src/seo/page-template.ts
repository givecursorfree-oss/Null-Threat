import { SITE_NAME } from "./config";
import { buildSiteBrandHeadHtml } from "./site-head";
import type { Subpage } from "./subpages";

export function buildSubpageDocument(page: Subpage, structuredDataJson?: string): string {
  const jsonLd = structuredDataJson
    ? `<script type="application/ld+json">\n${structuredDataJson}\n</script>`
    : "";

  const brandHead = buildSiteBrandHeadHtml({
    title: page.title,
    description: page.description,
    canonical: page.canonical,
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${brandHead}
  <link rel="stylesheet" href="/seo-static.css" />
  ${jsonLd}
</head>
<body>
  <div class="page">
    ${page.bodyHtml}
    <footer><p>© 2026 ${SITE_NAME}. <a href="/">Home</a></p></footer>
  </div>
</body>
</html>`;
}
