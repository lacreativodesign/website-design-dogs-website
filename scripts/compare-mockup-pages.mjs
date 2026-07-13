import fs from "node:fs/promises";
import path from "node:path";

const crops = JSON.parse(await fs.readFile("tests/visual/reference-crops.json", "utf8"));
const root = "test-results/visual";
let sharp;
try {
  sharp = (await import("sharp")).default;
} catch (error) {
  throw new Error(`visual:compare requires sharp-compatible image processing at runtime: ${error instanceof Error ? error.message : String(error)}`);
}

function pngSize(buffer) {
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

async function rgba(file) {
  const image = sharp(file).ensureAlpha();
  const meta = await image.metadata();
  const data = await image.raw().toBuffer();
  return { data, width: meta.width ?? 0, height: meta.height ?? 0 };
}

await fs.mkdir(path.join(root, "diff"), { recursive: true });
const results = [];
for (const theme of ["dark", "light"]) {
  await fs.mkdir(path.join(root, "diff", theme), { recursive: true });
  for (const [page, crop] of Object.entries(crops)) {
    const referencePath = path.join(root, "reference", theme, `${page}.png`);
    const currentPath = path.join(root, "current", theme, `${page}.png`);
    const reference = await rgba(referencePath);
    const currentBuffer = await fs.readFile(currentPath);
    const currentSize = pngSize(currentBuffer);
    const targetHeight = Math.round(1440 * crop.height / crop.width);
    const heightDiff = Math.abs(currentSize.height - targetHeight);
    const heightPass = heightDiff <= Math.ceil(targetHeight * 0.005);

    const scaled = await sharp(currentPath).resize({ width: reference.width, withoutEnlargement: false }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const width = Math.max(reference.width, scaled.info.width);
    const height = Math.max(reference.height, scaled.info.height);
    const diff = Buffer.alloc(width * height * 4, 255);
    let total = 0;
    let high = 0;
    const count = width * height;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const rIdx = (y * reference.width + x) * 4;
        const cIdx = (y * scaled.info.width + x) * 4;
        const hasRef = x < reference.width && y < reference.height;
        const hasCur = x < scaled.info.width && y < scaled.info.height;
        const rd = hasRef ? reference.data[rIdx] : 255;
        const gd = hasRef ? reference.data[rIdx + 1] : 0;
        const bd = hasRef ? reference.data[rIdx + 2] : 255;
        const rc = hasCur ? scaled.data[cIdx] : 0;
        const gc = hasCur ? scaled.data[cIdx + 1] : 255;
        const bc = hasCur ? scaled.data[cIdx + 2] : 255;
        const d = (Math.abs(rd - rc) + Math.abs(gd - gc) + Math.abs(bd - bc)) / 3;
        total += d;
        if (d > 32) high++;
        diff[idx] = Math.min(255, d * 4);
        diff[idx + 1] = 0;
        diff[idx + 2] = 255 - diff[idx];
        diff[idx + 3] = 255;
      }
    }
    const mean = total / count;
    const highRatio = high / count;
    const pass = heightPass && mean <= 14 && highRatio <= 0.1;
    await sharp(diff, { raw: { width, height, channels: 4 } }).png().toFile(path.join(root, "diff", theme, `${page}-heatmap.png`));
    results.push({ page, theme, targetHeight, actualHeight: currentSize.height, heightDiff, meanAbsoluteDifference: Number(mean.toFixed(3)), highDifferencePixelRatio: Number(highRatio.toFixed(4)), pass });
    console.log(`${theme} ${page}: height ${currentSize.height}/${targetHeight}, mean ${mean.toFixed(2)}, high ${(highRatio * 100).toFixed(2)}%, ${pass ? "PASS" : "FAIL"}`);
  }
}
await fs.writeFile(path.join(root, "results.json"), JSON.stringify(results, null, 2));
if (results.some((result) => !result.pass)) process.exit(1);
