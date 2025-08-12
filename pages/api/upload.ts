// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

// Next 13+/Node 18 ya trae fetch global
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

function safePdfNameFromUrl(raw: string): string {
  try {
    const u = new URL(raw);
    const base = path.basename(u.pathname) || 'document.pdf';
    const ext = path.extname(base).toLowerCase();
    const stem = ext ? base.slice(0, -ext.length) : base;
    const safeStem = stem
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 100) || 'document';
    return (safeStem + (ext === '.pdf' ? ext : '.pdf')).toLowerCase();
  } catch {
    return 'document.pdf';
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = formidable({ multiples: true, maxFileSize: 50 * 1024 * 1024 });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ error: 'Upload error' });

    const kindField = (fields.kind as string[] | undefined)?.[0];
    const kind = kindField === 'pdf' ? 'pdf' : 'image';

    // Si viene URL y es PDF, hacemos fetch server-side y guardamos.
    const urlField = (fields.url as string[] | undefined)?.[0];

    // Base dir por tipo
    const baseDir = path.join(
      process.cwd(),
      'public',
      'uploads',
      kind === 'pdf' ? 'pdf' : 'images'
    );
    ensureDir(baseDir);

    // Rama: descarga PDF desde URL
    if (kind === 'pdf' && urlField && !(files as any).file) {
      try {
        const resp = await fetch(urlField, { method: 'GET' });
        if (!resp.ok) {
          return res.status(400).json({ error: `Fetch failed: ${resp.status}` });
        }
        // Content-Type opcionalmente validado
        const ct = resp.headers.get('content-type') || '';
        if (!ct.includes('pdf')) {
          // No bloqueamos estrictamente por si el servidor no envía header correcto
          // pero podrías hacer: return res.status(415).json({ error: 'URL is not a PDF' });
        }

        const desiredName = safePdfNameFromUrl(urlField);
        const destPath = uniquePath(baseDir, desiredName);
        const dest = fs.createWriteStream(destPath);

        // Stream to file (sin cargar todo en memoria)
        // @ts-ignore: Node fetch body es ReadableStream
        await pipeline(resp.body as any, dest);

        return res.status(200).json({ paths: [`/uploads/pdf/${path.basename(destPath)}`] });
      } catch (e: any) {
        return res.status(500).json({ error: e?.message || 'Download failed' });
      }
    }

    // Rama: archivos subidos desde el form (igual que antes)
    const input = (files as any).file as File | File[] | undefined;
    const arr = Array.isArray(input) ? input : input ? [input] : [];
    if (arr.length === 0) return res.status(400).json({ error: 'No file uploaded' });

    const results: string[] = [];
    for (const f of arr) {
      const origName = f.originalFilename || f.newFilename || 'file';
      const ext = (path.extname(origName) || (kind === 'pdf' ? '.pdf' : '.png')).toLowerCase();

      if (kind === 'pdf') {
        // Guardar con nombre original (evitar colisión con uniquePath)
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
