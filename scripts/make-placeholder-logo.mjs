import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(__dirname, "../src/assets/logo.png");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
  <circle cx="40" cy="40" r="38" fill="#2d7a3a" opacity="0.85"/>
  <text x="40" y="53" text-anchor="middle" font-size="38" font-family="Georgia,serif" fill="#d4af37" font-weight="bold">A</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log("Placeholder logo written to", out);
