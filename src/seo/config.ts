export const SITE_URL = "https://null-threat.vercel.app";
export const SITE_NAME = "Null Threat";

export const GITHUB_REPO = "https://github.com/givecursorfree-oss/Null-Threat";
export const GITHUB_RELEASES = `${GITHUB_REPO}/releases`;
export const GITHUB_ISSUES = `${GITHUB_REPO}/issues`;
export const GITHUB_README = `${GITHUB_REPO}#readme`;

export const GPL_LICENSE_URL = "https://www.gnu.org/licenses/gpl-3.0.en.html";

export const SEO = {
  title: "Null Threat | Free Offline Malware Scanner (Open Source, Local AV)",
  description:
    "Null Threat is a free, open-source offline malware scanner for Windows, macOS, and Linux. Four local engines, zero cloud uploads, no subscription, no telemetry. GPL v3.",
  ogTitle: "Null Threat | Free Offline Malware Scanner",
  ogDescription:
    "Scan every file locally with four detection engines. No cloud uploads, no subscription, no telemetry. Free and open source under GPL v3.",
  primaryKeyword: "offline malware scanner",
  secondaryKeywords: [
    "local antivirus",
    "open source security scanner",
    "YARA scanner",
    "privacy-first malware detection",
    "free desktop security scanner",
  ],
} as const;
