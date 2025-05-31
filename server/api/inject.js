// server/api/inject.ts
import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const app = express();

router.get('/api/inject', async (req, res) => {
  console.log('req ///', req);
  const content = await fs.readFile(path.resolve('./inject.html'), 'utf-8');
  res.json({ content });
});

export default router;