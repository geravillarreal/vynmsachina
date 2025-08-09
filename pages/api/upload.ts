import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: { bodyParser: false }
};

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

const slugify = (s: string) =>
  (s || '')
    .toString()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // quita diacríticos
    .replace(/[^a-z0-9]+/g, '-')     // no alfanumérico -> guion
    .replace(/(^-|-$)/g, '')         // trim guiones
    .slice(0, 80);

function uniquePath(baseDir: string, baseName: string): string {
  // Evita sobrescribir: si existe, añade -1, -2, ...
  const { name, ext } = path.parse(baseName);
  let candidate = path.join(baseDir, baseName);
  if (!fs.existsSync(candidate)) return candidate;

  let i = 1;
  while (true) {
    const next = path.join(baseDir, `${name}-${i}${ext}`);
    if (!fs.existsSync(next)) return next;
    i++;
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = formidable({ multiples: true, maxFileSize: 50 * 1024 * 1024 });

  form.parse(req, (err, fields: any, files: any) => {
    if (err) return res.status(400).json({ error: 'Upload error' });

    const kind = (fields.kind as string) || 'image'; // 'image' | 'pdf'
    const pdfId = (fields.pdfId as string) || '';     // opcional
    const pdfTitle = (fields.pdfTitle as string) || '';// opcional

    const baseDir = path.join(
      process.cwd(),
      'public',
      'uploads',
      kind[0] === 'pdf' ? 'pdf' : 'images'
    );
    ensureDir(baseDir);

    const input = files.file as File | File[] | undefined;
    const arr = Array.isArray(input) ? input : input ? [input] : [];
    const results: string[] = [];

    arr.forEach((f) => {
      const orig = f.originalFilename || '';
      const ext = path.extname(orig).toLowerCase();

      if (kind[0] === 'pdf') {
        // Nombre deseado: <ID>-<slug(title)>.pdf (si hay datos); si no, fallback aleatorio
        const safeTitle = slugify(pdfTitle || path.basename(orig, ext) || 'document');
        const safeId = slugify(pdfId || '');
        const baseFile =
          (safeId ? `${safeId}-` : '') + (safeTitle || 'document') + '.pdf';

        const destPath = uniquePath(baseDir, baseFile);
        fs.copyFileSync(f.filepath, destPath);

        const publicPath = `/uploads/pdf/${path.basename(destPath)}`;
        results.push(publicPath);
      } else {
        // IMÁGENES: nombre aleatorio conservando extensión cuando exista
        const safeExt = ext || '.png';
        const name = `${Date.now()}_${Math.random().toString(36).slice(2)}${safeExt}`;
        const dest = path.join(baseDir, name);
        fs.copyFileSync(f.filepath, dest);

        const publicPath = `/uploads/images/${name}`;
        results.push(publicPath);
      }
    });

    return res.status(200).json({ paths: results });
  });
}
