import { GITHUB_ISSUES, GITHUB_README, GITHUB_REPO, GPL_LICENSE_URL } from "@/seo/config";
import LogoIcon from "@/assets/logo-icon";
import { Footer7, type Footer7LinkGroup } from "@/components/ui/footer-7";

/** Exact Footer7 demo gradient background (Watermelon asset). */
const FOOTER7_BACKGROUND = "https://assets.watermelon.sh/footer-7-bg.avif";

const linkGroups: Footer7LinkGroup[] = [
  {
    title: "PRODUCT",
    links: [
      { label: "Features", href: "#features" },
      { label: "Compare", href: "/compare" },
      { label: "Deep Analysis", href: "#deep-analysis" },
      { label: "Engines", href: "#engines" },
      { label: "Download", href: "/download" },
      { label: "Null Threat vs ClamAV", href: "/blog/null-threat-vs-clamav" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "FAQ", href: "/faq" },
      { label: "About", href: "/about" },
      { label: "Open source", href: "#opensource" },
      { label: "Build guide", href: GITHUB_README, external: true },
      { label: "License", href: GPL_LICENSE_URL, external: true },
    ],
  },
  {
    title: "COMMUNITY",
    links: [
      { label: "GitHub", href: GITHUB_REPO, external: true },
      { label: "Issues", href: GITHUB_ISSUES, external: true },
      { label: "Quarantine", href: "#platform" },
      { label: "Risk scores", href: "#risk" },
    ],
  },
];

export default function Footer() {
  return (
    <Footer7
      logo={<LogoIcon className="size-6" />}
      brandName="Null Threat"
      badgeText="Offline by design"
      headline="Scan every file on your machine. Trust nothing until it's verified."
      backgroundImage={FOOTER7_BACKGROUND}
      linkGroups={linkGroups}
      brandWatermark="Null Threat."
    />
  );
}
