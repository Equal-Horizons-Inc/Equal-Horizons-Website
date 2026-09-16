# Equal Horizons — Ultimate 3D Motion Build

This build uses **Equal-Horizons-Github-main(3)** as the design/content base and adds the strongest spatial interaction ideas from the alternate concept without replacing the original visual identity.

## What changed

- Real WebGL night-to-dawn horizon using custom Three.js shaders.
- Animated 3D water surface with pointer-reactive camera movement.
- Actual `glasses.glb` model rendered in-browser, not a flattened image.
- Drag-to-rotate smart-glasses model with floating motion, reactive lighting, shadows, particles, and orbiting HUD rings.
- Lenis smooth scrolling.
- Scroll-linked hero depth/parallax.
- 3D perspective treatment for the mission portal.
- Pointer-tilt exploration cards with layered Z-depth and animated spatial diagrams.
- Mobile/responsive fallbacks and `prefers-reduced-motion` handling.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Next.js.

## Build

```bash
npm run build
npm start
```

## Important assets

- `public/models/glasses.glb` — the real smart-glasses model used by the WebGL viewer.
- `public/models/Boat.glb` — preserved from the alternate 3D project assets for future use.
- `public/glasses360/` — pre-rendered model frames kept as a visual/fallback asset set.

## Main 3D components

- `components/ImmersiveHorizon3D.tsx`
- `components/GlassesWorld3D.tsx`
- `components/PrototypeLab3D.tsx`
- `components/SpatialProjectDeck.tsx`
- `components/SmoothScroll.tsx`

Preview videos are included in `PREVIEWS/`.

## Latest responsive 3D polish

See `POLISH_CHANGES.md` for the viewport alignment, natural sunrise, orbit/zoom glasses viewer, typography, and Phosphor icon changes.
