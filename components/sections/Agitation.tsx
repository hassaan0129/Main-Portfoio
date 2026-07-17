"use client";

import { Reveal } from "@/components/animations/Reveal";

export function Agitation() {
  return (
    <section className="bg-[var(--bg-primary)] px-6 py-32 sm:py-48" aria-labelledby="agitation-heading">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal selector=".agitation-content">
          <p className="agitation-content mb-6 text-xs font-medium uppercase tracking-[0.35em] text-[var(--highlight)]">
            The Agency Capacity Problem
          </p>
          <h2
            id="agitation-heading"
            className="agitation-content mx-auto mb-8 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl"
          >
            Your creative queue should not slow down testing.
          </h2>
          <p className="agitation-content text-body mx-auto max-w-2xl text-lg sm:text-xl">
            Agencies need more ad variations, sharper hooks, and reliable editing capacity without adding full-time production overhead. AGENz supports your team with confidential creative production built around the brief, the offer, and the platform.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
