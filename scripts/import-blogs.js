/* eslint-disable no-console */
/*
 * Bulk-import Markdown blog posts into Contentful `blogsPage` entries.
 *
 * DEFAULT MODE: DRY RUN. No writes to Contentful.
 * WRITE MODE:   Pass --execute flag to actually create/update drafts.
 *
 * Behaviour:
 *   - Reads every .md file from drafts/
 *   - Parses frontmatter. Supports two formats:
 *       a) Clean frontmatter (--- yaml ---) — preferred
 *       b) Messy "BLOG REWRITE" format (fallback parser)
 *   - Matches by slug against existing blogsPage entries
 *       - Match -> UPDATE existing entry
 *       - No match -> CREATE new entry as DRAFT
 *   - Validates thumbnailImageId against real assets
 *   - Validates authorId against real author entries (or uses default)
 *   - Converts markdown body -> Contentful RichText
 *   - Flags inline images and tables for review
 *   - NEVER publishes. Always leaves entries as drafts.
 *
 * Run:
 *   node scripts/import-blogs.js              # dry run (default)
 *   node scripts/import-blogs.js --execute    # perform writes
 *   node scripts/import-blogs.js --list-authors
 *   node scripts/import-blogs.js --list-slugs
 */

const fs = require('node:fs');
const path = require('node:path');
const contentfulManagement = require('contentful-management');
const matter = require('gray-matter');
const { richTextFromMarkdown } = require('@contentful/rich-text-from-markdown');

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.local') });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CMA_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENV_NAME = process.env.CONTENTFUL_ENVIRONMENT || 'master';

if (!SPACE_ID || !CMA_TOKEN) {
  console.error('ERROR: CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN must be set in .env.local');
  process.exit(1);
}

const args = process.argv.slice(2);
const EXECUTE = args.includes('--execute');
const LIST_AUTHORS = args.includes('--list-authors');
const LIST_SLUGS = args.includes('--list-slugs');

const DRAFTS_DIR = path.resolve(__dirname, '..', 'drafts');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'output');
const REPORT_FILE = path.join(OUTPUT_DIR, 'blog-import-report.md');

const BLOG_CONTENT_TYPE = 'blogsPage';
const AUTHOR_CONTENT_TYPE = 'author';
const DEFAULT_AUTHOR_NAME = 'Pixelette Team';

const client = contentfulManagement.createClient(
  { accessToken: CMA_TOKEN },
  { defaults: { spaceId: SPACE_ID, environmentId: ENV_NAME } },
);

function firstLocale(localised) {
  if (!localised || typeof localised !== 'object') return null;
  return localised['en-US'] || localised['en-GB'] || localised[Object.keys(localised)[0]] || null;
}

async function detectDefaultLocale() {
  try {
    const locales = await client.locale.getMany({});
    const def = locales.items.find(l => l.default) || locales.items[0];
    return def ? def.code : 'en-US';
  } catch {
    return 'en-US';
  }
}

async function fetchAllEntries(contentTypeId) {
  const all = [];
  const limit = 100;
  let skip = 0;
  while (true) {
    const page = await client.entry.getMany({
      query: { content_type: contentTypeId, limit, skip, order: '-sys.updatedAt' },
    });
    all.push(...page.items);
    if (page.items.length < limit) break;
    skip += limit;
  }
  return all;
}

async function fetchAllAssets() {
  const all = [];
  const limit = 100;
  let skip = 0;
  while (true) {
    const page = await client.asset.getMany({ query: { limit, skip } });
    all.push(...page.items);
    if (page.items.length < limit) break;
    skip += limit;
  }
  return all;
}

function parseCleanFormat(raw) {
  try {
    const parsed = matter(raw);
    if (!parsed.data || Object.keys(parsed.data).length === 0) return null;
    return {
      format: 'clean',
      title: parsed.data.title || '',
      slug: parsed.data.slug || '',
      description: parsed.data.description || '',
      readTime: parsed.data.readTime ? Number(parsed.data.readTime) : null,
      thumbnailImageId: parsed.data.thumbnailImageId || '',
      authorId: parsed.data.authorId || '',
      body: (parsed.content || '').trim(),
    };
  } catch {
    return null;
  }
}

