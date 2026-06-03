/**
 * Saves the logo image from a source path, removes the black background,
 * and writes src/assets/logo.png with transparency.
 *
 * Usage: node scripts/save-logo.mjs <source-image-path>
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: node scripts/save-logo.mjs <path-to-logo-image>");
  process.exit(1);
}

const outputPath = path.resolve(__dirname, "../src/assets/logo.png");

const image = sharp(inputPath).ensureAlpha();
const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const buf = Buffer.from(data);

for (let i = 0; i < buf.length; i += channels) {
  const r = buf[i];
  const g = buf[i + 1];
  const b = buf[i + 2];

  if (r < 40 && g < 40 && b < 40) {
    buf[i + 3] = 0;
  } else if (r < 80 && g < 80 && b < 80) {
    const brightness = Math.max(r, g, b);
    buf[i + 3] = Math.round((brightness / 80) * 200);
  }
}

await sharp(buf, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

console.log(`✓ Logo written → ${outputPath} (${width}×${height})`);
