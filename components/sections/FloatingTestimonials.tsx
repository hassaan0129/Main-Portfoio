"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";

const CARDS = [
  {
    quote: "Hamza's edits doubled our hook rate in the first batch — pure performance craft.",
    name: "Sarah Chen",
    role: "Growth Lead, Glow Skincare",
    position: "right-[6%] top-[16%] rotate-[4deg]",
    delay: 0,
  },
  {
    quote: "The way they fold AI tools into a real editing workflow feels seamless and deliberate.",
    name: "Marcus Webb",
    role: "Founder, Ridge Apparel",
    position: "right-[10%] top-[52%] -rotate-[3deg]",
    delay: 0.6,
  },
];

export function FloatingTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    gsap.to(".floating-card", {
      y: "+=14",
      duration: 3.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.4, from: "start" },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 hidden lg:block"
      aria-hidden="true"
    >
      {CARDS.map((card) => (
        <blockquote
          key={card.name}
          className={`floating-card absolute w-72 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md ${card.position}`}
        >
          <p className="mb-4 text-sm italic leading-relaxed text-white/70">
            &ldquo;{card.quote}&rdquo;
          </p>
          <footer>
            <p className="text-sm font-medium text-white">{card.name}</p>
            <p className="text-xs text-white/40">{card.role}</p>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}