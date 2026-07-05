import CounterFX from "@/framer/Counter-FX.js";
import { SectionReveal } from "./SectionReveal";

const COUNTER_FONT = {
  fontFamily: '"DM Sans", system-ui, sans-serif',
  fontWeight: 700,
  fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
  lineHeight: "1em",
} as const;

export default function ThreatLandscapeCounter() {
  return (
    <section
      id="threat-landscape"
      className="relative overflow-hidden border-y border-white/10 bg-obsidian py-16 md:py-20"
      aria-labelledby="threat-landscape-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(239, 68, 68, 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="container-page relative z-10">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-caption font-medium uppercase tracking-[0.2em] text-ember mb-4">
              Global threat volume
            </p>
            <h2
              id="threat-landscape-heading"
              className="text-heading font-semibold tracking-tight text-snow sm:text-heading-lg"
            >
              New malware samples identified every day
            </h2>
            <p className="mt-3 text-body-lg text-ash">
              The threat landscape does not pause. Offline scanning keeps your files verified without
              sending them to the cloud.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-2">
              <CounterFX
                from={0}
                to={450000}
                duration={2.8}
                easing="smooth"
                decimals={0}
                prefix=""
                suffix="+"
                showThousandSep={true}
                triggerMode="layerInView"
                tint="#f87171"
                htmlTag="p"
                font={COUNTER_FONT}
              />
              <p className="text-caption text-ash/90 max-w-md">
                Industry estimate for new malicious samples detected globally per day. Null Threat scans
                locally so you can verify files before they become part of that statistic.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
