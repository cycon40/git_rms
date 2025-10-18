import Ajv from 'ajv';
import fs from 'node:fs';
import { REQUIREMENT_SCHEMA_PATH } from './config.js';
const ajv = new Ajv({ allErrors: true, strict: false });
const schema = JSON.parse(fs.readFileSync(REQUIREMENT_SCHEMA_PATH, 'utf8'));
const validate = ajv.compile(schema);
export function validateRequirement(meta) {
    const ok = validate(meta);
    if (!ok) {
        const msg = (validate.errors || []).map(e => `${e.instancePath} ${e.message}`).join('; ');
        throw new Error(`Requirement metadata invalid: ${msg}`);
    }
}
