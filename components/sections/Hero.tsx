"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import SplitType from "split-type";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FloatingTestimonials } from "@/components/sections/FloatingTestimonials";

// WebGL is heavy — never let it block first paint or run on the server.
const ParticleField = dynamic(() => import("@/components/canvas/ParticleField"), {
  ssr: false,
});

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaderPct, setLoaderPct] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      Promise.resolve().then(() => {
        setLoaderPct(100);
        setLoaded(true);
      });
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
        )
        .from(
          ".floating-card",
          { opacity: 0, scale: 0.9, duration: 0.8, stagger: 0.15 },
          "-=0.6"
        );

      return () => split.revert();
    }, containerRef);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[var(--bg-primary)]">
      {!loaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--bg-primary)]">
          <span className="font-mono text-sm tracking-[0.3em] text-white/70">
            {String(loaderPct).padStart(3, "0")}%
          </span>
        </div>
      )}

      <div className="noise-overlay" />

      <div className="absolute inset-0 opacity-50">
        <ParticleField />
      </div>

      {/* Ambient radial glow behind the headline, like the reference site */}
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-3xl"
        aria-hidden="true"
      />

      <FloatingTestimonials />

      <div
        ref={containerRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 opacity-0 sm:px-10"
        style={{ visibility: loaded ? "visible" : "hidden" }}
      >
        <div className="max-w-2xl">
          <span className="hero-fade mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/60">
            <span className="text-[var(--highlight)]" aria-hidden="true">◎</span>
            Video Editing Agency — AI UGC, VSLs, Paid Social
          </span>

          <h1 ref={headlineRef} className="text-hero text-white">
            <span className="text-white">We craft </span>
            <span className="text-white/40">stories</span>
            <br />
            <span className="text-white/40">that </span>
            <span className="text-white">convert.</span>
          </h1>

          <p className="hero-fade text-body mt-8 max-w-lg">
            Hamza is a high-performance video editing agency for AI UGC ads,
            VSLs, and Meta/TikTok campaigns — built to move revenue, not just
            views.
          </p>

          <div className="hero-fade mt-10 flex items-center gap-4">
            <MagneticButton>See All Work</MagneticButton>
            <MagneticButton variant="ghost">Start a Project</MagneticButton>
          </div>
        </div>
      </div>

      <div className="hero-fade absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/40">
        Scroll
      </div>
    </section>
  );
}