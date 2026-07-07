"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { SERVICES } from "@/constants/content";
import { Reveal } from "@/components/animations/Reveal";

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    // Removed local gsap.from in favor of Reveal wrapper
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-[var(--bg-primary)] px-6 py-32"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[var(--highlight)]">
          Core Offerings
        </p>
        <h2
          id="services-heading"
          className="mb-16 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl"
        >
          Specialized in performance creative.
        </h2>

        <Reveal selector=".service-card">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="service-card group relative bg-[var(--bg-secondary)] p-8 transition-colors duration-500 hover:bg-[#161616]"
              >
                <h3 className="mb-3 text-xl font-medium text-white transition-transform duration-500 group-hover:-translate-y-1">
                  {service.title}
                </h3>
                <p className="max-h-0 overflow-hidden text-sm leading-relaxed text-white/50 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                  {service.description}
                </p>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-[var(--highlight)] transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}