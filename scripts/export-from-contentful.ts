#!/usr/bin/env tsx
/**
 * Export all blogs from Contentful to Markdown files in content/blog/.
 * Also downloads all thumbnail images to public/images/blog/.
 *
 * Usage:
 *   npx tsx scripts/export-from-contentful.ts --dry-run
 *   npx tsx scripts/export-from-contentful.ts --execute
 *
 * Dry-run mode (default) logs what would happen without writing anything.
 * Execute mode actually writes files (implemented in Step 2E-b).
 *
 * Reads the Contentful Management API token from env:
 *   CONTENTFUL_SPACE_ID
 *   CONTENTFUL_MANAGEMENT_TOKEN
 *
 * Run via dotenv-cli so .env.local is loaded:
 *   npx dotenv-cli -e .env.local -- npx tsx scripts/export-from-contentful.ts --dry-run
 *
 * API note: uses contentful-management v12 scoped plain client. v11's
 * client.getSpace/space.getEnvironment/env.getEntries chain is not available.
 */
/* eslint-disable no-console */
import path from 'node:path';
import { createClient } from 'contentful-management';

// ---- Config ----
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID ?? 'ggtsbq0gqfii';
const MGMT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT ?? 'master';
const CONTENT_TYPE_ID = 'blogsPage';
const OUTPUT_DIR = path.join(process.cwd(), 'content', 'blog');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'blog');

// ---- CLI flag parsing ----
const args = process.argv.slice(2);
const DRY_RUN = !args.includes('--execute');

if (!MGMT_TOKEN) {
  console.error('ERROR: CONTENTFUL_MANAGEMENT_TOKEN env var not set.');
  console.error('Add it to .env.local and re-run with:');
  console.error('  npx dotenv-cli -e .env.local -- npx tsx scripts/export-from-contentful.ts --dry-run');
  process.exit(1);
}

// ---- Author key mapping (Contentful names -> authors.ts keys) ----
const AUTHOR_KEY_MAP: Record<string, string> = {
  'Faisal Jaswal': 'faisal-jaswal',
  'Sara Illahi Panhwar': 'sara-illahi-panhwar',
  'Nabia Hassan Sabzwari': 'nabia-hassan-sabzwari',
  'Aimun Cheema': 'aimun-cheema',
  'Maryam Aslam': 'maryam-aslam',
  'Hamid Ayub': 'hamid-ayub',
};
const DEFAULT_AUTHOR_KEY = 'pixelette-team';

// ---- Loose types (Contentful types are complex at the Management API layer) ----
type ContentfulEntry = {
  sys: { id: string; createdAt: string; updatedAt: string };
  fields: Record<string, any>;
};

type ContentfulAsset = {
  sys: { id: string };
  fields: {
    title?: any;
    file?: any;
  };
};

// ---- Helpers ----
/**
 * At the Management API layer, every field is localised as { 'en-US': value }.
 * Extracts the value for the default locale (or first available).
 */
function unlocalize<T = any>(value: any): T | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value !== 'object' || Array.isArray(value)) return value as T;
  if ('en-US' in value) return value['en-US'] as T;
  if ('en-GB' in value) return value['en-GB'] as T;
  const firstKey = Object.keys(value)[0];
  return firstKey ? (value[firstKey] as T) : undefined;
}

async function fetchAll<T>(
  fetcher: (opts: { query: Record<string, any> }) => Promise<{ items: T[]; total: number }>,
  baseQuery: Record<string, any> = {},
): Promise<T[]> {
  const all: T[] = [];
  const limit = 100;
  let skip = 0;
  while (true) {
    const page = await fetcher({ query: { ...baseQuery, limit, skip } });
    all.push(...page.items);
    if (page.items.length < limit) break;
    skip += limit;
  }
  return all;
}

