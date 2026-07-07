"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { Reveal } from "@/components/animations/Reveal";
import { Tooltip } from "@/components/ui/Tooltip";

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    // .about-line animation is now handled by the Reveal wrapper

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--bg-secondary)] px-6 py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <Reveal selector=".about-line">
          <p className="about-line mb-4 text-xs uppercase tracking-[0.35em] text-white/50">
            The agency
          </p>
          <h2
            id="about-heading"
            className="about-line mb-8 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl"
          >
            We treat every edit as a <Tooltip content="Optimized for ROI">growth lever</Tooltip>, not a deliverable.
          </h2>
          <p className="about-line text-body max-w-md">
            AGENZ PRODUCTION is built for brands that measure creative by CPA, not
            compliments. Every cut, caption, and pattern-interrupt is chosen
            because it moves a number — hook rate, hold rate, conversion —
            not because it looks good in a reel.
          </p>
          <p className="about-line text-body mt-4 max-w-md">
            No junior editors, no generic templates. Just a small team that
            treats your ad account like it's their own.
          </p>
        </Reveal>

        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-black/40">
          <div
            ref={imageRef}
            className="absolute inset-0 -top-10 bg-gradient-to-br from-white/10 via-transparent to-[var(--highlight)]/10"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}