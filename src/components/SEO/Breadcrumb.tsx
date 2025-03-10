import { headers } from 'next/headers';
import Script from 'next/script';

type BreadcrumbProps = {
  siteUrl: string;
};

const Breadcrumb = async ({ siteUrl }: BreadcrumbProps) => {
  const headersList = await headers(); // Await the headers
  const fullUrl = headersList.get('x-forwarded-path') || ''; // Get the current path
  const pathname = fullUrl.startsWith('/') ? fullUrl : `/${fullUrl}`;

  if (!pathname) {
    return null;
  }

  const segments = pathname.split('/').filter(seg => seg);
  const breadcrumbItems = segments.map((segment, index) => ({
    name: decodeURIComponent(segment.replace(/-/g, ' ')),
    href: `/${segments.slice(0, index + 1).join('/')}`,
    position: index + 1,
  }));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.map(item => ({
      '@type': 'ListItem',
      'position': item.position,
      'name': item.name,
      'item': `${siteUrl}${item.href}`,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
};

export default Breadcrumb;
