#!/usr/bin/env tsx
/**
 * Append a terminal period to the meta description in each enhanced draft
 * if the last character isn't already `.`, `!`, or `?`.
 *
 * Safe mechanical fix — source drafts are missing terminators uniformly.
 */
/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';

const ENHANCED_DIR = path.join(process.cwd(), 'drafts', 'LLM-Enhanced-Blogs-For-Dev-Team');
const DRY_RUN = !process.argv.includes('--execute');

const enhancedFiles = fs.readdirSync(ENHANCED_DIR)
  .filter(f => f.endsWith('-ENHANCED.md'))
  .sort();

let fixed = 0;
let already = 0;

for (const filename of enhancedFiles) {
  const fullPath = path.join(ENHANCED_DIR, filename);
  const raw = fs.readFileSync(fullPath, 'utf8');

  const pattern = /^(###\s+Suggested Meta Description[^\n]*\n+)([\s\S]+?)(\n\n(?=###|##|$))/m;
  const match = raw.match(pattern);

  if (!match) {
    console.log(`  ${filename}: no meta description block found — skipping`);
    continue;
  }

  const header = match[1]!;
  const description = match[2]!;
  const trailing = match[3]!;
  const trimmed = description.trim();
  const lastChar = trimmed.slice(-1);

  if (['.', '!', '?'].includes(lastChar)) {
    already++;
    console.log(`  ${filename}: already has terminator — skipping`);
    continue;
  }

  const newDescription = `${trimmed}.`;
  const newContent = raw.replace(pattern, `${header}${newDescription}${trailing}`);

  if (DRY_RUN) {
    console.log(`  ${filename}: would append period (${trimmed.length} → ${newDescription.length} chars)`);
    fixed++;
  } else {
    fs.writeFileSync(fullPath, newContent, 'utf8');
    console.log(`  ${filename}: fixed (${newDescription.length} chars)`);
    fixed++;
  }
}

console.log();
console.log('='.repeat(80));
console.log(`${DRY_RUN ? 'DRY RUN:' : 'DONE:'} fixed=${fixed}, already-terminated=${already}, total=${enhancedFiles.length}`);
console.log('='.repeat(80));
if (DRY_RUN) console.log('Re-run with --execute to apply fixes.');
