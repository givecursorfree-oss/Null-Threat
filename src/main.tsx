import { Fragment, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

if (import.meta.env.PROD) {
  const hook = (window as { __REACT_DEVTOOLS_GLOBAL_HOOK__?: Record<string, unknown> })
    .__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (hook) {
    for (const key of Object.keys(hook)) {
      // Best-effort deterrent against runtime component inspection in production.
      (hook as Record<string, unknown>)[key] = typeof hook[key] === "function" ? () => {} : null;
    }
  }
}

const RootWrapper = import.meta.env.DEV ? Fragment : StrictMode;

createRoot(document.getElementById("root")!).render(
  <RootWrapper>
    <App />
  </RootWrapper>
);
