import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { user, pass } = req.body || {};
  if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
    // Set a simple httpOnly cookie (1 day)
    res.setHeader('Set-Cookie', `admin_auth=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`);
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ error: 'Unauthorized' });
}