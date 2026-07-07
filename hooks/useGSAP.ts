import { useEffect, useRef, type DependencyList } from "react";
import { gsap } from "@/lib/gsap";

export function useGSAP(
callback: () => void | (() => void),
  deps: DependencyList = []
) {
  const scopeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
   const ctx = gsap.context(() => {
  callback();
}, scopeRef.current ?? undefined);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}