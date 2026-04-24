#!/usr/bin/env tsx
/**
 * Export all blogs from Contentful to Markdown files in content/blog/.
 * Also downloads all thumbnail images to public/images/blog/.
 *
 * Usage:
 *   npx tsx scripts/export-from-contentful.ts --dry-run
 *   npx tsx scripts/export-from-contentful.ts --execute
 *   npx tsx scripts/export-from-contentful.ts --execute --limit=1
 *
 * Dry-run mode (default) logs what would happen without writing anything.
 * Execute mode actually writes files.
 * --limit=N restricts execute mode to the first N blogs (safety check).
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
 *
 * Phase 2F TODOs (post-migration cleanup):
 * 1. Download embedded body images from Contentful CDN and rewrite URLs to /images/blog/<slug>/<n>.<ext>
 *    Current behaviour: body-embedded images stay on images.ctfassets.net.
 *    Short-term safe (public CDN, no auth required).
 *    Long-term risk: asset deletion breaks images.
 * 2. Grep exported content for the legacy "Official Secretariat to the UK Parliament's AI Policy Body" wording —
 *    the 36 enhanced overlays fix this, but the 1 legacy blog (defi-development-important-for-business) may still contain it.
 * 3. After merging to main and verifying live, this script can be archived (moved to scripts/_archived/) since
 *    it's a one-off migration tool not needed ongoingly.
 */
/* eslint-disable no-console */
import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import path from 'node:path';
import { MARKS, type Document, type Node } from '@contentful/rich-text-types';
import { createClient } from 'contentful-management';
import matter from 'gray-matter';

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
const limitArg = args.find(a => a.startsWith('--limit='));
const LIMIT = limitArg ? Number.parseInt(limitArg.split('=')[1]!, 10) : undefined;

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

// TODO (Phase 2F cleanup): after overlay of 36 enhanced blogs, Aimun Cheema
// owns ~0 posts. Decide whether to delete her from src/data/authors.ts for
// cleanliness or keep for historical integrity.

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

type AssetMap = Map<string, ContentfulAsset>;

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

/**
 * Download a URL to a local file path.
 * Returns true on success, false on failure (logs error).
 * Follows one level of 301/302 redirect.
 */
