import path from 'node:path';
import fs from 'node:fs/promises';
import matter from 'gray-matter';
import simpleGit, { SimpleGit } from 'simple-git';
import {
  REPO_PATH, REQUIREMENTS_DIR, REQUIREMENT_EXT, DEFAULT_BRANCH
} from './config.js';

const git: SimpleGit = simpleGit(REPO_PATH);

export async function ensureRepoReady() {
  const isRepo = await git.checkIsRepo();
  if (!isRepo) {
    await git.init();
    await git.addConfig('user.name', 'rms-bot');
    await git.addConfig('user.email', 'rms-bot@example.com');
    await fs.mkdir(path.join(REPO_PATH, REQUIREMENTS_DIR), { recursive: true });
    await fs.mkdir(path.join(REPO_PATH, 'wiki'), { recursive: true });
    await git.add('.');
    await git.commit('chore: init repo');
    await git.checkoutLocalBranch(DEFAULT_BRANCH);
  }
}

export function filePathForRequirement(id: string) {
  return path.join(REPO_PATH, REQUIREMENTS_DIR, `${id}${REQUIREMENT_EXT}`);
}

export async function readRequirement(id: string) {
  const fp = filePathForRequirement(id);
  const raw = await fs.readFile(fp, 'utf8');
  const doc = matter(raw);
  const last = (await git.log({ file: path.relative(REPO_PATH, fp), n: 1 })).latest;
  return {
    id,
    path: fp,
    meta: doc.data,
    body: doc.content,
    commit: last?.hash ?? null,
    commitAuthor: last?.author_name ?? null,
    commitAt: last?.date ?? null
  };
}

export async function createRequirement(fileNameId: string, meta: any, body: string, commitMessage: string) {
  const fp = filePathForRequirement(fileNameId);
  const fm = matter.stringify(body, meta);
  await fs.writeFile(fp, fm, 'utf8');
  await git.add(path.relative(REPO_PATH, fp));
  const commit = await git.commit(commitMessage);
  return { path: fp, commit: commit.commit };
}

export async function updateRequirement(id: string, meta: any, body: string, commitMessage: string) {
  const fp = filePathForRequirement(id);
  const fm = matter.stringify(body, meta);
  await fs.writeFile(fp, fm, 'utf8');
  await git.add(path.relative(REPO_PATH, fp));
  const commit = await git.commit(commitMessage);
  return { path: fp, commit: commit.commit };
}

export async function historyForRequirement(id: string) {
  const fp = path.relative(REPO_PATH, filePathForRequirement(id));
  const log = await git.log({ file: fp });
  const diffs = await Promise.all(
    log.all.map(async (entry) => {
      const diff = await git.show([`${entry.hash}`, '--', fp]);
      return { ...entry, diff };
    })
  );
  return diffs;
}

// Wiki helpers
export async function readFileAt(relPath: string) {
  const fp = path.join(REPO_PATH, relPath);
  return fs.readFile(fp, 'utf8');
}

type WikiTreeNode =
  | { type: 'dir'; name: string; path: string; children: WikiTreeNode[] }
  | { type: 'file'; name: string; path: string };

export async function listDirTree(relDir: string): Promise<WikiTreeNode[]> {
  async function walk(curRel: string): Promise<WikiTreeNode[]> {
    const full = path.join(REPO_PATH, curRel);
    const entries = await fs.readdir(full, { withFileTypes: true });
    const children: WikiTreeNode[] = [];
    for (const e of entries) {
      if (e.name.startsWith('.')) continue;
      const childRel = path.join(curRel, e.name);
      if (e.isDirectory()) {
        const node: WikiTreeNode = { type: 'dir', name: e.name, path: childRel, children: await walk(childRel) };
        children.push(node);
      } else if (e.isFile() && e.name.endsWith('.md')) {
        children.push({ type: 'file', name: e.name, path: childRel });
      }
    }
    return children.sort((a, b) => a.name.localeCompare(b.name));
  }
  return walk(relDir);
}

export async function createBranch(name: string, from = DEFAULT_BRANCH) {
  await git.fetch().catch(()=>{});
  await git.checkout(from);
  await git.checkoutLocalBranch(name);
  return { branch: name };
}

export async function mergeBranch(source: string, target = DEFAULT_BRANCH) {
  await git.checkout(target);
  const res = await git.merge([source]);
  return res;
}

export async function rawLog(range?: string) {
  const args = range ? { from: range.split('..')[0], to: range.split('..')[1] } : undefined;
  const log = await git.log(args as any);
  return log.all;
}
