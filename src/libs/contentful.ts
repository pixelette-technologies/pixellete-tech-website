// lib/contentful.ts
import type { Asset, Entry } from 'contentful';
import { createClient } from 'contentful';

const client = createClient({
  space: 'ggtsbq0gqfii',
  accessToken: 'VZvVye8dMIc497wF-1pNt5rdYUG-h4E30uX58AcGVUo',
  host: 'cdn.contentful.com',
});

export async function getOneBlogPost(slug: string): Promise<{
  blog: Entry<any> | null;
  includes: {
    Asset?: Asset[];
    Entry?: Entry<any>[];
  };
}> {
  try {
    const response = await client.getEntries({
      'content_type': 'blogsPage',
      'fields.slug': slug,
      'include': 10,
    });

    const blog = response.items?.[0] || null;
    const includes = response.includes || {};
    return { blog, includes };
  } catch (err) {
    console.error('Failed to fetch blog by slug:', err);
    return { blog: null, includes: {} };
  }
}

// Fetch metadata for a single blog (used for meta tags)
export async function fetchBlogMetadata(slug: string): Promise<{ title: string; description: string } | null> {
  try {
    const response = await client.getEntries({
      'content_type': 'blogsPage',
      'fields.slug': slug,
    });

    const firstItem = response.items?.[0];
    if (!firstItem) {
      return null;
    }

    const blog = firstItem.fields as Record<string, unknown>;
    return {
      title: (blog.title as string) || 'Blockchain Experts',
      description: (blog.description as string) || 'Read more about blockchain topics.',
    };
  } catch (error) {
    console.error('Error fetching blog metadata:', error);
    return null;
  }
}

export async function fetchAllBlogSlugs(): Promise<{ slug: string }[]> {
  try {
    const response = await client.getEntries({
      content_type: 'blogsPage',
      select: ['fields.slug'] as any,
    });

    return response.items.map(item => ({ slug: String(item.fields.slug) }));
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }
}

export async function fetchBlogsBySlugList(slugs: string[]): Promise<Entry<any>[]> {
  try {
    const response = await (client.getEntries as any)({
      'content_type': 'blogsPage',
      'fields.slug[in]': slugs.join(','),
      'limit': slugs.length,
    });
    return (response?.items ?? []) as Entry<any>[];
  } catch (error) {
    console.error('Error fetching blogs by slug list:', error);
    return [];
  }
}
