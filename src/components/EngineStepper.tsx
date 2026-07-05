import { SectionReveal } from "./SectionReveal";
import ProgressMetricCard, { type SeriesPoint } from "@/components/ui/progress-metric-card";

const engines = [
  { title: "SHA-256 Hash Lookup", body: "500K+ MalwareBazaar and NSRL signatures." },
  { title: "ClamAV", body: "Industry-standard local clamscan engine." },
  { title: "YARA Rules", body: "Polyglot and packed executable detection." },
  {
    title: "Deep Analysis",
    body: "Identity, Structure, Metadata, and Steg sub-checks — expandable in scan results.",
  },
];

const riskSeries: SeriesPoint[] = [
  { value: 12, date: "Hash lookup" },
  { value: 18, date: "ClamAV" },
  { value: 48, date: "Entropy" },
  { value: 67, date: "YARA match" },
];

export default function EngineStepper() {
  return (
    <section id="engines" className="section-gap bg-obsidian">
      <div className="container-page grid items-start gap-12 lg:grid-cols-2">
        <SectionReveal>
          <h2 className="mb-10 text-heading font-semibold tracking-tight text-snow">
            Four engines. One verified verdict.
          </h2>
          <ol className="space-y-6">
            {engines.map((e) => (
              <li key={e.title} className="flex gap-4">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ember"
                  aria-hidden
                />
                <div>
                  <h3 className="text-body-lg font-semibold text-snow">{e.title}</h3>
                  <p className="mt-1 text-body text-ash">{e.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </SectionReveal>
        <div className="min-w-0">
          <ProgressMetricCard
          title="invoice_Q4.exe"
          data={riskSeries}
          total="67"
          delta="+19"
          deltaLabel="after YARA"
          percent="39.6%"
          trend="up"
          accent="rose"
          size="sm"
          defaultIndex={3}
          defaultView="curve"
          period="Per engine"
          periodOptions={[
            { label: "Per engine", points: 4 },
            { label: "Full scan" },
          ]}
          footnote="YARA rule matched. Review recommended."
          showStats
        />
        </div>
      </div>
    </section>
  );
}
