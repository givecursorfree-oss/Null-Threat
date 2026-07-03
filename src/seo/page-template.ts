import { SITE_NAME } from "./config";
import type { Subpage } from "./subpages";

export function buildSubpageDocument(page: Subpage, structuredDataJson?: string): string {
  const jsonLd = structuredDataJson
    ? `<script type="application/ld+json">\n${structuredDataJson}\n</script>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${page.title}</title>
  <meta name="description" content="${page.description}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${page.canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:url" content="${page.canonical}" />
  <meta property="og:title" content="${page.title}" />
  <meta property="og:description" content="${page.description}" />
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
