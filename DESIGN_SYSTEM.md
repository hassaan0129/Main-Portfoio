# Axiom Edits: Premium Design System

> [!NOTE]  
> This living document defines the core aesthetic, interactive, and technical rules for the cinematic upgrade of the portfolio. It serves as the absolute source of truth for the brand's visual identity.

---

## 1. Foundation

### Typography
The brand speaks in a duet: a loud, elegant serif and a quiet, sterile sans-serif.

*   **Primary (Headlines):** **DM Serif Display** (or equivalent high-contrast serif).
    *   **Usage:** Hero headlines, large section titles, massive numbers.
    *   **Styling:** Extreme scales (e.g., `clamp(3rem, 8vw, 8rem)`), tight leading (`line-height: 0.95`), slight negative tracking (`letter-spacing: -0.02em`).
*   **Secondary (Labels/Eyebrows):** **Geist Sans**
    *   **Usage:** Subtitles, category tags, navigation links, small UI elements.
    *   **Styling:** Tiny size (`text-[10px]` to `text-xs`), uppercase (`uppercase`), massive tracking (`tracking-[0.3em]`), muted opacity (`text-white/40`).
*   **Body (Paragraphs):** **Geist Sans**
    *   **Usage:** Long-form text in About or Case Studies.
    *   **Styling:** Highly legible, relaxed line height (`leading-relaxed`), muted color (`text-white/70`).

### Color Psychology & Lighting
We are abandoning flat dark mode for **cinematic volumetric lighting**.

*   **Base (The Void):** `#050505` to `#0a0a0a`. Deep, abyss-like black. Never pure `#000000` to avoid OLED smearing, but dark enough to feel infinite.
*   **Typography:** `#ffffff` for primary focus, scaling down to `#ffffff` at `10%`, `20%`, and `40%` opacity for structural elements.
*   **Lighting (Ambient Glows):** Instead of distinct colors, we use massive, heavily blurred (`blur-[150px]`) radial gradients in the background to simulate film set lighting. These glows are extremely subtle (e.g., `opacity: 0.05` to `0.15`).

### Grid & Spacing
> [!WARNING]  
> Do not use a standard 12-column uniform grid. Uniformity is the enemy of luxury.

*   **Grid:** Asymmetrical and masonry-inspired. Elements should overlap slightly or sit at contrasting widths (e.g., a 60% width image next to a 30% width text block with 10% empty space).
*   **Spacing:** Fluid and vast. Use `clamp()` for vertical padding between sections (e.g., `py-[clamp(6rem,10vw,12rem)]`). Negative space is a design element, not an absence of content.

---

## 2. Textures & Materials

### Glassmorphism (Glass)
Used sparingly for overlays, tooltips, and floating navigation.
*   **Styling:** Deep blur (`backdrop-blur-xl` or `blur(20px)`), ultra-thin border (`border border-white/5`), and a barely-there fill (`bg-white/[0.02]`).

### Noise & Grain
Adds analog warmth to the digital environment.
*   **Usage:** Applied globally via a fixed, pointer-events-none overlay.
*   **Optimization:** Must use `transform: translateZ(0)` to hardware-accelerate. Blend mode `overlay` or `soft-light` at `3%` to `5%` opacity.

### Gradients & Shadows
*   **Shadows:** Soft, deep, and large. Avoid harsh drop shadows. Use `shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]`.
*   **Gradients:** Subtle gradient masks (`mask-image`) to fade out the edges of lists, text blocks, or image containers so they disappear smoothly into the void.

---

## 3. Motion & Interaction

### Animation Timing
> [!IMPORTANT]  
> Nothing snaps. Everything breathes.

*   **Ease:** `power4.out` or a custom cubic-bezier (e.g., `cubic-bezier(0.16, 1, 0.3, 1)`).
*   **Duration:** Extremely slow. Standard reveals should take `1.2s` to `1.8s`.
*   **Stagger:** `0.05s` to `0.1s` between items to create a liquid flow.

### Scroll Rhythm
*   Powered by **Lenis**. Scroll should feel weighty but responsive.
*   Heavy use of parallax (elements moving at slightly different speeds on the Y-axis) to create depth.

### Section Transitions
Sections do not have hard borders. They bleed into one another. As the user scrolls, the next section's content slowly translates up (`y: 40` to `y: 0`) and fades in (`opacity: 0` to `opacity: 1`), staggered by element type (Eyebrow -> Headline -> Paragraph -> Image).

### Interaction Rules & Buttons
*   **Hover States:** Never just change color. Hovering should trigger a micro-interaction: a slight scale (`scale-[1.02]`), a magnetic pull, or a glassmorphic reveal.
*   **Buttons:** Magnetic behavior. When the cursor approaches, the button pulls toward it. The text inside the button should also have a slight magnetic offset relative to the button wrapper.

### The Cursor
*   A custom liquid dot (`w-2 h-2`).
*   **Styling:** `bg-white`, `mix-blend-difference`.
*   **Interaction:** When hovering over clickable elements (links, buttons, video cards), the cursor expands (`w-12 h-12` or larger), optionally revealing text inside it (e.g., "PLAY", "VIEW").

---

## 4. Content Presentation

### Video Presentation
*   Videos are the core product. They must be treated like fine art.
*   **Behavior:** Videos in grids should be `preload="none"` and display a high-quality poster image. Auto-play (`muted`, `loop`) is triggered only on hover or when intersecting the center of the viewport.
*   **Styling:** Borderless. Housed in containers with hidden overflow and a very subtle inner shadow or 1px border (`border-white/10`).

### Portfolio Cards & Case Studies
*   **Cards:** No generic grids. Use varied aspect ratios (e.g., 4:5 for vertical, 16:9 for cinematic cuts). Hovering a card dims all other cards (`opacity: 0.3`) and scales the hovered video slightly (`scale: 1.05`), playing the video seamlessly.
*   **Case Studies:** If opened, they should feel like immersive editorial articles. Massive typography, full-bleed videos, and deep dives into the strategy (the "Why") behind the edits.

### Loading Experience
*   A mandatory, unskippable (but fast: ~1.5s - 2s) loader.
*   **Sequence:** Pitch black screen -> A tiny, monospace percentage counter (`000%` to `100%`) -> The counter fades -> The Hero typography is revealed via `SplitText` while the ambient background lighting slowly fades up.

---

## 5. Technical Requirements

### Accessibility (a11y)
> [!CAUTION]  
> High-end does not mean unusable. 

*   **Reduced Motion:** If `prefers-reduced-motion` is true, **do not break the site**. Convert all complex `y` translations and parallax into simple `opacity` fades over `0.3s`.
*   **Contrast:** Ensure primary text passes WCAG AA. Secondary aesthetic text (`white/20`) must be supplementary, not critical for navigation.
*   **Focus:** Maintain visible focus states for keyboard users (can be styled elegantly, e.g., a white outline with `offset-4`).

### Performance Budget
*   **Max Initial Load:** `< 1MB` (excluding deferred videos).
*   **WebGL Strategy:** Avoid heavy `useFrame` raycasting. If WebGL is used for ambient light, use optimized shaders, not individual particle calculations. Alternatively, replace WebGL entirely with CSS radial-gradients and SVG filters for a massive performance gain.
*   **Video Delivery:** Serve heavily compressed `.mp4` or `.webm` files for previews (aim for `< 2MB` per preview video). Use next-gen image formats for posters.
