import { useEffect } from "react";

const UNICORN_PROJECT_ID = "tPmIIl0vKqHO9yqmtge2";
const UNICORN_SCRIPT =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";

/** Hero-only ambient layer — particles + subtle brand warmth. No grid, no blend-mode wash. */
export default function HeroBackground() {
  useEffect(() => {
    const initUnicorn = () => {
      if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };

    if (window.UnicornStudio) {
      initUnicorn();
      return;
    }

    const existing = document.querySelector(`script[src="${UNICORN_SCRIPT}"]`);
    if (existing) {
      initUnicorn();
      return;
    }

    const script = document.createElement("script");
    script.src = UNICORN_SCRIPT;
    script.async = true;
    script.onload = initUnicorn;
    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <div
        data-us-project={UNICORN_PROJECT_ID}
        className="aura-background-component absolute inset-0 w-full h-full opacity-[0.35]"
      />

      {/* Design-system void → obsidian depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-void) 0%, var(--color-obsidian-deep) 55%, var(--color-void) 100%)",
        }}
      />

      {/* Subtle gold accent — hero only, no mix-blend */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 15%, rgba(212, 160, 23, 0.07) 0%, transparent 65%)",
        }}
      />

      {/* Bottom fade into page canvas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 55%, var(--color-void) 100%)",
        }}
      />
    </div>
  );
}
