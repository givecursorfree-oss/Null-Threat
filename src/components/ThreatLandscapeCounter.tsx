import { useEffect, useState } from "react";
import CounterFX from "@/framer/Counter-FX.js";
import { SectionReveal } from "./SectionReveal";

function useCounterFontSize() {
  const [fontSize, setFontSize] = useState(64);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 380) setFontSize(40);
      else if (width < 640) setFontSize(52);
      else if (width < 1024) setFontSize(64);
      else setFontSize(80);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return fontSize;
}

export default function ThreatLandscapeCounter() {
  const counterFontSize = useCounterFontSize();

  const counterFont = {
    fontFamily: "Inter, system-ui, sans-serif",
    fontWeight: 700,
    fontSize: counterFontSize,
    lineHeight: "1em",
    letterSpacing: "-0.04em",
  } as const;

  return (
    <section
      id="threat-landscape"
      className="relative overflow-hidden border-y border-white/10 bg-black py-16 sm:py-20 md:py-24"
      aria-labelledby="threat-landscape-heading"
    >
      <div className="container-page relative z-10">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-caption font-medium uppercase tracking-[0.2em] text-zinc-500">
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

            <div className="counter-fx-display mx-auto mt-8 flex w-full min-w-0 flex-col items-center justify-center gap-4 sm:mt-12">
              <div className="max-w-full overflow-hidden px-1">
                <CounterFX
                  from={0}
                  to={450000}
                  duration={2}
                  easing="smooth"
                  decimals={0}
                  prefix=""
                  suffix="+"
                  showThousandSep={true}
                  triggerMode="layerInView"
                  tint="#F87171"
                  htmlTag="div"
                  font={counterFont}
                />
              </div>
              <p className="max-w-md px-2 text-caption text-zinc-500">
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
