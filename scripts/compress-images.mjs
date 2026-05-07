// Compresses covers + samples in /public to reduce repo + initial-load size.
// Run with: node scripts/compress-images.mjs

import sharp from "sharp";
import { readdir, stat, rename } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, "..", "public");

const TARGETS = [/^cover\d+\.png$/i, /^sample\d+\.png$/i, /^banner\d*\.png$/i];

const MAX_WIDTH = 2000;
const PNG_QUALITY = 80;
const PNG_EFFORT = 8;

const files = await readdir(PUBLIC_DIR);
const matches = files.filter((f) => TARGETS.some((re) => re.test(f)));

let totalBefore = 0;
let totalAfter = 0;

for (const file of matches) {
  const path = join(PUBLIC_DIR, file);
  const tmp = join(PUBLIC_DIR, file + ".tmp");
  const before = (await stat(path)).size;

  await sharp(path)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .png({ quality: PNG_QUALITY, compressionLevel: 9, effort: PNG_EFFORT, palette: true })
    .toFile(tmp);

  await rename(tmp, path);
  const after = (await stat(path)).size;
  totalBefore += before;
  totalAfter += after;
  const pct = ((1 - after / before) * 100).toFixed(1);
  console.log(
    `${file.padEnd(20)} ${(before / 1e6).toFixed(2).padStart(6)}MB → ${(after / 1e6)
      .toFixed(2)
      .padStart(6)}MB  (-${pct}%)`
  );
}

const totalPct = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
console.log(
  `\nTotal: ${(totalBefore / 1e6).toFixed(2)}MB → ${(totalAfter / 1e6).toFixed(2)}MB  (-${totalPct}%)`
);
