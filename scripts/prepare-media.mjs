/**
 * Compresses photos from source folder into src/assets/photos/
 * Run: node scripts/prepare-media.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = "C:/Users/Admin/Desktop/My files/asahene foundation";
const DEST = path.resolve(__dirname, "../src/assets/photos");

fs.mkdirSync(DEST, { recursive: true });

const MAP = [
  { src: "lawrence.png",                                            out: "director.jpg",      w: 800 },
  { src: "A4 - 77.png",                                            out: "performance-1.jpg", w: 1200 },
  { src: "A4 - 80.png",                                            out: "performance-2.jpg", w: 1200 },
  { src: "A4 - 81.png",                                            out: "performance-3.jpg", w: 1200 },
  { src: "Group 229.png",                                          out: "event-1.jpg",        w: 1200 },
  { src: "Group 231.png",                                          out: "event-2.jpg",        w: 1200 },
  { src: "ChatGPT Image Feb 13, 2026, 08_06_11 AM.png",           out: "ensemble.jpg",       w: 1200 },
  { src: "WhatsApp Image 2026-01-27 at 3.29.57 PM.jpeg",          out: "gallery-1.jpg",      w: 900 },
  { src: "WhatsApp Image 2026-01-27 at 3.29.57 PM (1).jpeg",      out: "gallery-2.jpg",      w: 900 },
  { src: "WhatsApp Image 2026-01-27 at 3.29.57 PM (2).jpeg",      out: "gallery-3.jpg",      w: 900 },
  { src: "WhatsApp Image 2026-01-27 at 3.29.58 PM.jpeg",          out: "gallery-4.jpg",      w: 900 },
  { src: "WhatsApp Image 2026-01-27 at 3.29.58 PM (1).jpeg",      out: "gallery-5.jpg",      w: 900 },
  { src: "WhatsApp Image 2026-01-27 at 3.29.58 PM (2).jpeg",      out: "gallery-6.jpg",      w: 900 },
  { src: "WhatsApp Image 2026-01-27 at 3.29.58 PM (3).jpeg",      out: "gallery-7.jpg",      w: 900 },
  { src: "WhatsApp Image 2026-01-27 at 3.29.59 PM.jpeg",          out: "gallery-8.jpg",      w: 900 },
  { src: "WhatsApp Image 2026-01-27 at 3.29.59 PM (1).jpeg",      out: "gallery-9.jpg",      w: 900 },
];

for (const { src, out, w } of MAP) {
  const input = path.join(SRC, src);
  const output = path.join(DEST, out);
  if (!fs.existsSync(input)) { console.warn("  MISSING:", src); continue; }
  await sharp(input)
    .resize(w, null, { withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(output);
  const kb = Math.round(fs.statSync(output).size / 1024);
  console.log(`✓ ${out} (${kb}KB)`);
}

console.log("\nDone. Photos written to src/assets/photos/");
