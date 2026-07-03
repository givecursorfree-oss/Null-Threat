import { GPL_LICENSE_URL, GITHUB_REPO, SITE_NAME, SITE_URL } from "./config";
import { faqItems } from "./faq";

const LOGO_URL = `${SITE_URL}/images/logo-mark.png`;
const OG_IMAGE_URL = `${SITE_URL}/images/logobg.png`;

export function buildStructuredDataGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          "Free offline malware scanner with four local detection engines for Windows, macOS, and Linux.",
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Null Threat | Free Offline Malware Scanner",
        description:
          "Download a free, open-source local antivirus alternative. Four offline engines, zero cloud uploads, GPL v3.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#software` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE_URL,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: SITE_NAME,
        url: SITE_URL,
        applicationCategory: "SecurityApplication",
        operatingSystem: "Windows, macOS, Linux",
        description:
          "Null Threat scans files locally using hash lookup, signature scanning, YARA rules, and deep analysis. No cloud uploads and no telemetry.",
        featureList: [
          "SHA-256 hash lookup against malware databases",
          "Local signature scanning",
          "YARA rule matching",
          "Entropy and deep file analysis",
          "Risk scoring and quarantine",
          "Fully offline scanning after rule updates",
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        license: GPL_LICENSE_URL,
        isAccessibleForFree: true,
        downloadUrl: `${SITE_URL}/#download`,
        screenshot: OG_IMAGE_URL,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: LOGO_URL,
        sameAs: [GITHUB_REPO],
      },
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/#howto-scan`,
        name: "How to scan files locally with Null Threat",
        description:
          "Run an offline malware scan on your desktop without uploading files to the cloud.",
        step: [
          {
            "@type": "HowToStep",
            name: "Download Null Threat",
            text: "Get the Windows, macOS, or Linux build from the download section or GitHub releases.",
            url: `${SITE_URL}/#download`,
          },
          {
            "@type": "HowToStep",
            name: "Select files or folders",
            text: "Choose the files or directories you want to verify on your local machine.",
          },
          {
            "@type": "HowToStep",
            name: "Review engine results",
            text: "Null Threat runs hash lookup, signature scanning, YARA matching, and deep analysis locally.",
            url: `${SITE_URL}/#engines`,
          },
          {
            "@type": "HowToStep",
            name: "Act on the risk score",
            text: "Use the 0–100 risk score to decide whether to quarantine or keep each file.",
            url: `${SITE_URL}/#risk`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function buildStructuredDataJson(): string {
  return JSON.stringify(buildStructuredDataGraph(), null, 2);
}
