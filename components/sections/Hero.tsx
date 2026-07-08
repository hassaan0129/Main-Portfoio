"use client";

import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FloatingTestimonials } from "@/components/sections/FloatingTestimonials";
import { VolumetricLight } from "@/components/ui/VolumetricLight";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const kineticTextRef = useRef<HTMLSpanElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
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
      ease: "power4.inOut",
      onUpdate: () => setLoaderPct(Math.round(obj.pct)),
      onComplete: () => setLoaded(true),
    });
  }, []);

  useEffect(() => {
    if (!loaded || !headlineRef.current || !sectionRef.current || !kineticTextRef.current) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([
          headlineRef.current, 
          ".hero-badge", 
          ".hero-subtext", 
          ".hero-buttons",
          ".floating-card",
          ".hero-shape",
          scrollIndicatorRef.current
        ], { opacity: 1, y: 0, scale: 1, clearProps: "transform" });
        return;
      }

      // Initialize SplitType
      const split = new SplitType(headlineRef.current!, { types: "lines,words,chars" });
      const kineticSplit = new SplitType(kineticTextRef.current!, { types: "chars" });
      
      // Wrap lines for masked slide-up reveal
      if (split.lines) {
        split.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.style.overflow = "hidden";
          wrapper.style.display = "block";
          wrapper.style.paddingTop = "10px"; // prevent clipping top of tall ascenders
          wrapper.style.marginTop = "-10px";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Badge fades in and slides down slightly
      tl.to(".hero-badge", { opacity: 1, y: 0, duration: 1.2 })
        // 2. Headline lines reveal with a masked slide-up
        .fromTo(
          split.lines,
          { yPercent: 100 },
          { yPercent: 0, duration: 1.2, stagger: 0.15 },
          "-=0.8"
        )
        // 3. Subtext fades in
        .to(".hero-subtext", { opacity: 1, duration: 1 }, "-=0.6")
        // 4. Buttons scale in with a subtle bounce
        .to(".hero-buttons", { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" }, "-=0.6")
        // 5. Floating testimonial cards slide in from the right edge with rotational settle
        .to(".floating-card", { opacity: 1, x: 0, rotate: (i, el) => el.dataset.rotation || 0, duration: 1.4, ease: "power3.out", stagger: 0.15 }, "-=0.8")
        // Light shape fades in
        .to(".hero-shape", { opacity: 1, duration: 1.5 }, "-=1")
        // Scroll indicator fades in
        .to(scrollIndicatorRef.current, { opacity: 0.4, duration: 1 }, "-=0.5");

      // Continuous Scroll Indicator Animation
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2 // Wait for intro to finish
      });

      // Kinetic Hover Effect on "We convert."
      const handleKineticHover = () => {
        gsap.to(kineticSplit.chars, {
          color: "#ffffff",
          duration: 0.3,
          stagger: 0.03,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          repeatDelay: 0.1
        });
      };

      kineticTextRef.current?.addEventListener("mouseenter", handleKineticHover);

      return () => {
        kineticTextRef.current?.removeEventListener("mouseenter", handleKineticHover);
        split.revert();
        kineticSplit.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <section ref={sectionRef} className="relative flex flex-col justify-center min-h-[100dvh] overflow-hidden bg-[var(--bg-primary)] pt-32 pb-24 lg:pt-0 lg:pb-0">
      {!loaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--bg-primary)]">
          <span className="font-mono text-sm tracking-[0.3em] text-white/70">
            {String(loaderPct).padStart(3, "0")}%
          </span>
        </div>
      )}

      <div className="noise-overlay" aria-hidden="true" />
      <VolumetricLight className="hero-shape opacity-0" />

      {/* Hero Content Column */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 sm:px-10 lg:flex-row lg:justify-between lg:items-center"
        style={{ visibility: loaded ? "visible" : "hidden" }}
      >
        <div className="flex max-w-3xl flex-col items-center text-center lg:w-3/5 xl:w-2/3 lg:items-start lg:text-left">
          <span className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--highlight)]/30 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[var(--highlight)] opacity-0 will-change-transform">
            <span aria-hidden="true">✦</span>
            AGENz Production — Performance Creative Agency
          </span>

          <h1 ref={headlineRef} className="text-hero font-serif text-white pb-4">
            We don&apos;t edit.
            <br />
            <span ref={kineticTextRef} className="cursor-default text-[var(--highlight)] italic transition-colors">We convert.</span>
          </h1>

          <p className="hero-subtext text-body mt-5 max-w-lg opacity-0 will-change-[opacity]">
            Performance creatives engineered to help DTC brands scale
            through AI UGC ads, VSL editing, and motion graphics.
          </p>

          <div className="hero-buttons mt-8 flex w-full flex-col items-center justify-center gap-4 opacity-0 scale-95 will-change-transform sm:w-auto sm:flex-row lg:justify-start">
            <MagneticButton 
              className="w-full sm:w-auto" 
              href="#contact"
            >
              Get a Free Creative Audit
            </MagneticButton>
            <MagneticButton 
              variant="ghost" 
              className="w-full sm:w-auto" 
              href="#work"
            >
              See Our Results
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Floating cards absolutely positioned on desktop, hidden on mobile for clean UI */}
      {/* Moved outside the relative inner wrapper so top percentages resolve against full viewport height */}
      <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none" style={{ visibility: loaded ? "visible" : "hidden" }}>
        <div className="mx-auto relative w-full max-w-7xl h-full">
          <FloatingTestimonials />
        </div>
      </div>

      {/* Client Logo Banner */}
      <div className="hero-subtext relative mt-16 w-full px-6 opacity-0 will-change-[opacity] sm:px-10 lg:absolute lg:bottom-12 lg:left-0 lg:mt-0 lg:pb-0">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 sm:gap-16 opacity-50 grayscale">
          <span className="text-sm font-semibold tracking-widest text-white/80">RIDGE</span>
          <span className="text-sm font-serif italic tracking-wider text-white/80">Glow Skincare</span>
          <span className="text-sm font-bold tracking-[0.2em] text-white/80">NECTAR</span>
          <span className="text-sm font-medium tracking-wide text-white/80 sm:block">FLOWSTATE</span>
          <span className="hidden text-sm font-light tracking-[0.3em] text-white/80 sm:block">NOVA AUDIO</span>
        </div>
      </div>

      <div 
        ref={scrollIndicatorRef}
        className="hidden lg:block absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40 opacity-0 will-change-transform"
      >
        Scroll
      </div>
    </section>
  );
}