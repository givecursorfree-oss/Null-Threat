import { ChevronDownIcon, FilmIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useId, useState } from "react";
import {
  deepAnalysisSubChecks,
  videoSafeScanningPoints,
} from "@/seo/deep-analysis";
import { SectionReveal } from "./SectionReveal";

function SubCheckRow({
  title,
  summary,
  findings,
  defaultOpen = false,
}: {
  title: string;
  summary: string;
  findings: readonly string[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="rounded-card-compact border border-white/10 bg-obsidian/60 overflow-hidden">
      <button
        type="button"
        id={`${panelId}-trigger`}
        aria-expanded={open}
        aria-controls={`${panelId}-panel`}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full min-h-[52px] items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-snow/70 focus-visible:ring-inset"
      >
        <span className="flex items-center gap-3 min-w-0">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ember/15 text-ember ring-1 ring-ember/25"
            aria-hidden
          >
            {title.charAt(0)}
          </span>
          <span className="min-w-0">
            <span className="block text-body font-semibold text-snow">{title}</span>
            <span className="block truncate text-caption text-ash">{summary}</span>
          </span>
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 shrink-0 text-ash transition-transform duration-fast ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <div
        id={`${panelId}-panel`}
        role="region"
        aria-labelledby={`${panelId}-trigger`}
        hidden={!open}
        className={open ? "border-t border-white/10 px-4 pb-4 pt-3" : undefined}
      >
        <ul className="space-y-2 text-body text-ash">
          {findings.map((finding) => (
            <li key={finding} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember/80" aria-hidden />
              <span>{finding}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function DeepAnalysisSection() {
  const [deepExpanded, setDeepExpanded] = useState(true);

  return (
    <section id="deep-analysis" className="section-gap bg-ink border-y border-white/10">
      <div className="container-page">
        <SectionReveal>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <p className="text-caption font-medium uppercase tracking-widest text-ember mb-3">
                Deep Analysis Pipeline
              </p>
              <h2 className="text-heading font-semibold tracking-tight text-snow">
                Four sub-checks beyond a basic file scan
              </h2>
              <p className="mt-4 max-w-xl text-body-lg text-ash leading-relaxed">
                In scan results, click <strong className="text-snow font-medium">Deep Analysis</strong> to
                expand Identity, Structure, Metadata, and Steganography — each with bullet-point findings you
                can audit before quarantining.
              </p>

              <div className="mt-8 rounded-card-compact border border-emerald-500/20 bg-emerald-500/[0.06] p-5">
                <div className="flex items-start gap-3">
                  <FilmIcon className="h-6 w-6 shrink-0 text-emerald-400 mt-0.5" aria-hidden />
                  <div>
                    <h3 className="text-body-lg font-semibold text-snow">Video-safe scanning</h3>
                    <p className="mt-1 text-body text-ash">
                      Normal MP4 and MKV files are no longer flagged as critical. The pipeline understands
                      container formats instead of treating binary NAL data as suspicious scripts.
                    </p>
                    <ul className="mt-4 space-y-2 text-body text-ash">
                      {videoSafeScanningPoints.map((point) => (
                        <li key={point} className="flex gap-2">
                          <ShieldCheckIcon className="h-4 w-4 shrink-0 text-emerald-400/90 mt-0.5" aria-hidden />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-card-compact border border-white/10 bg-obsidian/80 p-5 ring-1 ring-white/5 backdrop-blur-sm md:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="text-caption text-ash">Sample scan result</p>
                  <p className="text-body-lg font-semibold text-snow">team_reel_final.mp4</p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-caption font-medium text-emerald-300 ring-1 ring-emerald-500/25">
                  Clean · 12
                </span>
              </div>

              <ul className="mt-4 space-y-2 text-body text-ash" aria-label="Engine summary">
                <li className="flex justify-between gap-4">
                  <span>Hash lookup</span>
                  <span className="text-snow">Clean</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Signature scan</span>
                  <span className="text-snow">Clean</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>YARA</span>
                  <span className="text-snow">No match</span>
                </li>
              </ul>

              <button
                type="button"
                aria-expanded={deepExpanded}
                aria-controls="deep-analysis-demo-panel"
                onClick={() => setDeepExpanded((value) => !value)}
                className="mt-5 flex w-full min-h-[44px] items-center justify-between rounded-lg border border-ember/30 bg-ember/10 px-4 py-2.5 text-body font-medium text-snow transition-colors hover:bg-ember/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember/60"
              >
                Deep Analysis
                <ChevronDownIcon
                  className={`h-5 w-5 text-ember transition-transform duration-fast ${deepExpanded ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>

              <div
                id="deep-analysis-demo-panel"
                hidden={!deepExpanded}
                className={deepExpanded ? "mt-4 space-y-3" : undefined}
              >
                {deepAnalysisSubChecks.map((check, index) => (
                  <SubCheckRow
                    key={check.id}
                    title={check.title}
                    summary={check.summary}
                    findings={check.findings}
                    defaultOpen={index === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
