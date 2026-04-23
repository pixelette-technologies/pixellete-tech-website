import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
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

export async function getBlogBySlugWithMDX(
  slug: string,
): Promise<(Blog & { mdxSource: MDXRemoteSerializeResult }) | null> {
  const blog = getBlogBySlug(slug);
  if (!blog) return null;
  // Dynamic import: next-mdx-remote pulls in pure-ESM packages (estree-walker etc)
  // that cannot be loaded via Node CJS. Lazy-loading keeps synchronous helpers
  // (getBlogBySlug, getAllBlogs) accessible to simple Node scripts like tsx tests.
  // Next.js bundler handles the resolution at build time for runtime pages.
  const { serializeBlogContent } = await import('./blog-mdx');
  const mdxSource = await serializeBlogContent(blog.content);
  return { ...blog, mdxSource };
}
