"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  href?: string;
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  href,
  ...props
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLElement>(0.35);

  const baseClasses = cn(
    "relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ease-[var(--ease-premium)] hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(255,255,255,0.08)]",
    variant === "primary"
      ? "bg-white text-black hover:bg-[#e5e5e5]"
      : "border border-white/20 text-white hover:border-white/50",
    className
  );

  if (href) {
    return (
      <Link 
        href={href} 
        ref={ref as React.Ref<HTMLAnchorElement>} 
        className={baseClasses}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={baseClasses}
      {...props}
    >
      {children}
    </button>
  );
}