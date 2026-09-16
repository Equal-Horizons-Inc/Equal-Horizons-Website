# Final fixes

1. **Water now replaces the duplicate illustrated process section.** The four Listen → Shape → Build → Learn steps are presented inside the ocean scene.
2. **No weird bars.** The marquee transition and NIGHT—DAWN meter were removed.
3. **Sun cannot stretch.** It is a DOM/CSS circle (`aspect-ratio: 1`) instead of projected 3D disk geometry.
4. **Sun rises from behind water.** The sun lives behind a transparent WebGL canvas; opaque water geometry naturally occludes it until it crosses the horizon.
5. **Responsive camera.** Water framing adjusts for portrait, normal laptop, and short laptop viewports using the actual canvas width/height.
6. **Glasses controls fixed.** Orbit + pan + scroll/pinch zoom are enabled, and Lenis is prevented from stealing wheel/touch input over the 3D viewer.
7. **Deployment stability.** Direct dependencies are pinned; Next.js / eslint-config-next are on 14.2.35 and Node 18.17+ is declared.
