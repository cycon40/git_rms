import { Router } from 'express';
import archiver from 'archiver';
import fs from 'node:fs';
import { rawLog } from '../git.js';
import { REPO_PATH } from '../config.js';

const r = Router();

// GET /api/audit/logs?range=hash1..hash2
r.get('/logs', async (req, res, next) => {
  try {
    const range = req.query.range ? String(req.query.range) : undefined;
    const items = await rawLog(range);
    res.json({ ok: true, fetchedFrom: 'GET /api/audit/logs', items });
  } catch (e) { next(e); }
});

// GET /api/audit/export/snapshot.zip
r.get('/export/snapshot.zip', async (_req, res, next) => {
  try {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="snapshot.zip"');
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.directory(REPO_PATH, false);
    archive.finalize();
    archive.pipe(res);
  } catch (e) { next(e); }
});

export default r;
