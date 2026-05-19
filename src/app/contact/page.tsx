'use client';

import { useEffect, useRef, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { Navbar } from "@/components/site/Navbar";

const StippleGlobe = lazy(() => import("@/components/contact/StippleGlobe"));

export default function Home() {
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // START STATE — globe cropped on the left of its container, low opacity.
      // Text starts shifted slightly left + faded.
      gsap.set(globeWrapRef.current, {
        xPercent: -45,
        opacity: 0.25,
        scale: 0.95,
        transformOrigin: "50% 50%",
      });
      gsap.set(textRef.current, { x: -60, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // INTRO — globe slides left → center while text fades in from the left.
      tl.to(globeWrapRef.current, {
        xPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 2.2,
      })
        .to(textRef.current, { x: 0, opacity: 1, duration: 1.4 }, "-=1.8")

        // END STATE — subtle right drift, calm and stable.
        .to(globeWrapRef.current, {
          xPercent: 6,
          duration: 6,
          ease: "sine.inOut",
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen w-full overflow-hidden"
        style={{ backgroundColor: "#0b0f1a" }}
      >
        {/* Centered container with max-width */}
        <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8">
          {/* Mobile layout: stacked vertically */}
          <section className="relative mx-auto flex min-h-screen flex-col items-center justify-center gap-12 py-20 lg:grid lg:grid-cols-2 lg:gap-8">
            {/* LEFT — text */}
            <div ref={textRef} className="relative z-10 will-change-transform lg:w-auto">
              <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/60 lg:text-left">
                Find an office
              </p>
              <h1
                className="text-center text-4xl font-black leading-[1.2] tracking-tight text-white sm:text-5xl lg:text-left lg:text-6xl xl:text-7xl"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Find your local team among 7,150 Monks across 57 talent hubs in 33 countries.
              </h1>
            </div>

            {/* RIGHT — globe */}
            <div className="relative h-[500px] w-full sm:h-[600px] lg:h-[600px] lg:w-auto">
              <div
                ref={globeWrapRef}
                className="absolute inset-0 will-change-transform"
              >
                <Suspense fallback={null}>
                  <StippleGlobe />
                </Suspense>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}