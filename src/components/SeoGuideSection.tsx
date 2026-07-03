import { GITHUB_RELEASES } from "@/seo/config";
import { SectionReveal } from "./SectionReveal";

const useCases = [
  {
    title: "Privacy-first users",
    body: "Scan downloads, USB transfers, and archives without sending file contents to a vendor cloud.",
  },
  {
    title: "Developers & researchers",
    body: "Audit suspicious binaries, verify dependencies, and inspect YARA hits with transparent, local tooling.",
  },
  {
    title: "Offline & air-gapped systems",
    body: "Run signature and YARA checks on isolated machines after a one-time rule update.",
  },
];

export default function SeoGuideSection() {
  return (
    <section
      id="guide"
      className="section-gap border-t border-white/10 bg-obsidian"
      aria-labelledby="guide-heading"
    >
      <div className="container-page max-w-4xl">
        <SectionReveal>
          <h2 id="guide-heading" className="text-heading font-semibold tracking-tight text-snow">
            Free offline malware scanner for Windows, macOS, and Linux
          </h2>
          <p className="mt-4 text-body-lg leading-relaxed text-ash">
            Null Threat is an open-source local antivirus alternative built for people who want
            evidence on their own machine—not a black-box verdict from a remote server. Every scan
            uses four{" "}
            <a href="#engines" className="text-snow underline decoration-white/30 underline-offset-4 hover:decoration-white/60">
              offline detection engines
            </a>{" "}
            and produces a clear{" "}
            <a href="#risk" className="text-snow underline decoration-white/30 underline-offset-4 hover:decoration-white/60">
              risk score
            </a>{" "}
            you can act on.
          </p>
          <p className="mt-4 text-body leading-relaxed text-ash">
            Unlike typical cloud antivirus products, Null Threat never uploads your files, never
            requires a subscription, and never hides its detection logic. The full pipeline is{" "}
            <a
              href="#opensource"
              className="text-snow underline decoration-white/30 underline-offset-4 hover:decoration-white/60"
            >
              open source under GPL v3
            </a>
            , so you can verify exactly what runs on your system. See how it{" "}
            <a href="#compare" className="text-snow underline decoration-white/30 underline-offset-4 hover:decoration-white/60">
              compares to cloud AV
            </a>{" "}
            or jump straight to the{" "}
            <a href="#faq" className="text-snow underline decoration-white/30 underline-offset-4 hover:decoration-white/60">
              FAQ
            </a>
            .
          </p>

          <h3 className="mt-10 text-subheading font-semibold text-snow">Who uses local scanning?</h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {useCases.map(({ title, body }) => (
              <li
                key={title}
                className="rounded-2xl border border-white/10 bg-ink/80 p-5"
              >
                <h4 className="text-body font-semibold text-snow">{title}</h4>
                <p className="mt-2 text-body text-ash">{body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#download" className="btn-pill-primary min-h-[44px]">
              Download free scanner
            </a>
            <a
              href={GITHUB_RELEASES}
              className="btn-pill-ghost min-h-[44px]"
              target="_blank"
              rel="noreferrer"
            >
              View releases
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
