# Ultimate 3D Pass

The goal of this pass was not to redesign Equal Horizons again. It was to keep the current site's illustration-driven personality and add genuinely spatial interaction.

## True 3D

### Horizon scene
A React Three Fiber canvas renders a custom shader-based sky and displaced water mesh. Scroll progress drives the transition from night to sunrise, while pointer movement subtly shifts the camera.

### Smart-glasses prototype
The actual GLB model is loaded with Drei's `useGLTF`. It floats naturally, can be dragged through a constrained 3D range, receives multiple reactive lights, casts a contact shadow, and sits inside animated orbital UI geometry.

## Spatial motion outside WebGL

The mission portal and exploration cards use CSS perspective and Framer Motion springs so the 3D language continues through the page without turning every section into a heavy canvas.

## Performance/accessibility

- WebGL sections are client-loaded to avoid SSR/WebGL issues.
- Device-pixel-ratio is capped.
- Reduced-motion preferences disable decorative repeating motion.
- The original semantic content and navigation remain intact.
## Hero cleanup
- Removed the background grid from the opening hero so the first screen uses only soft gradients, lighting, parallax, and spatial elements.

