import { ArrowUpRightIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { type ReactNode } from "react";
import { useInView } from "../hooks/useInView";

const EDGE_CARD_IMAGE =
  "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/6fa84c43-2fad-44f7-93e0-fca897a6e819_800w.webp";
const EDGE_CARD_FALLBACK = "/edge-card.png";

const SCAN_STEPS = [
  {
    title: "Input",
    body: "Drop a file or enable folder watch.",
    detail: "invoice_Q4.exe",
  },
  {
    title: "Analyze",
    body: "Four engines run in parallel on your machine.",
    engines: ["Hash", "ClamAV", "YARA", "Deep scan"],
  },
  {
    title: "Score",
    body: "Get a local verdict with full engine context.",
    detail: "Risk 67",
    status: "Review recommended",
  },
] as const;

function FadeCell({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Animated3ColumnValueProposition() {
  const { ref: shellRef, visible: shellVisible } = useInView<HTMLDivElement>("0px 0px -5% 0px");

  return (
    <section id="platform" className="section-gap bg-obsidian">
      <div className="container-page">
        <div
          ref={shellRef}
          className="rounded-card border border-white/10 bg-ink/90 p-5 backdrop-blur-sm sm:p-8 md:p-10"
          style={{
            opacity: shellVisible ? 1 : 0,
            transform: shellVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div className="mb-10 max-w-3xl md:mb-12">
            <h2 className="text-heading font-semibold tracking-tight text-snow sm:text-heading-lg">
              Four engines. Full local verification.
            </h2>
            <p className="mt-4 max-w-[62ch] text-body-lg leading-relaxed text-ash">
              Hash lookup, ClamAV, YARA, and deep analysis run on your machine. No uploads, no
              black-box verdicts.
            </p>
          </div>

          <div className="grid grid-flow-dense grid-cols-1 gap-6 lg:grid-cols-3">
            <FadeCell
              delay={80}
              className="group relative min-h-[320px] overflow-hidden rounded-card-compact ring-1 ring-white/10 transition-transform duration-700 ease-out hover:-translate-y-1 sm:min-h-[400px] lg:min-h-[460px]"
            >
              <img
                src={EDGE_CARD_IMAGE}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.endsWith(EDGE_CARD_FALLBACK)) return;
                  img.src = EDGE_CARD_FALLBACK;
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian/30"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 60% 18%, rgba(255,90,0,0.2) 0%, rgba(255,90,0,0) 58%)",
                }}
                aria-hidden
              />
              <div className="relative flex h-full min-h-[320px] flex-col justify-end p-5 sm:min-h-[400px] sm:p-8 lg:min-h-[460px]">
                <h3 className="text-heading-sm font-semibold tracking-tight text-snow sm:text-heading">
                  Every file. Every folder.
                </h3>
                <p className="mt-3 text-body text-ash">
                  Watch directories or scan on demand. Verdicts stay on your machine.
                </p>
                <a
                  href="#engines"
                  className="mt-6 inline-flex items-center gap-2 text-body text-snow transition-colors duration-fast hover:text-ash"
                >
                  See the engines
                  <ArrowUpRightIcon
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            </FadeCell>

            <FadeCell
              delay={160}
              className="card-muted relative flex min-h-[320px] flex-col p-5 transition-transform duration-700 ease-out hover:-translate-y-1 sm:min-h-[400px] sm:p-8 lg:min-h-[460px]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/45 to-transparent"
                aria-hidden
              />
              <h3 className="text-subheading font-semibold tracking-tight text-snow sm:text-heading-sm">
                How a scan works
              </h3>

              <ol className="mt-6 flex flex-1 flex-col gap-4" aria-label="Scan pipeline">
                {SCAN_STEPS.map((step, index) => (
                  <li key={step.title} className="relative flex gap-3">
                    {index < SCAN_STEPS.length - 1 ? (
                      <span
                        className="absolute left-4 top-9 bottom-[-1rem] w-px bg-white/10"
                        aria-hidden
                      />
                    ) : null}
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ember/35 bg-ember/10 text-caption font-semibold text-snow">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1 rounded-card-compact border border-white/10 bg-obsidian/70 p-4">
                      <p className="text-body font-semibold text-snow">{step.title}</p>
                      <p className="mt-1 text-caption leading-relaxed text-ash">{step.body}</p>

                      {"detail" in step && step.detail && !("engines" in step) && !("status" in step) ? (
                        <p className="mt-3 truncate font-mono text-[11px] text-snow/80">{step.detail}</p>
                      ) : null}

                      {"engines" in step && step.engines ? (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {step.engines.map((engine) => (
                            <span
                              key={engine}
                              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-ash"
                            >
                              {engine}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {"status" in step && step.status ? (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-ember/35 bg-ember/10 px-2.5 py-0.5 text-[11px] font-semibold text-ember">
                            {step.detail}
                          </span>
                          <span className="text-[11px] text-ash">{step.status}</span>
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>

              <a
                href="#engines"
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-body font-medium text-snow transition-colors duration-fast hover:text-ash"
              >
                See engine details
                <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
              </a>
            </FadeCell>

            <div className="grid grid-rows-2 gap-6">
              <FadeCell
                delay={240}
                className="card-muted p-6 transition-transform duration-700 ease-out hover:-translate-y-1 sm:p-8"
              >
                <div className="flex items-center gap-5 sm:block">
                  <div className="relative h-24 w-24 shrink-0 sm:mx-auto">
                    <div className="absolute inset-0 rounded-full bg-snow" />
                    <div className="absolute inset-[10px] flex items-center justify-center rounded-full bg-obsidian ring-1 ring-emerald/40">
                      <ShieldCheckIcon className="h-[26px] w-[26px] text-snow" aria-hidden />
                    </div>
                  </div>
                  <div className="sm:mt-6 sm:text-center">
                    <h4 className="text-subheading font-semibold tracking-tight text-snow">
                      Trust nothing by default
                    </h4>
                    <p className="mt-2 text-body text-ash">
                      Files stay local. Signatures import offline for air-gapped systems.
                    </p>
                  </div>
                </div>
              </FadeCell>

              <FadeCell
                delay={320}
                className="card-muted p-6 transition-transform duration-700 ease-out hover:-translate-y-1 sm:p-8"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-heading-sm font-bold tracking-tight text-snow">500K+</p>
                    <p className="mt-1 text-caption text-ash">Local signatures</p>
                  </div>
                  <div>
                    <p className="text-heading-sm font-bold tracking-tight text-snow">GPL v3</p>
                    <p className="mt-1 text-caption text-ash">Open source</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {["Hash lookup", "ClamAV", "YARA rules", "Deep analysis"].map((label) => (
                    <li key={label} className="text-body text-ash">
                      {label}
                    </li>
                  ))}
                </ul>
              </FadeCell>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
