// pages/api/inventory.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { readInventory, writeInventory } from '../../lib/inventory.store';
import type { InventoryData, Region, City, Location } from '../../lib/inventory.types';

const slugify = (s: string) =>
  (s || '')
    .toString()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40);

const rand = () => Math.random().toString(36).slice(2, 8);

function genUniqueId(kind: 'region'|'city'|'location', name: string | undefined, data: InventoryData): string {
  const base = name ? slugify(name) : kind;
  const set = new Set(
    kind === 'region' ? data.regions.map(r => r.id)
    : kind === 'city' ? data.cities.map(c => c.id)
    : data.locations.map(l => l.id)
  );
  let id = base || kind;
  if (!set.has(id)) return id;
  do { id = `${base || kind}-${rand()}`; } while (set.has(id));
  return id;
}

/** ---------- Helpers de archivos ---------- **/

// Normaliza brochure legado: 'archivo.pdf' -> '/pdf/archivo.pdf'
function normalizeBrochurePublicPath(brochure?: string): string | undefined {
  if (!brochure) return undefined;
  if (brochure.startsWith('/')) return brochure;
  // legado
  return `/pdf/${brochure}`;
}

// Devuelve TODAS las rutas públicas referenciadas por una location
function collectPublicPathsFromLocation(loc: Location): string[] {
  const paths: string[] = [];
  if (loc.image) paths.push(loc.image);
  if (loc.mapImage) paths.push(loc.mapImage);
  if (Array.isArray(loc.sliderImages)) paths.push(...loc.sliderImages.filter(Boolean) as string[]);
  const brochurePath = normalizeBrochurePublicPath(loc.brochure);
  if (brochurePath) paths.push(brochurePath);
  return paths
    .map(p => p.trim())
    .filter(Boolean)
    // Solo manejamos /uploads/* y /pdf/* (legado)
    .filter(p => p.startsWith('/uploads/images/') || p.startsWith('/uploads/pdf/') || p.startsWith('/pdf/'));
}

// Convierte ruta pública -> ruta absoluta en /public/ (sanitizada)
function toAbsolutePublicPath(publicPath: string): string | null {
  // Evitar traversal
  if (publicPath.includes('..')) return null;

  // Debe empezar por '/'
  if (!publicPath.startsWith('/')) return null;

  const rel = publicPath.replace(/^\/+/, ''); // quita leading '/'
  const abs = path.join(process.cwd(), 'public', rel);

  // Verificación: debe quedar bajo /public
  const publicRoot = path.join(process.cwd(), 'public');
  const resolved = path.resolve(abs);
  if (!resolved.startsWith(path.resolve(publicRoot))) return null;

  return resolved;
}

