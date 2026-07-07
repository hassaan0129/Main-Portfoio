# 03. Design System: The Canvas

## 1. Typography (The Duet)
The typographic system relies on extreme contrast between heritage elegance and sterile technology.

*   **Primary (The Art): DM Serif Display** 
    *   **Usage:** Only for H1s, macro-statements, and huge numerals.
    *   **Styling:** Immense scale (`clamp(4rem, 10vw, 10rem)`), crushed leading (`line-height: 0.9`), slight negative tracking (`-0.03em`). It must feel heavy and physical.
*   **Secondary (The Science): Geist Sans**
    *   **Usage:** Eyebrows, navigation, metadata, UI controls.
    *   **Styling:** Microscopic (`text-[10px]`), aggressively uppercase, massive tracking (`tracking-[0.4em]`). It looks like blueprint data.
*   **Body (The Signal): Geist Sans**
    *   **Usage:** Paragraphs.
    *   **Styling:** Muted (`text-white/60`), legible (`text-base`), relaxed line height (`1.7`).

## 2. Color Space & Lighting
We reject flat colors. Everything is light and shadow.

*   **The Void:** `#030303`. Pure, absolute darkness. 
*   **The Signal:** `#FFFFFF` (100% for primary reads, 60% for body, 20% for structural lines).
*   **Volumetric Glow:** A desaturated, ghostly platinum (`#EAEAEA` with a hint of warm gold). 
    *   **Application:** Rendered *only* as absolute-positioned radial gradients with `blur-[150px]` and `opacity-10`. It acts as an ambient environmental light, never a distinct object.

## 3. Grid Dynamics (The Anti-Template)
> **Director's Note:** Symmetry implies mass production. Asymmetry implies curation.

*   **Breaking the 12-Column:** We will use CSS Grid, but elements will intentionally span odd columns (e.g., spanning 7 columns on the left, leaving 5 empty).
*   **The Masonry Portfolio:** Portfolio pieces cannot be uniform squares. They are a curated mix of cinematic (16:9) and vertical (4:5) formats overlapping in a staggered vertical rhythm.

## 4. Textures & Materials
*   **Film Grain:** A mandatory overlay. `mix-blend-overlay`, 4% opacity, hardware-accelerated (`translateZ(0)`). It ensures the black background has physical depth.
*   **Hyper-Glass:** Used exclusively for the Navbar and floating tooltips. 
    *   *Recipe:* `backdrop-blur-2xl`, `bg-[#ffffff]/[0.01]`, `border border-white/[0.04]`, `shadow-[0_4px_30px_rgba(0,0,0,0.5)]`.

## 5. UI Primitives
*   **Buttons:** We do not use filled colored rectangles. Buttons are either hyper-glass pills or borderless text elements that rely entirely on magnetic hover physics and a tiny glowing dot (`w-1.5 h-1.5 bg-white rounded-full`) as an indicator.
*   **Cards:** No visible borders. No background colors. A card is defined entirely by the image/video within it and the typography floating around it.
*   **Lines:** Hairlines only. `border-white/10`. Used to divide space surgically, not to box content in.
