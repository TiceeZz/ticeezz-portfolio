import sharp from 'sharp';
import { readdir, stat, unlink, rename } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG_DIR = join(__dirname, '..', 'public', 'images');

const MAX_DIM = 1600;
const JPG_QUALITY = 82;
const MIN_SIZE = 10 * 1024; // skip already-tiny files

let stats = { totalBefore: 0, totalAfter: 0, converted: 0, compressed: 0, skipped: 0, removed: 0 };

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

async function processFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  const original = await stat(filePath);
  stats.totalBefore += original.size;

  if (original.size < MIN_SIZE) {
    stats.totalAfter += original.size;
    stats.skipped++;
    return;
  }

  // Convert PNG → JPEG
  if (ext === '.png') {
    const jpgPath = filePath.replace(/\.png$/i, '.jpg');
    if (existsSync(jpgPath)) {
      await unlink(filePath); // PNG is redundant alongside existing JPG
      stats.removed++;
      return;
    }
    const tmp = jpgPath + '.tmp';
    try {
      await sharp(filePath)
        .resize(MAX_DIM, MAX_DIM, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
        .toFile(tmp);
      const result = await stat(tmp);
      await unlink(filePath);
      await rename(tmp, jpgPath);
      stats.totalAfter += result.size;
      stats.converted++;
      const pct = ((1 - result.size / original.size) * 100).toFixed(0);
      console.log(`  PNG→JPG: ${filePath.replace(IMG_DIR, '')}  (${(original.size/1024).toFixed(0)}→${(result.size/1024).toFixed(0)}KB, -${pct}%)`);
    } catch (err) {
      try { await unlink(tmp); } catch {}
      stats.totalAfter += original.size;
      console.error(`  FAILED: ${filePath} — ${err.message}`);
    }
    return;
  }

  // Compress existing JPEG
  const tmp = filePath + '.tmp';
  try {
    await sharp(filePath)
      .resize(MAX_DIM, MAX_DIM, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
      .toFile(tmp);
    const result = await stat(tmp);
    if (result.size < original.size * 0.95) {
      await unlink(filePath);
      await rename(tmp, filePath);
      stats.totalAfter += result.size;
      stats.compressed++;
      const pct = ((1 - result.size / original.size) * 100).toFixed(0);
      console.log(`  compress: ${filePath.replace(IMG_DIR, '')}  (${(original.size/1024).toFixed(0)}→${(result.size/1024).toFixed(0)}KB, -${pct}%)`);
    } else {
      await unlink(tmp);
      stats.totalAfter += original.size;
      stats.skipped++;
    }
  } catch (err) {
    try { await unlink(tmp); } catch {}
    stats.totalAfter += original.size;
    console.error(`  FAILED: ${filePath} — ${err.message}`);
  }
}

async function main() {
  const start = Date.now();
  console.log('Scanning images...');
  const files = await walk(IMG_DIR);
  console.log(`Found ${files.length} images. Processing...\n`);

  for (const f of files) {
    await processFile(f);
  }

  const mbB = (stats.totalBefore / 1024 / 1024).toFixed(1);
  const mbA = (stats.totalAfter / 1024 / 1024).toFixed(1);
  const saved = ((stats.totalBefore - stats.totalAfter) / 1024 / 1024).toFixed(1);
  const pct = stats.totalBefore ? ((1 - stats.totalAfter / stats.totalBefore) * 100).toFixed(0) : 0;

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`  PNG→JPG: ${stats.converted}  |  Compressed: ${stats.compressed}`);
  console.log(`  Duplicates removed: ${stats.removed}  |  Skipped: ${stats.skipped}`);
  console.log(`  ${mbB} MB → ${mbA} MB  (saved ${saved} MB, ${pct}%)`);
  console.log(`  Done in ${Date.now() - start}ms`);
}

main().catch(console.error);
