#!/usr/bin/env node
/**
 * Reads every image under public/images/ and writes alongside it an
 * optimized .avif and .webp version, resized so the longest edge fits
 * within MAX_EDGE. The originals are left untouched so they remain
 * available as fallbacks for browsers that support neither AVIF nor
 * WebP, and so this script is safe to re-run.
 *
 * Quality settings are tuned for visual indistinguishability from the
 * source: AVIF 65 / WebP 85 for photographic content. Already-existing
 * outputs are skipped unless --force is passed.
 *
 *   node scripts/optimize-images.mjs            # only build missing outputs
 *   node scripts/optimize-images.mjs --force    # rebuild everything
 */

import { readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(fileURLToPath(import.meta.url), "../..");
const IMAGES_DIR = join(ROOT, "public", "images");
const MAX_EDGE = 1600;
const AVIF_QUALITY = 65;
const WEBP_QUALITY = 85;
const SOURCE_EXTS = new Set([".png", ".jpg", ".jpeg"]);

const force = process.argv.includes("--force");

const fmt = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const optimize = async (file) => {
  const fullPath = join(IMAGES_DIR, file);
  const stem = basename(file, extname(file));
  const avifPath = join(IMAGES_DIR, `${stem}.avif`);
  const webpPath = join(IMAGES_DIR, `${stem}.webp`);

  const src = sharp(fullPath).resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  });

  const original = (await stat(fullPath)).size;
  const results = { original };

  if (force || !existsSync(avifPath)) {
    await src.clone().avif({ quality: AVIF_QUALITY, effort: 4 }).toFile(avifPath);
    results.avif = (await stat(avifPath)).size;
  } else {
    results.avif = (await stat(avifPath)).size;
    results.avifSkipped = true;
  }

  if (force || !existsSync(webpPath)) {
    await src.clone().webp({ quality: WEBP_QUALITY, effort: 5 }).toFile(webpPath);
    results.webp = (await stat(webpPath)).size;
  } else {
    results.webp = (await stat(webpPath)).size;
    results.webpSkipped = true;
  }

  return { file, ...results };
};

const main = async () => {
  const entries = await readdir(IMAGES_DIR);
  const sources = entries.filter((f) => SOURCE_EXTS.has(extname(f).toLowerCase()));

  if (sources.length === 0) {
    console.log("No source images found in public/images/");
    return;
  }

  console.log(
    `Optimizing ${sources.length} image(s) → AVIF q${AVIF_QUALITY} + WebP q${WEBP_QUALITY}, max edge ${MAX_EDGE}px${force ? " (forced rebuild)" : ""}`,
  );
  console.log("");

  let totalOriginal = 0;
  let totalAvif = 0;
  let totalWebp = 0;

  for (const file of sources) {
    const r = await optimize(file);
    totalOriginal += r.original;
    totalAvif += r.avif;
    totalWebp += r.webp;
    const avifTag = r.avifSkipped ? " (cached)" : "";
    const webpTag = r.webpSkipped ? " (cached)" : "";
    console.log(
      `  ${file.padEnd(28)} ${fmt(r.original).padStart(10)} → AVIF ${fmt(r.avif).padStart(8)}${avifTag.padEnd(9)} · WebP ${fmt(r.webp).padStart(8)}${webpTag}`,
    );
  }

  console.log("");
  console.log(
    `Total: ${fmt(totalOriginal)} original → ${fmt(totalAvif)} AVIF / ${fmt(totalWebp)} WebP`,
  );
  console.log(
    `Savings vs original: AVIF ${(100 * (1 - totalAvif / totalOriginal)).toFixed(1)}% · WebP ${(100 * (1 - totalWebp / totalOriginal)).toFixed(1)}%`,
  );
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
