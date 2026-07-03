import { Logo } from "./Logo";

const PRELOADER_KEY = "null-threat-preloader-seen";

function isLikelyCrawler() {
  if (typeof navigator === "undefined") return true;
  return /bot|crawl|spider|slurp|mediapartners|facebookexternalhit|whatsapp|preview|lighthouse|headless/i.test(
    navigator.userAgent
  );
}

function shouldSkipPreloader(reducedMotion: boolean) {
  if (reducedMotion || isLikelyCrawler()) return true;
  try {
    return sessionStorage.getItem(PRELOADER_KEY) === "1";
  } catch {
    return false;
  }
}

export default function Preloader({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const skip = shouldSkipPreloader(reducedMotion);

  const handleComplete = () => {
    try {
      sessionStorage.setItem(PRELOADER_KEY, "1");
    } catch {
      // ignore storage errors
    }
  };

  if (skip) return null;

  return (
    <div
      className="preloader-exit fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian"
      onAnimationEnd={handleComplete}
      role="status"
      aria-label="Loading"
    >
      <Logo variant="splash" className="mb-6" />
      <div className="h-px w-32 bg-white/10 overflow-hidden">
        <div className="preloader-bar h-full bg-snow origin-left" />
      </div>
      <p className="mt-4 text-caption text-ash uppercase tracking-widest">Loading</p>
    </div>
  );
}
