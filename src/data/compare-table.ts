import type { ComparisonData } from "@/components/shadcn-studio/blocks/compare-07/compare-07";

export const nullThreatComparisonData: ComparisonData = {
  title: "Local antivirus vs cloud antivirus",
  description:
    "Cloud scanners ask you to trust a remote vendor. Null Threat keeps every byte on your machine with evidence you can review.",
  featuredColumn: 2,
  column1Header: {
    title: "Typical cloud AV",
  },
  column2Header: {
    title: "Null Threat",
  },
  column3Header: "What this means for you",
  features: [
    {
      name: "Pricing",
      column1: "Monthly or annual subscription, often per device",
      column2: "Free forever under GPL v3",
      column3: "No subscription lock-in for personal or lab use",
    },
    {
      name: "Privacy",
      column1: "Uploads samples and metadata to vendor cloud",
      column2: "Scans stay on your device; no telemetry",
      column3: "Choose local scanning when uploads are unacceptable",
    },
    {
      name: "Detection engines",
      column1: "Closed-source cloud pipeline; opaque verdicts",
      column2: "Hash lookup, signatures, YARA, and Deep Analysis",
      column3: "Null Threat shows per-engine evidence in results",
    },
    {
      name: "Open source",
      column1: "Proprietary code and rule sets",
      column2: "GPL v3 — audit every detection module",
      column3: "Verify behavior instead of trusting a black box",
    },
    {
      name: "Offline use",
      column1: "Requires internet for scanning and updates",
      column2: "Works fully offline after rule packs are updated",
      column3: "Ideal for air-gapped labs and travel workflows",
    },
    {
      name: "Deep analysis",
      column1: "Varies by vendor; often not exposed in UI",
      column2: "Identity, Structure, Metadata, and Steganography checks",
      column3: "Expand findings before quarantine on suspicious files",
    },
    {
      name: "Quarantine",
      column1: "Cloud-managed isolation with vendor policy",
      column2: "Local quarantine vault with a clear audit trail",
      column3: "Keep control of isolated files on your machine",
    },
    {
      name: "Updates",
      column1: "Automatic cloud signature pushes",
      column2: "Update signatures and YARA packs once while online",
      column3: "You choose when to refresh rules, then scan offline",
    },
    {
      name: "Best for",
      column1: "Teams that accept cloud upload for convenience",
      column2: "Developers, privacy workflows, and offline environments",
      column3: "Pick local scanning when evidence and privacy matter",
    },
  ],
};
