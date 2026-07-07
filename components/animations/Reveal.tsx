"use client";

import { useRef, ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  selector?: string; // If provided, animate children matching this selector. Otherwise animate the wrapper.
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: number;
  dependencies?: any[];
}

export function Reveal({
  children,
  className,
  selector,
  delay = 0,
  y = 40,
  duration = 1.4,
  stagger = 0.08,
  dependencies = [],
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const target = selector 
      ? gsap.utils.toArray(selector, containerRef.current) 
      : containerRef.current;

    gsap.from(target, {
      opacity: 0,
      y: y,
      duration: duration,
      ease: "power4.out",
      delay: delay,
      stagger: selector ? stagger : 0,
      clearProps: "all",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
    });
  }, [selector, delay, y, duration, stagger, ...dependencies]);

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}
