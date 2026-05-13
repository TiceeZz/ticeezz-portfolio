import sharp from 'sharp';
import { readdir, stat, unlink, rename } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG_DIR = join(__dirname, '..', 'public', 'images');

const MAX_DIMENSION = 2000;
const JPG_QUALITY = 80;
const PNG_QUALITY = 80;
const MIN_SIZE_TO_OPTIMIZE = 80 * 1024; // 80KB — skip files already small

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...await walk(full));
    } else if (/\.(jpe?g|png)$/i.test(e.name)) {
      files.push(full);
    }
  }
  return files;
}

async function optimize(filePath) {
  const ext = extname(filePath).toLowerCase();
  const original = await stat(filePath);
  totalBefore += original.size;

  if (original.size < MIN_SIZE_TO_OPTIMIZE) {
    totalAfter += original.size;
    return;
  }

  const tmp = filePath + '.tmp';
  try {
    if (ext === '.png') {
      await sharp(filePath)
        .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
        .png({ quality: PNG_QUALITY, palette: true })
        .toFile(tmp);
    } else {
      await sharp(filePath)
        .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
        .toFile(tmp);
    }

    const optimized = await stat(tmp);
    if (optimized.size < original.size) {
      await unlink(filePath);
      await rename(tmp, filePath);
      totalAfter += optimized.size;
      const saved = ((original.size - optimized.size) / 1024).toFixed(0);
      const pct = ((1 - optimized.size / original.size) * 100).toFixed(0);
      console.log(`  ${pct}% saved (${saved}KB) — ${filePath}`);
      count++;
    } else {
      await unlink(tmp);
      totalAfter += original.size;
    }
  } catch (err) {
    try { await unlink(tmp); } catch {}
    totalAfter += original.size;
    console.error(`  ERROR: ${filePath} — ${err.message}`);
  }
}

async function main() {
  console.log('Scanning images...');
  const files = await walk(IMG_DIR);
  console.log(`Found ${files.length} images. Optimizing...\n`);

  for (const f of files) {
    await optimize(f);
  }

  const beforeMB = (totalBefore / 1024 / 1024).toFixed(1);
  const afterMB = (totalAfter / 1024 / 1024).toFixed(1);
  const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1);
  const pct = ((1 - totalAfter / totalBefore) * 100).toFixed(0);

  console.log(`\nDone. ${count} files optimized.`);
  console.log(`${beforeMB}MB → ${afterMB}MB (${savedMB}MB / ${pct}% saved)`);
}

main().catch(console.error);
