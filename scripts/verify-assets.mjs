import { existsSync, readdirSync, statSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "public/brand/asset-manifest-complete.json",
  "public/brand/logos/wdd-primary-full-color.svg",
  "public/brand/logos/wdd-primary-full-color.png",
  "public/brand/logos/wdd-primary-white-bg.png",
  "public/brand/mascot/wdd-mascot-transparent.png",
  "public/brand/backgrounds/mountains-dark.webp",
  "public/brand/backgrounds/mountains-light.webp",
  "public/brand/backgrounds/waves-dark.webp",
  "public/brand/backgrounds/waves-light.webp",
  "public/brand/backgrounds/grid-dark.webp",
  "public/brand/backgrounds/grid-light.webp",
  "public/brand/favicons/favicon.ico",
  "public/brand/favicons/favicon-16x16.png",
  "public/brand/favicons/favicon-32x32.png",
  "public/brand/favicons/favicon-48x48.png",
  "public/brand/favicons/favicon-180x180.png",
  "public/brand/favicons/favicon-192x192.png",
  "public/brand/favicons/favicon-256x256.png",
  "public/brand/favicons/favicon-512x512.png",
  "public/brand/icons/website-design.svg",
  "public/brand/icons/development.svg",
  "public/brand/icons/ecommerce.svg",
  "public/brand/icons/seo.svg",
  "public/brand/icons/website-care.svg",
];
const sceneNames = ["home", "services", "portfolio", "packages", "about", "contact", "faq", "privacy", "terms", "404"];
for (const name of sceneNames) for (const theme of ["dark", "light"]) requiredFiles.push(`public/brand/scenes/${name}-hero-${theme}.webp`);
const finalIllustrationSceneNames = ["home", "services", "portfolio", "about", "contact", "get-started", "404"];
for (const name of finalIllustrationSceneNames) {
  for (const breakpoint of ["desktop", "tablet", "mobile"]) {
    for (const format of ["webp", "avif"]) {
      requiredFiles.push(`public/brand/illustrations/final/${name}-${breakpoint}.${format}`);
    }
  }
}
for (const format of ["webp", "avif"]) requiredFiles.push(`public/brand/illustrations/final/mascot-designer.${format}`);
const requiredDirs = ["public/portfolio/concepts", "public/campaigns/cleaning", "public/campaigns/landscaping", "public/campaigns/home-services", "public/campaigns/roofing"];
const errors = [];
function checkFile(relativePath) { const absolutePath = path.join(root, relativePath); if (!existsSync(absolutePath)) { errors.push(`Missing file: ${relativePath}`); return; } if (!statSync(absolutePath).isFile()) { errors.push(`Not a file: ${relativePath}`); return; } if (statSync(absolutePath).size === 0) errors.push(`Zero-byte file: ${relativePath}`); }
for (const file of requiredFiles) checkFile(file);
for (const dir of requiredDirs) { const absolutePath = path.join(root, dir); if (!existsSync(absolutePath) || !statSync(absolutePath).isDirectory()) errors.push(`Missing directory: ${dir}`); }
const manifestPath = path.join(root, "public/brand/asset-manifest-complete.json");
if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const manifestPaths = [];
  const collect = (value) => { if (typeof value === "string" && value.startsWith("/")) manifestPaths.push(value); else if (Array.isArray(value)) value.forEach(collect); else if (value && typeof value === "object") Object.values(value).forEach(collect); };
  collect(manifest.productionAssets);
  collect(manifest.scenePairs);
  collect(manifest.finalIllustrations);
  for (const manifestPathValue of manifestPaths) {
    const relative = `public${manifestPathValue}`.replace(/\/$/, "");
    const absolute = path.join(root, relative);
    if (!existsSync(absolute)) errors.push(`Manifest path missing: ${manifestPathValue}`);
    else if (statSync(absolute).isFile() && statSync(absolute).size === 0) errors.push(`Manifest path zero bytes: ${manifestPathValue}`);
    else if (statSync(absolute).isDirectory()) {
      const entries = readdirSync(absolute).filter((entry) => !entry.startsWith("."));
      if (entries.length === 0) errors.push(`Manifest directory empty: ${manifestPathValue}`);
    }
  }
}
if (errors.length) { console.error("Asset verification failed:"); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
console.log("Asset verification passed.");
