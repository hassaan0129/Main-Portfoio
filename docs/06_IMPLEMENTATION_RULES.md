# 06. Implementation Rules

## 1. Coding Standards
> **Director's Rationale:** A messy codebase produces a messy user experience. Precision in code reflects precision in design.

- **Strict Typing:** TypeScript is non-negotiable. Every prop, state, and return type must be explicitly defined. No `any`.
- **Component Modularity:** A file should not exceed 150 lines. If it does, break it down into smaller sub-components.

## 2. The Golden Rules
1. **Never Duplicate Components:** If a button exists, import it. Do not rebuild it inline.
2. **Always Reuse Utilities:** All conditional classes must use the `cn()` utility (`clsx` + `tailwind-merge`). Never concatenate strings manually.
3. **Keep Animations Modular:** Do not write `gsap.from()` in 10 different files. Use the `<Reveal>` wrapper. If a section requires a bespoke timeline, isolate it inside a dedicated `useEffect` using the `useGSAP` context.
4. **Performance Above Visual Gimmicks:** If an effect drops the framerate below 60fps on a standard device, we kill the effect or rewrite it. No exceptions.
5. **Never Create Inconsistent Spacing:** Only use Tailwind's spacing scale. Do not introduce random pixel values (e.g., `h-[42px]`).
6. **Never Introduce Random Styles:** All colors must pull from CSS variables in `globals.css` or Tailwind config. No hex codes directly in the markup.

## 3. Accessibility (a11y) Checkpoints
- `prefers-reduced-motion` must be implemented globally. If true, all GSAP timelines bypass the animation and set elements to their final state instantly.
- All interactive elements must have `aria-labels` if they lack text content.
- `role="tablist"` and `role="tab"` must support keyboard navigation or be downgraded to semantically appropriate elements.

## 4. File Modification Protocol
- Search the workspace before editing. Ensure a component doesn't already exist.
- Modify only the files that require changes. Do not reformat unrelated files.
- Preserve the existing architecture unless explicitly overriding it in a designated phase.
