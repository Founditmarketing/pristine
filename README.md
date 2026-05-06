# Pristine Pond Solutions

Premium React rebuild of pristinepondsolutions.com.

## Stack

- React 19 + Vite 6
- React Router v7 (library mode)
- Tailwind CSS v4 (native `@theme` tokens, no `tailwind.config.js`)
- Framer Motion 11
- Lucide React icons
- `class-variance-authority` + `tailwind-merge` for component variants

JavaScript, not TypeScript. Component files use `.jsx`.

## Run

```bash
npm install
npm run dev
```

Dev server starts on `http://localhost:5173` and opens automatically.

## Build

```bash
npm run build
npm run preview
```

## Project layout

```
src/
  components/
    layout/      Navbar, MobileMenu, Footer, Layout shell, Logo
    home/        Hero (other home sections coming next)
    ui/          Button primitive
  pages/         One file per route
  data/          site.js, services.js (single source of truth for copy)
  lib/           cn() utility
  styles/        globals.css with the @theme design tokens
```

## Design system

All design tokens live in `src/styles/globals.css` under `@theme`:

- **Colors** (OKLCH, all neutrals warm-tinted)
  - `bg-navy`, `text-gold`, `bg-lake`, `text-moss`, `bg-sand`, `text-cream`, `text-ink`, `text-slate-warm`, `text-mute`, `border-hairline`
- **Fonts**
  - `font-display` (Outfit), default sans (Inter), `font-serif` (Playfair Display italic)
- **Easings**
  - `ease-[var(--ease-out-quart)]`, `ease-[var(--ease-out-quint)]`, `ease-[var(--ease-out-expo)]`
- **Custom utilities**
  - `eyebrow`, `container-page`, `noise-overlay`, `ken-burns`, `float-slow`

Edit copy in `src/data/site.js` and `src/data/services.js`. Components pull from these.

## What's built so far

- [x] Project scaffold and design system
- [x] Layout shell with sticky transparent-to-solid Navbar
- [x] Mobile fullscreen overlay menu with stagger animation
- [x] Footer with sitemap, contact, and social
- [x] Cinematic Home Hero with parallax, Ken Burns photo, and animated headline reveal
- [x] All 11 routes wired with placeholder pages

## Coming next (in order)

1. Home: services bento grid (varied card sizes, no 3x2 reflex)
2. Home: before/after slider for pond transformations
3. Home: stats counter, testimonials carousel, service-area map, CTA banner
4. `/services` bento overview
5. `/services/:slug` deep pages with problem/solution/process
6. `/contact` split layout with React Hook Form + Zod
7. `/about`, `/markets`, `/testimonials`, `/products`, `/events`

## Notes for future work

- Hero photo is currently an Unsplash CDN URL. Swap `HERO_IMAGE` in `src/components/home/Hero.jsx` for client photography when available, ideally a 2400px wide WebP saved to `public/images/`.
- Phone, email, and social URLs in `src/data/site.js` are placeholders. Update before launch.
- Light theme only for v1. Dark mode is a refinement, not a foundation.
- Reduced-motion is honored globally and in the Hero parallax.
