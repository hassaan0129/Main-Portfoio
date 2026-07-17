"use client";

import { useRef } from "react";
import { CAPABILITIES, EXPERIENCE_POINTS } from "@/constants/content";
import { Reveal } from "@/components/animations/Reveal";

export function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--bg-primary)] py-32"
      aria-labelledby="proof-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal selector=".experience-card">
          <div className="experience-card mb-24 grid grid-cols-1 gap-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[var(--highlight)]">
                Production Experience
              </p>
              <h2
                id="proof-heading"
                className="mb-6 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl"
              >
                Built Through Real Agency Production Experience
              </h2>
              <p className="text-body max-w-2xl">
                Our portfolio includes AI UGC ads, VSLs, motion graphics, and performance creatives produced during previous agency work. Brand identities and campaign details are kept confidential.
              </p>
            </div>

            <div className="grid content-center gap-3">
              {EXPERIENCE_POINTS.map((point) => (
                <div
                  key={point}
                  className="rounded-xl border border-white/10 bg-black/20 px-5 py-4 text-sm font-medium text-white"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal selector=".capability-card">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((capability) => (
              <div
                key={capability.title}
                className="capability-card bg-[var(--bg-secondary)] p-7"
              >
                <h3 className="mb-3 text-lg font-medium text-white">
                  {capability.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
