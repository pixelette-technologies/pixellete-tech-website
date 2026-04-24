#!/usr/bin/env tsx
/**
 * Compare production blog URLs against content/blog/ markdown files.
 * Flags any production URL that would 404 on the new Markdown system.
 */
/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';

const URL_FILE = path.join(process.cwd(), 'docs', 'migration-production-urls.txt');
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const urlText = fs.readFileSync(URL_FILE, 'utf8');
const prodSlugs = urlText
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .map((url) => {
    const match = url.match(/\/blog\/(.+?)$/);
    return match ? match[1]! : null;
  })
  .filter((s): s is string => s !== null);

const markdownFiles = fs.readdirSync(BLOG_DIR)
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace(/\.md$/, ''));

const markdownSlugs = new Set(markdownFiles);

console.log('='.repeat(80));
console.log('PRODUCTION URL AUDIT');
console.log('='.repeat(80));
console.log(`Production URLs:    ${prodSlugs.length}`);
console.log(`Markdown files:     ${markdownFiles.length}`);
console.log();

const missing = prodSlugs.filter(slug => !markdownSlugs.has(slug));

const prodSlugSet = new Set(prodSlugs);
const extra = markdownFiles.filter(slug => !prodSlugSet.has(slug));

console.log(`Matched:            ${prodSlugs.length - missing.length} / ${prodSlugs.length}`);
console.log(`Missing (PROD without MD):   ${missing.length}`);
console.log(`Extra   (MD without PROD):   ${extra.length}`);
console.log();

if (missing.length > 0) {
  console.log('! MISSING — Production URLs that have NO matching markdown file:');
  console.log('   These will 404 on the new system unless we add redirects or content.');
  console.log();
  for (const slug of missing) {
    console.log(`   X ${slug}`);
  }
  console.log();
}

if (extra.length > 0) {
  console.log('i EXTRA — Markdown files with no matching production URL:');
  console.log('   These are new blogs that didn\'t exist on production before.');
  console.log();
  for (const slug of extra) {
    console.log(`   + ${slug}`);
  }
  console.log();
}

if (missing.length === 0 && extra.length === 0) {
  console.log('+ PERFECT MATCH — all production URLs have content, no extra files.');
}
