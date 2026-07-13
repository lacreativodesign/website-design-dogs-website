import fs from "node:fs/promises";
import path from "node:path";

const boards = {
  dark: "references/approved-dark-page-board.png",
  light: "references/approved-light-page-board.png",
};
const outRoot = "test-results/visual/reference";

function pngSize(buffer) {
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

const crops = JSON.parse(await fs.readFile("tests/visual/reference-crops.json", "utf8"));
let sharp;
try {
  sharp = (await import("sharp")).default;
} catch (error) {
  throw new Error(`visual:extract requires sharp-compatible image processing at runtime: ${error instanceof Error ? error.message : String(error)}`);
}

await fs.rm("test-results/visual/reference", { recursive: true, force: true });
for (const [theme, file] of Object.entries(boards)) {
  const buffer = await fs.readFile(file);
  const { width, height } = pngSize(buffer);
  if (width !== 1536 || height !== 1024) {
    throw new Error(`${file} must be 1536x1024, got ${width}x${height}`);
  }
  await fs.mkdir(path.join(outRoot, theme), { recursive: true });
  for (const [name, crop] of Object.entries(crops)) {
    await sharp(file).extract(crop).png().toFile(path.join(outRoot, theme, `${name}.png`));
  }
}
console.log("Mockup reference crops extracted to test-results/visual/reference.");