function parseMessyFormat(raw) {
  const out = {
    format: 'messy',
    title: '',
    slug: '',
    description: '',
    readTime: null,
    thumbnailImageId: '',
    authorId: '',
    body: '',
    authorName: '',
    metaTitle: '',
    metaDescription: '',
  };

  const titleMatch = raw.match(/^#\s*BLOG REWRITE:\s*(.+?)$/mi);
  if (titleMatch) out.title = titleMatch[1].trim();

  const slugMatch = raw.match(/^##\s*Slug:\s*(.+?)$/mi);
  if (slugMatch) out.slug = slugMatch[1].trim();

  const authorMatch = raw.match(/^##\s*Author:\s*(.+?)$/mi);
  if (authorMatch) out.authorName = authorMatch[1].trim();

  const metaTitleMatch = raw.match(/###\s*Suggested Meta Title\s*\n+([\s\S]*?)(?=\n##|\n###|$)/i);
  if (metaTitleMatch) out.metaTitle = metaTitleMatch[1].trim().replace(/^["']|["']$/g, '');

  const metaDescMatch = raw.match(/###\s*Suggested Meta Description\s*\n+([\s\S]*?)(?=\n##|\n###|$)/i);
  if (metaDescMatch) out.metaDescription = metaDescMatch[1].trim().replace(/^["']|["']$/g, '');

  const thumbMatch = raw.match(/^##\s*Thumbnail[^:]*:\s*(\S+)/mi);
  if (thumbMatch) out.thumbnailImageId = thumbMatch[1].trim();

  const readTimeMatch = raw.match(/^##\s*Read Time:\s*(\d+)/mi);
  if (readTimeMatch) out.readTime = Number(readTimeMatch[1]);

  // Extract body after "## REWRITTEN ARTICLE CONTENT" marker, else after 3rd ---
  let body = '';
  const marker = raw.split(/^##\s*REWRITTEN ARTICLE CONTENT\s*$/mi);
  if (marker.length >= 2) {
    body = marker.slice(1).join('## REWRITTEN ARTICLE CONTENT')
      .replace(/^\s*---+\s*\n/m, '')
      .trim();
  } else {
    const parts = raw.split(/^---+\s*$/m);
    if (parts.length >= 4) {
      body = parts.slice(3).join('---').trim();
    }
  }
  out.body = body;

  // If metaTitle is cleaner than title, use it
  if (out.metaTitle && out.metaTitle.length <= 70) out.title = out.metaTitle;
  if (out.metaDescription) out.description = out.metaDescription;

  return out;
}

function parseBlogFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);

  // Clean format starts with ---
  if (raw.trimStart().startsWith('---')) {
    const clean = parseCleanFormat(raw);
    if (clean && clean.title) return { filename, raw, ...clean };
  }

  // Fallback: messy format
  const messy = parseMessyFormat(raw);
  messy.filename = filename;
  messy.raw = raw;
  return messy;
}

function detectBodyWarnings(body) {
  const warnings = [];
  const inlineImages = (body.match(/!\[[^\]]*\]\([^)]+\)/g) || []).length;
  if (inlineImages > 0) warnings.push(`${inlineImages} inline image(s)`);
  const tables = (body.match(/^\|.*\|$/gm) || []).length;
  if (tables > 0) warnings.push(`${Math.floor(tables / 2)} table(s) (approx)`);
  const htmlTags = (body.match(/<\/?[a-z][^>]*>/gi) || []).length;
  if (htmlTags > 0) warnings.push(`${htmlTags} HTML tag(s)`);
  return warnings;
}

function md(v) {
  if (v === null || v === undefined) return '';
  return String(v).replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();
}

async function run() {
  console.log(`Connecting to Contentful space ${SPACE_ID}, environment ${ENV_NAME}...`);
  const locale = await detectDefaultLocale();
  console.log(`Default locale: ${locale}`);

  // Fetch current state
  console.log('Fetching existing blogsPage entries...');
  const blogsPage = await fetchAllEntries(BLOG_CONTENT_TYPE);
  console.log(`  Found ${blogsPage.length} existing blogsPage entries.`);

  console.log('Fetching existing legacy blogs entries...');
  let legacyBlogs = [];
  try { legacyBlogs = await fetchAllEntries('blogs'); } catch { /* ok */ }
  console.log(`  Found ${legacyBlogs.length} legacy blogs entries.`);

  console.log('Fetching author entries...');
  const authors = await fetchAllEntries(AUTHOR_CONTENT_TYPE);
  console.log(`  Found ${authors.length} author entries.`);

  console.log('Fetching assets...');
  const assets = await fetchAllAssets();
  console.log(`  Found ${assets.length} assets.`);

  const assetIds = new Set(assets.map(a => a.sys.id));
  const authorById = new Map(authors.map(a => [a.sys.id, a]));
  const authorByName = new Map(
    authors.map(a => [String(firstLocale(a.fields.name) || '').toLowerCase().trim(), a]),
  );

  // Default author detection
  const defaultAuthor = authorByName.get(DEFAULT_AUTHOR_NAME.toLowerCase()) || null;

  // Existing blog slug map
  const existingBySlug = new Map();
  for (const e of blogsPage) {
    const s = firstLocale(e.fields.slug);
    if (s) existingBySlug.set(String(s).toLowerCase(), e);
  }
  const existingSlugs = [...existingBySlug.keys()].sort();

  // --list-slugs shortcut
  if (LIST_SLUGS) {
    console.log('');
    console.log('=== EXISTING BLOG SLUGS ===');
    console.log(`blogsPage (${blogsPage.length}):`);
    blogsPage.forEach((e) => {
      console.log(`  ${firstLocale(e.fields.slug) || '(no slug)'} | ${firstLocale(e.fields.title) || '(no title)'} | ${e.sys.id}`);
    });
    console.log('');
    console.log(`Legacy blogs (${legacyBlogs.length}):`);
    legacyBlogs.forEach((e) => {
      console.log(`  ${firstLocale(e.fields.slug) || '(no slug)'} | ${firstLocale(e.fields.name) || firstLocale(e.fields.title) || '(no title)'} | ${e.sys.id}`);
    });
    return;
  }

  // --list-authors shortcut
  if (LIST_AUTHORS) {
    console.log('');
    console.log('=== AUTHOR ENTRIES ===');
    if (authors.length === 0) {
      console.log('(no author entries)');
    } else {
      authors.forEach((a) => {
        const name = firstLocale(a.fields.name) || '';
        console.log(`  ${a.sys.id} | ${name}`);
      });
    }
    console.log('');
    console.log(`Default author "${DEFAULT_AUTHOR_NAME}" exists: ${defaultAuthor ? 'YES (' + defaultAuthor.sys.id + ')' : 'NO'}`);
    const aimun = authors.find(a => /aimun\s*cheema/i.test(firstLocale(a.fields.name) || ''));
    console.log(`Aimun Cheema exists:             ${aimun ? 'YES (' + aimun.sys.id + ')' : 'no'}`);
    return;
  }

  // Read drafts
  if (!fs.existsSync(DRAFTS_DIR)) {
    console.log('');
    console.log(`No drafts directory at ${path.relative(process.cwd(), DRAFTS_DIR)} — creating empty dir.`);
    fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  }
  const files = fs.readdirSync(DRAFTS_DIR).filter(f => f.endsWith('.md') && !f.startsWith('.'));
  console.log(`Found ${files.length} .md files in drafts/`);

  const parsed = files.map(f => parseBlogFile(path.join(DRAFTS_DIR, f)));

  // Validation
  const validated = parsed.map((p) => {
    const issues = [];
    const warnings = [];
    if (!p.title) issues.push('missing title');
    if (!p.slug) issues.push('missing slug');
    if (!p.description) issues.push('missing description');
    if (!p.body) issues.push('empty body');

    // Thumbnail
    let thumbnailStatus = 'ok';
    if (!p.thumbnailImageId) {
      issues.push('missing thumbnailImageId');
      thumbnailStatus = 'missing';
    } else if (!assetIds.has(p.thumbnailImageId)) {
      issues.push(`thumbnailImageId "${p.thumbnailImageId}" not found in Contentful`);
      thumbnailStatus = 'invalid';
    }

    // Author
    let resolvedAuthor = null;
    if (p.authorId) {
      if (authorById.has(p.authorId)) {
        resolvedAuthor = authorById.get(p.authorId);
      } else {
        issues.push(`authorId "${p.authorId}" not found`);
      }
    } else if (p.authorName) {
      const found = authorByName.get(p.authorName.toLowerCase().trim());
      if (found) resolvedAuthor = found;
      else warnings.push(`author "${p.authorName}" not found — will default`);
    } else {
      warnings.push('no author specified — will default');
    }

    // Body warnings
    const bodyWarnings = detectBodyWarnings(p.body || '');
    warnings.push(...bodyWarnings);

    // Determine action (update vs create)
    const slugLower = (p.slug || '').toLowerCase();
    const existing = existingBySlug.get(slugLower);
    const action = existing ? 'UPDATE' : (issues.length === 0 ? 'CREATE' : 'SKIP');

    return {
      ...p,
      issues,
      warnings,
      thumbnailStatus,
      resolvedAuthor,
      action,
      existingEntryId: existing ? existing.sys.id : null,
      existingTitle: existing ? firstLocale(existing.fields.title) : null,
    };
  });

  // Slug collision within the drafts set
  const slugCounts = new Map();
  validated.forEach((v) => {
    if (!v.slug) return;
    const key = v.slug.toLowerCase();
    slugCounts.set(key, (slugCounts.get(key) || 0) + 1);
  });
  const collisions = [...slugCounts.entries()].filter(([, n]) => n > 1);

  // Build report
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const lines = [];
  lines.push('# Blog Import Report');
  lines.push('');
  lines.push(`Space: ${SPACE_ID}, Environment: ${ENV_NAME}`);
  lines.push(`Mode: ${EXECUTE ? '**EXECUTE (WRITES)**' : 'DRY RUN (no writes)'}`);
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');

  lines.push('## Summary');
  lines.push('');
  const ok = validated.filter(v => v.issues.length === 0);
  const createCount = ok.filter(v => v.action === 'CREATE').length;
  const updateCount = ok.filter(v => v.action === 'UPDATE').length;
  const skipCount = validated.filter(v => v.action === 'SKIP').length;
  lines.push(`- Files found in drafts/: **${files.length}**`);
  lines.push(`- Will CREATE new drafts: **${createCount}**`);
  lines.push(`- Will UPDATE existing entries: **${updateCount}**`);
  lines.push(`- Will SKIP (validation failed): **${skipCount}**`);
  lines.push('');
  lines.push(`- Existing blogsPage entries: ${blogsPage.length}`);
  lines.push(`- Existing author entries: ${authors.length}`);
  lines.push(`- Existing assets: ${assets.length}`);
  lines.push(`- Default author "${DEFAULT_AUTHOR_NAME}" exists: ${defaultAuthor ? `YES (${defaultAuthor.sys.id})` : '**NO — must be created before --execute**'}`);
  lines.push('');

  // Collisions
  if (collisions.length > 0) {
    lines.push('## ⚠ Slug Collisions Within Drafts');
    lines.push('');
    lines.push('| Slug | Count |');
    lines.push('|---|---|');
    collisions.forEach(([s, n]) => lines.push(`| ${md(s)} | ${n} |`));
    lines.push('');
  }

  // Per-file breakdown
  lines.push('## Per-File Breakdown');
  lines.push('');
  lines.push('| File | Format | Action | Slug | Title | Thumbnail | Author | Issues | Warnings |');
  lines.push('|---|---|---|---|---|---|---|---|---|');
  validated.forEach((v) => {
    const actionCell = v.action === 'UPDATE'
      ? `UPDATE (${v.existingEntryId})`
      : v.action;
    const thumbCell = v.thumbnailStatus === 'ok'
      ? `✓ ${v.thumbnailImageId || ''}`
      : `✗ ${v.thumbnailStatus}`;
    const authorCell = v.resolvedAuthor
      ? (firstLocale(v.resolvedAuthor.fields.name) || v.resolvedAuthor.sys.id)
      : (v.authorId || v.authorName || '(default)');
    lines.push(`| ${md(v.filename)} | ${md(v.format)} | ${md(actionCell)} | ${md(v.slug)} | ${md(v.title)} | ${md(thumbCell)} | ${md(authorCell)} | ${md(v.issues.join('; '))} | ${md(v.warnings.join('; '))} |`);
  });
  lines.push('');

  // Replacements detail
  const replacements = validated.filter(v => v.action === 'UPDATE');
  if (replacements.length > 0) {
    lines.push('## Replacements (Existing Entries That Will Be Updated)');
    lines.push('');
    lines.push('| Slug | New title | Existing title | Existing entry ID |');
    lines.push('|---|---|---|---|');
    replacements.forEach((v) => {
      lines.push(`| ${md(v.slug)} | ${md(v.title)} | ${md(v.existingTitle)} | ${md(v.existingEntryId)} |`);
    });
    lines.push('');
  }

  // New creates
  const creates = validated.filter(v => v.action === 'CREATE');
  if (creates.length > 0) {
    lines.push('## New Drafts (Will Be Created)');
    lines.push('');
    lines.push('| Slug | Title | File |');
    lines.push('|---|---|---|');
    creates.forEach((v) => {
      lines.push(`| ${md(v.slug)} | ${md(v.title)} | ${md(v.filename)} |`);
    });
    lines.push('');
  }

  // Skipped
  const skipped = validated.filter(v => v.action === 'SKIP');
  if (skipped.length > 0) {
    lines.push('## Skipped (Validation Failed)');
    lines.push('');
    lines.push('| File | Issues |');
    lines.push('|---|---|');
    skipped.forEach((v) => {
      lines.push(`| ${md(v.filename)} | ${md(v.issues.join('; '))} |`);
    });
    lines.push('');
  }

  // Existing blogsPage slugs (for reference)
  lines.push('## All Existing blogsPage Slugs (for reference)');
  lines.push('');
  lines.push('| Slug | Existing title | Entry ID |');
  lines.push('|---|---|---|');
  blogsPage.forEach((e) => {
    const slug = firstLocale(e.fields.slug) || '';
    const title = firstLocale(e.fields.title) || '';
    lines.push(`| ${md(slug)} | ${md(title)} | ${md(e.sys.id)} |`);
  });
  lines.push('');

  // Legacy blogs
  if (legacyBlogs.length > 0) {
    lines.push('## Legacy Blogs Content Type (separate, not touched by this import)');
    lines.push('');
    lines.push('| Slug | Title | Entry ID | Updated |');
    lines.push('|---|---|---|---|');
    legacyBlogs.forEach((e) => {
      const slug = firstLocale(e.fields.slug) || '';
      const title = firstLocale(e.fields.name) || firstLocale(e.fields.title) || '';
      lines.push(`| ${md(slug)} | ${md(title)} | ${md(e.sys.id)} | ${md(e.sys.updatedAt.substring(0, 10))} |`);
    });
    lines.push('');
  }

  // Authors list
  lines.push('## All Author Entries');
  lines.push('');
  if (authors.length === 0) {
    lines.push('_No author entries exist in the space._');
  } else {
    lines.push('| Entry ID | Name |');
    lines.push('|---|---|');
    authors.forEach((a) => {
      lines.push(`| ${md(a.sys.id)} | ${md(firstLocale(a.fields.name))} |`);
    });
  }
  lines.push('');

  fs.writeFileSync(REPORT_FILE, lines.join('\n'), 'utf8');

  // Terminal summary
  console.log('');
  console.log('=== IMPORT REPORT ===');
  console.log(`Mode:                ${EXECUTE ? 'EXECUTE' : 'DRY RUN'}`);
  console.log(`Files found:         ${files.length}`);
  console.log(`Will CREATE:         ${createCount}`);
  console.log(`Will UPDATE:         ${updateCount}`);
  console.log(`Will SKIP:           ${skipCount}`);
  console.log(`Slug collisions:     ${collisions.length}`);
  console.log(`Existing blogsPage:  ${blogsPage.length}`);
  console.log(`Authors:             ${authors.length}`);
  console.log(`Default author:      ${defaultAuthor ? 'EXISTS' : 'NOT FOUND (required before --execute)'}`);
  console.log(`Report:              ${path.relative(process.cwd(), REPORT_FILE)}`);
  console.log('=====================');

  // If dry-run, stop here
  if (!EXECUTE) {
    console.log('');
    console.log('DRY RUN complete. No changes made to Contentful.');
    console.log('Review the report, then rerun with --execute to perform writes.');
    return;
  }

  // ---- EXECUTE MODE ----
  // Guardrails before any writes
  if (!defaultAuthor) {
    console.error('');
    console.error('ABORT: default author "Pixelette Team" does not exist in Contentful.');
    console.error('Create it manually or approve auto-creation explicitly before --execute.');
    process.exit(3);
  }
  if (collisions.length > 0) {
    console.error('');
    console.error('ABORT: slug collisions within drafts. Resolve before --execute.');
    process.exit(3);
  }

  // Confirm what is about to happen
  console.log('');
  console.log('EXECUTE MODE: about to write to Contentful.');
  console.log(`  ${createCount} CREATE + ${updateCount} UPDATE operations.`);
  console.log('All entries will remain DRAFT. No publish calls.');
  console.log('');

  const body2Rich = async (bodyMd) => {
    try {
      return await richTextFromMarkdown(bodyMd);
    } catch (err) {
      console.error('  RichText conversion error:', err && err.message ? err.message : err);
      return { nodeType: 'document', data: {}, content: [] };
    }
  };

  const assetLink = id => ({ sys: { type: 'Link', linkType: 'Asset', id } });
  const entryLink = id => ({ sys: { type: 'Link', linkType: 'Entry', id } });

  for (const v of validated.filter(x => x.action !== 'SKIP')) {
    const authorEntry = v.resolvedAuthor || defaultAuthor;
    const richBody = await body2Rich(v.body);

    const fields = {
      title: { [locale]: v.title },
      slug: { [locale]: v.slug },
      description: { [locale]: v.description },
      body: { [locale]: richBody },
      ...(v.readTime ? { readTime: { [locale]: v.readTime } } : {}),
      ...(v.thumbnailImageId ? { thumbnailImage: { [locale]: assetLink(v.thumbnailImageId) } } : {}),
      ...(authorEntry ? { author: { [locale]: entryLink(authorEntry.sys.id) } } : {}),
    };

    try {
      if (v.action === 'UPDATE') {
        const entry = await client.entry.get({ entryId: v.existingEntryId });
        Object.assign(entry.fields, fields);
        const updated = await client.entry.update({ entryId: v.existingEntryId }, entry);
        console.log(`  UPDATED ${v.slug} -> ${updated.sys.id}`);
      } else {
        const created = await client.entry.create(
          { contentTypeId: BLOG_CONTENT_TYPE },
          { fields },
        );
        console.log(`  CREATED ${v.slug} -> ${created.sys.id}`);
      }
    } catch (err) {
      console.error(`  FAILED ${v.slug}:`, err && err.message ? err.message : err);
    }
  }

  console.log('');
  console.log('Import complete. All entries are drafts. Review in Contentful and publish manually.');
}

run().catch((err) => {
  console.error('Unhandled error:', err && err.message ? err.message : err);
  process.exit(2);
});
