import fs from 'fs/promises';
import path from 'path';
import { Inventory } from '../types/inventory';

const filePath = path.join(process.cwd(), 'lib', 'inventory.json');

export async function readInventory(): Promise<Inventory> {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data) as Inventory;
}

export async function writeInventory(data: Inventory): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
