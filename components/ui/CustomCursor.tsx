"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setIsTouch(false);

    if (prefersReducedMotion() || !cursorRef.current) return;

    // Use GSAP quickTo for high-performance mouse tracking
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power4.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power4.out" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Event delegation for hover states
    const handleHover = (e: MouseEvent, isHovering: boolean) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-hover");

      if (isInteractive) {
        gsap.to(cursorRef.current, {
          scale: isHovering ? 4 : 1,
          opacity: isHovering ? 1 : 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const onMouseOver = (e: MouseEvent) => handleHover(e, true);
    const onMouseOut = (e: MouseEvent) => handleHover(e, false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference will-change-transform"
      aria-hidden="true"
    />
  );
}
