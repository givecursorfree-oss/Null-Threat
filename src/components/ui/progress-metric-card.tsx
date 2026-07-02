import { useEffect, useId, useMemo, useState } from "react";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { useInView } from "@/hooks/useInView";
import {
  ACCENTS,
  formatCompact,
  MetricChart,
  SERIES_COLORS,
  type ChartSeries,
  type ChartView,
  type MetricAccent,
  type MetricSeries,
  type SeriesPoint,
} from "./metric-chart";
import { PeriodSelect, ViewToggle, type PeriodOption } from "./metric-controls";

export type { SeriesPoint, MetricSeries, MetricAccent, ChartView, PeriodOption };

export type CardSize = "sm" | "md" | "lg";

export interface ProgressMetricCardProps {
  title: string;
  total?: string | number;
  delta?: string;
  deltaLabel?: string;
  percent?: string;
  trend?: "up" | "down";
  unit?: string;
  period?: string;
  periodOptions?: PeriodOption[];
  onPeriodChange?: (option: PeriodOption) => void;
  defaultView?: ChartView;
  accent?: MetricAccent;
  data?: SeriesPoint[];
  series?: MetricSeries[];
  defaultIndex?: number;
  size?: CardSize;
  showStats?: boolean;
  valueFormatter?: (value: number) => string;
  dateFormatter?: (date: string) => string;
  loading?: boolean;
  className?: string;
  footnote?: string;
}

const DEFAULT_PERIODS: PeriodOption[] = [
  { label: "Past 7 days", points: 4 },
  { label: "Past 14 days", points: 7 },
  { label: "Past 30 days" },
];

const NEUTRAL_PCT = 0.5;

const SIZES: Record<
  CardSize,
  { minH: string; pad: string; footer: string; title: string; headline: string }
> = {
  sm: {
    minH: "min-h-[280px]",
    pad: "px-5 pt-5",
    footer: "px-5 py-3",
    title: "text-[14px]",
    headline: "text-[52px]",
  },
  md: {
    minH: "min-h-[380px]",
    pad: "px-8 pt-7",
    footer: "px-8 py-4",
    title: "text-[17px]",
    headline: "text-[72px]",
  },
  lg: {
    minH: "min-h-[460px]",
    pad: "px-10 pt-9",
    footer: "px-10 py-5",
    title: "text-[19px]",
    headline: "text-[88px]",
  },
};

const sliceWindow = (points: SeriesPoint[], n?: number) =>
  n && n < points.length ? points.slice(-n) : points;

