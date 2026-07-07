# 05. Architecture

## 1. Overview
The project is built on Next.js 14 (App Router) with React 19, Tailwind CSS v4, GSAP, and Zustand.

> **Director's Rationale:** We optimize for server-side delivery of the initial shell, with extremely targeted client-side hydration for animations. Performance is paramount.

## 2. Folder Structure
- `/app`: Routing, Server Components, Layouts, global CSS.
- `/components`:
  - `/animations`: High-level GSAP wrappers (`Reveal`, `Parallax`, `SplitText`). These must be used to keep logic DRY.
  - `/layout`: Structural globals (`Navbar`, `Footer`, `Loader`).
  - `/sections`: The macro building blocks of pages (`Hero`, `Work`, `About`).
  - `/ui`: Micro, reusable atomic elements (`MagneticButton`, `Container`, `Noise`).
  - `/canvas`: WebGL/Three.js elements (currently phased out/minimized in favor of CSS volumetric lighting).
- `/hooks`: Custom React hooks (`useGSAP`, `useLenis`, `useMagnetic`).
- `/lib`: Pure utility functions (`utils.ts` for Tailwind merge, `gsap.ts` for global registration).
- `/store`: Zustand global state slices.
- `/docs`: Permanent project brain.

## 3. How Everything Connects
1. **The Foundation:** `app/layout.tsx` wraps the application in the `SmoothScrollProvider` (Lenis) and injects the global `Navbar` and `Noise` overlay.
2. **The View:** `app/page.tsx` aggregates the `/sections` sequentially.
3. **The Data Flow:** Sections define their content and pass it down to `/ui` components.
4. **The Motion Layer:** Sections wrap their content in `/animations` components, or use the `hooks/useGSAP.ts` locally for highly specific timelines that cannot be abstracted.
5. **The State:** `store/WorkStore.ts` dictates active filters, allowing disconnected components (like a WebGL background and the Work grid) to react to the same category changes.

## 4. Animation Architecture
- All GSAP logic must live inside the custom `useGSAP` hook from `/hooks/useGSAP.ts` to ensure automatic context cleanup and prevent memory leaks.
- Global GSAP plugins (ScrollTrigger, SplitText) are registered exactly once in `lib/gsap.ts`.

## 5. WebGL & Three.js Policy
- **Deprecated:** Heavy `useFrame` raycasting particle systems.
- **Approved:** Minimalist, optimized shaders for ambient background effects, or entirely replaced by highly optimized CSS radial gradients to save bundle size and GPU cycles.
