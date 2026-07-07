"use client";

import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { PROJECTS } from "@/constants/content";
import { WORK_CATEGORIES, useWorkStore } from "@/store/WorkStore";
import { cn } from "@/lib/utils";

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
    gsap.from(".work-card", {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });
  }, [activeCategory]);

  return (
    <section
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <button
              key={project.id}
              className="work-card group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--bg-secondary)] text-left"
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
                  autoPlay={hoveredId === project.id}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="mb-1 text-xs uppercase tracking-widest text-white/50">
                  {project.category}
                </p>
                <h3 className="text-lg font-medium text-white">
                  {project.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}