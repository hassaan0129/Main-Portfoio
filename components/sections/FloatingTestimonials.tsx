"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";

const CARDS = [
  {
    id: "sarah",
    quote: "AGENz creatives doubled our hook rate in the first batch — pure performance craft.",
    name: "Sarah Chen",
    role: "Growth Lead, Glow Skincare",
    position: "lg:absolute lg:right-[4%] lg:top-[12%] lg:rotate-[4deg]",
    delay: 0,
    duration: 3.8,
  },
  {
    id: "marcus",
    quote: "The way they fold AI tools into a real editing workflow feels seamless and deliberate.",
    name: "Marcus Webb",
    role: "Founder, Ridge Apparel",
    position: "lg:absolute lg:right-[6%] lg:top-[58%] lg:-rotate-[3deg]",
    delay: -1.5,
    duration: 4.2,
  },
];

export function FloatingTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    // We apply distinct continuous animations to each card so they don't move in sync
    const cards = gsap.utils.toArray<HTMLElement>(".floating-card");
    
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: "+=16",
        duration: CARDS[i].duration,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: CARDS[i].delay,
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none relative flex flex-col gap-6 lg:static lg:block lg:inset-0"
      aria-hidden="true"
    >
      {CARDS.map((card) => (
        <blockquote
          key={card.id}
          data-rotation={card.position.includes("-rotate") ? -3 : 4} // Data attr for initial entrance rotation in Hero
          className={`floating-card w-full sm:w-80 lg:w-72 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md opacity-0 will-change-transform ${card.position}`}
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