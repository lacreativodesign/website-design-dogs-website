import { existsSync, readdirSync, statSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "public/brand/asset-manifest-complete.json",
  "public/brand/logos/wdd-primary-full-color.svg",
  "public/brand/logos/wdd-logo-dark.svg",
  "public/brand/logos/wdd-logo-light.svg",
  "public/brand/identity/wdd-shield-black-glasses-512.webp",
  "public/brand/identity/wdd-logo-horizontal-black-glasses-1600.webp",
  "public/brand/social/wdd-social-share-1200x630.jpg",
  "public/brand/logos/wdd-primary-full-color.png",
  "public/brand/logos/wdd-primary-white-bg.png",
  "public/brand/mascot/wdd-mascot-transparent.png",
  "public/brand/illustrations/services/brand-contract.json",
  "public/brand/backgrounds/mountains-dark.webp",
  "public/brand/backgrounds/mountains-light.webp",
  "public/brand/backgrounds/waves-dark.webp",
  "public/brand/backgrounds/waves-light.webp",
  "public/brand/backgrounds/grid-dark.webp",
  "public/brand/backgrounds/grid-light.webp",
  "public/brand/favicons/favicon.ico",
  "public/brand/favicons/wdd-icon-16x16.png",
  "public/brand/favicons/wdd-icon-32x32.png",
  "public/brand/favicons/wdd-icon-48x48.png",
  "public/brand/favicons/wdd-icon-180x180.png",
  "public/brand/favicons/wdd-icon-192x192.png",
  "public/brand/favicons/favicon-256x256.png",
  "public/brand/favicons/wdd-icon-512x512.png",
  "public/brand/icons/website-design.svg",
  "public/brand/icons/development.svg",
  "public/brand/icons/ecommerce.svg",
  "public/brand/icons/seo.svg",
  "public/brand/icons/website-care.svg",
  "public/portfolio/concepts/saas-launch-thumb.svg",
  "public/portfolio/concepts/creative-portfolio-thumb.svg",
  "public/portfolio/concepts/wellness-membership-thumb.svg",
  "public/portfolio/concepts/local-marketplace-thumb.svg",
  "public/portfolio/concepts/course-academy-thumb.svg",
  "public/portfolio/concepts/conference-thumb.svg",
  "public/portfolio/concepts/nonprofit-thumb.svg",
  "public/portfolio/concepts/client-portal-thumb.svg",
];
const sceneNames = ["home", "services", "portfolio", "packages", "about", "contact", "faq", "privacy", "terms", "404"];
for (const name of sceneNames) for (const theme of ["dark", "light"]) requiredFiles.push(`public/brand/scenes/${name}-hero-${theme}.webp`);
const finalIllustrationSceneNames = ["home", "services", "portfolio", "packages", "package-detail", "service-detail", "about", "contact", "faq", "privacy", "terms", "refund", "cookie", "get-started", "404"];
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
const serviceContractPath = path.join(root, "public/brand/illustrations/services/brand-contract.json");
if (existsSync(serviceContractPath)) {
  const contract = JSON.parse(readFileSync(serviceContractPath, "utf8"));
  const assets = Object.entries(contract.assets ?? {});
  if (assets.length !== 10) errors.push(`Service illustration contract must contain 10 assets; found ${assets.length}`);
  if (!/orange.*hoodie/i.test(contract.mascotIdentity?.wardrobe ?? "")) errors.push("Service illustration contract must require the orange hoodie");
  if (!/black|dark navy/i.test(contract.mascotIdentity?.eyewear ?? "")) errors.push("Service illustration contract must require black or dark navy eyewear frames");
  for (const [slug, formats] of assets) {
    for (const format of contract.delivery?.formats ?? []) {
      const asset = formats?.[format];
      if (!asset?.path || !asset?.sha256) {
        errors.push(`Service illustration contract incomplete: ${slug}.${format}`);
        continue;
      }
      const relativePath = `public${asset.path}`;
      const absolutePath = path.join(root, relativePath);
      checkFile(relativePath);
      if (!existsSync(absolutePath)) continue;
      const bytes = readFileSync(absolutePath);
      const actualHash = createHash("sha256").update(bytes).digest("hex");
      if (actualHash !== asset.sha256) errors.push(`Service illustration checksum mismatch: ${relativePath}`);
      if (bytes.length > contract.delivery.maximumBytesPerAsset) errors.push(`Service illustration exceeds ${contract.delivery.maximumBytesPerAsset} bytes: ${relativePath}`);
      if (format === "webp" && (bytes.toString("ascii", 0, 4) !== "RIFF" || bytes.toString("ascii", 8, 12) !== "WEBP")) errors.push(`Invalid WebP asset: ${relativePath}`);
      if (format === "avif" && !bytes.subarray(0, 32).toString("ascii").includes("ftypavif")) errors.push(`Invalid AVIF asset: ${relativePath}`);
    }
  }
}
if (errors.length) { console.error("Asset verification failed:"); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
console.log("Asset verification passed.");
