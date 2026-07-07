# 04. Motion System: The Physics

## 1. The Core Philosophy of Mass
> **Director's Note:** Digital elements usually feel weightless. Our elements must feel like they weigh a thousand pounds. They require massive energy to start moving, and they take a long time to coast to a halt.

## 2. The Absolute Curve
We strictly forbid `ease-in-out` or linear animations. All major transitions must use the "Expo Out" or custom cubic bezier to simulate heavy inertia.
*   **The Curve:** `cubic-bezier(0.19, 1, 0.22, 1)` (GSAP equivalent: `expo.out`).
*   **The Duration:** Base duration is `1.4s`. Micro-interactions are `0.6s`. Nothing happens instantly.

## 3. The Scroll Choreography
*   **Lenis:** Smoothness cranked to `1.2`. The scroll feels thick, almost like dragging through water.
*   **Reveal Protocol:** Elements do not "fade up" from 20 pixels. They translate from `y: 100` with `opacity: 0`. As they enter the viewport, the `expo.out` easing makes them snap quickly into the lower third of the screen, then imperceptibly crawl to their final resting `y: 0` position.
*   **Staggering:** When a section reveals, text lines stagger at `0.08s`. It looks like poetry writing itself.

## 4. The Interaction Timeline (Hover)
Hovering is not a state change; it is an event sequence.
*   **T=0.0s:** User hovers over a portfolio card.
*   **T=0.1s:** The custom cursor expands (`duration: 0.4s, expo.out`), shifting to `mix-blend-difference` to reveal a hidden "PLAY" label.
*   **T=0.2s:** All *other* cards in the gallery dim to `opacity: 0.2` (`duration: 0.8s`).
*   **T=0.3s:** The hovered card scales to `scale-105` (`duration: 1.2s, power3.out`).
*   **T=0.5s:** The video overlay elegantly fades in (`opacity: 1`) and auto-plays silently.

## 5. The Cursor
The cursor is the user's physical avatar in the void.
*   **Default:** A microscopic 4px white dot.
*   **Physics:** It does not stick rigidly to the mouse. It follows with a slight GSAP `power2.out` lag (`duration: 0.15s`), giving the mouse movement a feeling of fluidity.

## 6. Section Bleed
We do not scroll "past" sections. We dissolve through them. 
Background ambient lights (the radial gradients) are pinned to specific sections using ScrollTrigger. As the user leaves a section, its ambient light slowly shifts color or fades to black, seamlessly handing off the lighting to the next section.
