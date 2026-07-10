import { BrandLockup } from "./BrandLockup";

export default function HeroContent({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] w-full items-center bg-transparent py-8 sm:min-h-[calc(100dvh-5rem)] sm:py-12 md:py-16">
      <div className="container-page relative w-full min-w-0">
        <div className={`max-w-xl ${reducedMotion ? "" : "hero-enter"}`}>
          <div className="mb-4 sm:mb-5">
            <BrandLockup size="hero" />
          </div>

          <h1 className="text-display font-semibold tracking-[-0.03em] text-snow">
            <span className="block">Free offline malware scanner</span>
            <span className="mt-1 block font-light text-ash">for your entire machine.</span>
          </h1>

          <p className="mt-4 max-w-md text-body-lg leading-relaxed text-ash sm:mt-5">
            Null Threat runs four local detection engines on your device—hash lookup, signatures,
            YARA rules, and deep analysis. No cloud uploads, no subscription, no telemetry.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <a href="#download" className="btn-pill-primary min-h-[44px] w-full sm:w-auto">
              Download for free
            </a>
            <a href="#platform" className="btn-pill-ghost min-h-[44px] w-full sm:w-auto">
              See how it works
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
