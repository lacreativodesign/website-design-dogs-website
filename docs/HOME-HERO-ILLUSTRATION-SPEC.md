# Home Hero Illustration Slot Specification

Repository: `lacreativodesign/website-design-dogs-website`

This specification records the locked Home hero image slot for the next illustration-production phase. No image assets were generated or modified for this layout lock.

## Proposed Future Asset Filenames

- `public/brand/scenes/home-hero-v3-dark.webp`
- `public/brand/scenes/home-hero-v3-light.webp`
- `public/brand/crops/tablet/home-v3-dark.webp`
- `public/brand/crops/tablet/home-v3-light.webp`
- `public/brand/crops/mobile/home-v3-dark.webp`
- `public/brand/crops/mobile/home-v3-light.webp`

## Layout Slot Measurements

| Breakpoint | Viewport reference | Rendered hero slot | Required aspect ratio | Active source family |
| --- | ---: | ---: | ---: | --- |
| Desktop large | 1440 × 900 | 1440 × 668 px maximum, fluid down to 52vw | 2.16:1 target canvas coverage | `public/brand/scenes/*` |
| Desktop standard | 1280 × 800 | 1280 × 666 px maximum, fluid down to 52vw | 1.92:1 target canvas coverage | `public/brand/scenes/*` |
| Tablet landscape | 1024 × 768 | 1024 × 640 px | 1.60:1 | `public/brand/crops/tablet/*` |
| Tablet portrait | 768 × 1024 | 768 × 640 px | 1.20:1 | `public/brand/crops/tablet/*` |
| Mobile tall | 390 × 844 | 390 × 596 px | 0.65:1 | `public/brand/crops/mobile/*` |
| Mobile narrow | 360 × 800 | 360 × 596 px | 0.60:1 | `public/brand/crops/mobile/*` |

## Safe Areas

- Top header-safe area: keep critical illustration detail below the first 72 px on desktop and tablet, and below the first 68 px on mobile.
- Left-side copy-safe area on desktop: reserve the left 0–43% of the canvas from 110 px to 430 px vertical for headline, body copy, and CTA overlay.
- Mobile copy-safe area: reserve the lower 42% of the crop for copy; do not place mascot face, paws, or laptop controls behind this area.
- Bottom landscape-safe area: the lowest 10% may fade into the page background and must not contain required mascot, laptop, logo, or UI detail.

## Mascot and Laptop Targets

- Desktop mascot bounding-box target: right 47–84% of canvas width and 115–515 px vertical within a 1440 px viewport.
- Desktop mascot horizontal position: visual center around 67% of canvas width.
- Desktop mascot vertical position: face center around 28–32% of hero height; paws and laptop should sit around 56–68% of hero height.
- Tablet mascot bounding-box target: center/right 42–88% of crop width, with face above the midpoint and laptop fully visible.
- Mobile mascot bounding-box target: top/center 18–88% of crop width, with face, sunglasses, ears, paws, and laptop visible above the copy-safe zone.
- Laptop safe area: desktop right 51–82% and vertical 47–71%; mobile upper-middle 18–88% and vertical 24–52%.

## Horizon, Lighting, and Atmosphere

- Horizon position: desktop horizon should sit near 48–55% of hero height; tablet near 46–54%; mobile near 38–45% so the lower overlay can carry readable copy.
- Dark lighting direction: warm orange key/rim light from lower right, cool moonlit fill from upper left, deep midnight/navy mountains.
- Light lighting direction: soft warm daylight from upper left with compatible orange accent highlights; no inverted dark artwork.
- Required empty space: maintain clean atmospheric negative space behind the headline on the left and above the centered navigation.

## Forbidden Crop Zones

- Do not crop mascot face, sunglasses, ears, paws, or laptop on any required viewport.
- Do not place required detail behind the desktop header navigation band.
- Do not place high-contrast detail behind the desktop headline safe area.
- Do not place logos, fake client marks, statistics, claims, awards, addresses, phone numbers, or testimonials in the illustration.
- Do not include text that would duplicate or conflict with live HTML copy.
