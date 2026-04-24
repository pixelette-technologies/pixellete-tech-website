#!/usr/bin/env tsx
/**
 * Audit meta descriptions in enhanced source drafts.
 * Flags: too short, too long, missing terminator, ambiguous truncation.
 */
/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';

const ENHANCED_DIR = path.join(process.cwd(), 'drafts', 'LLM-Enhanced-Blogs-For-Dev-Team');

type Issue = {
  filename: string;
  description: string;
  length: number;
  problems: string[];
};

const enhancedFiles = fs.readdirSync(ENHANCED_DIR)
  .filter(f => f.endsWith('-ENHANCED.md'))
  .sort();

const issues: Issue[] = [];
const clean: Array<{ filename: string; length: number }> = [];

for (const filename of enhancedFiles) {
  const raw = fs.readFileSync(path.join(ENHANCED_DIR, filename), 'utf8');

  const metaDescMatch = raw.match(/^###\s+Suggested Meta Description[^\n]*\n+([\s\S]+?)(?=\n\n###|\n\n##|$)/m);
  if (!metaDescMatch) {
    issues.push({ filename, description: '', length: 0, problems: ['No meta description section found'] });
    continue;
  }

  const description = metaDescMatch[1]!.trim().replace(/\s+/g, ' ');
  const length = description.length;
  const problems: string[] = [];

  if (length < 120) {
    problems.push(`Too short: ${length} chars`);
  }
  if (length > 170) {
    problems.push(`Too long: ${length} chars`);
  }
  const lastChar = description.slice(-1);
  if (!['.', '!', '?'].includes(lastChar)) {
    problems.push(`No sentence-ending terminator (ends in '${lastChar}')`);
  }

  if (problems.length > 0) {
    issues.push({ filename, description, length, problems });
  } else {
    clean.push({ filename, length });
  }
}

console.log('='.repeat(80));
console.log('META DESCRIPTION AUDIT');
console.log('='.repeat(80));
console.log(`Total files:         ${enhancedFiles.length}`);
console.log(`Clean descriptions:  ${clean.length}`);
console.log(`Flagged:             ${issues.length}`);
console.log();

if (issues.length > 0) {
  console.log('FLAGGED:');
  for (const issue of issues) {
    console.log();
    console.log(`  ${issue.filename}  (${issue.length} chars)`);
    for (const p of issue.problems) {
      console.log(`    ! ${p}`);
    }
    console.log(`    Content: ${issue.description.slice(0, 200)}${issue.description.length > 200 ? '...' : ''}`);
  }
}
