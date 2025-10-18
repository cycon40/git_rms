import 'dotenv/config';
export const REPO_PATH = process.env.REPO_PATH || `${process.cwd()}/../repo`;
export const DEFAULT_BRANCH = process.env.DEFAULT_BRANCH || 'main';
export const REQUIREMENTS_DIR = 'requirements';
export const WIKI_DIR = 'wiki';
export const REQUIREMENT_EXT = '.md';
export const REQUIREMENT_SCHEMA_PATH = `${process.cwd()}/../schemas/requirement.schema.json`;
// CMMI / security
export const REQUIRE_SIGNED_MERGES = (process.env.REQUIRE_SIGNED_MERGES || 'true') === 'true';