async function downloadFile(url: string, destPath: string, redirectHops = 0): Promise<boolean> {
  return new Promise((resolve) => {
    const client = url.startsWith('https:') ? https : http;
    client.get(url, (response) => {
      if ((response.statusCode === 301 || response.statusCode === 302) && response.headers.location && redirectHops < 3) {
        downloadFile(response.headers.location, destPath, redirectHops + 1).then(resolve);
        return;
      }
      if (response.statusCode !== 200) {
        console.error(`  ✗ HTTP ${response.statusCode} for ${url}`);
        resolve(false);
        return;
      }
      const file = fs.createWriteStream(destPath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
      file.on('error', (err) => {
        console.error(`  ✗ Write error: ${err.message}`);
        resolve(false);
      });
    }).on('error', (err) => {
      console.error(`  ✗ Download error: ${err.message}`);
      resolve(false);
    });
  });
}

/**
 * Convert Contentful Rich Text document to Markdown string.
 * Handles: paragraphs, headings 1-6, lists (ordered + unordered),
 * blockquotes, code blocks, bold/italic/underline/code inline marks,
 * hyperlinks, embedded assets (images + video as markdown/HTML),
 * tables (converted to GFM pipe tables).
 */
function richTextToMarkdown(doc: Document | null | undefined, assets: AssetMap): string {
  if (!doc || !doc.content) return '';

  const renderNode = (node: Node): string => {
    const anyNode = node as any;
    const content: any[] = anyNode.content ?? [];
    const children = content.map(renderNode).join('');

    switch (anyNode.nodeType) {
      case 'document':
        return children;
      case 'paragraph':
        return `${children}\n\n`;
      case 'heading-1':
        return `# ${children}\n\n`;
      case 'heading-2':
        return `## ${children}\n\n`;
      case 'heading-3':
        return `### ${children}\n\n`;
      case 'heading-4':
        return `#### ${children}\n\n`;
      case 'heading-5':
        return `##### ${children}\n\n`;
      case 'heading-6':
        return `###### ${children}\n\n`;
      case 'unordered-list': {
        const items = content.map((item: any) => `- ${renderNode(item).trim()}`).join('\n');
        return `${items}\n\n`;
      }
      case 'ordered-list': {
        const items = content.map((item: any, i: number) => `${i + 1}. ${renderNode(item).trim()}`).join('\n');
        return `${items}\n\n`;
      }
      case 'list-item':
        return children.trim();
      case 'blockquote':
        return `${children.split('\n').filter(Boolean).map((l: string) => `> ${l}`).join('\n')}\n\n`;
      case 'hr':
        return `---\n\n`;
      case 'hyperlink': {
        const uri = anyNode.data?.uri ?? '#';
        return `[${children}](${uri})`;
      }
      case 'embedded-asset-block': {
        const assetId = anyNode.data?.target?.sys?.id;
        const asset = assets.get(assetId);
        const file = unlocalize<{ url: string; contentType: string; fileName: string }>(asset?.fields.file);
        if (!file?.url) return '';
        const url = file.url.startsWith('//') ? `https:${file.url}` : file.url;
        const title = unlocalize<string>(asset?.fields.title) ?? 'embedded image';
        const contentType = file.contentType ?? '';
        if (contentType.startsWith('video/')) {
          return `<video controls src="${url}">${title}</video>\n\n`;
        }
        return `![${title}](${url})\n\n`;
      }
      case 'table': {
        const rows = content.map((row: any) => {
          const cells = (row.content ?? []).map((cell: any) => {
            const cellText = (cell.content ?? []).map(renderNode).join('').trim();
            return cellText.replace(/\|/g, '\\|').replace(/\n/g, ' ');
          });
          return `| ${cells.join(' | ')} |`;
        });
        if (rows.length === 0) return '';
        const headerRow: string = rows[0]!;
        const colCount = (headerRow.match(/\|/g) ?? []).length - 1;
        const separator = `|${' --- |'.repeat(colCount)}`;
        const body = rows.slice(1).join('\n');
        return `${headerRow}\n${separator}\n${body}\n\n`;
      }
      case 'table-row':
      case 'table-cell':
      case 'table-header-cell':
        return children;
      case 'text': {
        let value: string = anyNode.value ?? '';
        const marks: Array<{ type: string }> = anyNode.marks ?? [];
        for (const mark of marks) {
          switch (mark.type) {
            case MARKS.BOLD:
              value = `**${value}**`;
              break;
            case MARKS.ITALIC:
              value = `*${value}*`;
              break;
            case MARKS.UNDERLINE:
              value = `<u>${value}</u>`;
              break;
            case MARKS.CODE:
              value = `\`${value}\``;
              break;
          }
        }
        return value;
      }
      default:
        return children;
    }
  };

  return renderNode(doc as unknown as Node).trim();
}

/**
 * Strip a leading H1 from markdown if it matches the title.
 * Prevents duplicate H1 rendering since Next.js pages already show the title
 * in BlogHeader. Also removes the blank line after it.
 */
function stripLeadingH1(markdown: string, title: string): string {
  const normalisedTitle = title.trim().toLowerCase();
  const lines = markdown.split('\n');
  let firstContentIdx = 0;
  while (firstContentIdx < lines.length && !lines[firstContentIdx]!.trim()) {
    firstContentIdx++;
  }
  if (firstContentIdx >= lines.length) return markdown;
  const firstLine = lines[firstContentIdx]!.trim();
  const h1Match = /^#\s+(.+)$/.exec(firstLine);
  if (!h1Match) return markdown;
  const h1Text = h1Match[1]!.trim().toLowerCase();
  if (h1Text === normalisedTitle
    || normalisedTitle.startsWith(h1Text)
    || h1Text.startsWith(normalisedTitle.slice(0, Math.min(30, normalisedTitle.length)))) {
    lines.splice(firstContentIdx, 1);
    if (firstContentIdx < lines.length && !lines[firstContentIdx]!.trim()) {
      lines.splice(firstContentIdx, 1);
    }
    return lines.join('\n');
  }
  return markdown;
}

// ---- Main ----
async function main() {
  console.log('='.repeat(80));
  console.log('CONTENTFUL BLOG EXPORT');
  console.log('='.repeat(80));
  console.log(`Mode:         ${DRY_RUN ? 'DRY RUN (no files written)' : 'EXECUTE (will write files)'}`);
  if (LIMIT !== undefined) console.log(`Limit:        first ${LIMIT} blog(s) only`);
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

  const blogsToProcess = LIMIT !== undefined ? blogs.slice(0, LIMIT) : blogs;

  for (const blog of blogsToProcess) {
    const fields = blog.fields;

    const slug = unlocalize<string>(fields.slug) ?? `no-slug-${blog.sys.id}`;
    const title = unlocalize<string>(fields.title) ?? '(no title)';
    const warnings: string[] = [];

    let authorKey = DEFAULT_AUTHOR_KEY;
    let authorResolved = false;
    const authorRef = unlocalize<{ sys: { id: string } }>(fields.author);
    if (authorRef?.sys?.id) {
      const authorEntry = authorsById.get(authorRef.sys.id);
      if (authorEntry) {
        const authorName = unlocalize<string>(authorEntry.fields.name);
        if (authorName && AUTHOR_KEY_MAP[authorName]) {
          authorKey = AUTHOR_KEY_MAP[authorName]!;
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

    report.push({ slug, title, authorKey, authorResolved, thumbnailUrl, thumbnailLocalPath, warnings });
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

  // ---- EXECUTE MODE ----
  console.log('='.repeat(80));
  console.log('EXECUTING EXPORT');
  console.log('='.repeat(80));

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  let writtenBlogs = 0;
  let writtenImages = 0;
  let skippedImages = 0;

  for (const blog of blogsToProcess) {
    const fields = blog.fields;

    const slug = unlocalize<string>(fields.slug) ?? `no-slug-${blog.sys.id}`;
    const title = unlocalize<string>(fields.title) ?? '(no title)';
    const description = unlocalize<string>(fields.description) ?? '';
    const readTime = unlocalize<number>(fields.readTime);
    const bodyDoc = unlocalize<Document>(fields.body);

    let authorKey = DEFAULT_AUTHOR_KEY;
    const authorRef = unlocalize<{ sys: { id: string } }>(fields.author);
    if (authorRef?.sys?.id) {
      const authorEntry = authorsById.get(authorRef.sys.id);
      if (authorEntry) {
        const authorName = unlocalize<string>(authorEntry.fields.name);
        if (authorName && AUTHOR_KEY_MAP[authorName]) {
          authorKey = AUTHOR_KEY_MAP[authorName]!;
        }
      }
    }

    let thumbnailLocalPath = '';
    const thumbnailRef = unlocalize<{ sys: { id: string } }>(fields.thumbnailImage);
    if (thumbnailRef?.sys?.id) {
      const asset = assetsById.get(thumbnailRef.sys.id);
      const file = unlocalize<{ url: string; contentType: string; fileName: string }>(asset?.fields.file);
      if (file?.url) {
        const sourceUrl = file.url.startsWith('//') ? `https:${file.url}` : file.url;
        const originalExt = path.extname(file.fileName) || '.webp';
        const localFilename = `${slug}${originalExt}`;
        const localAbsPath = path.join(IMAGES_DIR, localFilename);
        thumbnailLocalPath = `/images/blog/${localFilename}`;

        if (fs.existsSync(localAbsPath)) {
          console.log(`  ${slug}: thumbnail already present, skipping download`);
          skippedImages++;
        } else {
          console.log(`  ${slug}: downloading thumbnail -> ${localFilename}`);
          const ok = await downloadFile(sourceUrl, localAbsPath);
          if (ok) {
            writtenImages++;
          } else {
            thumbnailLocalPath = '';
          }
        }
      }
    }

    const bodyMarkdown = richTextToMarkdown(bodyDoc, assetsById);
    const cleanedBody = stripLeadingH1(bodyMarkdown, title);

    const frontmatter: Record<string, any> = {
      title,
      slug,
      description,
      author: authorKey,
      publishDate: blog.sys.createdAt.split('T')[0],
      updatedDate: blog.sys.updatedAt.split('T')[0],
      thumbnailImage: thumbnailLocalPath,
    };
    if (typeof readTime === 'number') {
      frontmatter.readTime = readTime;
    }

    const fileContent = matter.stringify(cleanedBody, frontmatter);
    const outputPath = path.join(OUTPUT_DIR, `${slug}.md`);
    fs.writeFileSync(outputPath, fileContent, 'utf8');
    writtenBlogs++;
    console.log(`  ${slug}: wrote ${outputPath.replace(process.cwd(), '.')}`);
  }

  console.log();
  console.log('='.repeat(80));
  console.log('EXPORT COMPLETE');
  console.log('='.repeat(80));
  console.log(`Blogs written:   ${writtenBlogs}`);
  console.log(`Images written:  ${writtenImages}`);
  console.log(`Images skipped:  ${skippedImages} (already present)`);
  console.log(`Output dir:      ${OUTPUT_DIR}`);
  console.log(`Images dir:      ${IMAGES_DIR}`);
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
