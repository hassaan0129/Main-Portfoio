"use client";

import { useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { PROJECTS } from "@/constants/content";
import { WORK_CATEGORIES, useWorkStore } from "@/store/WorkStore";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";

export function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { activeCategory, setActiveCategory } = useWorkStore();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

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
              Selected agency production work.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/50">
              Selected work produced during previous agency experience. Brand names and campaign details are withheld for confidentiality.
            </p>
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
                <div
                  key={project.id}
                  onClick={() => {
                    if (playingId !== project.id) setPlayingId(project.id);
                  }}
                  className={cn(
                    "work-card group relative overflow-hidden rounded-2xl bg-[var(--bg-secondary)] text-left transition-all duration-500 cursor-pointer",
                    layoutClasses,
                    hoveredId && hoveredId !== project.id ? "scale-[0.98] opacity-40 blur-[2px] grayscale-[50%]" : "scale-100 opacity-100 blur-none grayscale-0"
                  )}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play video: ${project.title}`}
                >
                  {playingId === project.id ? (
                    <div className="absolute inset-0 bg-black">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&controls=1&rel=0&playsinline=1`}
                        title={project.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <>
                      {/* YouTube Thumbnail with fallback */}
                      <div
                        className="absolute inset-0 bg-[var(--bg-primary)] transition-transform duration-700 group-hover:scale-105"
                        style={{ 
                          backgroundImage: `url(https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg), url(https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg)`, 
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                      {/* Fake play icon overlay on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 ml-1 text-white">
                            <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"/>
                          </svg>
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start pointer-events-none">
                        <p className="mb-1 text-xs uppercase tracking-widest text-white/50">
                          {project.format} / {project.industry}
                        </p>
                        <h3 className="mb-3 text-lg font-medium text-white">
                          {project.title}
                        </h3>

                        <div className="grid gap-1 text-xs leading-relaxed text-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <p>
                            <span className="text-white/85">Work:</span> {project.workCompleted}
                          </p>
                          <p>
                            <span className="text-white/85">Approach:</span> {project.approach}
                          </p>
                          <p>
                            <span className="text-white/85">Deliverables:</span> {project.deliverables}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
