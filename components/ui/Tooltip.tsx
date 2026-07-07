"use client";

import { useRef, useState, ReactNode, useEffect } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: ReactNode;
  content: string;
  className?: string;
}

export function Tooltip({ children, content, className }: TooltipProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !tooltipRef.current) return;
    
    // Initial hidden state
    gsap.set(tooltipRef.current, { autoAlpha: 0, scale: 0.8, yPercent: 10 });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion() || !tooltipRef.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the center of the text span
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height;

    gsap.to(tooltipRef.current, {
      x,
      y,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (prefersReducedMotion() || !tooltipRef.current) {
      if (tooltipRef.current) gsap.set(tooltipRef.current, { autoAlpha: 1 });
      return;
    }
    
    gsap.to(tooltipRef.current, { 
      autoAlpha: 1, 
      scale: 1, 
      yPercent: 0,
      duration: 0.3, 
      ease: "back.out(1.5)" 
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (prefersReducedMotion() || !tooltipRef.current) {
      if (tooltipRef.current) gsap.set(tooltipRef.current, { autoAlpha: 0 });
      return;
    }

    gsap.to(tooltipRef.current, { 
      autoAlpha: 0, 
      scale: 0.8, 
      yPercent: 10,
      duration: 0.2, 
      ease: "power2.in" 
    });
  };

  return (
    <span
      ref={containerRef}
      className={cn("relative inline-block cursor-pointer font-serif italic text-[var(--highlight)]", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        ref={tooltipRef}
        className="pointer-events-none absolute left-1/2 top-0 z-50 flex -translate-x-1/2 -translate-y-full items-center justify-center whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-sans not-italic font-medium text-white shadow-xl backdrop-blur-md"
        aria-hidden={!isHovered}
        role="tooltip"
      >
        {content}
      </div>
    </span>
  );
}