function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(active ? target : 0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

export default function ProgressMetricCard({
  title,
  total,
  delta,
  deltaLabel = "today",
  percent,
  trend,
  unit,
  period = "Past 30 days",
  periodOptions,
  onPeriodChange,
  defaultView = "curve",
  accent,
  data,
  series,
  defaultIndex,
  size = "md",
  showStats = true,
  valueFormatter,
  dateFormatter,
  loading = false,
  className = "",
  footnote,
}: ProgressMetricCardProps) {
  const { ref, visible } = useInView<HTMLDivElement>("0px 0px -10% 0px");
  const gridId = `grid-${useId().replace(/:/g, "")}`;
  const sz = SIZES[size];
  const shellBase = `relative flex ${sz.minH} w-full flex-col overflow-hidden rounded-[28px] border bg-ink transition-[transform,box-shadow,opacity,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`;
  const shellMotion = visible
    ? "translate-y-0 opacity-100 border-white/12 shadow-[0_28px_56px_-16px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.04)]"
    : "translate-y-10 opacity-0 border-white/6 shadow-none";
  const shell = `${shellBase} ${shellMotion} ${className}`;

  const periods = periodOptions ?? DEFAULT_PERIODS;
  const [selectedLabel, setSelectedLabel] = useState(period);
  const [view, setView] = useState<ChartView>(defaultView);

  const baseSeries: MetricSeries[] = useMemo(
    () => (series?.length ? series : [{ name: title, data: data ?? [], accent }]),
    [series, data, title, accent]
  );

  const selectedOption =
    periods.find((p) => p.label === selectedLabel) ?? periods[periods.length - 1];

  const visibleSeries = useMemo(
    () => baseSeries.map((s) => ({ ...s, data: sliceWindow(s.data, selectedOption?.points) })),
    [baseSeries, selectedOption]
  );

  const primary = visibleSeries[0];
  const isMulti = visibleSeries.length > 1;
  const hasData = (primary?.data.length ?? 0) >= 2;

  const stats = useMemo(() => {
    const vals = primary?.data.map((d) => d.value) ?? [];
    const sum = vals.reduce((a, b) => a + b, 0);
    const first = vals[0] ?? 0;
    const last = vals[vals.length - 1] ?? 0;
    const prev = vals[vals.length - 2] ?? first;
    const net = last - first;
    return {
      sum,
      net,
      pct: first ? (net / first) * 100 : 0,
      step: last - prev,
      peak: vals.length ? Math.max(...vals) : 0,
      low: vals.length ? Math.min(...vals) : 0,
      avg: vals.length ? sum / vals.length : 0,
    };
  }, [primary]);

  const resolvedTrend: "up" | "down" | "flat" =
    trend ?? (Math.abs(stats.pct) < NEUTRAL_PCT ? "flat" : stats.net >= 0 ? "up" : "down");
  const resolvedAccent: MetricAccent =
    accent ?? (resolvedTrend === "up" ? "rose" : resolvedTrend === "down" ? "emerald" : "neutral");
  const color = ACCENTS[resolvedAccent];
  const TrendIcon =
    resolvedTrend === "flat" ? ArrowRightIcon : resolvedTrend === "down" ? ArrowDownIcon : ArrowUpIcon;

  const fmtCompact = valueFormatter ?? formatCompact;
  const fmtDate = dateFormatter ?? ((d: string) => d);
  const sign = (n: number) => (n >= 0 ? "+" : "\u2212") + fmtCompact(Math.abs(n));

  const displayTotal = total ?? fmtCompact(stats.sum);
  const numericTotal =
    typeof total === "number"
      ? total
      : typeof total === "string" && /^\d+(\.\d+)?$/.test(total.trim())
        ? Number(total)
        : null;
  const animatedTotal = useCountUp(numericTotal ?? stats.sum, visible && numericTotal !== null);
  const displayDelta = delta ?? sign(stats.step);
  const displayPercent = percent ?? `${Math.abs(stats.pct).toFixed(1)}%`;

  const chartSeries: ChartSeries[] = visibleSeries.map((s, i) => ({
    name: s.name,
    data: s.data,
    color: s.accent
      ? ACCENTS[s.accent].stroke
      : isMulti
        ? SERIES_COLORS[i % SERIES_COLORS.length]
        : color.stroke,
  }));

  const lastIndex = (primary?.data.length ?? 1) - 1;
  const fallback = Math.min(defaultIndex ?? lastIndex, lastIndex);

  const handlePeriodChange = (option: PeriodOption) => {
    setSelectedLabel(option.label);
    onPeriodChange?.(option);
  };

  if (loading) {
    return (
      <div className={shell} aria-busy="true">
        <div className={`flex flex-1 flex-col ${sz.pad}`}>
          <div className="flex items-center justify-between">
            <div className="h-5 w-32 animate-pulse rounded bg-graphite" />
            <div className="h-5 w-24 animate-pulse rounded bg-graphite" />
          </div>
          <div className="mt-6 h-14 w-48 animate-pulse rounded-lg bg-graphite" />
          <div className="mt-auto h-24 w-full animate-pulse rounded-lg bg-graphite/50" />
        </div>
        <div className={`border-t border-white/[0.06] ${sz.footer}`}>
          <div className="h-4 w-40 animate-pulse rounded bg-graphite" />
        </div>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className={shell}>
        <div className={`flex flex-1 flex-col ${sz.pad}`}>
          <h3 className={`${sz.title} font-semibold tracking-tight text-snow`}>{title}</h3>
          <div className="flex flex-1 flex-col items-center justify-center gap-1 py-10 text-center">
            <p className="text-sm font-medium text-snow">No scan data yet</p>
            <p className="text-xs text-ash">Run a scan to see risk metrics.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={shell}>
      <div className={`relative z-10 ${sz.pad} pb-3`}>
        <div className="flex items-start justify-between gap-3">
          <h3 className={`${sz.title} min-w-0 truncate font-semibold tracking-tight text-snow`}>
            {title}
          </h3>
          <div className="pointer-events-auto flex shrink-0 items-center gap-2.5 text-[13px]">
            <span className="flex items-center gap-1 font-medium" style={{ color: color.text }}>
              <TrendIcon className="h-[15px] w-[15px]" aria-hidden />
              {displayPercent}
            </span>
            <PeriodSelect
              value={selectedLabel}
              options={periods}
              onChange={handlePeriodChange}
              accentText={color.text}
            />
          </div>
        </div>
        <div className="pointer-events-auto mt-3">
          <ViewToggle value={view} onChange={setView} />
        </div>
        {isMulti && (
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
            {chartSeries.map((s) => (
              <span
                key={s.name}
                className="flex items-center gap-1.5 text-[12px] text-ash"
              >
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                {s.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        className={`relative z-10 grid flex-1 gap-4 px-5 pb-4 sm:grid-cols-[minmax(0,40%)_minmax(0,1fr)] ${size === "sm" ? "" : "md:px-8 md:pb-6"}`}
      >
        <div className="flex flex-col justify-center">
          <div
            className={`${sz.headline} font-medium leading-none tracking-tight text-snow transition-all duration-700`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "220ms",
            }}
          >
            {numericTotal !== null ? animatedTotal : displayTotal}
          </div>
          {footnote && (
            <p
              className="mt-2 max-w-[16ch] text-caption leading-snug text-ash transition-all duration-500 sm:max-w-none"
              style={{ opacity: visible ? 1 : 0, transitionDelay: "380ms" }}
            >
              {footnote}
            </p>
          )}
        </div>

        <div
          className="relative min-h-[148px] overflow-hidden rounded-2xl border border-white/[0.06] bg-obsidian/50 transition-opacity duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "180ms" }}
        >
          <div
            className="pointer-events-none absolute inset-0 text-white/[0.07]"
            aria-hidden
          >
            <svg className="h-full w-full">
              <defs>
                <pattern id={gridId} width="14" height="14" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${gridId})`} />
            </svg>
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${color.stroke}14, transparent 60%)`,
            }}
            aria-hidden
          />
          <MetricChart
            series={chartSeries}
            view={view}
            defaultIndex={fallback}
            valueFormatter={(n) =>
              valueFormatter ? valueFormatter(n) : unit ? `${n} ${unit}` : String(n)
            }
            dateFormatter={fmtDate}
            animated={visible}
            gradientId={`${gridId}-fill`}
          />
        </div>
      </div>

      <div
        className={`relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] bg-ink ${sz.footer} text-[13px] transition-all duration-500`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transitionDelay: "420ms",
        }}
      >
        <div>
          <span className="font-medium" style={{ color: color.text }}>
            {displayDelta}
          </span>{" "}
          <span className="text-ash">{deltaLabel}</span>
        </div>
        {showStats && (
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-ash">
            <span>
              <span className="font-medium text-snow/80">{fmtCompact(stats.peak)}</span> peak
            </span>
            <span className="opacity-40">·</span>
            <span>
              <span className="font-medium text-snow/80">{fmtCompact(stats.low)}</span> low
            </span>
            <span className="opacity-40">·</span>
            <span>
              <span className="font-medium text-snow/80">
                {fmtCompact(Math.round(stats.avg))}
              </span>{" "}
              avg
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
