/**
 * Strips the black background from the Asahene logo.
 * Usage: node scripts/process-logo.mjs <input-image-path>
 * Output: src/assets/logo.png (transparent background)
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/process-logo.mjs <path-to-logo>");
  process.exit(1);
}

const outputPath = path.resolve(__dirname, "../src/assets/logo.png");

// Read the image, convert to RGBA, then make near-black pixels transparent
const image = sharp(inputPath).ensureAlpha();
const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

const { width, height, channels } = info; // channels = 4 (RGBA)
const buf = Buffer.from(data);

for (let i = 0; i < buf.length; i += channels) {
  const r = buf[i];
  const g = buf[i + 1];
  const b = buf[i + 2];

  // Threshold: treat pixels darker than 40 in all channels as background
  if (r < 40 && g < 40 && b < 40) {
    buf[i + 3] = 0; // fully transparent
  } else if (r < 70 && g < 70 && b < 70) {
    // Soft edge: partially transparent for anti-aliased border pixels
    const darkness = Math.max(r, g, b);
    buf[i + 3] = Math.round((darkness / 70) * 255);
  }
}

await sharp(buf, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

console.log(`✓ Logo saved to ${outputPath}`);
console.log(`  Size: ${width}×${height}px`);
