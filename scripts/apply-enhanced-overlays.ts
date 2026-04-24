#!/usr/bin/env tsx
/**
 * Overlay the 36 LLM-enhanced blog drafts onto the exported Contentful content.
 *
 * Source: drafts/LLM-Enhanced-Blogs-For-Dev-Team/*-ENHANCED.md (messy editorial format)
 * Target: content/blog/<slug>.md (clean frontmatter + body)
 *
 * Behaviour:
 *   - Parses the messy enhanced format (# BLOG REWRITE: ..., ## Slug: ..., etc.)
 *   - Extracts title, slug, author, meta description, and the REWRITTEN ARTICLE CONTENT body
 *   - Preserves publishDate from the existing Contentful-exported file (keeps SEO signal of "not new")
 *   - Sets updatedDate to today (signals refresh to search engines)
 *   - Reuses thumbnailImage from the exported file (no new image downloads)
 *   - Remaps author display names to authors.ts keys
 *
 * Usage:
 *   npx tsx scripts/apply-enhanced-overlays.ts --dry-run         # analyse only
 *   npx tsx scripts/apply-enhanced-overlays.ts --execute         # write files
 *   npx tsx scripts/apply-enhanced-overlays.ts --execute --limit=1   # single test
 *
 * Phase 2F TODOs (post-migration cleanup):
 * 1. After merge to main and live verification, this script can be archived.
 * 2. Consider grepping the resulting content/blog/ for legacy APPG wording
 *    (resolves via enhanced overlays for 36, but leaves the 1 non-overlaid blog).
 */
/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

// ---- Config ----
const ENHANCED_DIR = path.join(process.cwd(), 'drafts', 'LLM-Enhanced-Blogs-For-Dev-Team');
const TARGET_DIR = path.join(process.cwd(), 'content', 'blog');
const TODAY = new Date().toISOString().split('T')[0];

// ---- CLI flag parsing ----
const args = process.argv.slice(2);
const DRY_RUN = !args.includes('--execute');
const limitArg = args.find(a => a.startsWith('--limit='));
const LIMIT = limitArg ? Number.parseInt(limitArg.split('=')[1]!, 10) : undefined;

// ---- Author name → key mapping ----
// Enhanced files credit these display names; map to authors.ts keys.
const AUTHOR_NAME_TO_KEY: Record<string, string> = {
  'Ammar Hanif': 'ammar-hanif',
  'Temur Khan': 'temur-khan',
  'Asid Hussain': 'asid-hussain',
  'Mr Rana Ashiq': 'rana-ashiq',
  'Rana Ashiq': 'rana-ashiq',
  'Asif Rana': 'rana-ashiq',
  'Asif Ashiq Rana': 'rana-ashiq',
};
const DEFAULT_AUTHOR_KEY = 'pixelette-team';

// ---- Parsing helpers ----

type ParsedEnhanced = {
  filename: string;
  title: string;
  slug: string;
  authorName: string | null;
  authorKey: string;
  suggestedMetaTitle: string | null;
  suggestedMetaDescription: string | null;
  body: string;
  warnings: string[];
};

