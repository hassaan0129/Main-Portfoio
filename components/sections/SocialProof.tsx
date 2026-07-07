"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { TESTIMONIALS } from "@/constants/content";
import { Reveal } from "@/components/animations/Reveal";

const STATS = [
  { value: 150, suffix: "+", label: "Videos delivered" },
  { value: 12, suffix: "M+", label: "Ad spend managed" },
  { value: 2.8, suffix: "x", label: "Average ROAS" },
];

export function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    if (prefersReducedMotion()) {
      gsap.set(".stat-value", { innerText: (i: number, el: HTMLElement) => el.dataset.value });
      return;
    }

    document.querySelectorAll<HTMLElement>(".stat-value").forEach((el) => {
      const target = Number(el.dataset.value);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.6,
        ease: "power4.out",
        // Format to 1 decimal place if it's a float, otherwise integer
        onUpdate: () => (el.textContent = target % 1 !== 0 ? obj.val.toFixed(1) : Math.round(obj.val).toString()),
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    // .testimonial-card animation is now handled by the Reveal wrapper
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--bg-primary)] py-32"
      aria-labelledby="proof-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="proof-heading" className="sr-only">
          Results and client feedback
        </h2>

        <div className="mb-24 grid grid-cols-1 gap-12 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-5xl font-semibold tracking-tight text-white sm:text-6xl flex items-center justify-center">
                <span className="stat-value" data-value={stat.value}>
                  0
                </span>
                {stat.suffix}
              </div>
              <p className="mt-2 text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Centered testimonial track */}
      <Reveal selector=".testimonial-card">
        <div className="testimonial-track w-full overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto flex w-max gap-6">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.name}
                className="testimonial-card w-[320px] flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:w-[380px] text-left"
              >
                <p className="text-body mb-6">&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}