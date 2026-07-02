import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import createGlobe from "cobe";

export interface CdnMarker {
  id: string;
  location: [number, number];
  region: string;
}

export interface CdnArc {
  id: string;
  from: [number, number];
  to: [number, number];
}

export interface GlobeCdnProps {
  markers?: CdnMarker[];
  arcs?: CdnArc[];
  className?: string;
  speed?: number;
  reducedMotion?: boolean;
  metricLabel?: string;
  /** Removes chrome — halo + globe only, no container styling expected upstream */
  standalone?: boolean;
  showArcMetrics?: boolean;
  showMarkerLabels?: boolean;
}

export const defaultThreatMarkers: CdnMarker[] = [
  { id: "node-iad", location: [38.95, -77.45], region: "US-EAST" },
  { id: "node-cdg", location: [49.01, 2.55], region: "EU-WEST" },
  { id: "node-sin", location: [1.36, 103.99], region: "AP-SOUTH" },
  { id: "node-gru", location: [-23.43, -46.47], region: "LATAM" },
  { id: "node-hnd", location: [35.55, 139.78], region: "JP-EAST" },
  { id: "node-bom", location: [19.09, 72.87], region: "IN-WEST" },
  { id: "node-syd", location: [-33.95, 151.18], region: "AU-EAST" },
  { id: "node-dub", location: [53.43, -6.25], region: "EU-NORTH" },
];

export const defaultThreatArcs: CdnArc[] = [
  { id: "arc-1", from: [38.95, -77.45], to: [49.01, 2.55] },
  { id: "arc-2", from: [49.01, 2.55], to: [1.36, 103.99] },
  { id: "arc-3", from: [1.36, 103.99], to: [35.55, 139.78] },
  { id: "arc-4", from: [38.95, -77.45], to: [-23.43, -46.47] },
  { id: "arc-5", from: [49.01, 2.55], to: [19.09, 72.87] },
  { id: "arc-6", from: [35.55, 139.78], to: [-33.95, 151.18] },
];

const BASE_TRAFFIC = [847, 612, 493, 318, 276, 241];

