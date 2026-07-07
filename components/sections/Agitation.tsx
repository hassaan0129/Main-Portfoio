"use client";

import { Reveal } from "@/components/animations/Reveal";

export function Agitation() {
  return (
    <section className="bg-[var(--bg-primary)] px-6 py-32 sm:py-48" aria-labelledby="agitation-heading">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal selector=".agitation-content">
          <p className="agitation-content mb-6 text-xs font-medium uppercase tracking-[0.35em] text-[var(--highlight)]">
            The Industry Problem
          </p>
          <h2
            id="agitation-heading"
            className="agitation-content mx-auto mb-8 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl"
          >
            Stop paying for pretty videos that don&apos;t convert.
          </h2>
          <p className="agitation-content text-body mx-auto max-w-2xl text-lg sm:text-xl">
            You don&apos;t need another "aesthetic" edit. You need a performance asset. 
            Every day you run creatives with a 15% hook rate, you are actively burning ad spend. 
            We engineer creatives specifically to stop thumbs, retain attention, and drastically drop your CPA.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
