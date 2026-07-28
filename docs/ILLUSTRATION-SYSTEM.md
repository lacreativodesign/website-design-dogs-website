# Website Design Dogs illustration system

The final illustration system gives each major conversion surface its own scene while keeping one recognizable brand character.

## Character direction

- Black-and-white border collie with a white blaze and muzzle
- Dark sunglasses
- Orange hoodie or orange accent
- Confident, helpful web-design partner rather than a generic pet mascot
- Premium dark editorial treatment with moonlit navy environments and restrained orange highlights

## Production scenes

| Scene | Purpose |
| --- | --- |
| Home | Mascot designing at a laptop beside a mountain lake |
| Services | Presenting website capabilities on a tablet |
| Portfolio | Reviewing distinct website concepts in a creative studio |
| About | Team planning around a mountain campfire |
| Contact | Ready to discuss a project at a studio desk |
| Get started | Mapping a project brief at a planning board |
| 404 | Explorer finding the route home |

Every scene ships as a 1600×1000 desktop composition, 1200×900 tablet composition, and 768×1024 mobile composition. AVIF is the preferred source and WebP is the fallback. The standalone mascot is 960×960 in both formats.

## Implementation rules

- Use the paths exported by `src/content/illustrations.ts`.
- Render scenes with `ThemeScene` so responsive crops and format fallbacks remain consistent.
- Preserve meaningful alt text for informative hero art; use an empty alt only when the same scene is repeated decoratively.
- Keep width and height aligned with the source dimensions to avoid layout shift.
- Do not reuse one scene as a substitute for another conversion surface.
