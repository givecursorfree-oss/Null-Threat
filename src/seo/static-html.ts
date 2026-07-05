import {
  GITHUB_README,
  GITHUB_RELEASES,
  GITHUB_REPO,
  GPL_LICENSE_URL,
  SEO,
  SITE_URL,
} from "./config";
import { cloudAvCons, deepAnalysisStages, engines, features, localAvPros, riskTiers } from "./content";
import { videoSafeScanningPoints } from "./deep-analysis";
import { faqItems } from "./faq";

function siteNav(): string {
  return `<header aria-label="Null Threat">
  <p><strong>Null Threat</strong> — free offline malware scanner</p>
</header>
<nav aria-label="Site">
  <a href="${SITE_URL}/">Home</a> |
  <a href="${SITE_URL}/download">Download</a> |
  <a href="${SITE_URL}/compare">Compare</a> |
  <a href="${SITE_URL}/faq">FAQ</a> |
  <a href="${SITE_URL}/docs">Docs</a> |
  <a href="#engines">Engines</a> |
  <a href="#compare">Compare section</a> |
  <a href="#download">Download section</a> |
  <a href="#faq">FAQ section</a>
</nav>`;
}

export function buildHomepageStaticHtml(): string {
  const engineList = engines
    .map((e) => `<li><h3>${e.title}</h3><p>${e.body}</p></li>`)
    .join("\n");

  const faqHtml = faqItems
    .map((item) => `<dt><h3>${item.question}</h3></dt><dd><p>${item.answer}</p></dd>`)
    .join("\n");

  const featureList = features
    .map((f) => `<li><h3>${f.title}</h3><p>${f.body}</p></li>`)
    .join("\n");

  const riskList = riskTiers
    .map((t) => `<li><strong>${t.name}</strong>: ${t.range}</li>`)
    .join("\n");

  const cloudList = cloudAvCons.map((t) => `<li>${t}</li>`).join("\n");
  const localList = localAvPros.map((t) => `<li>${t}</li>`).join("\n");

  return `<main id="static-seo-content">
  ${siteNav()}
  <article>
    <header>
      <h1>${SEO.title.split(" | ")[0]}: Free Offline Malware Scanner</h1>
      <p>${SEO.description}</p>
      <p><a href="${GITHUB_RELEASES}">Download Null Threat</a> · <a href="${SITE_URL}/docs">Read the docs</a></p>
    </header>

    <section id="platform">
      <h2>Four engines. Full local verification.</h2>
      <p>Hash lookup, signature scanning, YARA rules, and deep analysis run on your machine. No uploads and no black-box verdicts.</p>
    </section>

    <section id="compare">
      <h2>Local antivirus vs cloud antivirus</h2>
      <p>Cloud scanners ask you to trust a remote vendor. Null Threat keeps evidence on your device.</p>
      <h3>Typical cloud AV</h3>
      <ul>${cloudList}</ul>
      <h3>Null Threat</h3>
      <ul>${localList}</ul>
      <p><a href="${SITE_URL}/compare">Read the full comparison</a> · <a href="${SITE_URL}/blog/null-threat-vs-clamav">Null Threat vs ClamAV</a></p>
    </section>

    <section id="engines">
      <h2>Four detection engines. One verified verdict.</h2>
      <ol>${engineList}</ol>
    </section>

    <section id="deep-analysis">
      <h2>Deep Analysis pipeline</h2>
      <p>Multi-stage deep analysis with four sub-checks: Identity, Structure, Metadata, and Steganography. Expand Deep Analysis in scan results to review bullet-point findings.</p>
      <h3>Sub-checks</h3>
      <ul>${deepAnalysisStages.map((s) => `<li><h4>${s.title}</h4><p>${s.body}</p></li>`).join("")}</ul>
      <h3>Video-safe scanning</h3>
      <ul>${videoSafeScanningPoints.map((p) => `<li>${p}</li>`).join("")}</ul>
    </section>

    <section id="features">
      <h2>Built for daily security work</h2>
      <p>Watch folders, quarantine threats, and export reports without leaving your machine.</p>
      <ul>${featureList}</ul>
    </section>

    <section id="risk">
      <h2>Understand every risk score</h2>
      <p>Each engine contributes evidence to a transparent 0–100 score.</p>
      <ul>${riskList}</ul>
    </section>

    <section id="opensource">
      <h2>Null Threat is open source</h2>
      <p>Clone the repository and verify every engine yourself. No vendor lock-in and no hidden network calls.</p>
      <p><a href="${GITHUB_REPO}">View source on GitHub</a> · <a href="${GPL_LICENSE_URL}">GPL v3 license</a></p>
    </section>

    <section id="download">
      <h2>Download Null Threat</h2>
      <p>Free forever under GPL v3. No account, no credit card, no cloud uploads. Available for Windows, macOS, and Linux.</p>
      <p><a href="${GITHUB_RELEASES}">Download from GitHub Releases</a></p>
      <p><a href="${SITE_URL}/download">Download page</a></p>
    </section>

    <section id="guide">
      <h2>Free offline malware scanner for Windows, macOS, and Linux</h2>
      <p>Null Threat is an open-source local antivirus alternative for privacy-first users, developers, security researchers, and offline systems.</p>
    </section>

    <section id="faq">
      <h2>Frequently asked questions</h2>
      <dl>${faqHtml}</dl>
      <p><a href="${SITE_URL}/faq">View all FAQs</a></p>
    </section>
  </article>
  <footer>
    <p>© 2026 Null Threat. GPL v3. <a href="${GITHUB_README}">Build guide</a></p>
  </footer>
</main>`;
}
