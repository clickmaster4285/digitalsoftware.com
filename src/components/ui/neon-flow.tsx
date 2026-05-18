"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const randomColors = (count: number) =>
  new Array(count)
    .fill(0)
    .map(
      () =>
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
    );

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadScript = (): Promise<any> =>
      new Promise((resolve, reject) => {
        // Already loaded — grab the global directly
        if ((window as any).TubesCursor) {
          resolve((window as any).TubesCursor);
          return;
        }
        // Script tag already injected but not yet fired
        if (scriptLoadedRef.current) {
          const interval = setInterval(() => {
            if ((window as any).TubesCursor) {
              clearInterval(interval);
              resolve((window as any).TubesCursor);
            }
          }, 50);
          return;
        }

        scriptLoadedRef.current = true;
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
        script.async = true;
        script.onload = () => resolve((window as any).TubesCursor);
        script.onerror = reject;
        document.body.appendChild(script);
      });

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
        setIsLoaded(true);
      } catch (err) {
        console.error("Failed to load TubesCursor:", err);
      }
    };

    init();
    return () => {
      mounted = false;
    };
  }, []);

  // Forward pointer events from the wrapper div to the canvas
  // so the Three.js raycaster / cursor tracker keeps working
  // even though the canvas itself has pointer-events:none
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    canvasRef.current.dispatchEvent(
      new PointerEvent("pointermove", {
        bubbles: true,
        cancelable: true,
        clientX: e.clientX,
        clientY: e.clientY,
        movementX: e.movementX,
        movementY: e.movementY,
      })
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    canvasRef.current.dispatchEvent(
      new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        clientX: e.clientX,
        clientY: e.clientY,
        movementX: e.movementX,
        movementY: e.movementY,
      })
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Forward to canvas in case the lib listens there
    if (canvasRef.current) {
      canvasRef.current.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          clientX: e.clientX,
          clientY: e.clientY,
        })
      );
    }

    if (!enableClickInteraction || !tubesRef.current) return;
    tubesRef.current.tubes.setColors(randomColors(3));
    tubesRef.current.tubes.setLightsColors(randomColors(4));
  };

  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[400px] overflow-hidden bg-black",
        className
      )}
      onPointerMove={handlePointerMove}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/*
        Canvas sits behind everything.
        pointer-events:none prevents it from stealing mouse events —
        we dispatch synthetic events onto it manually above.
      */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: "none", pointerEvents: "none" }}
      />

      {/*
        Content overlay.
        pointer-events:auto so child buttons/links stay clickable.
        The wrapper's onMouseMove still fires because the event
        originates from the wrapper div, not the canvas.
      */}
      <div className="relative z-10 w-full h-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;