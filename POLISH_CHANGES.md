# Responsive 3D polish pass

This pass keeps the `main(3)` design as the base and fixes the specific interaction/layout issues from the previous 3D build.

## What changed

- **Viewport-safe composition**
  - Hero and 3D horizon now size from the actual viewport using `svh`, fluid clamps, and earlier responsive breakpoints.
  - Removed the fixed `680px` minimum from the sticky horizon scene that caused short laptop windows to crop the copy.
  - Added short-laptop rules so 1280×720-ish and shorter browser windows shrink type/spacing instead of clipping.
  - 3D camera motion now reads the live R3F viewport size/aspect ratio.

- **Horizon / sunrise scene**
  - Only one editorial step is visible at a time instead of three large headings occupying the same scene.
  - Rebuilt the progress rail as a small centered glass meter.
  - The sun is now rendered inside the sky shader and clipped by the horizon, so it rises naturally from behind the water instead of a 3D sphere intersecting the ocean mesh.
  - Water motion was reduced slightly so the horizon remains visually stable.

- **Glasses 3D viewer**
  - Replaced restricted `PresentationControls` with real `OrbitControls`.
  - Drag to orbit freely around the object.
  - Scroll / trackpad / pinch to zoom.
  - `Bounds` + `observe` auto-fits the GLB when the viewer resizes.
  - Auto-rotation stops once the user interacts.
  - Removed the background grid so the model is the focus.

- **Typography**
  - Removed the Sora + Inter webfont pairing from `next/font`.
  - Switched to a more editorial system stack: Avenir Next / Helvetica Neue-style display type plus an old-style serif accent.
  - This also avoids a font-download dependency at build time.

- **Icons**
  - Replaced Lucide usage with `@phosphor-icons/react` across the site.
  - Server-rendered pages use the Phosphor SSR entry point.
  - Added Next.js `optimizePackageImports` for Phosphor.

- **Transition bar**
  - Changed the heavy dark marquee into a thinner, lighter transition rail so it no longer looks like a random bar between scenes.

## Run

```bash
npm install
npm run dev
```

The new dependency is already in `package.json`:

```text
@phosphor-icons/react ^2.1.10
```

## Sun aspect-ratio correction
- The shader now receives the live canvas aspect ratio.
- Sun distance is calculated in screen-corrected coordinates, so the disk remains a true circle on laptop, ultrawide, tablet, and mobile viewports.
- The horizon clipping behavior is unchanged, so the sun still rises naturally from behind the water line.

## True circular sun fix
- Removed the sun disk from UV-space shader math entirely.
- The sun is now real `CircleGeometry` rendered in 3D.
- It billboards to the active camera every frame, so camera movement can never squash it into an ellipse.
- Water remains in front of the sun, preserving the rise-from-horizon occlusion.
