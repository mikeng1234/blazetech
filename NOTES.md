# Blaze Tech Devt OPC — Project Notes

## Stack
- **Next.js 16.2.4** — App Router, TypeScript, Turbopack
- **React 19.2.4** — `'use client'` for interactive components
- **Tailwind CSS v4** — CSS-first config via `@theme` in `globals.css` (Material Design 3 tokens)
- **Lenis** — smooth scroll (`SmoothScroll.tsx`)
- **Sharp** — image compression CLI script

---

## Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main server component — all sections |
| `app/globals.css` | `@theme` tokens + all custom animations |
| `app/components/Header.tsx` | Fixed nav, shrinks on scroll |
| `app/components/HeroCover.tsx` | Cycling cover images with crossfade + dolly |
| `app/components/Estimator.tsx` | Solar cost calculator (Grid-Tie / Hybrid / Off-Grid) |
| `app/components/PartnerMarquee.tsx` | Infinite logo marquee |
| `app/components/RevealOnScroll.tsx` | IntersectionObserver for `.fade-up` and `.fade-up-mid` |
| `app/components/MessengerFab.tsx` | Floating Messenger button |
| `app/components/QuoteForm.tsx` | Contact/quote form |
| `scripts/compress-images.mjs` | Sharp-based image compression |
| `start.bat` | Kill port 3000 → `npm run dev` → open Chrome |
| `compress.bat` | Run image compression script |

---

## Cover Images
- Active set: `cover5.png` through `cover11.png` (cover8 excluded)
- Defined in `HeroCover.tsx`: `const COVERS = [5, 6, 7, 9, 10, 11].map(n => \`/cover\${n}.png\`)`
- Cycle interval: **10 seconds**, crossfade: **3 seconds**
- Animation: `.dolly` class applied to ALL images always (`bt-dolly` keyframe, 25 s, `alternate`) — prevents jerk on class add/remove
- Opacity via **inline style** (not Tailwind class) to avoid Tailwind purge issues
- Object position: `object-[50%_70%]` (anchored 70% down, shows top without cropping)

---

## Hero Section
- Height: `min-h-[780px] md:min-h-[900px]`
- Gradient overlays: left-to-transparent, top-to-transparent (extends `-top-20`), bottom white fade
- H1 white text-shadow: `[text-shadow:0_0_14px_rgba(255,255,255,1),...]` — 4 layers of white glow
- Banner wave: `/banner7d.png` — `animate-bt-wipe` (clip-path left→right), positioned `-bottom-[205px]`

---

## Animations (globals.css)

| Class | Keyframe | Use |
|-------|----------|-----|
| `.dolly` | `bt-dolly` 25 s alternate | Cover image ambient drift |
| `.animate-bt-wipe` | `bt-wipe-in` 1.6 s | Banner wave entrance |
| `.animate-bt-wipe-left` | `bt-wipe-in-left` | Triggered by `.visible` |
| `.animate-bt-marquee` | `bt-marquee` 35 s linear | Partner logo scroll |
| `.animate-bt-bounce` | `bt-bounce` 2.4 s | Messenger FAB |
| `.animate-bt-ping` | `bt-ping` 2 s | Messenger pulse ring |
| `.fade-up` | — | Scroll reveal (threshold 0.12) |
| `.fade-up-mid` | — | Scroll reveal (rootMargin -50%) |
| `.step-circle` | `bt-pop-glow` | Process step circles |
| `.bt-shine-overlay` | `bt-text-shine` | "Blaze Tech Devt OPC" shine sweep |
| `.service-icon` | per-icon | Material icon fill + motion on hover |
| `.trust-icon-spin/bob/pulse` | trust-* | Trust badge icons |

---

## Estimator
- Toggle: **By Bill** / **By kWh** — sliding pill animation
- System types: **Grid-Tie** (primary/red), **Hybrid** (secondary/blue), **Off-Grid** (tertiary/amber)
- Cost rounded to nearest ₱1,000 (`fmtK` helper)
- Potential Monthly Savings displayed in **green**

---

## Image Compression
```
node scripts/compress-images.mjs
```
- Targets: `cover*.png`, `sample*.png`, `banner*.png`
- Max width: 2000 px, PNG quality 80, compressionLevel 9
- Result: ~86% file size reduction (89.9 MB → 12.4 MB)

---

## Common Gotchas
- **Dolly jerk**: Always apply `.dolly` to all images, never add/remove it on active state. Use `alternate` so the loop reverses smoothly.
- **Opacity not applying**: Use inline `style={{ opacity }}` not Tailwind `opacity-*` for dynamically toggled values.
- **Path spaces in scripts**: Use `fileURLToPath(import.meta.url)` — never `import.meta.url.pathname` (breaks on Windows paths with spaces).
- **Banner file missing**: Confirm file exists in `/public/` before referencing (e.g. `banner7d.png`).
- **Pill toggle full-width stretch**: Use `inline-grid grid-cols-2` not `flex w-max`.

---

## Brand Colors
| Token | Value | Usage |
|-------|-------|-------|
| `orange-600` | `#ea580c` | Brand name, CTA buttons, "We Build It." |
| `primary` | `#ad2c00` | Estimator Grid-Tie, process circles |
| `secondary` | `#00658b` | "Devt OPC", Explore Services border, Hybrid card |
| `tertiary` | `#815200` | Off-Grid card |

---

## Dev Commands
```bash
# Start dev server (kills port 3000 first)
start.bat

# Compress public images
compress.bat
```
