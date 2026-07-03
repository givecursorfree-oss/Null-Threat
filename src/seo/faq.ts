export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "What is Null Threat?",
    answer:
      "Null Threat is a free, open-source desktop security scanner that checks files on your machine using four local detection engines. It runs entirely on your device with no cloud uploads and no telemetry.",
  },
  {
    question: "Does Null Threat upload my files to the cloud?",
    answer:
      "No. Every scan runs locally on your computer. Files are never sent to external servers, and Null Threat does not collect usage telemetry.",
  },
  {
    question: "What detection engines does Null Threat use?",
    answer:
      "Null Threat combines hash lookup, signature scanning, YARA rule matching, and deep analysis. All engines run offline after initial rule updates.",
  },
  {
    question: "Is Null Threat really free?",
    answer:
      "Yes. Null Threat is free forever under GPL v3. There is no subscription, no account requirement, and no paid tier.",
  },
  {
    question: "Which operating systems are supported?",
    answer:
      "Null Threat supports Windows, macOS, and Linux. Download builds or compile from source on the GitHub repository.",
  },
  {
    question: "Can Null Threat run fully offline?",
    answer:
      "Yes. After you download signature and YARA rule updates, Null Threat scans files without an internet connection. That makes it suitable for air-gapped machines and privacy-sensitive workflows.",
  },
  {
    question: "How does Null Threat compare to cloud antivirus?",
    answer:
      "Cloud antivirus uploads suspicious files to vendor servers. Null Threat keeps every byte on your device, uses open-source detection logic you can audit, and never charges a subscription.",
  },
  {
    question: "What files can Null Threat scan?",
    answer:
      "Null Threat scans individual files and directories on your local drives. The pipeline checks hashes, signatures, YARA patterns, and structural signals like entropy and file headers.",
  },
  {
    question: "How do Null Threat risk scores work?",
    answer:
      "Each engine contributes evidence to a 0–100 risk score. Clean files score low; suspicious patterns, YARA hits, and malware signatures push scores into quarantine-ready tiers.",
  },
  {
    question: "Who should use a local malware scanner?",
    answer:
      "Developers, security researchers, privacy advocates, and anyone who needs verifiable offline scanning without sending files to third-party clouds.",
  },
];
