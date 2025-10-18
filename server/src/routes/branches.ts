import { Router } from 'express';
import { createBranch, mergeBranch } from '../git.js';

const r = Router();

// POST /api/branches
r.post('/', async (req, res, next) => {
  try {
    const name = String(req.body.name);
    const from = String(req.body.from || 'main');
    const out = await createBranch(name, from);
    res.json({ ok: true, fetchedFrom: 'POST /api/branches', ...out });
  } catch (e) { next(e); }
});

// POST /api/branches/merge
r.post('/merge', async (req, res, next) => {
  try {
    const { source, target } = req.body;
    const out = await mergeBranch(source, target);
    res.json({ ok: true, fetchedFrom: 'POST /api/branches/merge', ...out });
  } catch (e) { next(e); }
});

export default r;
