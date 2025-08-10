// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = { api: { bodyParser: false } };

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function uniquePath(baseDir: string, baseName: string): string {
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

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).json({ error: 'Upload error' });

    // 'image' | 'pdf' (default: image)
    const kindField = (fields.kind as string[] | undefined)?.[0];
    const kind = kindField === 'pdf' ? 'pdf' : 'image';

    const baseDir = path.join(
      process.cwd(),
      'public',
      'uploads',
      kind === 'pdf' ? 'pdf' : 'images'
    );
    ensureDir(baseDir);

    const input = (files as any).file as File | File[] | undefined;
    const arr = Array.isArray(input) ? input : input ? [input] : [];
    if (arr.length === 0) return res.status(400).json({ error: 'No file uploaded' });

    const results: string[] = [];

    for (const f of arr) {
      const origName = f.originalFilename || f.newFilename || 'file';
      const ext = (path.extname(origName) || (kind === 'pdf' ? '.pdf' : '.png')).toLowerCase();

      console.log(kind)

      if (kind === 'pdf') {
        // Mantener nombre original (evita colisiones con uniquePath)
        const desired = path.basename(origName, path.extname(origName)) + ext;
        const destPath = uniquePath(baseDir, desired);
        fs.renameSync(f.filepath, destPath);
        results.push(`/uploads/pdf/${path.basename(destPath)}`);
      } else {
        // Imagen -> nombre único
        const name = `${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`;
        const dest = path.join(baseDir, name);
        fs.renameSync(f.filepath, dest);
        results.push(`/uploads/images/${name}`);
      }
    }

    return res.status(200).json({ paths: results });
  });
}
