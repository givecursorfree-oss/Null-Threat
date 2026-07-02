type LogoVariant = "mark" | "full" | "splash";

const logoSources: Record<LogoVariant, { src: string; height: string; width: number; heightPx: number }> =
  {
    mark: { src: "/images/logo-mark.png", height: "h-9", width: 36, heightPx: 36 },
    full: { src: "/images/logobg.png", height: "h-[4.5rem]", width: 180, heightPx: 72 },
    splash: { src: "/images/logo.png", height: "h-28 md:h-32", width: 220, heightPx: 128 },
  };

export function Logo({
  className = "",
  variant = "mark",
}: {
  className?: string;
  variant?: LogoVariant;
}) {
  const { src, height, width, heightPx } = logoSources[variant];
  const isDecorativeMark = variant === "mark";

  return (
    <img
      src={src}
      alt={isDecorativeMark ? "" : "Null Threat"}
      aria-hidden={isDecorativeMark ? true : undefined}
      width={width}
      height={heightPx}
      className={`block w-auto shrink-0 object-contain object-center ${height} ${className}`.trim()}
      decoding="async"
    />
  );
}
