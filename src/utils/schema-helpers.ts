import { buildCanonicalUrl, SEO_CONFIG } from '@/utils/seo-config';

type BreadcrumbItem = {
  name: string;
  path: string;
};

/**
 * Build a BreadcrumbList JSON-LD object.
 * Pass an ordered array of { name, path } items starting from the root.
 * The 'path' should be a site-relative path like '/blog' or '/blog/my-post'.
 * The function builds the full canonical URL via buildCanonicalUrl.
 *
 * Example:
 *   buildBreadcrumbSchema([
 *     { name: 'Home', path: '/' },
 *     { name: 'Blog', path: '/blog' },
 *     { name: 'My Post Title', path: '/blog/my-post' },
 *   ])
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': buildCanonicalUrl(item.path),
    })),
  };
}

type BlogPostingInput = {
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
};

/**
 * Build a BlogPosting JSON-LD object for a blog post.
 * - slug: the post slug, used to build the canonical URL
 * - title: the post headline
 * - description: the post description (use the same one that goes in
 *   meta description)
 * - imageUrl: optional cover image URL (if absent, falls back to
 *   SEO_CONFIG.defaultOgImage)
 * - authorName: optional author display name (if absent, falls back to
 *   the organisation name)
 * - datePublished: ISO 8601 date string (e.g., '2025-07-04T19:37:34.287Z')
 * - dateModified: ISO 8601 date string. If absent, falls back to datePublished.
 */
export function buildBlogPostingSchema(input: BlogPostingInput) {
  const url = buildCanonicalUrl(`/blog/${input.slug}`);
  const image = input.imageUrl || SEO_CONFIG.defaultOgImage;
  const datePublished = input.datePublished || new Date().toISOString();
  const dateModified = input.dateModified || datePublished;

  const author = input.authorName
    ? {
        '@type': 'Person',
        'name': input.authorName,
      }
    : {
        '@type': 'Organization',
        'name': SEO_CONFIG.organisation.name,
        'url': SEO_CONFIG.organisation.url,
      };

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#blogposting`,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url,
    },
    'headline': input.title,
    'description': input.description,
    'image': image,
    'url': url,
    'datePublished': datePublished,
    'dateModified': dateModified,
    'author': author,
    'publisher': {
      ...SEO_CONFIG.publisher,
      '@id': `${SEO_CONFIG.siteUrl}/#organization`,
      'sameAs': [
        SEO_CONFIG.social.linkedin,
        SEO_CONFIG.social.twitter,
        SEO_CONFIG.social.facebook,
        SEO_CONFIG.social.instagram,
        SEO_CONFIG.social.youtube,
      ],
    },
  };
}

type ArticleInput = {
  path: string;
  title: string;
  description: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
};

/**
 * Build an Article JSON-LD object — used for case studies.
 * Same shape as BlogPosting but uses the more general Article type which is
 * appropriate for case studies (which are not strictly blog posts).
 */
export function buildArticleSchema(input: ArticleInput) {
  const url = buildCanonicalUrl(input.path);
  const image = input.imageUrl || SEO_CONFIG.defaultOgImage;
  const datePublished = input.datePublished || new Date().toISOString();
  const dateModified = input.dateModified || datePublished;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url,
    },
    'headline': input.title,
    'description': input.description,
    'image': image,
    'url': url,
    'datePublished': datePublished,
    'dateModified': dateModified,
    'author': {
      '@type': 'Organization',
      'name': SEO_CONFIG.organisation.name,
      'url': SEO_CONFIG.organisation.url,
    },
    'publisher': {
      ...SEO_CONFIG.publisher,
      '@id': `${SEO_CONFIG.siteUrl}/#organization`,
      'sameAs': [
        SEO_CONFIG.social.linkedin,
        SEO_CONFIG.social.twitter,
        SEO_CONFIG.social.facebook,
        SEO_CONFIG.social.instagram,
        SEO_CONFIG.social.youtube,
      ],
    },
  };
}

type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Convert an author display name to a URL-safe slug.
 * "Aimun Cheema" → "aimun-cheema"
 */
export function authorNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

type AuthorSchemaInput = {
  name: string;
  slug: string;
  bio?: string;
  sameAs?: string[];
};

/**
 * Build a Person JSON-LD object for an author page.
 */
export function buildAuthorSchema(input: AuthorSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SEO_CONFIG.siteUrl}/author/${input.slug}#person`,
    'name': input.name,
    'url': `${SEO_CONFIG.siteUrl}/author/${input.slug}`,
    'description': input.bio || `${input.name} writes about AI, blockchain, and frontier technologies for Pixelette Technologies.`,
    ...(input.sameAs && input.sameAs.length > 0 ? { sameAs: input.sameAs } : {}),
    'worksFor': {
      '@type': 'Organization',
      '@id': `${SEO_CONFIG.siteUrl}/#organization`,
      'name': SEO_CONFIG.organisation.name,
      'url': SEO_CONFIG.organisation.url,
    },
  };
}

/**
 * Build a LocalBusiness JSON-LD object.
 * Used on the contact/location page to enable local pack eligibility.
 */
export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SEO_CONFIG.siteUrl}/#localbusiness`,
    'name': SEO_CONFIG.organisation.name,
    'legalName': SEO_CONFIG.organisation.legalName,
    'url': SEO_CONFIG.organisation.url,
    'logo': {
      '@type': 'ImageObject',
      'url': SEO_CONFIG.organisation.logo,
    },
    'description': SEO_CONFIG.organisation.description,
    'foundingDate': SEO_CONFIG.organisation.foundingDate,
    'telephone': SEO_CONFIG.contact.telephoneUK,
    'email': SEO_CONFIG.contact.email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': SEO_CONFIG.contact.addressUK.streetAddress,
      'addressLocality': SEO_CONFIG.contact.addressUK.addressLocality,
      'postalCode': SEO_CONFIG.contact.addressUK.postalCode,
      'addressCountry': SEO_CONFIG.contact.addressUK.addressCountry,
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 51.4927,
      'longitude': -0.2289,
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '18:00',
      },
    ],
    'areaServed': [
      { '@type': 'Country', 'name': 'United Kingdom' },
      { '@type': 'Country', 'name': 'United States' },
    ],
    'sameAs': [
      SEO_CONFIG.social.linkedin,
      SEO_CONFIG.social.twitter,
      SEO_CONFIG.social.facebook,
      SEO_CONFIG.social.instagram,
      SEO_CONFIG.social.youtube,
    ],
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': SEO_CONFIG.contact.telephoneUK,
        'contactType': 'sales',
        'areaServed': 'GB',
        'availableLanguage': ['en'],
        'email': SEO_CONFIG.contact.email,
      },
      {
        '@type': 'ContactPoint',
        'telephone': SEO_CONFIG.contact.telephoneUS,
        'contactType': 'sales',
        'areaServed': 'US',
        'availableLanguage': ['en'],
      },
    ],
  };
}

/**
 * Build a FAQPage JSON-LD object from an array of question/answer pairs.
 * The answer can contain plain text or HTML; Google handles both.
 */
export function buildFaqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  };
}
