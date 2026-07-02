import { useEffect, useRef, useState } from "react";
import {
  ChartBarIcon,
  ChevronDownIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import type { ChartView } from "./metric-chart";

export type PeriodOption = { label: string; points?: number };

export function ViewToggle({
  value,
  onChange,
}: {
  value: ChartView;
  onChange: (view: ChartView) => void;
}) {
  return (
    <div
      className="pointer-events-auto inline-flex shrink-0 rounded-full border border-white/10 bg-obsidian/90 p-0.5"
      role="group"
      aria-label="Chart view"
    >
      <button
        type="button"
        className={`rounded-full p-1.5 transition-colors ${
          value === "curve" ? "bg-white/12 text-snow" : "text-ash hover:text-snow"
        }`}
        onClick={() => onChange("curve")}
        aria-pressed={value === "curve"}
        aria-label="Curve view"
      >
        <PresentationChartLineIcon className="h-3.5 w-3.5" aria-hidden />
      </button>
      <button
        type="button"
        className={`rounded-full p-1.5 transition-colors ${
          value === "bar" ? "bg-white/12 text-snow" : "text-ash hover:text-snow"
        }`}
        onClick={() => onChange("bar")}
        aria-pressed={value === "bar"}
        aria-label="Bar view"
      >
        <ChartBarIcon className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}

export function PeriodSelect({
  value,
  options,
  onChange,
  accentText,
}: {
  value: string;
  options: PeriodOption[];
  onChange: (option: PeriodOption) => void;
  accentText?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="pointer-events-auto relative">
      <button
        type="button"
        className="inline-flex min-h-[30px] items-center gap-1.5 rounded-md border border-white/10 bg-obsidian/90 px-2.5 py-1 text-[12px] font-medium outline-none transition-colors hover:border-white/20 focus-visible:ring-2 focus-visible:ring-white/25"
        style={{ color: accentText }}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Scan period"
      >
        {value}
        <ChevronDownIcon className="h-3.5 w-3.5 opacity-70" aria-hidden />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+4px)] z-20 min-w-[9rem] overflow-hidden rounded-md border border-white/10 bg-ink py-1 shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
        >
          {options.map((o) => (
            <li key={o.label} role="option" aria-selected={o.label === value}>
              <button
                type="button"
                className={`w-full px-3 py-2 text-left text-[12px] transition-colors hover:bg-white/5 ${
                  o.label === value ? "text-snow" : "text-ash"
                }`}
                style={o.label === value ? { color: accentText } : undefined}
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
