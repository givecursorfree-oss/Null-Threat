import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SectionReveal } from "./SectionReveal";

const bad = [
  "Sends your files to the cloud",
  "Closed-source detection",
  "Monthly subscription",
  "Requires an internet connection",
];

const good = [
  "Scans every file locally",
  "Open source under GPL v3",
  "Free forever",
  "Works fully offline",
];

export default function ProblemSolution() {
  return (
    <section id="compare" className="section-gap bg-ink" aria-labelledby="compare-heading">
      <div className="container-page mb-10 max-w-2xl">
        <SectionReveal>
          <h2 id="compare-heading" className="text-heading font-semibold tracking-tight text-snow">
            Local antivirus vs cloud antivirus
          </h2>
          <p className="mt-3 text-body-lg text-ash">
            Cloud scanners ask you to trust them. Null Threat asks you to trust the evidence on your
            machine.
          </p>
        </SectionReveal>
      </div>
      <div className="container-page grid gap-6 lg:grid-cols-2">
        <SectionReveal>
          <article className="card-muted h-full opacity-85">
            <h3 className="mb-6 text-subheading font-semibold text-snow">Typical cloud AV</h3>
            <ul className="space-y-4">
              {bad.map((t) => (
                <li key={t} className="flex gap-3 text-body text-ash">
                  <XMarkIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-orchid" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </SectionReveal>
        <SectionReveal delay={100}>
          <article className="relative h-full overflow-hidden rounded-card-compact border border-ember/45 bg-ink p-5 text-snow shadow-[0_0_0_1px_rgba(255,90,0,0.16),0_14px_40px_-20px_rgba(255,90,0,0.45)] sm:p-8">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,90,0,0.12) 0%, rgba(255,90,0,0.03) 28%, rgba(24,24,27,0) 60%)",
              }}
            />
            <h3 className="relative z-10 mb-6 text-subheading font-semibold text-snow">Null Threat</h3>
            <ul className="space-y-4">
              {good.map((t) => (
                <li key={t} className="relative z-10 flex gap-3 text-body text-snow/90">
                  <CheckIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-emerald" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </SectionReveal>
      </div>
    </section>
  );
}
