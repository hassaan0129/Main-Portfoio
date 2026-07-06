"use client";

import React from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function MagneticButton({
  children,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-transform duration-300",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}