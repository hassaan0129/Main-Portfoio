# 08. Project Roadmap

> **Director's Note:** Execution must be methodical. We do not jump to Polish before Architecture is solid.

---

## Phase 1: Architecture & Performance (The Foundation)
**Focus:** Eradicating bottlenecks and cleaning up the codebase.
1. **Task:** Remove WebGL ParticleField and replace with optimized CSS Volumetric Lighting component.
   - Priority: P0 | Effort: Medium | Impact: High (Performance + Aesthetic)
2. **Task:** Refactor `Work.tsx` to conditionally render or lazy-load `<video>` tags.
   - Priority: P0 | Effort: Low | Impact: High (Performance)
3. **Task:** Clean up duplicate `gsap.from` timelines in sections and utilize `/animations` wrappers.
   - Priority: P1 | Effort: Medium | Impact: Medium (Maintainability)

## Phase 2: Design & Typography (The Soul)
**Focus:** Shifting the visual identity to cinematic luxury.
1. **Task:** Implement DM Serif Display (or chosen Serif) in `layout.tsx` and configure Tailwind.
   - Priority: P0 | Effort: Low | Impact: Massive (Brand Identity)
2. **Task:** Redesign Hero Typography to utilize massive Serif scales and tight leading.
   - Priority: P0 | Effort: Medium | Impact: High
3. **Task:** Shatter the uniform grid in `Work.tsx` into an asymmetrical, masonry-style editorial layout.
   - Priority: P1 | Effort: High | Impact: High

## Phase 3: Motion & Choreography (The Flow)
**Focus:** Tuning the physics of the site.
1. **Task:** Audit and set global GSAP easing to `power4.out` across all files.
   - Priority: P1 | Effort: Low | Impact: High (Feel)
2. **Task:** Ensure Lenis scroll routing intercepts Navbar anchor clicks properly.
   - Priority: P1 | Effort: Low | Impact: Medium (UX)
3. **Task:** Ensure `prefers-reduced-motion` is globally respected and fallback animations work.
   - Priority: P1 | Effort: Low | Impact: High (Accessibility)

## Phase 4: Micro-interactions (The Magic)
**Focus:** The details that win awards.
1. **Task:** Build a reusable Glassmorphic Tooltip component for hover reveals in About/Services.
   - Priority: P2 | Effort: Medium | Impact: High
2. **Task:** Upgrade `CustomCursor.tsx` to use `mix-blend-difference` and morph over targets.
   - Priority: P2 | Effort: Medium | Impact: High
3. **Task:** Implement the "dim others" hover effect on Portfolio cards.
   - Priority: P2 | Effort: Low | Impact: Medium

## Phase 5: Polish & Deployment (The Premiere)
**Focus:** Final checks.
1. **Task:** Audit noise overlay for hardware acceleration (`translateZ(0)`).
2. **Task:** Check all WCAG contrast ratios against the new volumetric lighting.
3. **Task:** Cross-browser testing (Safari scroll behavior, mobile viewport heights).
