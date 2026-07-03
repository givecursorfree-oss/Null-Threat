# Google Search Console — recrawl checklist

Do this after each production deploy.

## 1. Resubmit sitemap

1. Open [Google Search Console](https://search.google.com/search-console)
2. Select property: `https://null-threat.vercel.app`
3. **Sitemaps** → delete old failed entry if any → submit: `sitemap.xml`

Or run locally after deploy (prints the URL checklist):

```bash
npm run seo:ping
```

## 2. Request indexing (each URL)

**URL inspection** (top search bar) → enter URL → **Request indexing**

- https://null-threat.vercel.app/
- https://null-threat.vercel.app/download
- https://null-threat.vercel.app/faq
- https://null-threat.vercel.app/compare
- https://null-threat.vercel.app/docs
- https://null-threat.vercel.app/about
- https://null-threat.vercel.app/blog/null-threat-vs-clamav

## 3. Confirm HTML tab (not only Rendered)

On the homepage inspection → **View crawled page** → **HTML** tab.

Confirm you see:

- Title: `Null Threat | Free Offline Malware Scanner`
- Multiple `<h2>` tags (engines, compare, FAQ)
- `SEO-CONTENT-START` marker

## 4. Custom domain (when ready)

1. Buy domain (e.g. `nullthreat.com`)
2. Add in Vercel → Domains
3. Set `VITE_SITE_URL=https://nullthreat.com` in Vercel env
4. Redeploy
5. Add new property in Search Console + resubmit sitemap
