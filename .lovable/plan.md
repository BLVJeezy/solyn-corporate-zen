

## Image Performance Optimization Plan

### Problem
All images are PNGs/JPEGs served without optimization. No preloading for above-the-fold images, and hero showcase images incorrectly have `loading="lazy"` (they're visible on first paint).

### Changes

**1. `index.html` — Preload critical above-the-fold images**
Add `<link rel="preload">` for the logo and first 2-3 showcase images that are visible on load. Since Vite hashes asset URLs, we'll use a module preload approach instead — by eagerly loading the hero images.

**2. `src/components/home/HomeHero.tsx` — Fix hero image loading**
- Remove `loading="lazy"` from showcase images (they're above the fold and animate in immediately)
- Add `decoding="async"` and `fetchpriority="high"` on first few images
- Add explicit `width` and `height` attributes to prevent layout shifts

**3. `src/components/home/HomeNav.tsx` — Optimize logo**
- Add `fetchpriority="high"` to the logo `<img>` since it's the first visible element

**4. All below-fold components — Ensure lazy loading + decoding**
Add `decoding="async"` to all images that already have `loading="lazy"`:
- `HomeProcess.tsx`
- `HomeWork.tsx`
- `PortfolioSection.tsx`
- `MobileViewSection.tsx`
- `HeroPortfolioPreview.tsx`

**5. `vite.config.ts` — Add image optimization build settings**
Add `build.assetsInlineLimit: 0` to prevent inlining images as base64 (which bloats JS bundles).

**6. WebP conversion limitation**
Vite doesn't convert images to WebP at build time without additional plugins. The practical approach:
- For the 5 showcase images and portfolio images that are the heaviest, I'll add a `<picture>` element with WebP source fallback pattern, but since we can't convert files in this environment, I'll note this as a manual step.
- The real win comes from the loading strategy changes (preload + lazy) which will have the biggest impact.

### Summary of impact
- **Hero LCP improvement**: Removing `loading="lazy"` from above-fold images and adding `fetchpriority="high"` directly improves Largest Contentful Paint
- **Below-fold savings**: `decoding="async"` prevents main-thread blocking during image decode
- **Layout stability**: Width/height attributes prevent CLS

