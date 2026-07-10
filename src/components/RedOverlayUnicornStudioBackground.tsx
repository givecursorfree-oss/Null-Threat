import { useCallback, useEffect, useRef } from "react";

const UNICORN_PROJECT_ID = "yWZ2Tbe094Fsjgy9NRnD";
const UNICORN_SCRIPT_CDN =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
const UNICORN_SCRIPT_LOCAL = "/vendor/unicornStudio.umd.js";

let scriptLoading: Promise<void> | null = null;

function appendScript(src: string) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
  return script;
}

function loadUnicornScript() {
  if (window.UnicornStudio) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${UNICORN_SCRIPT_LOCAL}"], script[src="${UNICORN_SCRIPT_CDN}"]`
    );

    const waitForApi = (onFail: () => void) => {
      let attempts = 0;
      const poll = () => {
        if (window.UnicornStudio) {
          resolve();
          return;
        }
        if (attempts++ >= 80) {
          onFail();
          return;
        }
        setTimeout(poll, 50);
      };
      poll();
    };

    if (existing) {
      if (window.UnicornStudio) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => waitForApi(() => reject(new Error("UnicornStudio failed to load"))), {
        once: true,
      });
      existing.addEventListener("error", () => reject(new Error("UnicornStudio failed to load")), {
        once: true,
      });
      waitForApi(() => reject(new Error("UnicornStudio failed to load")));
      return;
    }

    const script = appendScript(UNICORN_SCRIPT_CDN);
    script.onload = () => waitForApi(() => reject(new Error("UnicornStudio failed to load")));
    script.onerror = () => {
      script.remove();
      const fallback = appendScript(UNICORN_SCRIPT_LOCAL);
      fallback.onload = () => waitForApi(() => reject(new Error("UnicornStudio failed to load")));
      fallback.onerror = () => reject(new Error("UnicornStudio failed to load"));
    };
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
 * Hero UnicornStudio aura with a subtle ember threat overlay.
 * Script is preloaded from /public/vendor; CSS fallback paints instantly.
 */
export default function RedOverlayUnicornStudioBackground({
  reducedMotion = false,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const skipWebGL = reducedMotion;

  const markWebGlReady = useCallback(() => {
    const root = rootRef.current;
    const host = hostRef.current;
    if (!root || !host?.querySelector("canvas")) return false;
    root.classList.add("aura-webgl-ready");
    return true;
  }, []);

  const tryInit = useCallback(() => {
    if (skipWebGL || !hostRef.current) return;
    if (!mountUnicornProjects()) return;

    if (markWebGlReady()) return;

    const observer = new MutationObserver(() => {
      if (markWebGlReady()) observer.disconnect();
    });
    observer.observe(hostRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [skipWebGL, markWebGlReady]);

  useEffect(() => {
    if (skipWebGL) return;

    let cancelled = false;
    let cleanupObserver: (() => void) | undefined;

    const boot = () => {
      if (cancelled) return;
      cleanupObserver = tryInit();
    };

    if (window.UnicornStudio) {
      boot();
      requestAnimationFrame(boot);
      setTimeout(boot, 120);
      setTimeout(boot, 400);
      return () => {
        cancelled = true;
        cleanupObserver?.();
      };
    }

    loadUnicornScript()
      .then(() => {
        boot();
        requestAnimationFrame(boot);
        setTimeout(boot, 120);
        setTimeout(boot, 400);
      })
      .catch(() => {
        /* CSS fallback remains visible */
      });

    return () => {
      cancelled = true;
      cleanupObserver?.();
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
