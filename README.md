# Beyond

A cinematic, scroll-driven interactive journey from Earth orbit to a black hole, built with React, TypeScript, React Three Fiber, Three.js, Zustand, and Motion.

## Features

- Scroll-synchronised cinematic camera path across ten chapters
- Procedural planetary scenes, instanced asteroid field, stars, nebula and black hole
- Editorial overlay, chapter navigation, pause, sound-state, and reduced-motion controls
- Screen-reader accessible narrative below the WebGL journey
- Responsive canvas composition and reduced visual motion support

## Run

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run test
```

## Architecture

`src/experience` owns rendering and camera motion; `src/data` contains editorial/science content; `src/store` contains low-frequency experience state; `src/app` contains the accessible interface.

## Asset & credit note

## Texture attribution

Planetary maps used by the rendered Earth, Moon, Mars, Jupiter, and Saturn are from **Solar System Scope Texture Library** by Solar System Scope, licensed under **CC BY 4.0**. They are downloaded from the public Wikimedia Commons distribution and served locally from `public/textures/planets/`; no texture is requested from a remote runtime URL.

- Source collection: https://commons.wikimedia.org/wiki/Category:Solar_System_Scope
- License: https://creativecommons.org/licenses/by/4.0/
- Attribution: © Solar System Scope (2010–2017)
