# Git-First RMS (Minimal Stack)

This repo treats **Git as the database** for requirements and wiki content.

## Quick start
1. `cp .env.example .env`
2. `docker compose up --build`
3. UI: http://localhost:5173  |  API: http://localhost:8080/api/health

## Layout
```
repo/                # canonical datastore
  requirements/      # Markdown with YAML front-matter
  wiki/              # hierarchical wiki pages
  attachments/       # large artifacts (referenced by path/hash)
server/              # Express + simple-git
web/                 # React + Vite
schemas/             # JSON Schemas
```

## Minimal API
- `POST /api/requirements` create & commit
- `GET  /api/requirements/:id` read latest
- `PUT  /api/requirements/:id` update & commit
- `GET  /api/requirements/:id/history` commit history & diffs
- `GET  /api/search?q=...` naive full-text over repo
- `GET  /api/wiki/tree` list wiki hierarchy
- `GET  /api/wiki/page?path=wiki/.../_index.md` read wiki page
- `GET  /api/audit/logs` raw git log
- `GET  /api/audit/export/snapshot.zip` zip of repo

## CMMI-5 Notes
- Front-matter schema enforces traceability fields (id, status, links, tags).
- Git commits surface authoritative audit (author, date, sha, diff).
- `/repo/wiki` provides Confluence-like hierarchy via `_index.md`.
