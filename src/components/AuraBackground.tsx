import { useEffect } from "react";

const UNICORN_PROJECT_ID = "EET25BiXxR2StNXZvAzF";
const UNICORN_SCRIPT =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";

export default function AuraBackground() {
  useEffect(() => {
    const initUnicorn = () => {
      if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };

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
    <div className="aura-bg" aria-hidden>
      <div
        data-us-project={UNICORN_PROJECT_ID}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
