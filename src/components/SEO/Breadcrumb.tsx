import { headers } from 'next/headers';
import Script from 'next/script';

type BreadcrumbProps = {
  siteUrl: string;
};

const Breadcrumb = async ({ siteUrl }: BreadcrumbProps) => {
  const headersList = await headers();
  const fullUrl = headersList.get('x-forwarded-path') || '';
  const pathname = fullUrl.startsWith('/') ? fullUrl : `/${fullUrl}`;

  console.log('Server fullUrl:', fullUrl);
  console.log('Server pathname:', pathname);

  if (!pathname || pathname === '/') {
    console.log('No breadcrumbs: Root path or empty pathname');
    return null;
  }

  const segments = pathname.split('/').filter(seg => seg);
  console.log('Server segments:', segments);

  if (segments.length === 0) {
    console.log('No breadcrumb segments: Path is empty');
    return null;
  }

  const breadcrumbItems = segments.map((segment, index) => ({
    name: decodeURIComponent(segment.replace(/-/g, ' ')),
    href: `/${segments.slice(0, index + 1).join('/')}`,
    position: index + 1,
  }));

  console.log('Server breadcrumbItems:', breadcrumbItems);

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

  console.log('Server breadcrumbSchema:', JSON.stringify(breadcrumbSchema, null, 2));

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
