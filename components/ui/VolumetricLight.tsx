import { cn } from "@/lib/utils";

interface VolumetricLightProps {
  className?: string;
}

export function VolumetricLight({ className }: VolumetricLightProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Primary white ambient glow */}
      <div className="ambient-light absolute -left-[10%] -top-[10%] h-[60vw] w-[60vw] max-h-[1000px] max-w-[1000px] rounded-full bg-white/[0.03] blur-[120px]" />
      
      {/* Secondary highlight glow */}
      <div className="ambient-light absolute -bottom-[10%] -right-[10%] h-[50vw] w-[50vw] max-h-[800px] max-w-[800px] rounded-full bg-[var(--highlight)]/[0.04] blur-[150px]" />
      
      {/* Subtle center-fill glow */}
      <div className="ambient-light absolute left-[20%] top-[40%] h-[40vw] w-[40vw] max-h-[600px] max-w-[600px] rounded-full bg-white/[0.02] blur-[100px]" />
    </div>
  );
}
