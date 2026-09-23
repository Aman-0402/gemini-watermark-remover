# AGENTS.md — Gemini Watermark Remover

## What this is
Static, client-side-only website that removes Google Gemini/Imagen 3/Veo 3 visible watermarks from images and videos via mathematical alpha-unblending (no AI inpainting, no server upload). Hosted on GitHub Pages: https://ishara-madu.github.io/gemini-watermark-remover/

Author: Ishara M. (https://ishara-madu.github.io/)
License: MIT

## Tech Stack
- Pure HTML5 + vanilla CSS (no framework, no build step, no bundler, no npm deps)
- Vanilla JS (ES6+), single file `main.js`, loaded as a plain `<script>` (not a module — classes/functions live in global scope)
- Processing: HTML5 Canvas API + WebCodecs API
- Video muxing/encoding: [MediaBunny](https://github.com/diffusion-studio/mediabunny), lazy-loaded at runtime via dynamic `import()` from `https://cdn.jsdelivr.net/npm/mediabunny@1.52.3/+esm`
- Icons: Iconify (`iconify-icon` web component via CDN script in `index.html`)
- Font: Google Fonts "Ubuntu"
- Ads/monetization: Monetag direct links (`MONETAG_DIRECT_LINK`, `MONETAG_EXPORT_DIRECT_LINK` in `main.js`), Buy Me A Coffee widget (lazy-loaded on first user interaction)

## File Structure
```
index.html          # single page — SEO meta, JSON-LD structured data (SoftwareApplication/WebSite/BreadcrumbList/HowTo/FAQPage), header nav, hero, image/video tool panels, how-it-works, comparison, guide, features, FAQ, footer, privacy/terms modals
style.css            # single stylesheet, CSS custom properties design system (:root vars: --bg-*, --text-*, --brand-*, --radius-*, --shadow-*)
main.js               # all app logic (~2040 lines), no modules
assets/                # logo, favicons, bg1/bg2 decorative images, before/after comparison webp, site.webmanifest, watermark reference PNGs (inlined as base64 in main.js too)
portfolio_images/     # img1.png, img2.png (likely social/portfolio previews)
robots.txt / sitemap.xml
LICENSE (MIT)
README.md
```

No `server/`, no `package.json`, no build tooling, no test suite. Runs by opening `index.html` via any static server (Python `http.server`, `npx serve`, VS Code Live Server).

## main.js — Section Map
1. **Monetag ad links** (top) — `handleDownloadAd()`, `handleExportAd()`, exposed on `window`
2. **Engine Core** — `calculateAlphaMap`, `removeWatermark` (core formula: `original = (watermarked - alpha*255) / (1-alpha)`), `getWatermarkInfo`, `getRoi`, `resolveBox`, `buildAlpha`, `cleanFrame`
3. Inline base64 reference watermark images: `BG_48_BASE64`, `BG_96_BASE64` (guarantees no CORS/tainted-canvas issues)
4. **`WatermarkEngine` class** — image watermark removal (`process(imageFile)` → cleaned PNG blob)
5. **`VideoWatermarkEngine` class** — video watermark removal via MediaBunny; decodes frames with WebCodecs, cleans each frame's ROI, re-encodes to H.264 MP4, preserves audio track passthrough
6. **App Controller** (line ~457+):
   - `IMG_PRESETS` / `VIDEO_PRESETS`, adaptive preset functions
   - **Auto-Detection System** (line ~502-951): multi-scale, dual-polarity (light/dark bg), gradient-based template matching (`detectWatermarkCandidate`, `detectVideoWatermarkCandidate`) to auto-locate watermark position/size/gain without user input
   - `initTabs()` — image/video tab switcher, syncs `sessionStorage` + URL hash
   - `initImageRemover()` (line 1064) — dropzone, sliders (gain/scale/offsetX/offsetY), live dual zoomed preview, export
   - `initVideoRemover()` (line 1403) — same for video, plus progress bar
   - `getPromoCardHtml()` — results screen promo card
   - GitHub star count fetcher
   - `initAutoFavicons()` — auto-resolves favicons for external tool links
   - `initMobileMenu()` — hamburger nav
   - `initCustomSelects()` — custom `<select>` styling logic

## Core Algorithm
Gemini/Veo embeds watermark via alpha blending: `Watermarked = Original*(1-alpha) + Logo*alpha`.
Reversed: `Original = (Watermarked - Logo*alpha) / (1-alpha)`, applied per-pixel per-channel (R/G/B) within the watermark's region of interest (ROI), using a known reference alpha mask (the inlined base64 sparkle logo images) scaled/positioned per image/video dimensions.

Tunable params exposed to user via sliders: **Gain** (alpha strength multiplier, 0.1–3), **Size Scale** (0.5–2), **Position X/Y offset** (px). Defaults differ for image (`gain 0.6, offset -128,-128`) vs video (`gain 0.6, offset -24,-24`) since Gemini image watermark and Veo video watermark sit at different relative positions/sizes.

## Key Conventions
- No imports/modules in `main.js` — everything global, loaded via plain `<script src="./main.js"></script>` at end of `<body>`.
- No inline `style=""` is avoided generally, but a few exist in `index.html` (kept minimal, mostly icon colors).
- Assets referenced with relative `./assets/...` paths in code but **absolute canonical URLs** (`https://ishara-madu.github.io/...`) in `<head>` meta/link tags (favicons, OG/Twitter images, JSON-LD) — keep this distinction when editing.
- Privacy/Terms are `<dialog>` modals opened via inline `onclick` in `index.html`, not JS event listeners.
- Heavy SEO investment: JSON-LD structured data (SoftwareApplication, WebSite, BreadcrumbList, HowTo, FAQPage) in `index.html` `<head>` must stay in sync with visible FAQ section content if either changes.
- 100% client-side/private is a core product claim (repeated in README, meta description, privacy modal) — never introduce server upload of user media without flagging it as a breaking claim change.

## Local Development
```bash
python3 -m http.server 8000   # or: npx serve .
```
Open `http://localhost:8000`. No build/compile step — edit and refresh.