export function GlobeCdn({
  markers = defaultThreatMarkers,
  arcs = defaultThreatArcs,
  className = "",
  speed = 0.0022,
  reducedMotion = false,
  metricLabel = "blocks/hr",
  standalone = false,
  showArcMetrics = !standalone,
  showMarkerLabels = !standalone,
}: GlobeCdnProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const velocityRef = useRef(reducedMotion ? 0 : speed);
  const targetSpeedRef = useRef(reducedMotion ? 0 : speed);
  const lastPointerRef = useRef<{ x: number; t: number } | null>(null);

  const [traffic, setTraffic] = useState(() =>
    arcs.map((a, i) => ({ id: a.id, value: BASE_TRAFFIC[i] ?? 180 }))
  );

  useEffect(() => {
    targetSpeedRef.current = reducedMotion ? 0 : speed;
    if (reducedMotion) {
      velocityRef.current = 0;
    } else if (velocityRef.current === 0) {
      velocityRef.current = speed;
    }
  }, [reducedMotion, speed]);

  useEffect(() => {
    if (reducedMotion || !showArcMetrics) return;

    const interval = setInterval(() => {
      setTraffic((data) =>
        data.map((t) => ({
          ...t,
          value: Math.max(40, t.value + Math.floor(Math.random() * 17) - 8),
        }))
      );
    }, 320);

    return () => clearInterval(interval);
  }, [reducedMotion, showArcMetrics]);

  const handlePointerDown = useCallback((e: ReactPointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    lastPointerRef.current = { x: e.clientX, t: performance.now() };
    velocityRef.current = 0;
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    lastPointerRef.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: globalThis.PointerEvent) => {
      if (pointerInteracting.current !== null) {
        const now = performance.now();
        const dx = e.clientX - pointerInteracting.current.x;
        dragOffset.current = {
          phi: dx / 280,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
        if (lastPointerRef.current) {
          const dt = Math.max(now - lastPointerRef.current.t, 8);
          const vx = (e.clientX - lastPointerRef.current.x) / dt;
          velocityRef.current = vx * 0.004;
        }
        lastPointerRef.current = { x: e.clientX, t: now };
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId = 0;
    let phi = 0;
    let lastFrame = 0;

    const init = () => {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.22,
        dark: 1,
        diffuse: 1.35,
        mapSamples: 14000,
        mapBrightness: 8,
        baseColor: [0.11, 0.11, 0.13],
        markerColor: [0.2, 0.82, 0.58],
        glowColor: standalone ? [0.45, 0.14, 0.05] : [0.22, 0.08, 0.04],
        markerElevation: 0.028,
        markers: markers.map((m) => ({ location: m.location, size: 0.015, id: m.id })),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to, id: a.id })),
        arcColor: [1, 0.35, 0],
        arcWidth: standalone ? 0.5 : 0.45,
        arcHeight: 0.3,
        opacity: 0.96,
      });

      const animate = (time: number) => {
        if (!globe) return;

        if (!lastFrame) lastFrame = time;
        const delta = Math.min((time - lastFrame) / 1000, 0.05);
        lastFrame = time;

        const dragging = pointerInteracting.current !== null;

        if (!dragging && !reducedMotion) {
          const target = targetSpeedRef.current;
          const ease = Math.min(delta * 3.2, 1);
          velocityRef.current += (target - velocityRef.current) * ease;
          phi += velocityRef.current * delta * 60;
        } else if (!dragging && reducedMotion) {
          velocityRef.current = 0;
        }

        globe.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.22 + thetaOffsetRef.current + dragOffset.current.theta,
        });
        animationId = requestAnimationFrame(animate);
      };

      animationId = requestAnimationFrame(animate);
      requestAnimationFrame(() => {
        canvas.style.opacity = "1";
      });
    };

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(animationId);
      globe?.destroy();
    };
  }, [markers, arcs, reducedMotion, speed, standalone]);

  const pyramidFaceStyle = (nth: number): CSSProperties => {
    const transforms = [
      "rotateY(0deg) translateZ(4px) rotateX(19.5deg)",
      "rotateY(120deg) translateZ(4px) rotateX(19.5deg)",
      "rotateY(240deg) translateZ(4px) rotateX(19.5deg)",
      "rotateX(-90deg) rotateZ(60deg) translateY(4px)",
    ];
    const colors = ["#ff5a00", "#cc4800", "#993600", "#e64d00"];

    return {
      position: "absolute",
      left: -0.5,
      top: 0,
      width: 0,
      height: 0,
      borderLeft: "6.5px solid transparent",
      borderRight: "6.5px solid transparent",
      borderBottom: `13px solid ${colors[nth]}`,
      transformOrigin: "center bottom",
      transform: transforms[nth],
    };
  };

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      {standalone && (
        <>
          <div
            className="pointer-events-none absolute inset-[-18%] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 48%, rgba(255, 90, 0, 0.28) 0%, rgba(255, 60, 20, 0.1) 38%, transparent 68%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-[-8%] rounded-full opacity-60"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.08) 0%, transparent 55%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-[2%] rounded-full ring-1 ring-white/[0.06]"
            aria-hidden
          />
        </>
      )}

      <style>{`
        @keyframes globe-pyramid-spin {
          0% { transform: rotateX(20deg) rotateY(0deg); }
          100% { transform: rotateX(20deg) rotateY(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .globe-pyramid { animation: none !important; }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        aria-hidden
        className="relative z-10"
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1s ease",
          borderRadius: "50%",
          touchAction: "none",
          filter: standalone ? "drop-shadow(0 0 48px rgba(255, 90, 0, 0.18))" : undefined,
        }}
      />

      {showMarkerLabels &&
        markers.map((m) => (
        <div
          key={m.id}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            pointerEvents: "none",
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 6px))`,
            transition: "opacity 0.3s, filter 0.3s",
          }}
        >
          <div
            className={reducedMotion ? "" : "globe-pyramid"}
            style={{
              width: 12,
              height: 12,
              position: "relative",
              transformStyle: "preserve-3d",
              animation: reducedMotion ? undefined : "globe-pyramid-spin 4s linear infinite",
            }}
          >
            {[0, 1, 2, 3].map((n) => (
              <div key={n} style={pyramidFaceStyle(n)} />
            ))}
          </div>
          <span
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: "0.55rem",
              color: "#fafafa",
              background: standalone ? "rgba(9, 9, 11, 0.75)" : "rgba(9, 9, 11, 0.92)",
              padding: "2px 7px",
              borderRadius: 4,
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              border: "1px solid rgba(255,255,255,0.14)",
              backdropFilter: standalone ? "blur(8px)" : undefined,
            }}
          >
            {m.region}
          </span>
        </div>
      ))}

      {showArcMetrics &&
        traffic.map((t) => (
        <div
          key={t.id}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-arc-${t.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            fontFamily: "ui-monospace, monospace",
            fontSize: "0.5rem",
            color: "#fafafa",
            background: "rgba(255, 90, 0, 0.92)",
            padding: "3px 8px",
            borderRadius: 4,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            opacity: `var(--cobe-visible-arc-${t.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-arc-${t.id}, 0)) * 6px))`,
            transition: "opacity 0.3s, filter 0.3s",
          }}
        >
          {t.value} {metricLabel}
        </div>
      ))}
    </div>
  );
}
