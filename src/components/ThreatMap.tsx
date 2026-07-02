import { GlobeCdn } from "@/components/ui/cobe-globe-cdn";

export default function ThreatMap({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <div
      className="relative mx-auto w-full max-w-3xl px-2 sm:px-0"
      role="img"
      aria-label="Global signature coverage map"
    >
      <GlobeCdn
        reducedMotion={reducedMotion}
        standalone
        showMarkerLabels
        showArcMetrics={false}
        metricLabel="k sigs"
        className="mx-auto w-full max-w-[min(92vw,560px)]"
        speed={0.0022}
      />
    </div>
  );
}
