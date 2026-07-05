/** Minimal stubs so Framer-exported modules load outside the Framer canvas. */
import type { ReactNode } from "react";

export const ControlType = {
  Boolean: "boolean",
  Color: "color",
  Enum: "enum",
  Number: "number",
  String: "string",
  Font: "font",
  ResponsiveImage: "responsiveimage",
  ChangeHandler: "changehandler",
};

export function addPropertyControls(_component: unknown, _controls: unknown) {
  /* no-op in Vite app */
}

export function withCSS<T>(component: T, _css: string[], _hash: string): T {
  return component;
}

export function addFonts(_component: unknown, _fonts?: unknown[], _opts?: unknown) {
  /* no-op */
}

export function cx(...parts: unknown[]) {
  return parts.filter(Boolean).join(" ");
}

export const RenderTarget = {
  canvas: "canvas",
  current: () => "export",
};

export function forwardLoader(loader: unknown) {
  return loader;
}

export function getFonts(_component: unknown) {
  return [];
}

export function ComponentViewportProvider({ children }: { children: ReactNode }) {
  return children;
}

export function SmartComponentScopedContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function useComponentViewport() {
  return { width: 1120, height: 550, y: 0 };
}

export function useLocaleInfo() {
  return { activeLocale: "en", setLocale: () => {} };
}

/** Framer export preview — false in Vite so scroll/motion components stay interactive. */
export function useIsStaticRenderer() {
  return false;
}

export function useVariantState(opts: {
  defaultVariant: string;
  variant?: string;
  variantClassNames: Record<string, string>;
  cycleOrder: string[];
  ref: React.RefObject<HTMLElement>;
}) {
  const baseVariant = opts.variant ?? opts.defaultVariant;
  return {
    baseVariant,
    classNames: opts.variantClassNames[baseVariant] ?? "",
    clearLoadingGesture: () => {},
    gestureHandlers: {},
    gestureVariant: undefined,
    isLoading: false,
    setGestureState: () => {},
    setVariant: () => {},
    variants: baseVariant,
  };
}

export function useActiveVariantCallback(_variant: string) {
  return {
    activeVariantCallback: (fn: (...args: unknown[]) => unknown) => fn,
    delay: 0,
  };
}
