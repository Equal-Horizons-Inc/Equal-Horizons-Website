# Equal Horizons — final 3D responsive build

This build keeps the current Equal Horizons visual system and merges the strongest 3D/scroll ideas into it without duplicating sections.

## What changed in this pass

- Removed the old moving text/marquee bar.
- Removed the separate illustrated **“A path from listening to learning”** section from the home page.
- Moved those four process steps into one responsive **ocean / night-to-dawn WebGL sequence**.
- Rebuilt the sun as a CSS `aspect-ratio: 1 / 1` circle behind the WebGL water, so it cannot become an oval and it rises from *under* the water instead of spawning on top of it.
- The ocean camera now adapts to viewport width **and height** so common laptop, tablet, and phone dimensions keep the horizon and copy in frame.
- Removed the NIGHT—DAWN meter/pill.
- The smart-glasses viewer supports orbit, pan, scroll/pinch zoom, pointer-reactive lighting, and responsive auto-fit.
- The 3D viewer opts out of Lenis wheel/touch interception so zoom gestures actually reach OrbitControls.
- Phosphor Icons remain the icon system.
- Direct dependency versions are pinned to avoid top-level version drift on Vercel.
- Next.js is pinned to **14.2.35**, the patched release for the 14.x line.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production check

```bash
npm run build
npm run start
```

## Vercel

This is a standard Next.js App Router project and can be imported directly into Vercel. Node.js 18.17+ is declared in `package.json`.

The contact form uses Resend. Set these Vercel environment variables if you want the form to send email:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

The visual site builds independently of whether those variables are present; the API route returns a configuration error only when the form is submitted without them.

## Main interactive files

- `components/ImmersiveHorizon3D.tsx` — responsive ocean/process scene
- `components/GlassesWorld3D.tsx` — GLB viewer with orbit/pan/zoom
- `components/PrototypeLab3D.tsx` — prototype viewer layout
- `components/AnimeHorizonScene.tsx` — hero illustration
- `app/globals.css` — responsive layout and motion styling
