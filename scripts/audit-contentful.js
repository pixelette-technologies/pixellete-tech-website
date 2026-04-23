/* eslint-disable no-console */
/*
 * Contentful read-only audit.
 * Produces output/contentful-audit.md and a terminal summary.
 *
 * READ-ONLY. Does not create, update, delete, or publish anything.
 *
 * Requires in .env.local:
 *   CONTENTFUL_SPACE_ID=...
 *   CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-...
 *   CONTENTFUL_ENVIRONMENT=master   (optional, defaults to master)
 *
 * Run from repo root:
 *   node scripts/audit-contentful.js
 *
 * Uses contentful-management v12 scoped plain client.
 */

const fs = require('node:fs');
const path = require('node:path');
const contentfulManagement = require('contentful-management');

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.local') });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CMA_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENV_NAME = process.env.CONTENTFUL_ENVIRONMENT || 'master';

if (!SPACE_ID) {
  console.error('ERROR: CONTENTFUL_SPACE_ID is not set in .env.local');
  process.exit(1);
}
if (!CMA_TOKEN) {
  console.error('ERROR: CONTENTFUL_MANAGEMENT_TOKEN is not set in .env.local');
  process.exit(1);
}

const client = contentfulManagement.createClient(
  { accessToken: CMA_TOKEN },
  { defaults: { spaceId: SPACE_ID, environmentId: ENV_NAME } },
);

const OUTPUT_DIR = path.resolve(__dirname, '..', 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'contentful-audit.md');

// Prefer the active content type (blogsPage) over the legacy one (blogs)
const BLOG_TYPE_CANDIDATES = ['blogsPage', 'blogPost', 'blog', 'article', 'post', 'blogs'];

// Fields that may hold a cover/featured image
const COVER_FIELD_CANDIDATES = [
  'thumbnailImage', 'coverImage', 'featuredImage', 'heroImage', 'image', 'thumbnail',
  'mainImage', 'cover', 'images', 'banner', 'bannerImage', 'featured',
];

function esc(v) {
  if (v === null || v === undefined) return '';
  return String(v).replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();
}