// ¿Alguna otra location (distinta a exceptId) referencia esta ruta pública?
function isPublicPathReferencedByOthers(data: InventoryData, publicPath: string, exceptId: string): boolean {
  const norm = publicPath.trim();
  for (const loc of data.locations) {
    if (loc.id === exceptId) continue;

    const paths = collectPublicPathsFromLocation(loc);
    if (paths.includes(norm)) return true;

    if (norm.startsWith('/pdf/')) {
      // si norm es /pdf/x.pdf, revisa si el loc.brochure es 'x.pdf' (legado)
      const legacyName = norm.replace(/^\/pdf\//, '');
      if (loc.brochure && !loc.brochure.startsWith('/') && loc.brochure === legacyName) {
        return true;
      }
    }
  }
  return false;
}

// Intenta borrar un archivo (si existe) con manejo de error silencioso
function tryUnlink(fileAbsPath: string) {
  try {
    if (fs.existsSync(fileAbsPath)) {
      fs.unlinkSync(fileAbsPath);
    }
  } catch (e: any) {
    console.error('[inventory unlink] error:', fileAbsPath, e?.message);
  }
}

/** ---------------------------------------- **/

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = readInventory();

  if (req.method === 'GET') {
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { type, item } = req.body || {};
    if (!type || !item) return res.status(400).json({ error: 'Missing type or item' });

    if (type === 'region') {
      const r: Region = { ...item };
      r.id = genUniqueId('region', r.name, data);
      data.regions.push(r);
    } else if (type === 'city') {
      const c: City = { ...item };
      c.id = genUniqueId('city', c.name, data);
      data.cities.push(c);
    } else if (type === 'location') {
      const l: Location = { ...item };
      l.id = genUniqueId('location', l.name, data);
      data.locations.push(l);
    } else {
      return res.status(400).json({ error: 'Invalid type' });
    }

    writeInventory(data);
    return res.status(201).json({ ok: true });
  }

  if (req.method === 'PUT') {
    const { type, item } = req.body || {};
    if (!type || !item || !item.id) return res.status(400).json({ error: 'Missing type or item.id' });

    const replace = <T extends { id: string }>(arr: T[]) => {
      const idx = arr.findIndex(x => x.id === item.id);
      if (idx === -1) return { ok: false, idx: -1 };
      arr[idx] = item;
      return { ok: true, idx };
    };

    if (type === 'region') {
      const { ok } = replace(data.regions as any);
      if (!ok) return res.status(404).json({ error: 'Not found' });
      writeInventory(data);
      return res.status(200).json({ ok: true });
    } else if (type === 'city') {
      const { ok } = replace(data.cities as any);
      if (!ok) return res.status(404).json({ error: 'Not found' });
      writeInventory(data);
      return res.status(200).json({ ok: true });
    } else if (type === 'location') {
      // 1) Encuentra la location actual y recolecta sus paths
      const idx = data.locations.findIndex(l => l.id === item.id);
      if (idx === -1) return res.status(404).json({ error: 'Not found' });

      const oldLoc = data.locations[idx];
      const oldPaths = collectPublicPathsFromLocation(oldLoc);

      // 2) Reemplaza por la nueva version
      data.locations[idx] = item as Location;

      // 3) Persiste primero el nuevo estado
      writeInventory(data);

      // 4) Determina qué archivos quedaron huérfanos (estaban antes pero ya no)
      const newPaths = collectPublicPathsFromLocation(item as Location);
      const toRemove = oldPaths.filter(p => !newPaths.includes(p));

      // 5) Para cada archivo huérfano, si nadie más lo usa, bórralo
      const removedFiles: string[] = [];
      for (const p of toRemove) {
        if (isPublicPathReferencedByOthers(data, p, (item as Location).id)) continue;
        const abs = toAbsolutePublicPath(p);
        if (abs) {
          tryUnlink(abs);
          removedFiles.push(p);
        }
      }

      return res.status(200).json({ ok: true, removedFiles });
    }

    return res.status(400).json({ error: 'Invalid type' });
  }

  if (req.method === 'DELETE') {
    const { type, id } = req.query as { type?: string; id?: string };
    if (!type || !id) return res.status(400).json({ error: 'Missing type or id' });

    if (type === 'region') {
      const before = data.regions.length;
      data.regions = data.regions.filter(r => r.id !== id);
      if (data.regions.length === before) return res.status(404).json({ error: 'Not found' });
      writeInventory(data);
      return res.status(200).json({ ok: true });
    }

    if (type === 'city') {
      const before = data.cities.length;
      data.cities = data.cities.filter(c => c.id !== id);
      if (data.cities.length === before) return res.status(404).json({ error: 'Not found' });
      writeInventory(data);
      return res.status(200).json({ ok: true });
    }

    if (type === 'location') {
      const idx = data.locations.findIndex(l => l.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Not found' });

      // 1) Recolecta rutas públicas de la location a borrar
      const loc = data.locations[idx];
      const publicPaths = collectPublicPathsFromLocation(loc);

      // 2) Borra del JSON
      data.locations.splice(idx, 1);
      writeInventory(data); // primero persistimos el estado sin la location

      // 3) Para cada archivo, si nadie más lo usa, bórralo del FS
      for (const p of publicPaths) {
        if (isPublicPathReferencedByOthers(data, p, loc.id)) continue;
        const abs = toAbsolutePublicPath(p);
        if (abs) tryUnlink(abs);
      }

      return res.status(200).json({ ok: true, removedFiles: publicPaths });
    }

    return res.status(400).json({ error: 'Invalid type' });
  }

  return res.status(405).end();
}
