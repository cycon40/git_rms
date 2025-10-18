import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ensureRepoReady } from './git.js';
import requirements from './routes/requirements.js';
import wiki from './routes/wiki.js';
import search from './routes/search.js';
import audit from './routes/audit.js';
import branches from './routes/branches.js';
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/requirements', requirements);
app.use('/api/wiki', wiki);
app.use('/api/search', search);
app.use('/api/audit', audit);
app.use('/api/branches', branches);
// error handler
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(400).json({ ok: false, error: String(err?.message || err) });
});
const PORT = process.env.PORT || 8080;
ensureRepoReady().then(() => {
    app.listen(PORT, () => console.log(`RMS API running on :${PORT}`));
});
