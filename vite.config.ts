import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { buildSitemapXml } from "./src/seo/sitemap";
import { buildSubpageDocument } from "./src/seo/page-template";
import { buildHomepageStaticHtml } from "./src/seo/static-html";
import { buildStructuredDataJson, buildSubpageStructuredDataJson } from "./src/seo/structured-data";
import { subpages } from "./src/seo/subpages";

function seoStaticPlugin(): Plugin {
  return {
    name: "seo-static",
    transformIndexHtml(html) {
      return html
        .replace("%STRUCTURED_DATA_JSON%", buildStructuredDataJson())
        .replace("%STATIC_SEO_HTML%", buildHomepageStaticHtml());
    },
    closeBundle() {
      const distDir = path.resolve(process.cwd(), "dist");

      for (const page of subpages) {
        const pageDir = path.join(distDir, page.slug);
        fs.mkdirSync(pageDir, { recursive: true });
        fs.writeFileSync(
          path.join(pageDir, "index.html"),
          buildSubpageDocument(page, buildSubpageStructuredDataJson(page.slug)),
          "utf8"
        );
      }

      fs.writeFileSync(path.join(distDir, "sitemap.xml"), buildSitemapXml(), "utf8");
    },
  };
}

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' https://cdn.jsdelivr.net https://assets.unicorn.studio",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://assets.unicorn.studio https://hoirqrkdgbmvpwutwuwj.supabase.co",
  "media-src 'self' data: blob:",
  "connect-src 'self' https://assets.unicorn.studio https://cdn.jsdelivr.net https://hoirqrkdgbmvpwutwuwj.supabase.co",
  "worker-src 'self' blob:",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders: Record<string, string> = {
  "Content-Security-Policy": csp,
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};

export default defineConfig({
  plugins: [react(), seoStaticPlugin()],
  build: {
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      format: {
        comments: false,
      },
      mangle: {
        toplevel: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    headers: securityHeaders,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    css: true,
  },
});
