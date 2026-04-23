import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Blog, BlogFrontmatter } from '@/types/blog';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md') && !f.startsWith('.'))
    .map(f => f.replace(/\.md$/, ''));
}

export function getBlogBySlug(slug: string): Blog | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);

  const frontmatter: BlogFrontmatter = {
    title: data.title,
    slug: data.slug ?? slug,
    description: data.description ?? '',
    author: data.author ?? 'pixelette-team',
    publishDate: data.publishDate ?? new Date().toISOString().split('T')[0],
    updatedDate: data.updatedDate,
    thumbnailImage: data.thumbnailImage ?? '',
    readTime: data.readTime ?? Math.ceil(readingTime(content).minutes),
    tags: data.tags ?? [],
    preBlogBanner: data.preBlogBanner,
    sideBannerAd: data.sideBannerAd,
  };

  return {
    frontmatter,
    content,
  };
}

export function getAllBlogs(): Blog[] {
  return getBlogSlugs()
    .map(slug => getBlogBySlug(slug))
    .filter((b): b is Blog => b !== null)
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.publishDate).getTime()
        - new Date(a.frontmatter.publishDate).getTime()
      );
    });
}

export function getRecentBlogs(count: number): Blog[] {
  return getAllBlogs().slice(0, count);
}

export type TOCItem = {
  id: string;
  text: string;
};

/**
 * Extract H2 headings from a Markdown body to build a table of contents.
 * IDs must match what rehype-slug generates in the rendered HTML so anchor
 * links from the TOC actually scroll to the matching heading.
 *
 * rehype-slug uses github-slugger internally. This regex-based implementation
 * replicates its behaviour for ASCII input: lowercase, non-word stripping,
 * whitespace-to-hyphen, and numeric suffixes for duplicates.
 *
 * Edge case: non-ASCII / unicode headings (e.g. Arabic, French accents) may
 * produce slugs that diverge slightly from github-slugger. All 36 current
 * blogs are English, so acceptable. If this becomes a problem later, switch
 * to importing github-slugger directly.
 */
export function extractTableOfContents(markdown: string): TOCItem[] {
  const headings: TOCItem[] = [];
  const seen = new Map<string, number>();

  const lines = markdown.split('\n');
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const text = match[1]!.trim();
    // Strip markdown inline syntax for clean display text
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    // Match rehype-slug / github-slugger behaviour for ASCII
    let slug = cleanText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Duplicate handling: first occurrence is bare, subsequent get -1, -2, ...
    const count = seen.get(slug) ?? 0;
    if (count > 0) {
      const uniqueSlug = `${slug}-${count}`;
      seen.set(slug, count + 1);
      slug = uniqueSlug;
    } else {
      seen.set(slug, 1);
    }

    headings.push({ id: slug, text: cleanText });
  }

  return headings;
}

/**
 * Fetch a blog plus its derived Table of Contents.
 * The raw markdown body is returned on `content` — the RSC MDXRemote renderer
 * in BlogContent.tsx compiles it server-side on render. No separate serialize
 * step is needed on the Next.js 15 / React 19 stack.
 */
export async function getBlogBySlugWithMDX(
  slug: string,
): Promise<(Blog & { toc: TOCItem[] }) | null> {
  const blog = getBlogBySlug(slug);
  if (!blog) return null;
  const toc = extractTableOfContents(blog.content);
  return { ...blog, toc };
}
