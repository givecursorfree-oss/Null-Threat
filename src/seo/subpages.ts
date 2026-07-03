import { GITHUB_README, GITHUB_RELEASES, GITHUB_REPO, GPL_LICENSE_URL, SITE_URL } from "./config";
import { cloudAvCons, docSections, downloadSteps, engines, localAvPros } from "./content";
import { faqItems } from "./faq";

export type Subpage = {
  slug: string;
  title: string;
  description: string;
  canonical: string;
  bodyHtml: string;
};

function nav(): string {
  return `<nav aria-label="Site">
  <a href="${SITE_URL}/">Home</a> |
  <a href="${SITE_URL}/download">Download</a> |
  <a href="${SITE_URL}/compare">Compare</a> |
  <a href="${SITE_URL}/faq">FAQ</a> |
  <a href="${SITE_URL}/docs">Docs</a>
</nav>`;
}

export const subpages: Subpage[] = [
  {
    slug: "download",
    title: "Download Null Threat | Free Offline Malware Scanner",
    description:
      "Download Null Threat for Windows, macOS, and Linux. Free GPL v3 builds with four local detection engines and zero cloud uploads.",
    canonical: `${SITE_URL}/download`,
    bodyHtml: `${nav()}
<article>
  <h1>Download Null Threat</h1>
  <p>Null Threat is a free, open-source offline malware scanner. Choose your platform and install locally—no account required.</p>
  <h2>Supported platforms</h2>
  <ul>
    <li><a href="${GITHUB_RELEASES}">Windows build</a></li>
    <li><a href="${GITHUB_RELEASES}">macOS build</a></li>
    <li><a href="${GITHUB_RELEASES}">Linux build</a></li>
  </ul>
  <h2>How to install</h2>
  <ol>${downloadSteps.map((s) => `<li>${s}</li>`).join("")}</ol>
  <h2>Build from source</h2>
  <p>Prefer to compile yourself? Follow the <a href="${GITHUB_README}">repository build guide</a> on GitHub.</p>
  <p><a href="${SITE_URL}/docs">Read the documentation</a> · <a href="${SITE_URL}/faq">FAQ</a></p>
</article>`,
  },
  {
    slug: "compare",
    title: "Local vs Cloud Antivirus | Null Threat",
    description:
      "Compare Null Threat local scanning to cloud antivirus. No file uploads, open-source detection, free GPL v3 license, and full offline support.",
    canonical: `${SITE_URL}/compare`,
    bodyHtml: `${nav()}
<article>
  <h1>Local antivirus vs cloud antivirus</h1>
  <p>Should your files leave your machine to be scanned? Null Threat keeps every byte local.</p>
  <h2>Typical cloud antivirus</h2>
  <ul>${cloudAvCons.map((t) => `<li>${t}</li>`).join("")}</ul>
  <h2>Null Threat local scanning</h2>
  <ul>${localAvPros.map((t) => `<li>${t}</li>`).join("")}</ul>
  <h2>When local scanning wins</h2>
  <p>Choose offline malware scanning when you handle sensitive source code, air-gapped systems, confidential documents, or any workflow where cloud upload is unacceptable.</p>
  <p><a href="${GITHUB_RELEASES}">Download Null Threat</a> · <a href="${SITE_URL}/">Back to homepage</a></p>
</article>`,
  },
  {
    slug: "faq",
    title: "FAQ | Null Threat Offline Malware Scanner",
    description:
      "Answers about Null Threat: offline scanning, detection engines, pricing, supported operating systems, and privacy.",
    canonical: `${SITE_URL}/faq`,
    bodyHtml: `${nav()}
<article>
  <h1>Frequently asked questions</h1>
  <dl>
    ${faqItems.map((item) => `<dt><h2>${item.question}</h2></dt><dd><p>${item.answer}</p></dd>`).join("\n")}
  </dl>
  <p><a href="${GITHUB_RELEASES}">Download Null Threat</a> · <a href="${SITE_URL}/docs">Documentation</a></p>
</article>`,
  },
  {
    slug: "docs",
    title: "Documentation | Null Threat Scanner",
    description:
      "How Null Threat scans files locally: detection pipeline, offline operation, risk scores, and building from source.",
    canonical: `${SITE_URL}/docs`,
    bodyHtml: `${nav()}
<article>
  <h1>Null Threat documentation</h1>
  <p>Technical overview of the local detection pipeline and how to run scans offline.</p>
  ${docSections.map((s) => `<section><h2>${s.title}</h2><p>${s.body}</p></section>`).join("\n")}
  <h2>Detection engines</h2>
  <ol>${engines.map((e) => `<li><h3>${e.title}</h3><p>${e.body}</p></li>`).join("")}</ol>
  <h2>Repository</h2>
  <p>Source code and build instructions: <a href="${GITHUB_REPO}">${GITHUB_REPO}</a></p>
  <p>License: <a href="${GPL_LICENSE_URL}">GNU GPL v3</a></p>
  <p><a href="${GITHUB_RELEASES}">Download builds</a> · <a href="${SITE_URL}/faq">FAQ</a></p>
</article>`,
  },
];
