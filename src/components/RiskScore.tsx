import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import { SectionReveal } from "./SectionReveal";

const tiers = [
  { name: "Clean", range: "0-20", color: "#34d399", Icon: ShieldCheckIcon },
  { name: "Suspicious", range: "21-50", color: "#fbbf24", Icon: ExclamationTriangleIcon },
  { name: "High risk", range: "51-80", color: "#fb923c", Icon: ShieldExclamationIcon },
  { name: "Malware", range: "81-100", color: "#ef4444", Icon: ExclamationCircleIcon },
];

export default function RiskScore() {
  return (
    <section id="risk" className="section-gap bg-obsidian" aria-labelledby="risk-heading">
      <div className="container-page max-w-4xl">
        <SectionReveal>
          <div className="mb-10 text-center">
            <h2
              id="risk-heading"
              className="mb-3 text-heading font-semibold tracking-tight text-snow"
            >
              Understand every score
            </h2>
            <p className="text-body-lg text-ash">
              Null Threat uses a transparent 0-100 risk rating with a per-engine breakdown.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map(({ name, range, color, Icon }) => (
              <div key={name} className="card-muted text-center !p-5">
                <div
                  className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${color}22` }}
                >
                  <Icon className="h-5 w-5" style={{ color }} aria-hidden />
                </div>
                <p className="text-body font-semibold text-snow">{name}</p>
                <p className="mt-1 text-caption text-ash">Score {range}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
