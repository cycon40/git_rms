import { Router } from 'express';
import matter from 'gray-matter';
import { listDirTree, readFileAt } from '../git.js';
import { WIKI_DIR } from '../config.js';

const r = Router();

// GET /api/wiki/tree
r.get('/tree', async (_req, res, next) => {
  try {
    const tree = await listDirTree(WIKI_DIR);
    res.json({ ok: true, fetchedFrom: 'GET /api/wiki/tree', tree });
  } catch (e) { next(e); }
});

// GET /api/wiki/page?path=wiki/A/SubfolderA/_index.md
r.get('/page', async (req, res, next) => {
  try {
    const rel = String(req.query.path || '');
    if (!rel.startsWith('wiki/')) throw new Error('Path must be under wiki/');
    const raw = await readFileAt(rel);
    const doc = matter(raw);
    res.json({ ok: true, fetchedFrom: 'GET /api/wiki/page', meta: doc.data, body: doc.content });
  } catch (e) { next(e); }
});

export default r;
