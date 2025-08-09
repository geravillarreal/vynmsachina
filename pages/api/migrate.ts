// pages/api/migrate.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type InventoryData = {
  regions: any[];
  cities: any[];
  locations: any[];
};

// Helper: asegúrate de que sea array
const arr = (v: any) => (Array.isArray(v) ? v : []);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    // Importa el TS con exports nombrados o default; casteamos a any para evitar errores de tipos
    const legacy: any = await import('../../lib/data');

    // Toma exports nombrados (regions/cities/locations) o, si no existen, inténtalo desde default
    const regions = arr(legacy.regions ?? legacy.default?.regions);
    const cities = arr(legacy.cities ?? legacy.default?.cities);
    const locations = arr(legacy.locations ?? legacy.default?.locations);

    const payload: InventoryData = { regions, cities, locations };

    const DATA_PATH = path.join(process.cwd(), 'lib', 'inventory.json');
    fs.writeFileSync(DATA_PATH, JSON.stringify(payload, null, 2), 'utf8');

    return res.status(200).json({
      ok: true,
      counts: {
        regions: regions.length,
        cities: cities.length,
        locations: locations.length,
      },
      path: DATA_PATH,
    });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'migration failed' });
  }
}
