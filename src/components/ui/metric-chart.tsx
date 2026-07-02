import { useEffect, useMemo, useRef, useState } from "react";

export type SeriesPoint = { value: number; date: string };
export type MetricSeries = { name: string; data: SeriesPoint[]; accent?: MetricAccent };
export type MetricAccent = "emerald" | "rose" | "amber" | "neutral";
export type ChartView = "curve" | "bar";

export type ChartSeries = {
  name: string;
  data: SeriesPoint[];
  color: string;
};

export const ACCENTS: Record<
  MetricAccent,
  { stroke: string; fill: string; text: string }
> = {
  emerald: { stroke: "#34d399", fill: "#34d399", text: "#6ee7b7" },
  rose: { stroke: "#ff5a00", fill: "#ff5a00", text: "#ff8c42" },
  amber: { stroke: "#fbbf24", fill: "#fbbf24", text: "#fcd34d" },
  neutral: { stroke: "#a1a1aa", fill: "#a1a1aa", text: "#d4d4d8" },
};

export const SERIES_COLORS = ["#34d399", "#ff5a00", "#60a5fa", "#f472b6"];

export function formatCompact(n: number): string {
  if (Math.abs(n) >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(Math.round(n));
}

const CHART_W = 320;
const CHART_H = 160;
const CHART_PAD = 12;

function buildChartPoints(values: number[]) {
  if (values.length < 2) return [];
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const step = (CHART_W - CHART_PAD * 2) / (values.length - 1);

  return values.map((v, i) => ({
    x: CHART_PAD + i * step,
    y: CHART_H - CHART_PAD - ((v - min) / range) * (CHART_H - CHART_PAD * 2),
    value: v,
  }));
}

function buildPath(points: { x: number; y: number }[]): { line: string; area: string } {
  if (points.length < 2) return { line: "", area: "" };
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = `${line} L ${points[points.length - 1].x} ${CHART_H - CHART_PAD} L ${points[0].x} ${CHART_H - CHART_PAD} Z`;
  return { line, area };
}

export function MetricChart({
  series,
  view,
  defaultIndex = 0,
  valueFormatter,
  dateFormatter,
  animated = false,
  gradientId,
}: {
  series: ChartSeries[];
  view: ChartView;
  defaultIndex?: number;
  valueFormatter?: (value: number) => string;
  dateFormatter?: (date: string) => string;
  animated?: boolean;
  gradientId?: string;
}) {
  const primary = series[0];
  const values = primary?.data.map((d) => d.value) ?? [];
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [barsReady, setBarsReady] = useState(!animated);
  const [dotsReady, setDotsReady] = useState(!animated);
  const lineRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const fmt = valueFormatter ?? ((n: number) => String(n));
  const fmtDate = dateFormatter ?? ((d: string) => d);

  const points = useMemo(() => buildChartPoints(values), [values]);
  const { line, area } = useMemo(() => buildPath(points), [points]);

  useEffect(() => {
    setActiveIndex(defaultIndex);
  }, [defaultIndex, view]);

  useEffect(() => {
    if (!animated) {
      setBarsReady(true);
      setDotsReady(true);
      return;
    }
    setBarsReady(false);
    setDotsReady(false);
    const barTimer = window.setTimeout(() => setBarsReady(true), 120);
    const dotTimer = window.setTimeout(() => setDotsReady(true), 480);
    return () => {
      window.clearTimeout(barTimer);
      window.clearTimeout(dotTimer);
    };
  }, [animated, view]);

  useEffect(() => {
    if (!animated || view !== "curve" || !lineRef.current) return;

    const path = lineRef.current;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const raf = requestAnimationFrame(() => {
      path.style.transition = "stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1)";
      path.style.strokeDashoffset = "0";
    });

    if (areaRef.current) {
      areaRef.current.style.opacity = "0";
      const areaRaf = requestAnimationFrame(() => {
        if (!areaRef.current) return;
        areaRef.current.style.transition = "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.35s";
        areaRef.current.style.opacity = "1";
      });
      return () => {
        cancelAnimationFrame(raf);
        cancelAnimationFrame(areaRaf);
      };
    }

    return () => cancelAnimationFrame(raf);
  }, [animated, view, line]);

  if (!primary || values.length < 2) return null;

  const color = primary.color;
  const active = primary.data[activeIndex] ?? primary.data[primary.data.length - 1];
  const max = Math.max(...values, 1);
  const fillId = gradientId ?? "metric-area-fill";

  return (
    <div className="relative h-full min-h-[148px] w-full overflow-hidden">
      {view === "curve" ? (
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="h-full w-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            ref={areaRef}
            d={area}
            fill={`url(#${fillId})`}
            style={{ opacity: animated ? 0 : 1 }}
          />
          <path
            ref={lineRef}
            d={line}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={i === activeIndex ? 5 : 3}
              fill={i === activeIndex ? color : "#18181b"}
              stroke={color}
              strokeWidth="2"
              className="pointer-events-auto cursor-pointer"
              style={{
                opacity: dotsReady ? 1 : 0,
                transform: dotsReady ? "scale(1)" : "scale(0)",
                transformOrigin: `${p.x}px ${p.y}px`,
                transition: "opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: `${i * 90}ms`,
              }}
              onMouseEnter={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
            />
          ))}
        </svg>
      ) : (
        <div className="flex h-full items-end gap-2 px-2 pb-2 pt-8">
          {values.map((v, i) => (
            <button
              key={i}
              type="button"
              className="min-w-0 flex-1 origin-bottom rounded-md transition-[height,background-color,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                height: barsReady ? `${(v / max) * 100}%` : "4%",
                minHeight: 6,
                maxHeight: "100%",
                backgroundColor: i === activeIndex ? color : `${color}44`,
                transitionDelay: `${i * 90}ms`,
                opacity: barsReady ? 1 : 0.35,
              }}
              onMouseEnter={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              aria-label={`${fmtDate(primary.data[i].date)}: ${fmt(v)}`}
            />
          ))}
        </div>
      )}
      <div
        className="pointer-events-none absolute bottom-2 right-2 rounded-md border border-white/10 bg-obsidian/90 px-2 py-1 text-[10px] text-snow backdrop-blur-sm transition-all duration-500"
        style={{
          opacity: animated ? (barsReady || view === "curve" ? 1 : 0) : 1,
          transform: animated
            ? barsReady || view === "curve"
              ? "translateY(0)"
              : "translateY(6px)"
            : undefined,
          transitionDelay: animated ? "520ms" : "0ms",
        }}
      >
        <span className="font-medium">{fmt(active.value)}</span>
        <span className="mx-1 text-ash">·</span>
        <span className="text-ash">{fmtDate(active.date)}</span>
      </div>
    </div>
  );
}