function parseEnhancedFile(filepath: string): ParsedEnhanced | null {
  const filename = path.basename(filepath);
  const raw = fs.readFileSync(filepath, 'utf8');
  const warnings: string[] = [];

  // Title: first line starting with "# BLOG REWRITE:" or "# "
  const titleMatch = raw.match(/^#\s+(?:BLOG REWRITE:\s*)?(.+?)\s*$/m);
  const title = titleMatch ? titleMatch[1]!.trim() : '';
  if (!title) warnings.push('No title found');

  // Slug: "## Slug: <value>"
  const slugMatch = raw.match(/^##\s+Slug:\s*(\S+)\s*$/m);
  const slug = slugMatch ? slugMatch[1]!.trim() : '';
  if (!slug) warnings.push('No slug found');

  // Author: "## Author: <value>"
  const authorMatch = raw.match(/^##\s+Author:\s*(.+?)\s*$/m);
  const authorName = authorMatch ? authorMatch[1]!.trim() : null;
  let authorKey = DEFAULT_AUTHOR_KEY;
  if (authorName) {
    if (AUTHOR_NAME_TO_KEY[authorName]) {
      authorKey = AUTHOR_NAME_TO_KEY[authorName]!;
    } else {
      warnings.push(`Unmapped author name: "${authorName}" — falling back to ${DEFAULT_AUTHOR_KEY}`);
    }
  } else {
    warnings.push('No author field found — falling back to default');
  }

  // Suggested Meta Title: section under "### Suggested Meta Title" (first non-empty line after)
  const metaTitleMatch = raw.match(/^###\s+Suggested Meta Title\s*\n+(.+?)(?:\n|$)/m);
  const suggestedMetaTitle = metaTitleMatch ? metaTitleMatch[1]!.trim() : null;

  // Suggested Meta Description: section under "### Suggested Meta Description (...)" or "### Suggested Meta Description"
  const metaDescMatch = raw.match(/^###\s+Suggested Meta Description[^\n]*\n+([\s\S]+?)(?=\n\n###|\n\n##|$)/m);
  let suggestedMetaDescription: string | null = null;
  if (metaDescMatch) {
    suggestedMetaDescription = metaDescMatch[1]!.trim().replace(/\s+/g, ' ');
  }
  if (!suggestedMetaDescription) warnings.push('No suggested meta description found');

  // Body: everything after "## REWRITTEN ARTICLE CONTENT" and the following `---`
  // Drop the leading `---` if present right after the marker
  const bodyMatch = raw.match(/^##\s+REWRITTEN ARTICLE CONTENT\s*\n+(?:---\s*\n+)?([\s\S]+)$/m);
  let body = bodyMatch ? bodyMatch[1]!.trim() : '';
  if (!body) warnings.push('No REWRITTEN ARTICLE CONTENT section found');

  // Strip leading H1 if it duplicates the title (matches export script logic)
  body = stripLeadingH1(body, title);

  return {
    filename,
    title,
    slug,
    authorName,
    authorKey,
    suggestedMetaTitle,
    suggestedMetaDescription,
    body,
    warnings,
  };
}

function stripLeadingH1(markdown: string, title: string): string {
  const lines = markdown.split('\n');
  let firstIdx = 0;
  while (firstIdx < lines.length && !lines[firstIdx]!.trim()) firstIdx++;
  if (firstIdx >= lines.length) return markdown;
  const firstLine = lines[firstIdx]!.trim();
  const h1Match = /^#\s+(.+)$/.exec(firstLine);
  if (!h1Match) return markdown;
  const h1Text = h1Match[1]!.trim().toLowerCase();
  const titleLower = title.trim().toLowerCase();
  if (h1Text === titleLower
    || h1Text.startsWith(titleLower.slice(0, Math.min(20, titleLower.length)))
    || titleLower.startsWith(h1Text.slice(0, Math.min(20, h1Text.length)))) {
    lines.splice(firstIdx, 1);
    if (firstIdx < lines.length && !lines[firstIdx]!.trim()) {
      lines.splice(firstIdx, 1);
    }
    return lines.join('\n');
  }
  return markdown;
}

// ---- Main ----

async function main() {
  console.log('='.repeat(80));
  console.log('ENHANCED OVERLAY APPLIER');
  console.log('='.repeat(80));
  console.log(`Mode:      ${DRY_RUN ? 'DRY RUN (no files written)' : 'EXECUTE (will overwrite content/blog/)'}`);
  console.log(`Source:    ${ENHANCED_DIR}`);
  console.log(`Target:    ${TARGET_DIR}`);
  console.log(`Today:     ${TODAY}`);
  if (LIMIT) console.log(`Limit:     ${LIMIT}`);
  console.log();

  const enhancedFiles = fs.readdirSync(ENHANCED_DIR)
    .filter(f => f.endsWith('-ENHANCED.md'))
    .sort();

  console.log(`Found ${enhancedFiles.length} enhanced file(s) in source dir.`);
  console.log();

  const filesToProcess = LIMIT ? enhancedFiles.slice(0, LIMIT) : enhancedFiles;

  let overlaysApplied = 0;
  let slugMatched = 0;
  let slugMissing = 0;
  const allWarnings: Array<{ filename: string; warnings: string[] }> = [];

  for (const filename of filesToProcess) {
    const fullPath = path.join(ENHANCED_DIR, filename);
    const parsed = parseEnhancedFile(fullPath);
    if (!parsed) {
      console.log(`  ${filename}: FAILED to parse — skipping`);
      continue;
    }

    if (parsed.warnings.length > 0) {
      allWarnings.push({ filename, warnings: parsed.warnings });
    }

    const targetPath = path.join(TARGET_DIR, `${parsed.slug}.md`);
    if (!fs.existsSync(targetPath)) {
      console.log(`  ${parsed.slug}: NO MATCHING TARGET (will skip — slug '${parsed.slug}' not in content/blog/)`);
      slugMissing++;
      continue;
    }
    slugMatched++;

    const existingRaw = fs.readFileSync(targetPath, 'utf8');
    const { data: existingFm } = matter(existingRaw);

    const newFm: Record<string, any> = {
      title: parsed.title,
      slug: parsed.slug,
      description: parsed.suggestedMetaDescription ?? existingFm.description ?? '',
      author: parsed.authorKey,
      publishDate: existingFm.publishDate ?? TODAY,
      updatedDate: TODAY,
      thumbnailImage: existingFm.thumbnailImage ?? '',
    };
    if (typeof existingFm.readTime === 'number') {
      newFm.readTime = existingFm.readTime;
    }

    const fileContent = matter.stringify(parsed.body, newFm);

    if (DRY_RUN) {
      console.log(`  ${parsed.slug}: would overlay (${parsed.body.length} bytes body, author=${parsed.authorKey})`);
    } else {
      fs.writeFileSync(targetPath, fileContent, 'utf8');
      console.log(`  ${parsed.slug}: overlay applied (author=${parsed.authorKey}, body=${parsed.body.length} bytes)`);
      overlaysApplied++;
    }
  }

  console.log();
  console.log('='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));
  console.log(`Enhanced files processed:  ${filesToProcess.length}`);
  console.log(`Slugs matched to target:   ${slugMatched}`);
  console.log(`Slugs missing target:      ${slugMissing}`);
  if (!DRY_RUN) console.log(`Overlays applied:          ${overlaysApplied}`);
  console.log(`Files with warnings:       ${allWarnings.length}`);
  console.log();

  if (allWarnings.length > 0) {
    console.log('WARNINGS:');
    for (const { filename, warnings } of allWarnings) {
      console.log(`  ${filename}`);
      for (const w of warnings) console.log(`    ! ${w}`);
    }
    console.log();
  }

  if (DRY_RUN) {
    console.log('DRY RUN — no files written. Re-run with --execute to actually apply.');
  }
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
