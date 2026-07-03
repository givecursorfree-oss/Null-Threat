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
];
