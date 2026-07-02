import {
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  CodeBracketSquareIcon,
} from "@heroicons/react/24/outline";
import { GitHubIcon } from "./icons/GitHubIcon";
import { SectionReveal } from "./SectionReveal";

const proofs = [
  "Trace a scan from file drop to quarantine in source",
  "GPL v3: fork, audit, and redistribute without permission",
  "No telemetry hooks in the detection pipeline",
];

const REPO_TREE = `null-threat/
├── src/engines/
│   ├── hash_lookup.py
│   ├── clamav_scan.py
│   ├── yara_match.py
│   └── deep_analysis.py
├── scanner/pipeline.py
└── quarantine/vault.py`;

export default function OpenSource() {
  return (
    <section
      id="opensource"
      className="section-gap border-t border-white/10 bg-ink"
      aria-labelledby="opensource-heading"
    >
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <SectionReveal>
          <h2
            id="opensource-heading"
            className="max-w-xl text-heading font-semibold tracking-tight text-snow"
          >
            Null Threat is open source
          </h2>
          <p className="mt-4 max-w-lg text-body-lg leading-relaxed text-ash">
            Clone the repo and verify every engine yourself. No black boxes, no vendor lock-in,
            no hidden network calls.
          </p>

          <ul className="mt-8 space-y-3">
            {proofs.map((item) => (
              <li key={item} className="flex gap-3 text-body text-snow/90">
                <CheckIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-emerald" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="https://github.com"
              className="btn-pill-primary inline-flex min-h-[44px] gap-2"
              target="_blank"
              rel="noreferrer"
              aria-label="View Null Threat on GitHub (opens in new tab)"
            >
              <GitHubIcon className="h-[18px] w-[18px]" />
              View on GitHub
              <ArrowTopRightOnSquareIcon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
            </a>
            <a
              href="https://www.gnu.org/licenses/gpl-3.0.en.html"
              className="btn-pill-ghost inline-flex min-h-[44px] gap-2"
              target="_blank"
              rel="noreferrer"
              aria-label="Read GPL v3 license (opens in new tab)"
            >
              Read GPL v3
              <ArrowTopRightOnSquareIcon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
            </a>
          </div>
        </SectionReveal>

        <SectionReveal delay={100}>
          <div className="relative overflow-hidden rounded-card-compact border border-white/10 bg-obsidian shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 100% 0%, rgba(255,90,0,0.1) 0%, transparent 55%)",
              }}
            />

            <div className="relative flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <CodeBracketSquareIcon className="h-4 w-4 text-ash" aria-hidden />
              <span className="text-body font-medium text-snow">Repository layout</span>
              <span className="ml-auto rounded-badge border border-white/15 bg-white/5 px-2 py-0.5 text-caption font-medium text-ash">
                GPL v3
              </span>
            </div>

            <pre
              className="relative overflow-x-auto p-5 font-mono text-[13px] leading-relaxed"
              aria-label="Example Null Threat repository file structure"
            >
              <code className="block whitespace-pre text-ash">{REPO_TREE}</code>
            </pre>

            <div className="relative border-t border-white/10 px-5 py-4">
              <p className="text-caption leading-relaxed text-ash">
                Every detection stage maps to a module you can read, test, and patch locally.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
