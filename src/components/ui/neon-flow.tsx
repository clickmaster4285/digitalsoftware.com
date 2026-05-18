"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Helper: random colors
const randomColors = (count: number) => {
  return new Array(count).fill(0).map(
    () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
  );
};

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tubesRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    const loadScript = () => {
      return new Promise<any>((resolve, reject) => {
        // prevent double loading
        if (scriptLoadedRef.current) {
          resolve((window as any).TubesCursor);
          return;
        }

        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
        script.async = true;

        script.onload = () => {
          scriptLoadedRef.current = true;
          resolve((window as any).TubesCursor);
        };

        script.onerror = reject;

        document.body.appendChild(script);
      });
    };

    const init = async () => {
      if (!canvasRef.current) return;

      try {
        const TubesCursor = await loadScript();

        if (!mounted || !canvasRef.current) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
            },
          },
        });

        tubesRef.current = app;
      } catch (err) {
        console.error("Failed to load TubesCursor:", err);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;

    tubesRef.current.tubes.setColors(randomColors(3));
    tubesRef.current.tubes.setLightsColors(randomColors(4));
  };

  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[400px] overflow-hidden bg-background",
        className
      )}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: "none" }}
      />

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

export default TubesBackground;