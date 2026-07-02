import { useCallback, useEffect, useRef } from "react";

const UNICORN_PROJECT_ID = "tPmIIl0vKqHO9yqmtge2";
const UNICORN_SCRIPT =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";

let scriptLoading: Promise<void> | null = null;

function loadUnicornScript() {
  if (window.UnicornStudio) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${UNICORN_SCRIPT}"]`);
    if (existing) {
      if (window.UnicornStudio) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("UnicornStudio failed to load")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = UNICORN_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("UnicornStudio failed to load"));
    (document.head || document.body).appendChild(script);
  });

  return scriptLoading;
}

function mountUnicornProjects() {
  if (!window.UnicornStudio) return false;
  window.UnicornStudio.init();
  return true;
}

type Props = {
  reducedMotion?: boolean;
  coarsePointer?: boolean;
};

/**
 * Hero-scoped UnicornStudio + ember-red atmospheric overlay.
 * Loads immediately on mount; pauses when scrolled past the hero zone.
 */
export default function RedOverlayUnicornStudioBackground({
  reducedMotion = false,
  coarsePointer = false,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const skipWebGL = reducedMotion || coarsePointer;

  const tryInit = useCallback(() => {
    if (skipWebGL || !hostRef.current) return;
    mountUnicornProjects();
  }, [skipWebGL]);

  useEffect(() => {
    if (skipWebGL) return;

    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    loadUnicornScript()
      .then(() => {
        if (cancelled) return;
        tryInit();
        requestAnimationFrame(() => {
          if (!cancelled) tryInit();
        });
        retryTimer = setTimeout(() => {
          if (!cancelled) tryInit();
        }, 250);
      })
      .catch(() => {
        /* CSS fallback remains visible */
      });

    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [skipWebGL, tryInit]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || skipWebGL) return;

    const syncPaused = () => {
      const hero = document.getElementById("hero");
      const threshold = hero
        ? hero.getBoundingClientRect().bottom
        : window.innerHeight * 0.55;
      root.classList.toggle("aura-paused", threshold < window.innerHeight * 0.12);
    };

    syncPaused();
    window.addEventListener("scroll", syncPaused, { passive: true });
    window.addEventListener("resize", syncPaused, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncPaused);
      window.removeEventListener("resize", syncPaused);
    };
  }, [skipWebGL]);

  if (skipWebGL) {
    return (
      <div className="aura-background-component aura-static" aria-hidden>
        <div className="aura-canvas-fallback" />
        <div className="aura-red-overlay aura-red-overlay--static" />
        <div className="aura-vignette" />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="aura-background-component" aria-hidden>
      <div className="aura-canvas-fallback" />
      <div
        ref={hostRef}
        data-us-project={UNICORN_PROJECT_ID}
        className="aura-canvas-host"
      />
      <div className="aura-red-overlay" />
      <div className="aura-vignette" />
    </div>
  );
}
