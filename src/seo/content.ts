export const engines = [
  {
    title: "SHA-256 Hash Lookup",
    body: "500K+ MalwareBazaar and NSRL signatures for known-malware matching.",
  },
  {
    title: "Signature Scanning",
    body: "Industry-standard local signature engine for commodity threats.",
  },
  {
    title: "YARA Rules",
    body: "Polyglot and packed executable detection with custom rule packs.",
  },
  {
    title: "Deep Analysis",
    body: "Multi-stage pipeline: Identity, Structure, Metadata, and Steganography sub-checks with expandable findings in scan results.",
  },
] as const;

export const deepAnalysisStages = [
  {
    title: "Identity",
    body: "Magic bytes, extension vs content mismatch, and Shannon entropy with video-safe skip rules.",
  },
  {
    title: "Structure",
    body: "MP4/MOV/MKV container walk, subtitle script injection scan, NAL bytes ignored inside containers.",
  },
  {
    title: "Metadata",
    body: "ExifTool plus native tag scanner for hidden scripts and payload blobs in file tags.",
  },
  {
    title: "Steganography",
    body: "Chi-square and RS LSB analysis on images; video LSB disabled and documented when not scored.",
  },
] as const;

export const cloudAvCons = [
  "Sends your files to the cloud",
  "Closed-source detection",
  "Monthly subscription",
  "Requires an internet connection",
] as const;

export const localAvPros = [
  "Scans every file locally",
  "Open source under GPL v3",
  "Free forever",
  "Works fully offline",
] as const;

export const features = [
  {
    title: "Real-time folder watch",
    body: "Files are scanned the moment they land on disk without polling a remote API.",
  },
  {
    title: "Quarantine vault",
    body: "Isolate suspicious files locally with a clear audit trail before deletion.",
  },
  {
    title: "Exportable scan reports",
    body: "Save engine evidence and risk scores for compliance or incident review.",
  },
] as const;

export const riskTiers = [
  { name: "Clean", range: "0-20" },
  { name: "Suspicious", range: "21-50" },
  { name: "High risk", range: "51-80" },
  { name: "Malware", range: "81-100" },
] as const;

export const downloadSteps = [
  "Download the Windows, macOS, or Linux build from GitHub Releases.",
  "Install or extract the application on your local machine.",
  "Update signature and YARA rule packs once while online.",
  "Select files or folders and start an offline scan.",
  "Review the risk score and quarantine anything above your threshold.",
] as const;

export const docSections = [
  {
    title: "Scan pipeline",
    body: "Null Threat runs hash lookup, signature scanning, YARA matching, and deep analysis in sequence. Deep Analysis expands into Identity, Structure, Metadata, and Steganography sub-checks. Each stage adds evidence to the final 0–100 risk score.",
  },
  {
    title: "Deep Analysis UI",
    body: "In scan results, click Deep Analysis to expand each sub-check. Identity, Structure, Metadata, and Steg open with bullet-point findings you can review before quarantine.",
  },
  {
    title: "Video-safe scanning",
    body: "Entropy checks are skipped for video, audio, compressed images, and archives. The MP4 parser ignores binary NAL bytes; video LSB steganalysis is disabled and not scored, so normal MP4/MKV files avoid critical false positives.",
  },
  {
    title: "Offline operation",
    body: "After rule updates, scans run without network access. Suitable for air-gapped labs and privacy-sensitive workflows.",
  },
  {
    title: "Build from source",
    body: "Clone the GPL v3 repository, install engine dependencies, and run the scanner from source to audit every detection module.",
  },
] as const;