// ---- Main ----
async function main() {
  console.log('='.repeat(80));
  console.log('CONTENTFUL BLOG EXPORT');
  console.log('='.repeat(80));
  console.log(`Mode:         ${DRY_RUN ? 'DRY RUN (no files written)' : 'EXECUTE (will write files)'}`);
  console.log(`Space ID:     ${SPACE_ID}`);
  console.log(`Environment:  ${ENVIRONMENT_ID}`);
  console.log(`Content type: ${CONTENT_TYPE_ID}`);
  console.log(`Output:       ${OUTPUT_DIR}`);
  console.log(`Images:       ${IMAGES_DIR}`);
  console.log();

  const client = createClient(
    { accessToken: MGMT_TOKEN! },
    { defaults: { spaceId: SPACE_ID, environmentId: ENVIRONMENT_ID } },
  );

  // Fetch all blogs + all authors + all assets
  console.log('Fetching blogs...');
  const blogs = (await fetchAll(
    ({ query }) => client.entry.getMany({ query }),
    { content_type: CONTENT_TYPE_ID },
  )) as unknown as ContentfulEntry[];
  console.log(`Found ${blogs.length} blog(s) in content type '${CONTENT_TYPE_ID}'.`);

  console.log('Fetching authors...');
  const authors = (await fetchAll(
    ({ query }) => client.entry.getMany({ query }),
    { content_type: 'author' },
  )) as unknown as ContentfulEntry[];
  const authorsById = new Map<string, ContentfulEntry>();
  for (const author of authors) {
    authorsById.set(author.sys.id, author);
  }
  console.log(`Found ${authorsById.size} author(s).`);

  console.log('Fetching assets...');
  const assets = (await fetchAll(
    ({ query }) => client.asset.getMany({ query }),
  )) as unknown as ContentfulAsset[];
  const assetsById = new Map<string, ContentfulAsset>();
  for (const asset of assets) {
    assetsById.set(asset.sys.id, asset);
  }
  console.log(`Found ${assetsById.size} asset(s).`);
  console.log();

  // ---- Plan per-blog actions ----
  const report: Array<{
    slug: string;
    title: string;
    authorKey: string;
    authorResolved: boolean;
    thumbnailUrl: string | null;
    thumbnailLocalPath: string | null;
    warnings: string[];
  }> = [];

  for (const blog of blogs) {
    const fields = blog.fields;

    const slug = unlocalize<string>(fields.slug) ?? `no-slug-${blog.sys.id}`;
    const title = unlocalize<string>(fields.title) ?? '(no title)';
    const warnings: string[] = [];

    // Resolve author
    let authorKey = DEFAULT_AUTHOR_KEY;
    let authorResolved = false;
    const authorRef = unlocalize<{ sys: { id: string } }>(fields.author);
    if (authorRef?.sys?.id) {
      const authorEntry = authorsById.get(authorRef.sys.id);
      if (authorEntry) {
        const authorName = unlocalize<string>(authorEntry.fields.name);
        if (authorName && AUTHOR_KEY_MAP[authorName]) {
          authorKey = AUTHOR_KEY_MAP[authorName];
          authorResolved = true;
        } else {
          warnings.push(`Unmapped author name: "${authorName ?? '(no name)'}"`);
        }
      } else {
        warnings.push(`Author reference ID ${authorRef.sys.id} not found in authors fetch`);
      }
    } else {
      warnings.push('No author set on blog');
    }

    // Resolve thumbnail image
    let thumbnailUrl: string | null = null;
    let thumbnailLocalPath: string | null = null;
    const thumbnailRef = unlocalize<{ sys: { id: string } }>(fields.thumbnailImage);
    if (thumbnailRef?.sys?.id) {
      const asset = assetsById.get(thumbnailRef.sys.id);
      const file = unlocalize<{ url: string; contentType: string; fileName: string }>(asset?.fields.file);
      if (file?.url) {
        thumbnailUrl = file.url.startsWith('//') ? `https:${file.url}` : file.url;
        const ext = path.extname(file.fileName) || '.webp';
        thumbnailLocalPath = `/images/blog/${slug}${ext}`;
      } else {
        warnings.push(`Thumbnail asset ID ${thumbnailRef.sys.id} has no file URL`);
      }
    } else {
      warnings.push('No thumbnail image set');
    }

    report.push({
      slug,
      title,
      authorKey,
      authorResolved,
      thumbnailUrl,
      thumbnailLocalPath,
      warnings,
    });
  }

  // ---- Print report ----
  console.log('='.repeat(80));
  console.log('EXPORT PLAN');
  console.log('='.repeat(80));
  console.log();
  const slugs = report.map(r => r.slug);
  const uniqueSlugs = new Set(slugs);
  console.log(`Slug (unique?):      ${uniqueSlugs.size === slugs.length ? 'YES ✓' : `NO — ${slugs.length - uniqueSlugs.size} duplicate(s)`}`);
  console.log(`Total blogs:         ${report.length}`);
  console.log(`Author resolved:     ${report.filter(r => r.authorResolved).length} / ${report.length}`);
  console.log(`Fallback to default: ${report.filter(r => !r.authorResolved).length}`);
  console.log(`Thumbnails present:  ${report.filter(r => r.thumbnailUrl).length} / ${report.length}`);
  console.log(`Blogs with warnings: ${report.filter(r => r.warnings.length > 0).length}`);
  console.log();

  console.log('PER-BLOG DETAIL:');
  console.log('-'.repeat(80));
  for (const r of report) {
    const warnMark = r.warnings.length > 0 ? ' ⚠' : '';
    console.log(`${r.slug}${warnMark}`);
    console.log(`  title:     ${r.title}`);
    console.log(`  author:    ${r.authorKey}${r.authorResolved ? '' : ' (default)'}`);
    console.log(`  thumbnail: ${r.thumbnailLocalPath ?? '(none)'}`);
    if (r.warnings.length > 0) {
      for (const w of r.warnings) {
        console.log(`  ⚠ ${w}`);
      }
    }
    console.log();
  }

  if (DRY_RUN) {
    console.log('='.repeat(80));
    console.log('DRY RUN — no files written. Re-run with --execute to actually export.');
    console.log('='.repeat(80));
    return;
  }

  // Execute mode — intentionally left for Step 2E-b
  console.log('EXECUTE mode is not yet implemented in this step (2E-a).');
  console.log('Step 2E-b will add the actual write logic.');
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