function humanFileSize(bytes) {
  if (!bytes || Number.isNaN(bytes)) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function fetchAllEntries(contentTypeId) {
  const all = [];
  const limit = 100;
  let skip = 0;
  while (true) {
    const page = await client.entry.getMany({
      query: {
        content_type: contentTypeId,
        limit,
        skip,
        order: '-sys.updatedAt',
      },
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

async function main() {
  console.log(`Connecting to Contentful space ${SPACE_ID}, environment ${ENV_NAME}...`);

  let spaceInfo;
  try {
    spaceInfo = await client.space.get({ spaceId: SPACE_ID });
  } catch (err) {
    console.error('\nAuthentication or space access failed.');
    console.error('Message:', err && err.message ? err.message : err);
    console.error('\nCheck:');
    console.error('  1. CONTENTFUL_SPACE_ID is correct');
    console.error('  2. CONTENTFUL_MANAGEMENT_TOKEN is valid and not expired');
    console.error('  3. The token has access to this space');
    console.error('Stopping. Not retrying.');
    process.exit(2);
  }
  console.log(`Connected to space: ${spaceInfo.name}`);

  const ctResp = await client.contentType.getMany({ query: { limit: 100 } });
  const contentTypes = ctResp.items;
  console.log(`Found ${contentTypes.length} content types.`);

  let blogType = null;
  for (const candidate of BLOG_TYPE_CANDIDATES) {
    blogType = contentTypes.find(ct => ct.sys.id === candidate);
    if (blogType) break;
  }
  if (!blogType) {
    const namedBlog = contentTypes.find(ct => /blog|article|post/i.test(ct.name || ''));
    if (namedBlog) blogType = namedBlog;
  }
  if (!blogType) {
    console.warn('WARNING: could not identify a blog content type automatically.');
  } else {
    console.log(`Blog content type identified: ${blogType.sys.id} (${blogType.name})`);
  }

  let blogEntries = [];
  if (blogType) {
    console.log(`Fetching ${blogType.sys.id} entries...`);
    blogEntries = await fetchAllEntries(blogType.sys.id);
    console.log(`Fetched ${blogEntries.length} ${blogType.sys.id} entries.`);
  }

  // Also audit any SECONDARY blog-like content types (legacy)
  const secondaryBlogTypes = contentTypes.filter((ct) => {
    if (!blogType) return false;
    if (ct.sys.id === blogType.sys.id) return false;
    return BLOG_TYPE_CANDIDATES.includes(ct.sys.id) || /blog|article|post/i.test(ct.name || '');
  });
  const secondaryBlogs = {};
  for (const ct of secondaryBlogTypes) {
    console.log(`Fetching secondary blog type "${ct.sys.id}" entries...`);
    try {
      secondaryBlogs[ct.sys.id] = await fetchAllEntries(ct.sys.id);
      console.log(`  Fetched ${secondaryBlogs[ct.sys.id].length} entries.`);
    } catch {
      secondaryBlogs[ct.sys.id] = [];
    }
  }

  console.log('Fetching assets...');
  const assets = await fetchAllAssets();
  console.log(`Fetched ${assets.length} assets.`);

  console.log('Building asset-to-entry reference map (scanning all content types)...');
  const assetRefMap = new Map();
  for (const ct of contentTypes) {
    let entries = [];
    try {
      entries = await fetchAllEntries(ct.sys.id);
    } catch {
      continue;
    }
    for (const entry of entries) {
      const text = JSON.stringify(entry.fields || {});
      for (const asset of assets) {
        if (text.includes(asset.sys.id)) {
          if (!assetRefMap.has(asset.sys.id)) assetRefMap.set(asset.sys.id, []);
          const refs = assetRefMap.get(asset.sys.id);
          if (!refs.find(r => r.entryId === entry.sys.id)) {
            refs.push({ contentTypeId: ct.sys.id, entryId: entry.sys.id });
          }
        }
      }
    }
  }

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const lines = [];
  lines.push('# Contentful Audit Report');
  lines.push('');
  lines.push(`Space: ${spaceInfo.name} (${SPACE_ID})`);
  lines.push(`Environment: ${ENV_NAME}`);
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');

  lines.push('## 1. Content Model Summary');
  lines.push('');
  lines.push('| Content type ID | Name | Description | Display field | Field count |');
  lines.push('|---|---|---|---|---|');
  for (const ct of contentTypes) {
    lines.push(`| ${esc(ct.sys.id)} | ${esc(ct.name)} | ${esc(ct.description || '')} | ${esc(ct.displayField || '')} | ${(ct.fields || []).length} |`);
  }
  lines.push('');

  if (blogType) {
    lines.push(`## 1a. Blog Content Type Fields: ${esc(blogType.sys.id)}`);
    lines.push('');
    lines.push('| Field ID | Name | Type | Required | Localized | Validations |');
    lines.push('|---|---|---|---|---|---|');
    for (const f of (blogType.fields || [])) {
      const validations = (f.validations || []).map(v => Object.keys(v).join(',')).join('; ');
      lines.push(`| ${esc(f.id)} | ${esc(f.name)} | ${esc(f.type + (f.linkType ? `/${f.linkType}` : ''))} | ${f.required ? 'yes' : 'no'} | ${f.localized ? 'yes' : 'no'} | ${esc(validations)} |`);
    }
    lines.push('');
  }

  lines.push('## 2. Blog Inventory');
  lines.push('');
  if (!blogType) {
    lines.push('_No blog content type identified. Skipping._');
    lines.push('');
  } else {
    lines.push(`Total blog entries: **${blogEntries.length}**`);
    lines.push('');
    lines.push('| # | Entry ID | Title | Slug | Status | Updated | Cover asset ID | Cover filename |');
    lines.push('|---|---|---|---|---|---|---|---|');
    blogEntries.forEach((entry, i) => {
      const fields = entry.fields || {};
      const title = pickTitle(entry);
      const slug = pickField(fields, ['slug', 'url', 'path']);
      const status = getEntryStatus(entry);
      const updated = entry.sys.updatedAt;
      const coverAssetId = extractAssetId(fields, COVER_FIELD_CANDIDATES);
      let coverFilename = '';
      if (coverAssetId) {
        const a = assets.find(x => x.sys.id === coverAssetId);
        coverFilename = a ? getAssetFilename(a) : '(asset id referenced but not found)';
      }
      lines.push(`| ${i + 1} | ${esc(entry.sys.id)} | ${esc(title)} | ${esc(slug)} | ${status} | ${esc(updated.substring(0, 10))} | ${esc(coverAssetId || '')} | ${esc(coverFilename || '')} |`);
    });
    lines.push('');
  }

  // Section 2b — Secondary/legacy blog-like content types
  const secondaryIds = Object.keys(secondaryBlogs);
  if (secondaryIds.length > 0) {
    lines.push('## 2b. Secondary/Legacy Blog-Like Content Types');
    lines.push('');
    lines.push('These content types match blog-like naming patterns but are not the primary blog type. Likely legacy content awaiting migration or cleanup.');
    lines.push('');
    for (const ctId of secondaryIds) {
      const ct = contentTypes.find(c => c.sys.id === ctId);
      const entries = secondaryBlogs[ctId];
      lines.push(`### ${esc(ctId)} (${esc(ct?.name || '')}) — ${entries.length} entries`);
      lines.push('');
      lines.push('Fields: ' + (ct?.fields || []).map(f => `\`${f.id}\` (${f.type}${f.linkType ? `/${f.linkType}` : ''})`).join(', '));
      lines.push('');
      lines.push('| # | Entry ID | Title | Slug | Status | Updated |');
      lines.push('|---|---|---|---|---|---|');
      entries.forEach((entry, i) => {
        lines.push(`| ${i + 1} | ${esc(entry.sys.id)} | ${esc(pickTitle(entry))} | ${esc(pickField(entry.fields, ['slug', 'url']))} | ${getEntryStatus(entry)} | ${esc(entry.sys.updatedAt.substring(0, 10))} |`);
      });
      lines.push('');
    }
  }

  lines.push('## 3. Asset Inventory');
  lines.push('');
  lines.push(`Total assets: **${assets.length}**`);
  lines.push('');
  lines.push('| # | Asset ID | Filename | Title | Size | Dimensions | Content type | Referenced by |');
  lines.push('|---|---|---|---|---|---|---|---|');
  assets.forEach((asset, i) => {
    const title = pickField(asset.fields, ['title']);
    const filename = getAssetFilename(asset);
    const { size, dims, contentType } = getAssetFileDetails(asset);
    const refs = assetRefMap.get(asset.sys.id) || [];
    const refSummary = refs.length === 0
      ? '**orphan**'
      : refs.map(r => `${r.contentTypeId}:${r.entryId}`).slice(0, 3).join(', ') + (refs.length > 3 ? ` +${refs.length - 3} more` : '');
    lines.push(`| ${i + 1} | ${esc(asset.sys.id)} | ${esc(filename)} | ${esc(title)} | ${esc(size)} | ${esc(dims)} | ${esc(contentType)} | ${refSummary} |`);
  });
  lines.push('');

  lines.push('## 4. Cross-Reference Checks');
  lines.push('');

  if (blogType) {
    const missingCover = blogEntries.filter((e) => {
      const coverAssetId = extractAssetId(e.fields, COVER_FIELD_CANDIDATES);
      return !coverAssetId;
    });
    lines.push(`### 4a. Blogs Without Cover Image (${missingCover.length})`);
    lines.push('');
    if (missingCover.length === 0) {
      lines.push('All blog entries have a cover image linked.');
    } else {
      lines.push('| Entry ID | Title | Slug | Updated |');
      lines.push('|---|---|---|---|');
      missingCover.forEach((e) => {
        lines.push(`| ${esc(e.sys.id)} | ${esc(pickTitle(e))} | ${esc(pickField(e.fields, ['slug']))} | ${esc(e.sys.updatedAt.substring(0, 10))} |`);
      });
    }
    lines.push('');
  }

  if (blogType) {
    const brokenRefs = [];
    for (const e of blogEntries) {
      const coverAssetId = extractAssetId(e.fields, COVER_FIELD_CANDIDATES);
      if (coverAssetId) {
        const exists = assets.find(a => a.sys.id === coverAssetId);
        if (!exists) brokenRefs.push({ entry: e, brokenAssetId: coverAssetId });
      }
    }
    lines.push(`### 4b. Blogs Referencing Broken or Missing Cover Asset (${brokenRefs.length})`);
    lines.push('');
    if (brokenRefs.length === 0) {
      lines.push('No broken cover asset references.');
    } else {
      lines.push('| Entry ID | Title | Missing asset ID |');
      lines.push('|---|---|---|');
      brokenRefs.forEach(({ entry, brokenAssetId }) => {
        lines.push(`| ${esc(entry.sys.id)} | ${esc(pickTitle(entry))} | ${esc(brokenAssetId)} |`);
      });
    }
    lines.push('');
  }

  if (blogType) {
    const slugCounts = new Map();
    for (const e of blogEntries) {
      const slug = pickField(e.fields, ['slug']);
      if (!slug) continue;
      if (!slugCounts.has(slug)) slugCounts.set(slug, []);
      slugCounts.get(slug).push({ id: e.sys.id, title: pickTitle(e) });
    }
    const duplicates = [...slugCounts.entries()].filter(([, arr]) => arr.length > 1);
    lines.push(`### 4c. Duplicate Slugs (${duplicates.length})`);
    lines.push('');
    if (duplicates.length === 0) {
      lines.push('No duplicate slugs found.');
    } else {
      lines.push('| Slug | Count | Entry IDs |');
      lines.push('|---|---|---|');
      duplicates.forEach(([slug, arr]) => {
        lines.push(`| ${esc(slug)} | ${arr.length} | ${arr.map(x => x.id).join(', ')} |`);
      });
    }
    lines.push('');
  }

  const orphanAssets = assets.filter(a => !assetRefMap.has(a.sys.id));
  lines.push(`### 4d. Orphan Assets (${orphanAssets.length})`);
  lines.push('');
  lines.push('Assets not referenced by any entry of any content type.');
  lines.push('');
  if (orphanAssets.length === 0) {
    lines.push('No orphan assets.');
  } else {
    lines.push('| Asset ID | Filename | Size |');
    lines.push('|---|---|---|');
    orphanAssets.forEach((a) => {
      const { size } = getAssetFileDetails(a);
      lines.push(`| ${esc(a.sys.id)} | ${esc(getAssetFilename(a))} | ${esc(size)} |`);
    });
  }
  lines.push('');

  fs.writeFileSync(OUTPUT_FILE, lines.join('\n'), 'utf8');

  const blogsMissingCover = blogType
    ? blogEntries.filter(e => !extractAssetId(e.fields, COVER_FIELD_CANDIDATES)).length
    : 0;

  console.log('');
  console.log('=== AUDIT SUMMARY ===');
  console.log(`Content types:       ${contentTypes.length}`);
  console.log(`Primary blog type:   ${blogType ? blogType.sys.id : '(not identified)'}`);
  console.log(`Primary blog count:  ${blogEntries.length}`);
  for (const ctId of Object.keys(secondaryBlogs)) {
    console.log(`Secondary "${ctId}":    ${secondaryBlogs[ctId].length} entries`);
  }
  console.log(`Total assets:        ${assets.length}`);
  console.log(`Blogs missing cover: ${blogsMissingCover}`);
  console.log(`Orphan assets:       ${orphanAssets.length}`);
  console.log(`Report written:      ${path.relative(process.cwd(), OUTPUT_FILE)}`);
  console.log('=====================');
}

function pickTitle(entry) {
  if (!entry || !entry.fields) return '';
  return pickField(entry.fields, ['title', 'name', 'heading', 'displayName']);
}

function pickField(fields, candidates) {
  if (!fields) return '';
  for (const key of candidates) {
    if (fields[key]) {
      const val = fields[key];
      if (typeof val === 'string') return val;
      if (typeof val === 'object' && !Array.isArray(val)) {
        const firstLocale = val['en-US'] || val['en-GB'] || val[Object.keys(val)[0]];
        if (typeof firstLocale === 'string') return firstLocale;
        if (firstLocale && firstLocale.fileName) return firstLocale.fileName;
      }
    }
  }
  return '';
}

function extractAssetId(fields, candidates) {
  if (!fields) return null;
  for (const key of candidates) {
    if (fields[key]) {
      const val = fields[key];
      const firstLocale = val['en-US'] || val['en-GB'] || val[Object.keys(val)[0]];
      if (firstLocale && firstLocale.sys && firstLocale.sys.id && firstLocale.sys.linkType === 'Asset') {
        return firstLocale.sys.id;
      }
    }
  }
  return null;
}

function getEntryStatus(entry) {
  const sys = entry.sys;
  if (sys.archivedVersion) return 'archived';
  if (sys.publishedVersion) {
    if (sys.version > sys.publishedVersion + 1) return 'published (draft pending)';
    return 'published';
  }
  return 'draft';
}

function getAssetFilename(asset) {
  if (!asset || !asset.fields || !asset.fields.file) return '';
  const file = asset.fields.file;
  const firstLocale = file['en-US'] || file['en-GB'] || file[Object.keys(file)[0]];
  return (firstLocale && firstLocale.fileName) || '';
}

function getAssetFileDetails(asset) {
  if (!asset || !asset.fields || !asset.fields.file) return { size: '', dims: '', contentType: '' };
  const file = asset.fields.file;
  const firstLocale = file['en-US'] || file['en-GB'] || file[Object.keys(file)[0]];
  if (!firstLocale) return { size: '', dims: '', contentType: '' };
  const size = humanFileSize(firstLocale.details && firstLocale.details.size);
  const img = firstLocale.details && firstLocale.details.image;
  const dims = img ? `${img.width}x${img.height}` : '';
  const contentType = firstLocale.contentType || '';
  return { size, dims, contentType };
}

main().catch((err) => {
  console.error('Unhandled error:', err && err.message ? err.message : err);
  process.exit(3);
});
