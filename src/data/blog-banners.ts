import type { BlogBanner } from '@/types/blog';

/**
 * Blog sidebar banners. Referenced by frontmatter `sideBannerAd` field
 * on each blog markdown file.
 *
 * To add a new banner:
 *   1. Add a new entry here with a unique id key
 *   2. Reference it in a blog's frontmatter: `sideBannerAd: "your-id"`
 *   3. Blogs without this field get no sidebar banner
 */
export const blogBanners: Record<string, BlogBanner> = {
  'default-cta': {
    id: 'default-cta',
    headline: 'Content at Par for Smarter Business Decisions',
    body: 'Scalable models that grow with your business. Advanced machine learning. Expert guidance to transform your business.',
    ctaText: 'Explore Pixelette Services',
    ctaLink: '/services',
  },
};

export function getBanner(id: string | undefined): BlogBanner | null {
  if (!id) return null;
  return blogBanners[id] ?? null;
}
