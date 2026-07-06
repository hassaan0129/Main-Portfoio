"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import SplitType from "split-type";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";

// WebGL is heavy — never let it block first paint or run on the server.
const ParticleField = dynamic(() => import("@/components/canvas/ParticleField"), {
  ssr: false,
});

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaderPct, setLoaderPct] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Percentage loader — purely cosmetic timing gate, not real asset progress,
  // so it never hangs on slow networks.
  useEffect(() => {
    if (prefersReducedMotion()) {
      setLoaderPct(100);
      setLoaded(true);
      return;
    }
    const obj = { pct: 0 };
    gsap.to(obj, {
      pct: 100,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: () => setLoaderPct(Math.round(obj.pct)),
      onComplete: () => setLoaded(true),
    });
  }, []);

  // Headline reveal + CTA fade-in, gated on the loader finishing.
  useEffect(() => {
    if (!loaded || !headlineRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([headlineRef.current, ".hero-fade"], { opacity: 1, y: 0 });
        return;
      }

      const split = new SplitType(headlineRef.current!, { types: "words" });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.set(containerRef.current, { autoAlpha: 1 })
        .from(split.words, {
          yPercent: 120,
          rotate: 4,
          opacity: 0,
          duration: 1.1,
          stagger: 0.06,
        })
        .from(
          ".hero-fade",
          { opacity: 0, y: 16, duration: 0.9, stagger: 0.12 },
          "-=0.5"
        );

      return () => split.revert();
    }, containerRef);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-primary)]">
      {/* Percentage loader */}
      {!loaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--bg-primary)]">
          <span className="font-mono text-sm tracking-[0.3em] text-white/70">
            {String(loaderPct).padStart(3, "0")}%
          </span>
        </div>
      )}

      <div className="noise-overlay" />

      {/* Ambient WebGL particle field */}
      <div className="absolute inset-0 opacity-70">
        <ParticleField />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center opacity-0"
        style={{ visibility: loaded ? "visible" : "hidden" }}
      >
        <p className="hero-fade mb-6 text-xs uppercase tracking-[0.35em] text-white/50">
          Hamza — Video Editing Agency
        </p>

        <h1 ref={headlineRef} className="text-hero text-white">
          We don&apos;t edit videos.
          <br />
          We craft stories that convert.
        </h1>

        <p className="hero-fade text-body mx-auto mt-8 max-w-xl">
          High-performance editing for AI UGC ads, VSLs, and Meta/TikTok
          campaigns — built to move revenue, not just views.
        </p>

        <div className="hero-fade mt-10 flex items-center justify-center gap-4">
          <MagneticButton>View Work</MagneticButton>
          <MagneticButton variant="ghost">Start Project</MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-fade absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/40">
        Scroll
      </div>
    </section>
  );
}