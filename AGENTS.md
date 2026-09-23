# AGENTS.md — Gemini Watermark Remover

## What this is
Client-side-only website that removes Google Gemini/Imagen 3/Veo 3 visible watermarks from images and videos via mathematical alpha-unblending (no AI inpainting, no server upload). Hosted on GitHub Pages: https://ishara-madu.github.io/gemini-watermark-remover/

Author: Ishara M. (https://ishara-madu.github.io/)
License: MIT

## Tech Stack
- React 18 + Vite (JSX, ES modules), no TypeScript, no CSS framework — vanilla CSS design system
- Processing: HTML5 Canvas API + WebCodecs API
- Video muxing/encoding: [MediaBunny](https://github.com/diffusion-studio/mediabunny), lazy-loaded at runtime via dynamic `import()` from `https://cdn.jsdelivr.net/npm/mediabunny@1.52.3/+esm`
- Icons: Iconify (`iconify-icon` web component via CDN script in `index.html`, used directly as a custom element in JSX)
- Font: Google Fonts "Ubuntu"
- Ads/monetization: Monetag direct links (`src/lib/mediaUtils.js`), Buy Me A Coffee widget (lazy-loaded on first user interaction, wired in `src/main.jsx`)
- A pre-React static HTML/CSS/vanilla-JS build is preserved in `legacy/` for reference — not built or served, kept as a historical snapshot.

## File Structure
```
index.html                  # Vite entry — SEO meta, JSON-LD structured data, <div id="root">, loads src/main.jsx
vite.config.js               # base: '/gemini-watermark-remover/' (GitHub Pages subpath), @vitejs/plugin-react
package.json / package-lock.json
src/
  main.jsx                   # ReactDOM root render + BuyMeACoffee widget lazy-load
  App.jsx                     # top-level layout, image/video tab state, renders all sections
  styles/style.css            # design system (unchanged from legacy), imported by main.jsx
  lib/
    watermarkEngine.js        # core engine: alpha unblending math, WatermarkEngine/VideoWatermarkEngine classes, auto-detection
    mediaUtils.js              # frame-grabbing helpers (image/video), smoothScrollTo, Monetag ad link handlers
  hooks/
    useMediaRemover.js         # shared dropzone/tuner/slider/export state machine used by both remover components
  components/
    Layout.jsx                   # Header + <Outlet/> + Footer, scrolls to hash/top on route change
    Header.jsx                   # nav, tools dropdown, mobile menu, GitHub star count (react-router Link/NavLink)
    Hero.jsx                      # hero section + decorative bg frames, variant="image"|"video" per page
    ToolTabs.jsx                   # Image/Video Remover tab switcher, NavLink to "/" and "/video"
    ImageRemover.jsx              # image tool panel (uses useMediaRemover)
    VideoRemover.jsx              # video tool panel (uses useMediaRemover)
    PromoCard.jsx                  # results-screen cross-promo card
    StaticSections.jsx             # HowItWorks, Comparison, Guide, VideoGuide, Features, Faq (pure SEO content, no state)
    Footer.jsx                      # footer + privacy/terms <dialog> modals
  pages/                          # one file per route, sets document.title, composes components/*
    HomePage.jsx                   # "/" — Hero + ToolTabs + ImageRemover + Comparison
    VideoPage.jsx                   # "/video" — Hero + ToolTabs + VideoRemover
    HowItWorksPage.jsx               # "/how-it-works"
    GuidePage.jsx                     # "/guide" — Guide + VideoGuide
    FeaturesPage.jsx                   # "/features"
    FaqPage.jsx                         # "/faq"
public/                        # served as-is at root: assets/, portfolio_images/, robots.txt, sitemap.xml
legacy/                        # pre-React static site (index.html, main.js, style.css) — reference only, not built
LICENSE (MIT)
README.md
AGENTS.md
```

## src/lib/watermarkEngine.js — Map
1. **Engine Core** — `calculateAlphaMap`, `removeWatermark` (core formula: `original = (watermarked - alpha*255) / (1-alpha)`), `getWatermarkInfo`, `getRoi`, `resolveBox`, `buildAlpha`, `cleanFrame`
2. Inline base64 reference watermark images (module-private, not exported): guarantees no CORS/tainted-canvas issues
3. **`WatermarkEngine` class** — image watermark removal (`process(imageFile)` → cleaned PNG blob)
4. **`VideoWatermarkEngine` class** — video watermark removal via MediaBunny; decodes frames with WebCodecs, cleans each frame's ROI, re-encodes to H.264 MP4, preserves audio track passthrough
5. `getAdaptiveImagePreset` / `getAdaptiveVideoPreset` — fallback presets when auto-detection doesn't find a confident match
6. **Auto-Detection System** — multi-scale, dual-polarity (light/dark bg), gradient-based template matching (`detectWatermarkCandidate`, `detectVideoWatermarkCandidate`) to auto-locate watermark position/size/gain without user input

## src/hooks/useMediaRemover.js
Parametrized state machine shared by `ImageRemover.jsx` and `VideoRemover.jsx` — the two tools differ only in engine creation, frame-grabbing, detection function, and export logic; everything else (dropzone drag/drop, tuner canvases, sliders, results/error state) is identical and lives here. Takes `{ accept, createEngine, getBase, getBgImg, detectFn, fallbackPreset, grabFrame, doExport }`. Canvas elements are always mounted (visibility toggled via CSS `hidden` class / inline `style.display`, not conditional unmount) so refs stay valid across state changes — mirrors the imperative canvas-drawing approach of the original vanilla-JS version.

## Core Algorithm
Gemini/Veo embeds watermark via alpha blending: `Watermarked = Original*(1-alpha) + Logo*alpha`.
Reversed: `Original = (Watermarked - Logo*alpha) / (1-alpha)`, applied per-pixel per-channel (R/G/B) within the watermark's region of interest (ROI), using a known reference alpha mask (the inlined base64 sparkle logo images) scaled/positioned per image/video dimensions.

Tunable params exposed to user via sliders: **Gain** (alpha strength multiplier, 0.1–3), **Size Scale** (0.5–2), **Position X/Y offset** (px). Defaults differ for image (`gain 0.6, offset -128,-128`) vs video (`gain 0.6, offset -24,-24`) since Gemini image watermark and Veo video watermark sit at different relative positions/sizes.

## Key Conventions
- Components use `.jsx` extension, function components + hooks only, no class components.
- `iconify-icon` is used directly as a lowercase custom element in JSX (e.g. `<iconify-icon icon="ph:eraser-bold">`) — works because the CDN script registers it as a real Web Component; React passes through unrecognized props as DOM attributes.
- Assets in `public/` are referenced with root-absolute paths (`/assets/...`) in components; Vite prefixes these with `base` (`/gemini-watermark-remover/`) automatically at build. `<head>` meta/link tags in `index.html` still use **absolute canonical URLs** (`https://ishara-madu.github.io/...`) for OG/Twitter/JSON-LD — keep this distinction when editing.
- Heavy SEO investment: JSON-LD structured data (SoftwareApplication, WebSite, BreadcrumbList, HowTo, FAQPage) lives as a static `<script type="application/ld+json">` in `index.html` `<head>` and must stay in sync with `Faq` content in `src/components/StaticSections.jsx` if either changes.
- 100% client-side/private is a core product claim (repeated in README, meta description, privacy modal) — never introduce server upload of user media without flagging it as a breaking claim change.
- Don't edit `legacy/` — it's a frozen snapshot of the pre-conversion site, kept for reference only.

## Local Development
```bash
npm install
npm run dev       # Vite dev server, auto-reload
npm run build      # production build → dist/
npm run preview     # serve the production build locally
```
Dev server serves under the configured base path, e.g. `http://localhost:5173/gemini-watermark-remover/`.

## Deployment
GitHub Pages, served from the `dist/` build output (not committed) — deploy via GitHub Actions or `gh-pages` publishing `dist/` after `npm run build`. `vite.config.js`'s `base` must match the Pages subpath.
