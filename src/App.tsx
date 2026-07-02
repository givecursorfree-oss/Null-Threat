import { useEffect, useState } from "react";
import RedOverlayUnicornStudioBackground from "./components/RedOverlayUnicornStudioBackground";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Animated3ColumnValueProposition from "./components/Animated3ColumnValueProposition";
import ProblemSolution from "./components/ProblemSolution";
import EngineStepper from "./components/EngineStepper";
import FeaturesGrid from "./components/FeaturesGrid";
import RiskScore from "./components/RiskScore";
import OpenSource from "./components/OpenSource";
import DownloadCTA from "./components/DownloadCTA";
import Footer from "./components/Footer";
import { useCoarsePointer, usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

export default function App() {
  const [ready, setReady] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const coarsePointer = useCoarsePointer();

  useEffect(() => {
    const onContextMenu = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("img,video")) event.preventDefault();
    };

    const onDragStart = (event: DragEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("img,video")) event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const saveOrSource =
        (event.ctrlKey || event.metaKey) && (key === "s" || key === "u" || key === "p");
      const devtools = key === "f12" || ((event.ctrlKey || event.metaKey) && event.shiftKey && key === "i");
      if (saveOrSource || devtools) event.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} reducedMotion={reducedMotion} />
      <RedOverlayUnicornStudioBackground
        reducedMotion={reducedMotion}
        coarsePointer={coarsePointer}
      />

      <div
        className={`relative z-20 font-sans antialiased min-h-screen ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: "var(--duration-slow)" }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-md focus:bg-snow focus:px-4 focus:py-2 focus:text-obsidian focus:outline-none"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content" className="overflow-x-hidden w-full max-w-full">
          <Hero ready={ready} reducedMotion={reducedMotion} />
          <TrustBar />
          <Animated3ColumnValueProposition />
          <ProblemSolution />
          <EngineStepper />
          <FeaturesGrid />
          <RiskScore />
          <OpenSource />
          <DownloadCTA />
          <Footer />
        </main>
      </div>
    </>
  );
}
