"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  ...props
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLButtonElement>(0.35);

  return (
    <button
      ref={ref}
      className={cn(
        "relative rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ease-[var(--ease-premium)] hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(255,255,255,0.08)]",
        variant === "primary"
          ? "bg-white text-black hover:bg-[#e5e5e5]"
          : "border border-white/20 text-white hover:border-white/50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}