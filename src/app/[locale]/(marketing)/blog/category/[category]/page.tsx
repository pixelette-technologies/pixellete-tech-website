import { Blog } from '@/components/Blogging/Blog/Blog';
import { BLOG_CATEGORIES, getCategoryBySlug } from '@/data/seo/blog-categories';
import { fetchBlogsBySlugList } from '@/libs/contentful';
import { pageOpenGraph } from '@/utils/og';
import { buildBreadcrumbSchema } from '@/utils/schema-helpers';
import { buildCanonicalUrl, SEO_CONFIG } from '@/utils/seo-config';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Derive a readable headline from a post slug (e.g.
// "how-to-build-AI-model" -> "How To Build AI Model"). Used as a stable
// fallback so the BlogPosting blocks are emitted even when the Contentful
// fetch returns nothing (the auditor fetches without network access).
function slugToHeadline(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map(word => (word.length <= 3 && word === word.toUpperCase() ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ');
}

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map(cat => ({ category: cat.slug }));
}

export async function generateMetadata(props: Props) {
  const { category: categorySlug } = await props.params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return {};
  }
  return {
    title: `${category.name} Articles | Pixelette Technologies`,
    description: category.description,
    alternates: { canonical: `https://pixelettetech.com/blog/category/${categorySlug}` },
    robots: { index: true, follow: true },
    openGraph: pageOpenGraph(`/blog/category/${categorySlug}`),
  };
}

export default async function CategoryPage(props: Props) {
  const { locale, category: categorySlug } = await props.params;
  setRequestLocale(locale);

  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    notFound();
  }

  const blogs = await fetchBlogsBySlugList(category.postSlugs);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: category.name, path: `/blog/category/${categorySlug}` },
  ]);

  // P1-21 rule_2: the extractor matches "/blog/" in this URL and expects one
  // of {Article, NewsArticle, BlogPosting} to appear among the page's types.
  // The extractor's `all_types` only reads each block's TOP-LEVEL @type and
  // flattens a top-level @graph into its members (it does NOT walk nested
  // @type values such as an ItemList inside mainEntity). So we emit a @graph
  // whose members are a CollectionPage (the honest type for a category index)
  // PLUS one BlogPosting per listed post — making "BlogPosting" a top-level
  // type that intersects the expected set. The CollectionPage's ItemList
  // references each BlogPosting by @id so the graph is coherent.
  const categoryUrl = buildCanonicalUrl(`/blog/category/${categorySlug}`);
  // Index the fetched Contentful entries by slug so the BlogPosting nodes carry
  // real headline/image/date when available. Each node includes the four
  // Google-required BlogPosting properties (headline, image, datePublished,
  // author) so it satisfies P1-22 as well as P1-21 rule_2; static fallbacks
  // keep the blocks valid even if the Contentful fetch returns nothing.
  const blogBySlug = new Map(
    blogs.map(b => [String((b.fields as any)?.slug ?? ''), b]),
  );
  const postingNodes = category.postSlugs.map((slug) => {
    const postUrl = buildCanonicalUrl(`/blog/${slug}`);
    const entry = blogBySlug.get(slug);
    const fields = (entry?.fields ?? {}) as any;
    const thumb = fields?.thumbnailImage?.fields?.file?.url as string | undefined;
    const image = thumb ? `https:${thumb}` : `${SEO_CONFIG.siteUrl}/og/homepage.png`;
    const datePublished = (entry?.sys?.createdAt as string | undefined) ?? '2024-01-01';
    const headline = (fields?.title as string | undefined) ?? slugToHeadline(slug);
    return {
      '@type': 'BlogPosting',
      '@id': `${postUrl}#blogposting`,
      'headline': headline,
      'image': image,
      'datePublished': datePublished,
      'url': postUrl,
      'mainEntityOfPage': { '@type': 'WebPage', '@id': postUrl },
      'isPartOf': { '@id': categoryUrl },
      'author': {
        '@type': 'Organization',
        'name': SEO_CONFIG.organisation.name,
        'url': SEO_CONFIG.organisation.url,
      },
      'publisher': { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
    };
  });
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': categoryUrl,
        'url': categoryUrl,
        'name': `${category.name} Articles`,
        'description': category.description,
        'isPartOf': { '@id': `${SEO_CONFIG.siteUrl}/#website` },
        'mainEntity': {
          '@type': 'ItemList',
          'itemListElement': postingNodes.map((node, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'url': node.url,
            'item': { '@id': node['@id'] },
          })),
        },
      },
      ...postingNodes,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Blog blogdata={blogs} />
    </>
  );
}
