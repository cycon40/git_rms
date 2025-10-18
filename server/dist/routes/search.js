import { Router } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { REPO_PATH } from '../config.js';
const r = Router();
// naive recursive search in MD
async function searchFiles(q) {
    const results = [];
    async function walk(dir) {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const e of entries) {
            const fp = path.join(dir, e.name);
            if (e.isDirectory())
                await walk(fp);
            else if (e.isFile() && e.name.endsWith('.md')) {
                const raw = await fs.readFile(fp, 'utf8');
                const { data, content } = matter(raw);
                if (raw.toLowerCase().includes(q.toLowerCase())) {
                    results.push({
                        path: fp.replace(REPO_PATH + path.sep, ''),
                        id: data?.id || null,
                        title: data?.title || e.name,
                        snippet: content.slice(0, 160).replace(/\n/g, ' ')
                    });
                }
            }
        }
    }
    await walk(REPO_PATH);
    return results.slice(0, 200);
}
// GET /api/search?q=...
r.get('/', async (req, res, next) => {
    try {
        const q = String(req.query.q || '').trim();
        if (!q)
            return res.json({ ok: true, fetchedFrom: 'GET /api/search', results: [] });
        const results = await searchFiles(q);
        res.json({ ok: true, fetchedFrom: 'GET /api/search', results });
    }
    catch (e) {
        next(e);
    }
});
export default r;
