"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { PROCESS_STEPS } from "@/constants/content";
import { Reveal } from "@/components/animations/Reveal";

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );
    }
    // .process-step animation is now handled by the Reveal wrapper
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="bg-[var(--bg-secondary)] px-6 py-32"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/50 text-center">
          How it works
        </p>
        <h2
          id="process-heading"
          className="mb-20 text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl"
        >
          Three steps to scale.
        </h2>

        <div className="relative pt-12">
          {/* Horizontal Line (Desktop) */}
          <div className="hidden lg:block absolute left-0 top-3 w-full h-px bg-white/10" aria-hidden="true" />
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-0 top-3 h-px bg-[var(--highlight)] origin-left"
            aria-hidden="true"
          />

          <Reveal selector=".process-step">
            <ol className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
              {PROCESS_STEPS.map((step, i) => (
                <li key={step.label} className="process-step relative text-center lg:text-left">
                  {/* Vertical line for mobile fallback */}
                  <div className="absolute left-1/2 -top-12 h-12 w-px bg-white/10 lg:hidden" aria-hidden="true" />
                  
                  <span
                    className="mx-auto lg:mx-0 mb-6 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--highlight)]/30 bg-[var(--highlight)]/10 text-[10px] text-[var(--highlight)]"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <h3 className="mb-3 text-xl font-medium text-white">
                    {step.label}
                  </h3>
                  <p className="text-body mx-auto max-w-sm lg:mx-0 lg:max-w-none">{step.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}