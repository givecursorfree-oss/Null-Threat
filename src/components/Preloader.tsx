import { startTransition, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { preloadUnicornStudio } from "@/components/RedOverlayUnicornStudioBackground";

/** Mirrors Framer SmoothPreloader defaults: https://framer.com/m/SmoothPreloader-RAD49d.js */
const PRELOADER_KEY = "null-threat-preloader-seen";
const LOGO_SRC = "/images/logo-preloader.png";
const LOGO_SIZE = 240;
const BACKGROUND_COLOR = "#09090b";
const COUNTER_COLOR = "#fafafa";
const DURATION_SECONDS = 3;
const EXIT_EASE: [number, number, number, number] = [0.6, 0.01, 0.05, 0.95];

type ExitEffect = "fade" | "slideUp" | "slideDown";

function isLikelyCrawler() {
  if (typeof navigator === "undefined") return true;
  return /bot|crawl|spider|slurp|mediapartners|facebookexternalhit|whatsapp|preview|lighthouse|headless/i.test(
    navigator.userAgent
  );
}

export function shouldSkipPreloader(reducedMotion: boolean) {
  if (reducedMotion || isLikelyCrawler()) return true;
  try {
    return sessionStorage.getItem(PRELOADER_KEY) === "1";
  } catch {
    return false;
  }
}

function getExitAnimation(effect: ExitEffect) {
  switch (effect) {
    case "slideUp":
      return { y: "-100%" };
    case "slideDown":
      return { y: "100%" };
    default:
      return { opacity: 0 };
  }
}

type PreloaderProps = {
  reducedMotion?: boolean;
  onComplete?: () => void;
  exitEffect?: ExitEffect;
  duration?: number;
  logoSize?: number;
};

export default function Preloader({
  reducedMotion = false,
  onComplete,
  exitEffect = "fade",
  duration = DURATION_SECONDS,
  logoSize = LOGO_SIZE,
}: PreloaderProps) {
  const skip = shouldSkipPreloader(reducedMotion);
  const [counter, setCounter] = useState(10);
  const [isVisible, setIsVisible] = useState(!skip);

  useEffect(() => {
    if (skip) return;
    preloadUnicornStudio().catch(() => {
      /* CSS fallback remains visible */
    });
  }, [skip]);

  useEffect(() => {
    if (skip) return;

    const increment = 90 / ((duration * 1000) / 50);
    const interval = window.setInterval(() => {
      startTransition(() => {
        setCounter((prev) => {
          const next = prev + increment;
          if (next >= 100) {
            window.clearInterval(interval);
            window.setTimeout(() => {
              startTransition(() => {
                setIsVisible(false);
                try {
                  sessionStorage.setItem(PRELOADER_KEY, "1");
                } catch {
                  // ignore storage errors
                }
                onComplete?.();
              });
            }, 200);
            return 100;
          }
          return next;
        });
      });
    }, 50);

    return () => window.clearInterval(interval);
  }, [duration, onComplete, skip]);

  if (skip) return null;

  return (
    <div className="fixed inset-0 z-[9999]" aria-hidden={!isVisible}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="smooth-preloader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              ...getExitAnimation(exitEffect),
              transition: { duration: 0.8, ease: EXIT_EASE },
            }}
            className="fixed inset-0 flex items-center justify-center overflow-auto"
            style={{ backgroundColor: BACKGROUND_COLOR }}
            role="status"
            aria-live="polite"
            aria-label={`Loading ${Math.round(counter)} percent`}
          >
            <motion.img
              src={LOGO_SRC}
              alt="Null Threat"
              width={logoSize}
              height={logoSize}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                maxWidth: `${logoSize}px`,
                maxHeight: `${logoSize}px`,
                objectFit: "contain",
              }}
              decoding="async"
              fetchPriority="high"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute bottom-10 right-10 tabular-nums"
              style={{
                color: COUNTER_COLOR,
                fontSize: "80px",
                lineHeight: "1em",
                letterSpacing: "-0.02em",
              }}
              aria-hidden
            >
              {Math.round(counter)}%
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
