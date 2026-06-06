"use client";

import { cancelFrame, frame } from "framer-motion";
import Lenis from "lenis";
import { useEffect } from "react";

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });

    function onFrame(data: { timestamp: number }) {
      lenis.raf(data.timestamp);
    }

    frame.update(onFrame, true);

    return () => {
      cancelFrame(onFrame);
      lenis.destroy();
    };
  }, []);
}
