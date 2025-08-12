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

function nextNumericId<T extends { id: string }>(arr: T[]): string {
  const nums = arr
    .map(x => {
      const n = Number(x.id);
      return Number.isInteger(n) && n > 0 ? n : null;
    })
    .filter((n): n is number => n !== null);
  const max = nums.length ? Math.max(...nums) : 0;
  return String(max + 1);
}

// genera ID numérico por tipo
function genNumericId(kind: 'region'|'city'|'location', data: InventoryData): string {
  if (kind === 'region') return nextNumericId(data.regions);
  if (kind === 'city')   return nextNumericId(data.cities);
  return nextNumericId(data.locations);
}

function nextLocationConsecutive(data: InventoryData, regionId: string, cityId: string): string {
  // Busca IDs existentes con patrón regionId-cityId-<n>
  const re = new RegExp(`^${escapeRegExp(regionId)}-${escapeRegExp(cityId)}-(\\d+)$`);
  let max = 0;
  for (const l of data.locations) {
    const m = typeof l.id === 'string' ? l.id.match(re) : null;
    if (m && m[1]) {
      const n = Number(m[1]);
      if (Number.isInteger(n) && n > max) max = n;
    }
  }
  return String(max + 1);
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
      r.id = genNumericId('region', data); // <- ahora numérico
      data.regions.push(r);
    } else if (type === 'city') {
      const c: City = { ...item };
      c.id = genNumericId('city', data);
      data.cities.push(c);
    } else if (type === 'location') {
      const l: Location = { ...item };
      if (!l.cityId) {
        return res.status(400).json({ error: 'location.cityId is required to generate ID' });
      }
      const city = data.cities.find(c => c.id === l.cityId);
      if (!city) {
        return res.status(400).json({ error: `City not found for cityId=${l.cityId}` });
      }

      const regionId = city.regionId;
      const consecutive = nextLocationConsecutive(data, regionId, city.id);

      l.id = `${regionId}-${city.id}-${consecutive}`;

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
