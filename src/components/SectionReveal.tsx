import { type ReactNode } from "react";
import { useInView } from "../hooks/useInView";

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "default" | "scale";
}) {
  const { ref, visible } = useInView<HTMLDivElement>();
  const base = variant === "scale" ? "reveal-scale" : "reveal";

  return (
    <div
      ref={ref}
      className={`${base} ${visible ? "reveal-visible" : ""} ${className}`.trim()}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
