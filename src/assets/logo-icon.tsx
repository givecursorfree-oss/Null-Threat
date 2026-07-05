import { cn } from "@/lib/cn";

export default function LogoIcon({ className }: { className?: string }) {
  return (
    <img
      src="/images/logo-mark.png"
      alt=""
      aria-hidden
      width={32}
      height={32}
      className={cn("block object-contain", className)}
      decoding="async"
    />
  );
}
