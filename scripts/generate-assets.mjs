import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('src/assets');
const output = path.join(root, 'generated');
const manifest = {};
const imports = [];
const records = [];
await mkdir(output, { recursive: true });
async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === 'generated') continue;
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) { await visit(source); continue; }
    if (!/\.(png|jpe?g)$/i.test(entry.name)) continue;
    const relative = path.relative(root, source).replaceAll('\\', '/');
    const stem = relative.replace(/\.[^.]+$/, '');
    const { width, height } = await sharp(source).metadata();
    const variants = [];
    const index = Object.keys(manifest).length;
    imports.push(`import original${index} from ${JSON.stringify(`../${relative}`)};`);
    for (const size of [640, 1280]) {
      const target = `${stem}-${size}.webp`;
      await mkdir(path.dirname(path.join(output, target)), { recursive: true });
      await sharp(source).resize({ width: size, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(output, target));
      variants.push({ width: Math.min(size, width), path: target });
      if (size === 1280 || width > 640) imports.push(`import variant${index}_${size} from ${JSON.stringify(`./${target}`)};`);
    }
    manifest[relative] = { width, height, variants };
    const sourceSet = variants[0].width === variants[1].width
      ? `\${variant${index}_1280} ${variants[1].width}w`
      : `\${variant${index}_640} ${variants[0].width}w, \${variant${index}_1280} ${variants[1].width}w`;
    records.push(`  [original${index}]: { thumbnail: variant${index}_1280, srcSet: \`${sourceSet}\`, width: ${width}, height: ${height} }`);
  }
}
await visit(root);
await writeFile(path.join(output, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(path.join(output, 'imageVariants.js'), `${imports.join('\n')}\n\nexport const imageVariants = {\n${records.join(',\n')}\n};\n`);
await sharp('public/social-preview.svg').png().toFile('public/social-preview.png');
console.log(`Generated responsive WebP images for ${Object.keys(manifest).length} screenshots.`);
