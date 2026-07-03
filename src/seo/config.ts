function resolveSiteUrl(): string {
  const fromEnv =
    typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL;
  return String(fromEnv || "https://null-threat.vercel.app").replace(/\/$/, "");
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "Null Threat";

export const GITHUB_REPO = "https://github.com/givecursorfree-oss/Null-Threat";
export const GITHUB_RELEASES = `${GITHUB_REPO}/releases`;
export const GITHUB_ISSUES = `${GITHUB_REPO}/issues`;
export const GITHUB_README = `${GITHUB_REPO}#readme`;

export const GPL_LICENSE_URL = "https://www.gnu.org/licenses/gpl-3.0.en.html";

/** GitHub Topics to add in repo Settings → Topics */
export const GITHUB_TOPICS = [
  "malware-scanner",
  "yara",
  "offline-security",
  "open-source",
  "security-tools",
  "clamav",
  "privacy",
  "gplv3",
] as const;

export const SEO = {
  title: "Null Threat | Free Offline Malware Scanner",
  description:
    "Null Threat is a free offline malware scanner for Windows, macOS and Linux. Four local engines, no cloud uploads, no telemetry. Open source GPL v3.",
  ogTitle: "Null Threat | Free Offline Malware Scanner",
  ogDescription:
    "Null Threat scans files locally with four detection engines. No cloud uploads, no subscription. Free GPL v3.",
  primaryKeyword: "null threat",
  brandKeyword: "null threat",
} as const;
