import { Router } from 'express';
import { createRequirement, readRequirement, updateRequirement, historyForRequirement } from '../git.js';
import { validateRequirement } from '../schema.js';
const r = Router();
// POST /api/requirements
r.post('/', async (req, res, next) => {
    try {
        const { id, meta, body, message } = req.body;
        validateRequirement(meta);
        const commit = await createRequirement(id, meta, body || '', message || `feat(requirement): create ${id} - ${meta.title}`);
        res.json({ ok: true, ...commit });
    }
    catch (e) {
        next(e);
    }
});
// GET /api/requirements/:id
r.get('/:id', async (req, res, next) => {
    try {
        const data = await readRequirement(req.params.id);
        res.json({ ok: true, fetchedFrom: 'GET /api/requirements/:id', data });
    }
    catch (e) {
        next(e);
    }
});
// PUT /api/requirements/:id
r.put('/:id', async (req, res, next) => {
    try {
        const { meta, body, message } = req.body;
        validateRequirement(meta);
        const commit = await updateRequirement(req.params.id, meta, body || '', message || `chore(requirement): update ${req.params.id} - ${meta.title}`);
        res.json({ ok: true, ...commit });
    }
    catch (e) {
        next(e);
    }
});
// GET /api/requirements/:id/history
r.get('/:id/history', async (req, res, next) => {
    try {
        const items = await historyForRequirement(req.params.id);
        res.json({ ok: true, fetchedFrom: 'GET /api/requirements/:id/history', items });
    }
    catch (e) {
        next(e);
    }
});
export default r;
