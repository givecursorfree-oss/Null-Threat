export type DeepAnalysisSubCheck = {
  id: string;
  title: string;
  summary: string;
  findings: readonly string[];
};

/** Four sub-checks in the Deep Analysis pipeline (mirrors the desktop app). */
export const deepAnalysisSubChecks: readonly DeepAnalysisSubCheck[] = [
  {
    id: "identity",
    title: "Identity",
    summary: "Magic bytes, extension vs content mismatch, Shannon entropy.",
    findings: [
      "Magic bytes match MP4 container (ftyp isom)",
      "Extension .mp4 aligns with detected MIME type",
      "Shannon entropy 6.2 — within expected range for H.264 video",
      "Entropy check skipped: video container (video-safe rule)",
    ],
  },
  {
    id: "structure",
    title: "Structure",
    summary: "MP4/MOV/MKV container walk and subtitle script injection scan.",
    findings: [
      "Parsed moov / mdat atom tree — no anomalous box sizes",
      "Binary NAL units inside container ignored (not scored as script)",
      "Subtitle track scanned — no embedded JavaScript or shell payloads",
      "No polyglot header overlap detected",
    ],
  },
  {
    id: "metadata",
    title: "Metadata",
    summary: "ExifTool + native tag scanner for hidden scripts and payloads.",
    findings: [
      "ExifTool: standard QuickTime creation tags only",
      "XMP block present — no executable payload in comment fields",
      "Native tag scanner: no suspicious URL or base64 blobs in metadata",
    ],
  },
  {
    id: "steganography",
    title: "Steganography",
    summary: "Chi-square + RS LSB analysis on raster images.",
    findings: [
      "Video LSB steganalysis disabled for this file type (documented, not scored)",
      "Poster frame PNG: Chi-square within normal distribution",
      "RS analysis: no statistically significant LSB bias",
    ],
  },
] as const;

export const videoSafeScanningPoints = [
  "Entropy checks skipped for video, audio, compressed images, and archives",
  "MP4 structure parser ignores binary NAL bytes inside containers",
  "Video LSB steganalysis disabled — documented and excluded from risk score",
  "Normal MP4/MKV files no longer flagged as critical false positives",
] as const;

export const deepAnalysisEngineSummary =
  "Multi-stage deep analysis beyond basic file scan: Identity, Structure, Metadata, and Steganography sub-checks with expandable findings in scan results.";
