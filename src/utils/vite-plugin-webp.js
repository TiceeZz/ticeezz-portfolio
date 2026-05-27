import { existsSync, statSync, readdirSync } from 'fs';
import { extname, join } from 'path';

export function vitePluginWebp(options = {}) {
  const {
    quality = 80,
    include = ['.jpg', '.jpeg', '.png'],
  } = options;

  const extensions = new Set(
    include.map(e => e.startsWith('.') ? e.toLowerCase() : `.${e.toLowerCase()}`)
  );

  let outputDir;
  let isBuild = false;

  return {
    name: 'vite-plugin-webp',

    configResolved(config) {
      isBuild = config.command === 'build';
      outputDir = config.build.outDir;
    },

    closeBundle: {
      sequential: true,
      handler: async () => {
        if (!isBuild) return;

        const { default: sharp } = await import('sharp');

        const images = [];
        collectImages(outputDir, '', images);

        for (const relPath of images) {
          const absPath = join(outputDir, relPath);
          const webpRelPath = relPath.replace(/\.(jpe?g|png)$/i, '.webp');
          const webpAbsPath = join(outputDir, webpRelPath);

          if (existsSync(webpAbsPath)) {
            const origMtime = statSync(absPath).mtimeMs;
            const webpMtime = statSync(webpAbsPath).mtimeMs;
            if (webpMtime >= origMtime) continue;
          }

          try {
            await sharp(absPath)
              .webp({ quality })
              .toFile(webpAbsPath);
          } catch (err) {
            console.warn(`[vite-plugin-webp] Failed to convert ${relPath}: ${err.message}`);
          }
        }
      },
    },
  };
}

function collectImages(dir, prefix, result) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      collectImages(fullPath, relPath, result);
    } else if (entry.isFile()) {
      if (extensions.has(extname(entry.name).toLowerCase())) {
        result.push(relPath);
      }
    }
  }
}
