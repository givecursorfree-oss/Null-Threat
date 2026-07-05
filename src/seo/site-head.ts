import { SEO, SITE_NAME, SITE_URL } from "./config";

/** Brand icon paths — keep in sync with public/ and manifest.webmanifest */
export const BRAND_ICON_MARK = "/images/logo-mark.png";
export const BRAND_ICON_SVG = "/favicon.svg";
export const BRAND_ICON_ICO = "/favicon.ico";
export const BRAND_OG_IMAGE = "/images/logobg.png";

export const BRAND_ICON_MARK_URL = `${SITE_URL}${BRAND_ICON_MARK}`;
export const BRAND_OG_IMAGE_URL = `${SITE_URL}${BRAND_OG_IMAGE}`;

/** Shared <head> branding: favicons, site name, social — used on homepage + subpages */
export function buildSiteBrandHeadHtml(options?: {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}): string {
  const title = options?.title ?? SEO.title;
  const description = options?.description ?? SEO.description;
  const canonical = options?.canonical ?? `${SITE_URL}/`;
  const ogImage = options?.ogImage ?? BRAND_OG_IMAGE_URL;

  return `
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="author" content="${SITE_NAME}" />
  <meta name="publisher" content="${SITE_NAME}" />
  <meta name="application-name" content="${SITE_NAME}" />
  <meta name="apple-mobile-web-app-title" content="${SITE_NAME}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="${canonical}" />
  <link rel="home" href="${SITE_URL}/" title="${SITE_NAME}" />

  <meta name="theme-color" content="#09090b" />
  <meta name="color-scheme" content="dark" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:alt" content="${SITE_NAME} logo" />
  <meta property="og:locale" content="en_US" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${ogImage}" />
  <meta name="twitter:image:alt" content="${SITE_NAME} logo" />

  <link rel="icon" href="${BRAND_ICON_ICO}" sizes="any" />
  <link rel="icon" type="image/svg+xml" href="${BRAND_ICON_SVG}" />
  <link rel="icon" type="image/png" sizes="32x32" href="${BRAND_ICON_MARK}" />
  <link rel="icon" type="image/png" sizes="192x192" href="${BRAND_ICON_MARK}" />
  <link rel="apple-touch-icon" sizes="180x180" href="${BRAND_ICON_MARK}" />
  <link rel="manifest" href="/manifest.webmanifest" />
  <link rel="sitemap" type="application/xml" href="/sitemap.xml" />`.trim();
}
