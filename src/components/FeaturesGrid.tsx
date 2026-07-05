import {
  CalendarIcon,
  KeyIcon,
  SignalIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import { type ReactNode } from "react";
import { useInView } from "../hooks/useInView";

const SECTION_BG =
  "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/72c90007-7638-4902-8dda-5a6c20e92741_3840w.jpg";

const HIGHLIGHT_IMAGE =
  "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/459579f4-e2d0-4218-a12d-f974a4b89651_800w.jpg";

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
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function FeaturesGrid() {
  const { ref: headerRef, visible: headerVisible } = useInView<HTMLDivElement>();

  return (
    <section
      id="features"
      className="relative overflow-hidden pt-16 pb-16 lg:py-24 bg-cover bg-center"
      style={{ backgroundImage: `url(${SECTION_BG})` }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian/88 via-obsidian/78 to-obsidian"
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div
          ref={headerRef}
          className="max-w-3xl"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
          }}
        >
          <h2 className="text-heading font-semibold tracking-tight text-snow sm:text-heading-lg">
            Built for daily security work
          </h2>
          <p className="mt-3 max-w-2xl text-body-lg leading-relaxed text-ash md:mt-4">
            Watch folders, quarantine threats, and export reports without leaving your machine.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          <FadeCell delay={80} className="overflow-hidden rounded-card-compact bg-ink/55 p-5 ring-1 ring-white/10 backdrop-blur-md md:p-6">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-snow">
              Real-time folder watch
            </h3>
            <p className="mt-2 text-body text-ash">
              Files are scanned the moment they land on disk. Watch verdicts stream in without
              opening a dashboard or polling an API.
            </p>

            <div className="mt-5 rounded-card-compact bg-obsidian/60 p-4 ring-1 ring-white/10">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-caption text-ash">
                  <SignalIcon className="h-4 w-4 opacity-80" aria-hidden />
                  Sample scan output
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-2 py-1 text-[10px] text-snow ring-1 ring-white/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
                  Watching
                </span>
              </div>
              <ul className="mt-3 space-y-2 text-[11px] text-ash" aria-label="Illustrative scan events">
                <li>~/Downloads/ledger_patch.dmg: new file</li>
                <li>YARA match: Suspicious.Loader.A</li>
                <li>SHA-256 unknown in local DB</li>
                <li className="text-snow">Quarantined, risk score 71</li>
              </ul>
            </div>
          </FadeCell>

          <FadeCell
            delay={160}
            className="relative min-h-[420px] overflow-hidden rounded-card-compact ring-1 ring-white/15 md:min-h-[460px]"
          >
            <div className="absolute inset-0" aria-hidden>
              <img
                src={HIGHLIGHT_IMAGE}
                alt=""
                width={800}
                height={600}
                className="h-full w-full object-cover opacity-70"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/35 to-transparent" />
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 90, 0, 0.18) 0%, transparent 65%)",
                }}
              />
            </div>
            <div className="relative flex h-full min-h-[420px] flex-col justify-end md:min-h-[460px]">
              <div className="p-5 md:p-6">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-snow">
                  Runs entirely on-device
                </h3>
                <p className="mt-2 text-body text-snow/80">
                  No cloud uploads, API keys, or telemetry. Signatures and engines stay local so you
                  can audit air-gapped workstations with confidence.
                </p>
              </div>
              <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-snow/90 ring-1 ring-white/15 backdrop-blur-sm">
                  GPL v3, offline signatures
                </span>
              </div>
            </div>
          </FadeCell>

          <FadeCell delay={240} className="overflow-hidden rounded-card-compact bg-ink/55 p-5 ring-1 ring-white/10 backdrop-blur-md md:p-6">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-snow">
              Structured scan reports
            </h3>
            <p className="mt-2 text-body text-ash">
              Every verdict ships with hashes, engine hits, and entropy notes, formatted for
              incident review and compliance handoff.
            </p>

            <div className="mt-5 rounded-card-compact bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.06),rgba(9,9,11,0.75))] p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10">
                  <KeyIcon className="h-4 w-4 text-ash" aria-hidden />
                </div>
                <div>
                  <p className="text-body font-medium text-snow">Scan report</p>
                  <p className="text-[11px] text-ash">bundle_installer.pkg</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-ash">
                <span className="inline-flex items-center gap-2">
                  <CalendarIcon className="h-3.5 w-3.5 opacity-80" aria-hidden />
                  Mar 14, 2026
                </span>
                <span className="inline-flex items-center gap-2">
                  <WifiIcon className="h-3.5 w-3.5 opacity-80" aria-hidden />
                  Offline mode
                </span>
              </div>

              <div className="mt-4 space-y-2 text-[11px] text-ash">
                <p>
                  <span className="text-ash">Engines:</span> ClamAV clean, YARA 2 hits
                </p>
                <p>
                  <span className="text-ash">Deep Analysis:</span> Identity, Structure, Metadata expanded
                </p>
                <p>
                  <span className="text-ash">Action:</span> moved to AES-256 quarantine vault
                </p>
              </div>
            </div>
          </FadeCell>
        </div>
      </div>
    </section>
  );
}
