import { Logo } from "./Logo";

export function BrandLockup({
  className = "",
  size = "nav",
  hideWordmarkOnMobile = false,
}: {
  className?: string;
  size?: "nav" | "hero";
  hideWordmarkOnMobile?: boolean;
}) {
  const textClass = size === "hero" ? "text-body-lg" : "text-body";
  const wordmarkClass = hideWordmarkOnMobile
    ? "hidden sm:inline leading-none"
    : "leading-none";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center">
        <Logo variant="mark" className="!h-8 !w-8" />
      </span>
      <span
        className={`${textClass} ${wordmarkClass} font-semibold tracking-tight text-snow`}
      >
        Null Threat
      </span>
    </span>
  );
}
