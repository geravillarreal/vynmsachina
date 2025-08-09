import type { NextApiRequest, NextApiResponse } from 'next';
import { readInventory, writeInventory } from '../../../lib/inventory';
import { Inventory, Region, City, Location } from '../../../types/inventory';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const inventory = await readInventory();

  switch (req.method) {
    case 'GET':
      res.status(200).json(inventory);
      break;
    case 'POST': {
      const { type, item } = req.body as { type: string; item: any };
      if (type === 'region') inventory.regions.push(item as Region);
      if (type === 'city') inventory.cities.push(item as City);
      if (type === 'location') inventory.locations.push(item as Location);
      await writeInventory(inventory);
      res.status(200).json({ message: 'created' });
      break;
    }
    case 'PUT': {
      const { type, item } = req.body as { type: string; item: any };
      const list = (inventory as any)[type + 's'] as any[];
      const idx = list.findIndex((i) => i.id === item.id);
      if (idx !== -1) {
        list[idx] = item;
        await writeInventory(inventory);
        res.status(200).json({ message: 'updated' });
      } else {
        res.status(404).json({ message: 'not found' });
      }
      break;
    }
    case 'DELETE': {
      const { type, id } = req.body as { type: string; id: string };
      const list = (inventory as any)[type + 's'] as any[];
      const idx = list.findIndex((i) => i.id === id);
      if (idx !== -1) {
        list.splice(idx, 1);
        await writeInventory(inventory);
        res.status(200).json({ message: 'deleted' });
      } else {
        res.status(404).json({ message: 'not found' });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
