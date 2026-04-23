import type { BlogBanner } from '@/types/blog';

// Scaffold. Populated after Contentful export reveals what banners are currently used.
// If banners appear on fewer than 20 of the 37 existing blogs, we may drop the concept
// entirely in favour of a single default CTA block baked into the detail layout.
export const blogBanners: Record<string, BlogBanner> = {
  // Example shape for reference only. Remove before shipping.
  // 'chatbot-cta': {
  //   id: 'chatbot-cta',
  //   headline: 'Need an AI chatbot built properly?',
  //   body: 'From discovery to deployment with ISO 27001 discipline.',
  //   ctaText: 'Book a consultation',
  //   ctaLink: '/contact-us',
  // },
};

export function getBanner(id: string | undefined): BlogBanner | null {
  if (!id) return null;
  return blogBanners[id] ?? null;
}
