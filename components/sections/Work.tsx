"use client";

import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { PROJECTS } from "@/constants/content";
import { WORK_CATEGORIES, useWorkStore } from "@/store/WorkStore";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";

export function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { activeCategory, setActiveCategory } = useWorkStore();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const visibleProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  useGSAP(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    // .work-card animation is now handled by the Reveal wrapper
  }, [activeCategory]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="bg-[var(--bg-primary)] px-6 py-32"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/50">
              Selected work
            </p>
            <h2
              id="work-heading"
              className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            >
              Built to convert, not just impress.
            </h2>
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter work by category"
          >
            {WORK_CATEGORIES.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs uppercase tracking-wide transition-colors duration-300",
                  activeCategory === category
                    ? "border-white bg-white text-black"
                    : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <Reveal selector=".work-card" dependencies={[activeCategory]}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            {visibleProjects.map((project, i) => {
              // Create an asymmetrical layout pattern that repeats every 6 items
              const pattern = i % 6;
              let layoutClasses = "";
              
              switch (pattern) {
                case 0:
                  layoutClasses = "md:col-span-8 aspect-[16/9] md:aspect-auto md:h-[600px]";
                  break;
                case 1:
                  layoutClasses = "md:col-span-4 aspect-[4/5] md:aspect-auto md:h-[600px]";
                  break;
                case 2:
                  layoutClasses = "md:col-span-4 aspect-[4/5] md:aspect-auto md:h-[500px]";
                  break;
                case 3:
                  layoutClasses = "md:col-span-8 aspect-[16/9] md:aspect-auto md:h-[500px]";
                  break;
                case 4:
                  layoutClasses = "md:col-span-6 aspect-[4/5] md:aspect-auto md:h-[550px]";
                  break;
                case 5:
                  layoutClasses = "md:col-span-6 aspect-[4/5] md:aspect-auto md:h-[550px]";
                  break;
                default:
                  layoutClasses = "md:col-span-4 aspect-[4/5]";
              }

              return (
                <button
                  key={project.id}
                  className={cn(
                    "work-card group relative overflow-hidden rounded-2xl bg-[var(--bg-secondary)] text-left transition-all duration-500",
                    layoutClasses,
                    hoveredId && hoveredId !== project.id ? "scale-[0.98] opacity-40 blur-[2px] grayscale-[50%]" : "scale-100 opacity-100 blur-none grayscale-0"
                  )}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-label={`View project: ${project.title}`}
                >
                {/* Placeholder thumbnail - swap with next/image once real assets exist */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/40 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.thumbnail})`, backgroundSize: "cover" }}
                />

                {project.videoPreview && (
                  <video
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500",
                      hoveredId === project.id && "opacity-100"
                    )}
                    src={project.videoPreview}
                    muted
                    loop
                    playsInline
                    preload="none"
                    autoPlay={hoveredId === project.id}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start">
                  <p className="mb-1 text-xs uppercase tracking-widest text-white/50">
                    {project.category}
                  </p>
                  <h3 className="mb-3 text-lg font-medium text-white">
                    {project.title}
                  </h3>
                  
                  {project.metrics && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--highlight)]/20 bg-[var(--highlight)]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--highlight)] backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--highlight)]" aria-hidden="true" />
                      {project.metrics}
                    </div>
                  )}
                </div>
              </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}