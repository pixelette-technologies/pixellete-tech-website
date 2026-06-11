const SITE_URL = 'https://pixelettetech.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/homepage.png`;

/**
 * Build a complete Open Graph object for a page.
 *
 * Next.js does NOT deep-merge a page's `openGraph` with the root layout's, so a
 * page that only sets `openGraph.url` loses the root's `images`/`type`. This
 * returns all the core OG properties (og:url self-referential, og:type,
 * og:image) so every indexable page carries the full set required by the audit
 * (P1-31). og:title and og:description are derived by Next.js from the page
 * title/description.
 */
export function pageOpenGraph(path: string, alt: string = 'Pixelette Technologies') {
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return {
    url: `${SITE_URL}${normalised}`,
    type: 'website' as const,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt,
      },
    ],
  };
}
