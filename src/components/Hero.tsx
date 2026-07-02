import { BrandLockup } from "./BrandLockup";
import ThreatMap from "./ThreatMap";

export default function Hero({
  ready = true,
  reducedMotion = false,
}: {
  ready?: boolean;
  reducedMotion?: boolean;
}) {
  if (!ready) return null;

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-transparent pb-16 pt-24 md:pb-20 md:pt-24"
    >
      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,0.95fr)] lg:gap-14">
          <div className={reducedMotion ? "" : "hero-enter"}>
            <div className="mb-5">
              <BrandLockup size="hero" />
            </div>

            <h1 className="max-w-xl text-display font-semibold tracking-tight text-snow">
              <span className="block">Scan every file on your machine.</span>
              <span className="mt-1 block font-light text-ash">
                Trust nothing until it&apos;s verified.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-body-lg leading-relaxed text-ash">
              Null Threat runs four local engines on your device. No cloud uploads, no subscription,
              no telemetry.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#download" className="btn-pill-primary min-h-[44px]">
                Download for free
              </a>
              <a href="#platform" className="btn-pill-ghost min-h-[44px]">
                See how it works
              </a>
            </div>
          </div>

          <div
            className={`lg:justify-self-end ${reducedMotion ? "" : "hero-enter hero-enter-delay"}`}
          >
            <ThreatMap reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}
