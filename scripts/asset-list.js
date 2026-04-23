/* eslint-disable no-console */
/*
 * Read-only helper.
 * Produces output/asset-list.md and output/asset-list.csv so a content writer
 * can search for the Contentful Asset ID of each blog thumbnail.
 *
 * Does not create, update, delete, or publish anything.
 *
 * Run: node scripts/asset-list.js
 */

const fs = require('node:fs');
const path = require('node:path');
const contentfulManagement = require('contentful-management');

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.local') });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CMA_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENV_NAME = process.env.CONTENTFUL_ENVIRONMENT || 'master';

if (!SPACE_ID || !CMA_TOKEN) {
  console.error('ERROR: CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN must be set in .env.local');
  process.exit(1);
}

const client = contentfulManagement.createClient(
  { accessToken: CMA_TOKEN },
  { defaults: { spaceId: SPACE_ID, environmentId: ENV_NAME } },
);

const OUTPUT_DIR = path.resolve(__dirname, '..', 'output');
const MD_FILE = path.join(OUTPUT_DIR, 'asset-list.md');
const CSV_FILE = path.join(OUTPUT_DIR, 'asset-list.csv');

function humanFileSize(bytes) {
  if (!bytes || Number.isNaN(bytes)) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function firstLocale(localised) {
  if (!localised || typeof localised !== 'object') return null;
  return localised['en-US'] || localised['en-GB'] || localised[Object.keys(localised)[0]] || null;
}

function csvEscape(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function mdEscape(v) {
  if (v === null || v === undefined) return '';
  return String(v).replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();
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
  console.log(`Fetching assets from space ${SPACE_ID}...`);
  const assets = await fetchAllAssets();
  console.log(`Fetched ${assets.length} assets.`);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const rows = assets.map((a) => {
    const title = firstLocale(a.fields.title) || '';
    const desc = firstLocale(a.fields.description) || '';
    const file = firstLocale(a.fields.file);
    const filename = file && file.fileName ? file.fileName : '';
    const contentType = file && file.contentType ? file.contentType : '';
    const size = file && file.details && file.details.size ? humanFileSize(file.details.size) : '';
    const dims = file && file.details && file.details.image
      ? `${file.details.image.width}x${file.details.image.height}`
      : '';
    return {
      id: a.sys.id,
      title,
      filename,
      description: desc,
      contentType,
      size,
      dims,
      updatedAt: a.sys.updatedAt.substring(0, 10),
    };
  });

  // Sort by title then filename for easier scanning
  rows.sort((a, b) => {
    const ta = (a.title || a.filename || '').toLowerCase();
    const tb = (b.title || b.filename || '').toLowerCase();
    return ta.localeCompare(tb);
  });

  // Markdown output
  const md = [];
  md.push('# Contentful Asset List');
  md.push('');
  md.push(`Space: ${SPACE_ID}, Environment: ${ENV_NAME}, Generated: ${new Date().toISOString()}`);
  md.push(`Total assets: **${rows.length}**`);
  md.push('');
  md.push('Use Ctrl+F / Cmd+F to search for the image title or filename, then copy the **Asset ID** into your blog frontmatter as `thumbnailImageId`.');
  md.push('');
  md.push('| Asset ID | Title | Filename | Dimensions | Size | Updated |');
  md.push('|---|---|---|---|---|---|');
  rows.forEach((r) => {
    md.push(`| \`${mdEscape(r.id)}\` | ${mdEscape(r.title)} | ${mdEscape(r.filename)} | ${mdEscape(r.dims)} | ${mdEscape(r.size)} | ${mdEscape(r.updatedAt)} |`);
  });
  fs.writeFileSync(MD_FILE, md.join('\n'), 'utf8');

  // CSV output
  const csv = [];
  csv.push(['asset_id', 'title', 'filename', 'description', 'content_type', 'dimensions', 'size', 'updated_at'].join(','));
  rows.forEach((r) => {
    csv.push([
      csvEscape(r.id),
      csvEscape(r.title),
      csvEscape(r.filename),
      csvEscape(r.description),
      csvEscape(r.contentType),
      csvEscape(r.dims),
      csvEscape(r.size),
      csvEscape(r.updatedAt),
    ].join(','));
  });
  fs.writeFileSync(CSV_FILE, csv.join('\n'), 'utf8');

  console.log('');
  console.log('=== ASSET LIST GENERATED ===');
  console.log(`Markdown: ${path.relative(process.cwd(), MD_FILE)}`);
  console.log(`CSV:      ${path.relative(process.cwd(), CSV_FILE)}`);
  console.log(`Rows:     ${rows.length}`);
  console.log('============================');
}

main().catch((err) => {
  console.error('Error:', err && err.message ? err.message : err);
  process.exit(2);
});
