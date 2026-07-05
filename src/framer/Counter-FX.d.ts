import type { FC } from "react";

export type CounterFXProps = {
  from?: number;
  to?: number;
  duration?: number;
  easing?: "linear" | "smooth" | "spring" | "bounce";
  decimals?: number;
  prefix?: string;
  suffix?: string;
  showThousandSep?: boolean;
  tint?: string;
  font?: Record<string, string | number>;
  triggerMode?: "onAppear" | "onScroll" | "layerInView" | "sectionInView";
  sectionName?: string;
  htmlTag?: string;
};

declare const CounterFX: FC<CounterFXProps>;
export default CounterFX;
