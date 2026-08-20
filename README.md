# Dhruvil Patel — Portfolio

Personal portfolio site for [Dhruvil Patel](https://dhruvil2502.netlify.app).

**Live:** [dhruvil2502.netlify.app](https://dhruvil2502.netlify.app)  
**Repo:** [github.com/PatelDhruvil2502/portfolio_latest](https://github.com/PatelDhruvil2502/portfolio_latest)

---

## Tech stack (current)

| Layer | Libraries |
| --- | --- |
| App | React 18, TypeScript, Vite 5 |
| 3D / WebGL | Three.js, React Three Fiber, @react-three/drei |
| Motion / scroll | Lenis, CSS animations, IntersectionObserver |
| Images | AVIF + WebP (+ JPEG/PNG fallback), Sharp optimize script |
| Contact | Formspree |
| Deploy | Netlify |

**Not used in the current codebase:** GSAP. Older commits / README notes may mention GSAP Club trial plugins; they were removed to keep the bundle lighter. Motion is handled with Lenis, CSS, and a custom hero scroll-trap.

---

## Features

- Desktop hero with scroll-trap expanding portrait + WebGL “embedding field”
- Mobile magazine-cover hero (no scroll-trap, no WebGL)
- Lenis smooth scrolling with navbar keyboard shortcuts (`0`–`5`)
- `React.lazy` / `Suspense` for Projects and Query sections
- AVIF/WebP delivery with hero image preload for LCP
- Client-side query demo (token + tag overlap over a small corpus) + Formspree contact form

---

## Getting started

```bash
npm install
npm run dev          # Vite on --host
npm run build        # tsc -b && vite build
npm run preview
npm run lint
npm run optimize:images   # Sharp: public/images → .avif + .webp
```

Node 18+ recommended.

---

## Project structure

```
src/
  App.tsx                 # Shell, lazy Projects + Query
  components/
    Hero.tsx              # Scroll-trap / mobile hero
    Navbar.tsx
    SmoothScroll.tsx      # Lenis
    Cursor.tsx
    About.tsx | Experience.tsx | Education.tsx
    Projects.tsx | Skills.tsx | Query.tsx | Footer.tsx | Marquee.tsx
    scene/EmbeddingField.tsx   # R3F WebGL field
  hooks/useReveal.ts
public/images/            # Source + optimized AVIF/WebP assets
scripts/optimize-images.mjs
```

---

## Content accuracy

Site copy for experience, education, projects, and metrics is kept aligned with the latest resume versions. The portfolio itself is **not** listed as a project card on the site.

If you change resume facts (dates, GPAs, metrics), update the corresponding data in:

- `src/components/Experience.tsx`
- `src/components/Education.tsx`
- `src/components/Projects.tsx`
- `src/components/Skills.tsx`
- `src/components/Query.tsx`

---

## License

MIT — see [LICENSE](LICENSE).
