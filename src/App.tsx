import { lazy, Suspense, useEffect, type ReactNode } from "react";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import ProblemSolution from "./components/ProblemSolution";
import EngineStepper from "./components/EngineStepper";
import OpenSource from "./components/OpenSource";
import DownloadCTA from "./components/DownloadCTA";
import SeoGuideSection from "./components/SeoGuideSection";
import SeoFaq from "./components/SeoFaq";
import Footer from "./components/Footer";
import { useCoarsePointer, usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

const RedOverlayUnicornStudioBackground = lazy(
  () => import("./components/RedOverlayUnicornStudioBackground")
);
const Animated3ColumnValueProposition = lazy(
  () => import("./components/Animated3ColumnValueProposition")
);
const FeaturesGrid = lazy(() => import("./components/FeaturesGrid"));
const RiskScore = lazy(() => import("./components/RiskScore"));

function LazySection({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export default function App() {
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
      <Preloader reducedMotion={reducedMotion} />
      <LazySection>
        <RedOverlayUnicornStudioBackground
          reducedMotion={reducedMotion}
          coarsePointer={coarsePointer}
        />
      </LazySection>

      <div className="relative z-20 min-h-screen font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-md focus:bg-snow focus:px-4 focus:py-2 focus:text-obsidian focus:outline-none"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content" className="overflow-x-hidden w-full max-w-full">
          <Hero reducedMotion={reducedMotion} />
          <TrustBar />
          <LazySection>
            <Animated3ColumnValueProposition />
          </LazySection>
          <ProblemSolution />
          <EngineStepper />
          <LazySection>
            <FeaturesGrid />
          </LazySection>
          <LazySection>
            <RiskScore />
          </LazySection>
          <OpenSource />
          <DownloadCTA />
          <SeoGuideSection />
          <SeoFaq />
          <Footer />
        </main>
      </div>
    </>
  );
}
